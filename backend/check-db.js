const mysql = require('mysql2/promise');
require('dotenv').config();

async function check() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    console.log("Database:", process.env.DB_NAME);
    const [members] = await connection.execute("SELECT COUNT(*) as count FROM members");
    console.log("Members count:", members[0].count);

    const [units] = await connection.execute("SELECT COUNT(*) as count FROM units");
    console.log("Units count:", units[0].count);

    const [foronas] = await connection.execute("SELECT COUNT(*) as count FROM foronas");
    console.log("Foronas count:", foronas[0].count);

    await connection.end();
}

check();
