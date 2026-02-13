const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(__dirname, '../db.json');

const readDb = async () => {
    try {
        const data = await fs.readFile(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading DB:", err);
        return {};
    }
};

const writeDb = async (data) => {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 4));
        return true;
    } catch (err) {
        console.error("Error writing DB:", err);
        return false;
    }
};

module.exports = { readDb, writeDb };
