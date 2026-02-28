const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET Activities
router.get('/activities', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM activities ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// POST Activity
router.post('/activities', async (req, res) => {
    const { title, description, icon_name } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO activities (title, description, icon_name) VALUES (?, ?, ?)',
            [title, description || '', icon_name || 'People']
        );
        res.status(201).json({ id: result.insertId, title, description, icon_name });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// GET News
router.get('/news', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM news ORDER BY event_date DESC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// POST News
router.post('/news', async (req, res) => {
    const { title, event_date, description, image_url } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO news (title, event_date, description, image_url) VALUES (?, ?, ?, ?)',
            [title, event_date || null, description || '', image_url || '']
        );
        res.status(201).json({ id: result.insertId, title, event_date, description, image_url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// DELETE News
router.delete('/news/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM news WHERE id = ?', [req.params.id]);
        res.json({ message: "News deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// --- EVENTS ---

// GET Events
router.get('/events', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM events ORDER BY event_date DESC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// POST Event
router.post('/events', async (req, res) => {
    const { title, event_date, location } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO events (title, event_date, location) VALUES (?, ?, ?)',
            [title, event_date || null, location || 'TBD']
        );
        res.status(201).json({ id: result.insertId, title, event_date, location });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// DELETE Event
router.delete('/events/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM events WHERE id = ?', [req.params.id]);
        res.json({ message: "Event deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// --- ROOPATHA EXECUTIVES ---
// We use entity_type = 'forona' and entity_id = 0 to mean the Eparchy (Diocese) level
// (since there is no forona with id 0 normally)

// GET
router.get('/executives', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM executives WHERE entity_type = "forona" AND entity_id = 0 ORDER BY id ASC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// ADD
router.post('/executives', async (req, res) => {
    const { name, post, phone, image_url } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO executives (name, post, phone, image_url, entity_type, entity_id) VALUES (?, ?, ?, ?, "forona", 0)',
            [name, post, phone || '', image_url || '']
        );
        res.status(201).json({ id: result.insertId, name, post, phone, image_url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// UPDATE
router.put('/executives/:id', async (req, res) => {
    const { name, post, phone, image_url } = req.body;
    try {
        await db.execute(
            'UPDATE executives SET name = ?, post = ?, phone = ?, image_url = ? WHERE id = ?',
            [name, post, phone || '', image_url || '', req.params.id]
        );
        res.json({ message: "Updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// DELETE
router.delete('/executives/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM executives WHERE id = ?', [req.params.id]);
        res.json({ message: "Executive deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// --- HERO SLIDES ---
router.get('/hero-slides', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM hero_slides ORDER BY sort_order ASC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

router.post('/hero-slides', async (req, res) => {
    const { image_url, title, subtitle, sort_order } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO hero_slides (image_url, title, subtitle, sort_order) VALUES (?, ?, ?, ?)',
            [image_url, title || '', subtitle || '', sort_order || 0]
        );
        res.status(201).json({ id: result.insertId, image_url, title, subtitle, sort_order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

router.delete('/hero-slides/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM hero_slides WHERE id = ?', [req.params.id]);
        res.json({ message: "Slide deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// --- SITE SETTINGS ---
router.get('/settings', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM site_settings');
        // Convert array to object { key: value }
        const settings = {};
        rows.forEach(r => settings[r.setting_key] = r.setting_value);
        res.json(settings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

router.post('/settings', async (req, res) => {
    const { key, value } = req.body;
    try {
        await db.execute(
            'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
            [key, value, value]
        );
        res.json({ message: "Setting updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
