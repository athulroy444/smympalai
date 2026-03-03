const mysql = require('mysql2/promise');
require('dotenv').config();

async function setAdmin() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'smym_palai'
    });

    try {
        console.log("Setting admin credentials...");

        // Remove any existing admin with this username to avoid duplicates
        await connection.execute('DELETE FROM users WHERE username = ? AND role = "admin"', ['smympalai']);

        // Insert the new admin credentials
        await connection.execute(
            'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
            ['smympalai', 'smymkcym', 'admin']
        );

        console.log("Admin account set successfully.");
        console.log("Username: smympalai");
        console.log("Password: smymkcym");
    } catch (err) {
        console.error("Error setting admin:", err);
    } finally {
        await connection.end();
    }
}

setAdmin();
