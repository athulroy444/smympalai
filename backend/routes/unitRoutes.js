const express = require('express');
const router = express.Router();
const db = require('../config/db');

// --- MEMBER MANAGEMENT ---

// GET Members for a specific Unit
router.get('/members/:unitId', async (req, res) => {
    try {
        const [members] = await db.execute('SELECT * FROM members WHERE unit_id = ?', [req.params.unitId]);
        res.json(members);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// ADD Member
router.post('/members', async (req, res) => {
    const { fullName, dob, houseName, phone, unitId } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO members (full_name, dob, house_name, phone, unit_id) VALUES (?, ?, ?, ?, ?)',
            [fullName, dob || null, houseName || '', phone || '', unitId]
        );
        res.status(201).json({ id: result.insertId, fullName, dob, houseName, phone, unitId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// DELETE Member
router.delete('/members/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM members WHERE id = ?', [req.params.id]);
        res.json({ message: "Member deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});


// --- EVENT REGISTRATION ---

// GET All Events (for registration list)
router.get('/events', async (req, res) => {
    try {
        const [events] = await db.execute('SELECT * FROM events ORDER BY event_date DESC');
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// GET Registrations for a specific Unit
router.get('/registrations/:unitId', async (req, res) => {
    try {
        const [regs] = await db.execute(`
            SELECT r.*, e.title as event_title, m.full_name as member_name 
            FROM registrations r
            JOIN events e ON r.event_id = e.id
            JOIN members m ON r.member_id = m.id
            WHERE r.unit_id = ?
        `, [req.params.unitId]);
        res.json(regs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// REGISTER Members for Event
router.post('/register', async (req, res) => {
    const { eventId, memberIds, unitId } = req.body;

    if (!memberIds || memberIds.length === 0) {
        return res.status(400).json({ message: "No members selected" });
    }

    try {
        // Insert multiple rows
        const values = memberIds.map(mid => [eventId, mid, unitId]);

        // Using 'INSERT IGNORE' or similar could be better, but we'll do simple check or let DB error if unique constraint exists
        // Since we don't have a unique constraint in schema, let's just insert
        await db.query(
            'INSERT INTO registrations (event_id, member_id, unit_id) VALUES ?',
            [values]
        );

        res.status(201).json({ message: "Registration successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// --- PARISH YOUTH ACTIVITIES ---

// GET Activities for a specific Unit
router.get('/activities/:unitId', async (req, res) => {
    try {
        const [activities] = await db.execute('SELECT * FROM unit_activities WHERE unit_id = ? ORDER BY activity_date DESC', [req.params.unitId]);
        res.json(activities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// ADD Parish Activity
router.post('/activities', async (req, res) => {
    const { title, description, date, unitId } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO unit_activities (title, description, activity_date, unit_id) VALUES (?, ?, ?, ?)',
            [title, description || '', date || null, unitId]
        );
        res.status(201).json({ id: result.insertId, title, description, activity_date: date, unit_id: unitId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// DELETE Parish Activity
router.delete('/activities/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM unit_activities WHERE id = ?', [req.params.id]);
        res.json({ message: "Activity deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
