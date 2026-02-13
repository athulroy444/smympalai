const express = require('express');
const router = express.Router();
const { readDb, writeDb } = require('../utils/jsonDb');

// --- MEMBER MANAGEMENT ---

// GET Members for a specific Unit
router.get('/members/:unitId', async (req, res) => {
    const db = await readDb();
    const unitId = parseInt(req.params.unitId);
    const members = (db.members || []).filter(m => m.unit_id === unitId);
    res.json(members);
});

// ADD Member
router.post('/members', async (req, res) => {
    const { fullName, dob, houseName, phone, unitId } = req.body;
    const db = await readDb();

    if (!db.members) db.members = [];

    const newMember = {
        id: Date.now(),
        full_name: fullName,
        dob,
        house_name: houseName,
        phone,
        unit_id: unitId
    };

    db.members.push(newMember);
    await writeDb(db);

    res.status(201).json(newMember);
});

// DELETE Member
router.delete('/members/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const db = await readDb();

    if (!db.members) db.members = [];

    db.members = db.members.filter(m => m.id !== id);
    await writeDb(db);

    res.json({ message: "Member deleted" });
});


// --- EVENT REGISTRATION ---

// GET All Events (for registration list)
router.get('/events', async (req, res) => {
    const db = await readDb();
    res.json(db.events || []);
});

// GET Registrations for a specific Unit
router.get('/registrations/:unitId', async (req, res) => {
    const db = await readDb();
    const unitId = parseInt(req.params.unitId);

    const regs = (db.registrations || []).filter(r => r.unit_id === unitId);

    // Join with event title
    const events = db.events || [];
    const enrichedRegs = regs.map(r => {
        const evt = events.find(e => e.id === r.event_id);
        return { ...r, event_title: evt ? evt.title : 'Unknown Event' };
    });

    res.json(enrichedRegs);
});

// REGISTER Members for Event
router.post('/register', async (req, res) => {
    const { eventId, memberIds, unitId } = req.body;
    const db = await readDb();

    if (!memberIds || memberIds.length === 0) {
        return res.status(400).json({ message: "No members selected" });
    }

    if (!db.registrations) db.registrations = [];

    memberIds.forEach(mid => {
        // Check if already registered
        const exists = db.registrations.find(r => r.event_id === eventId && r.member_id === mid);
        if (!exists) {
            db.registrations.push({
                id: Date.now() + Math.random(),
                event_id: eventId,
                member_id: mid,
                unit_id: unitId
            });
        }
    });

    await writeDb(db);
    res.status(201).json({ message: "Registration successful" });
});

module.exports = router;
