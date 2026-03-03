const db = require('./config/db');

async function updateSchema() {
    try {
        console.log("Checking events table for image_url column...");
        const [columns] = await db.execute("SHOW COLUMNS FROM events LIKE 'image_url'");

        if (columns.length === 0) {
            console.log("Adding image_url column to events table...");
            await db.execute("ALTER TABLE events ADD COLUMN image_url VARCHAR(255) DEFAULT ''");
            console.log("Column added successfully.");
        } else {
            console.log("image_url column already exists.");
        }

    } catch (err) {
        console.error("Error updating schema:", err);
    } finally {
        process.exit();
    }
}

updateSchema();
