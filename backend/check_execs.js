const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function check() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'smym_palai'
    });

    try {
        const [execs] = await connection.execute('SELECT * FROM executives');
        console.table(execs);
    } catch (err) {
        console.error(err);
    } finally {
        await connection.end();
    }
}
check();
