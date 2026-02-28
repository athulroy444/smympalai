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
        console.log("Creating unit_activities table...");
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS unit_activities (
                id INT AUTO_INCREMENT PRIMARY KEY,
                unit_id INT,
                title VARCHAR(150) NOT NULL,
                description TEXT,
                activity_date DATE,
                FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Seed some data for Cathedral (ID usually 12 in seed, but let's find it)
        const [units] = await connection.execute("SELECT id FROM units WHERE name = 'Cathedral' LIMIT 1");
        if (units.length > 0) {
            const unitId = units[0].id;
            console.log(`Found Cathedral unit with ID: ${unitId}. Seeding activities...`);

            // Clear old ones to avoid duplicates if re-run
            await connection.execute("DELETE FROM unit_activities WHERE unit_id = ?", [unitId]);

            await connection.execute(
                "INSERT INTO unit_activities (unit_id, title, description, activity_date) VALUES (?, ?, ?, ?)",
                [unitId, 'Unit Bible Quiz', 'A competitive bible quiz organized for the youth of the parish.', '2024-03-20']
            );
            await connection.execute(
                "INSERT INTO unit_activities (unit_id, title, description, activity_date) VALUES (?, ?, ?, ?)",
                [unitId, 'Parish Cleaning Drive', 'Cleaning the parish surroundings as part of our social responsibility.', '2024-04-05']
            );
            await connection.execute(
                "INSERT INTO unit_activities (unit_id, title, description, activity_date) VALUES (?, ?, ?, ?)",
                [unitId, 'Youth Meeting', 'Monthly general body meeting to discuss upcoming events.', '2024-04-12']
            );
        }

        console.log("Setup completed successfully.");
    } catch (err) {
        console.error("Error during setup:", err);
    } finally {
        await connection.end();
    }
}

setup();
