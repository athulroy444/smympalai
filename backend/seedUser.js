const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

async function seedUser() {
    console.log("Seeding User...");

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        // 1. Ensure 'Cathedral' Unit exists
        const [units] = await connection.execute('SELECT id FROM units WHERE name = ?', ['Cathedral']);
        let unitId;

        if (units.length === 0) {
            // Create Unit if simplified version didn't have it
            // Check if forona exists first, for simplicty let's just insert with null forona or 1
            const [result] = await connection.execute('INSERT INTO units (name, forona_id) VALUES (?, ?)', ['Cathedral', 1]);
            // Note: Forona 1 needs to exist. database.sql mocked it? 
            // Let's check if forona exists, if not insert it.
            unitId = result.insertId;
            console.log("Created Unit 'Cathedral'");
        } else {
            unitId = units[0].id;
            console.log("Found Unit 'Cathedral', ID:", unitId);
        }

        // 2. Hash Password
        const hashedPassword = await bcrypt.hash('password', 10);

        // 3. Create/Update User
        // Check if user exists
        const [users] = await connection.execute('SELECT id FROM users WHERE username = ?', ['Cathedral']);

        if (users.length > 0) {
            console.log("User 'Cathedral' already exists. Updating password and linking to Unit.");
            await connection.execute(
                'UPDATE users SET password_hash = ?, role = ?, entity_id = ? WHERE username = ?',
                [hashedPassword, 'unit', unitId, 'Cathedral']
            );
        } else {
            console.log("Creating User 'Cathedral'...");
            await connection.execute(
                'INSERT INTO users (username, password_hash, role, entity_id) VALUES (?, ?, ?, ?)',
                ['Cathedral', hashedPassword, 'unit', unitId]
            );
        }

        console.log("User Seeding Completed.");
        console.log("Username: Cathedral");
        console.log("Password: password");

    } catch (err) {
        console.error("Error seeding user:", err);
    } finally {
        await connection.end();
    }
}

seedUser();
