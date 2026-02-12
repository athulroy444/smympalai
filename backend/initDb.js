const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

async function initDb() {
    console.log("Connecting to MySQL...");

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        multipleStatements: true // Important for running the SQL script
    });

    console.log("Connected.");

    try {
        const sqlPath = path.join(__dirname, 'database.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log("Running database.sql...");

        // Execute the SQL script
        await connection.query(sql);

        console.log("Database initialized successfully!");
        console.log("Tables created/updated.");

    } catch (err) {
        console.error("Error initializing database:", err);
    } finally {
        await connection.end();
    }
}

initDb();
