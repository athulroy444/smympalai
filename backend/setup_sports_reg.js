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
        console.log("Creating sports_registrations table...");
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS sports_registrations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                full_name VARCHAR(150) NOT NULL,
                dob DATE NOT NULL,
                phone VARCHAR(20) NOT NULL,
                unit_name VARCHAR(100) NOT NULL,
                event_name VARCHAR(150) NOT NULL,
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
