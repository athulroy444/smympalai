const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Helper to generate JWT tokens
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role, entityId: user.entity_id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
    );
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new Unit or Forona user (PLAIN TEXT VERSION)
 */
router.post('/register', async (req, res) => {
    console.log("--- Registration Attempt (Plain Text) ---");

    try {
        const rawUsername = req.body.username || req.body.unitName;
        const { password, role, entityId } = req.body;

        if (!rawUsername || !password) {
            return res.status(400).json({ message: "Unit Name and Password required" });
        }

        const username = rawUsername.trim();

        if (!role) {
            return res.status(400).json({ message: "Role is required" });
        }

        // 1. Check if user account already exists
        const [existing] = await db.execute('SELECT id FROM users WHERE LOWER(username) = LOWER(?)', [username]);
        if (existing.length > 0) {
            return res.status(400).json({ message: "Account already exists for this name." });
        }

        // 2. Specialty logic for 'unit' role registration
        let targetEntityId = entityId;

        if (role === 'unit' && entityId) {
            const [units] = await db.execute(
                'SELECT id FROM units WHERE LOWER(name) = LOWER(?) AND forona_id = ?',
                [username, entityId]
            );

            if (units.length > 0) {
                targetEntityId = units[0].id;
            } else {
                const [result] = await db.execute(
                    'INSERT INTO units (name, forona_id) VALUES (?, ?)',
                    [username, entityId]
                );
                targetEntityId = result.insertId;
            }
        }

        // 3. Store Password directly (PLAIN TEXT - INSECURE)
        await db.execute(
            'INSERT INTO users (username, password_hash, role, entity_id) VALUES (?, ?, ?, ?)',
            [username, password, role, targetEntityId || null]
        );

        console.log(`Successfully registered user (Plain Text): ${username}`);
        res.status(201).json({ message: "Registration successful! Password stored in plain text." });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ message: "Server error: " + err.message });
    }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user using Plain Text
 */
router.post('/login', async (req, res) => {
    const usernameInput = req.body.username?.trim();
    const passwordInput = req.body.password;
    const roleInput = req.body.role;

    if (!usernameInput || !passwordInput || !roleInput) {
        return res.status(400).json({ message: "Missing credentials" });
    }

    try {
        const [users] = await db.execute(
            'SELECT * FROM users WHERE LOWER(username) = LOWER(?) AND role = ?',
            [usernameInput, roleInput]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid username or role." });
        }

        const user = users[0];

        // Match pass (Direct Comparison)
        // Note: Supporting both hashed and plain text for existing accounts if possible, 
        // but for simplicity here we do direct check.
        if (passwordInput !== user.password_hash) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        const token = generateToken(user);
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                entityId: user.entity_id
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Internal server error during login." });
    }
});

module.exports = router;