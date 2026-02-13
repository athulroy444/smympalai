const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function checkData() {
    console.log("Connecting to database...");

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'smym_db'
        });

        console.log("Connected! Fetching data...\n");

        console.log("--- ACTIVITIES ---");
        const [activities] = await connection.execute('SELECT * FROM activities');
        console.table(activities);

        console.log("\n--- NEWS ---");
        const [news] = await connection.execute('SELECT * FROM news');
        console.table(news);

        console.log("\n--- USERS ---");
        const [users] = await connection.execute('SELECT username, role FROM users'); // Don't show password hash
        console.table(users);

        await connection.end();

    } catch (err) {
        console.error("Error:", err.message);
        console.log("\nTIP: Make sure your DB_PASSWORD in .env is correct!");
    }
}

checkData();
