const mysql = require('mysql2/promise');
require('dotenv').config();

async function check() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    const [units] = await connection.execute("SELECT id, name FROM units WHERE id IN (1, 8, 14, 20, 29)");
    console.log("Units found:", units);

    const [members] = await connection.execute("SELECT id, full_name, unit_id FROM members");
    console.log("Members in DB:", members);

    await connection.end();
}

check();
