const express = require('express');
const router = express.Router();
const { readDb, writeDb } = require('../utils/jsonDb');

// GET Activities
router.get('/activities', async (req, res) => {
    const db = await readDb();
    res.json(db.activities || []);
});

// POST Activity
router.post('/activities', async (req, res) => {
    const db = await readDb();
    if (!db.activities) db.activities = [];
    const newItem = { id: Date.now(), ...req.body };
    db.activities.push(newItem);
    await writeDb(db);
    res.status(201).json(newItem);
});

// GET News
router.get('/news', async (req, res) => {
    const db = await readDb();
    res.json(db.news || []);
});

// POST News
router.post('/news', async (req, res) => {
    const db = await readDb();
    if (!db.news) db.news = [];
    const newItem = { id: Date.now(), ...req.body };
    db.news.push(newItem);
    await writeDb(db);
    res.status(201).json(newItem);
});

// DELETE News
router.delete('/news/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const db = await readDb();
    if (!db.news) db.news = [];
    db.news = db.news.filter(n => n.id !== id);
    await writeDb(db);
    res.json({ message: "News deleted" });
});

// --- EVENTS ---

// GET Events
router.get('/events', async (req, res) => {
    const db = await readDb();
    res.json(db.events || []);
});

// POST Event
router.post('/events', async (req, res) => {
    const db = await readDb();
    if (!db.events) db.events = [];
    // Ensure basic fields
    const newItem = {
        id: Date.now(),
        title: req.body.title,
        event_date: req.body.event_date,
        location: req.body.location || 'TBD'
    };
    db.events.push(newItem);
    await writeDb(db);
    res.status(201).json(newItem);
});

// DELETE Event
router.delete('/events/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const db = await readDb();
    if (!db.events) db.events = [];
    db.events = db.events.filter(e => e.id !== id);
    await writeDb(db);
    res.json({ message: "Event deleted" });
});

// --- ROOPATHA EXECUTIVES ---

// GET
router.get('/executives', async (req, res) => {
    const db = await readDb();
    res.json(db.roopatha_executives || []);
});

// ADD
router.post('/executives', async (req, res) => {
    console.log("POST /executives called");
    try {
        const db = await readDb();
        if (!db.roopatha_executives) db.roopatha_executives = [];
        const newItem = { id: Date.now(), ...req.body };
        db.roopatha_executives.push(newItem);
        await writeDb(db);
        console.log("Executive added to DB:", newItem.id);

        // Return success but omit the large image from response to be safe
        const { image, ...responseItem } = newItem;
        res.status(201).json(responseItem);
    } catch (err) {
        console.error("Error in POST /executives:", err);
        res.status(500).json({ message: "Server Error" });
    }
});

// UPDATE
router.put('/executives/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const db = await readDb();
    if (!db.roopatha_executives) return res.status(404).json({ message: "Not found" });

    const index = db.roopatha_executives.findIndex(ex => ex.id === id);
    if (index === -1) return res.status(404).json({ message: "Not found" });

    db.roopatha_executives[index] = { ...db.roopatha_executives[index], ...req.body };
    await writeDb(db);
    res.json(db.roopatha_executives[index]);
});

// DELETE
router.delete('/executives/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const db = await readDb();
    if (!db.roopatha_executives) db.roopatha_executives = [];
    db.roopatha_executives = db.roopatha_executives.filter(ex => ex.id !== id);
    await writeDb(db);
    res.json({ message: "Executive deleted" });
});

module.exports = router;
