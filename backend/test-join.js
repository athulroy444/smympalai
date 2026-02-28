const mysql = require('mysql2/promise');
require('dotenv').config();

async function check() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    const query = `
        SELECT m.*, u.name as unit_name, f.name as forona_name
        FROM members m
        JOIN units u ON m.unit_id = u.id
        JOIN foronas f ON u.forona_id = f.id
    `;
    const [rows] = await connection.execute(query);
    console.log("Joined Rows:", rows.length);
    if (rows.length > 0) {
        console.log("First row sample:", rows[0]);
    }

    await connection.end();
}

check();
