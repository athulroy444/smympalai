const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all registered members (Forona-wise)
router.get('/members', async (req, res) => {
    try {
        const query = `
            SELECT m.*, u.name as unit_name, f.name as forona_name
            FROM members m
            JOIN units u ON m.unit_id = u.id
            JOIN foronas f ON u.forona_id = f.id
            ORDER BY f.name, u.name, m.full_name
        `;
        const [rows] = await db.execute(query);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// GET all event registrations
router.get('/registrations', async (req, res) => {
    try {
        const query = `
            SELECT r.*, e.title as event_title, e.event_date, m.full_name as member_name, 
                   u.name as unit_name, f.name as forona_name
            FROM registrations r
            JOIN events e ON r.event_id = e.id
            JOIN members m ON r.member_id = m.id
            JOIN units u ON r.unit_id = u.id
            JOIN foronas f ON u.forona_id = f.id
            ORDER BY e.event_date DESC, f.name, u.name
        `;
        const [rows] = await db.execute(query);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// GET all executives (Universal Directory)
router.get('/executives', async (req, res) => {
    try {
        const query = `
            SELECT e.*, 
                   CASE 
                       WHEN e.entity_type = 'forona' THEN f.name 
                       WHEN e.entity_type = 'unit' THEN u_f.name 
                   END as forona_name,
                   CASE 
                       WHEN e.entity_type = 'unit' THEN u.name 
                       ELSE 'Forona Council' 
                   END as unit_name
            FROM executives e
            LEFT JOIN foronas f ON e.entity_type = 'forona' AND e.entity_id = f.id
            LEFT JOIN units u ON e.entity_type = 'unit' AND e.entity_id = u.id
            LEFT JOIN foronas u_f ON u.forona_id = u_f.id
            ORDER BY e.entity_type, forona_name, unit_name, e.name
        `;
        const [rows] = await db.execute(query);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// GET statistics for dashboard
router.get('/stats', async (req, res) => {
    try {
        const [units] = await db.execute('SELECT COUNT(*) as count FROM units');
        const [foronas] = await db.execute('SELECT COUNT(*) as count FROM foronas');
        const [members] = await db.execute('SELECT COUNT(*) as count FROM members');
        const [events] = await db.execute('SELECT COUNT(*) as count FROM events');

        res.json({
            units: units[0].count,
            foronas: foronas[0].count,
            members: members[0].count,
            events: events[0].count
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
