const mysql = require('mysql2/promise');
require('dotenv').config();

async function check() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'smym_palai'
    });

    try {
        const [foronas] = await connection.execute('SELECT COUNT(*) as count FROM foronas');
        console.log(`Foronas count: ${foronas[0].count}`);

        const [units] = await connection.execute('SELECT COUNT(*) as count FROM units');
        console.log(`Units count: ${units[0].count}`);

        if (foronas[0].count === 0) {
            console.log("No foronas found. Database might be empty.");
        }
    } catch (err) {
        console.error("Error checking DB:", err);
    } finally {
        await connection.end();
    }
}

check();
