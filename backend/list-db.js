const mysql = require('mysql2/promise');
require('dotenv').config();

async function check() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });

    const [databases] = await connection.execute("SHOW DATABASES");
    console.log("Databases:", databases.map(d => d.Database));

    await connection.end();
}

check();
