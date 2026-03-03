const mysql = require('mysql2/promise');
require('dotenv').config();

async function setup() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'smym_palai'
    });

    try {
        console.log("Creating team_registrations table...");
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS team_registrations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                team_name VARCHAR(150) NOT NULL,
                captain_name VARCHAR(150) NOT NULL,
                captain_phone VARCHAR(20) NOT NULL,
                forona_name VARCHAR(100) NOT NULL,
                unit_name VARCHAR(100) NOT NULL,
                event_name VARCHAR(150) NOT NULL,
                player_count INT DEFAULT 1,
                players_list TEXT, -- JSON string of player names
                status ENUM('pending', 'paid', 'cancelled') DEFAULT 'pending',
                amount DECIMAL(10, 2) DEFAULT 0.00,
                payment_id VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("Setup completed successfully.");
    } catch (err) {
        console.error("Error during setup:", err);
    } finally {
        await connection.end();
    }
}

setup();
