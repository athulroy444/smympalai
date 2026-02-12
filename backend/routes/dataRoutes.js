const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET ALL FORONAS (with Units and Executives)
router.get('/foronas', async (req, res) => {
    try {
        // 1. Get Foronas
        const [foronas] = await db.execute('SELECT * FROM foronas');

        // 2. For each Forona, get Units and Executives (Nested queries are inefficient but simple for now)
        // A better approach is fetching all and mapping in JS.

        const [units] = await db.execute('SELECT * FROM units');
        const [executives] = await db.execute('SELECT * FROM executives');

        const result = foronas.map(f => {
            return {
                ...f,
                executives: executives.filter(e => e.entity_type === 'forona' && e.entity_id === f.id),
                units: units
                    .filter(u => u.forona_id === f.id)
                    .map(u => ({
                        ...u,
                        executives: executives.filter(e => e.entity_type === 'unit' && e.entity_id === u.id)
                    }))
            };
        });

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// UPDATE EXECUTIVES (Generic)
router.post('/executives', async (req, res) => {
    const { entityType, entityId, executives } = req.body;
    // executives is an array of { name, post, phone }

    if (!entityType || !entityId) return res.status(400).json({ message: "Entity details required" });

    try {
        // Transaction approach recommended, but for simple MySQL2:

        // 1. Delete existing executives for this entity
        await db.execute(
            'DELETE FROM executives WHERE entity_type = ? AND entity_id = ?',
            [entityType, entityId]
        );

        // 2. Insert new ones
        if (executives && executives.length > 0) {
            const values = executives.map(e => [e.name, e.post, e.phone || '', entityType, entityId]);
            // Bulk insert
            await db.query(
                'INSERT INTO executives (name, post, phone, entity_type, entity_id) VALUES ?',
                [values]
            );
        }

        res.json({ message: "Executives Updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
