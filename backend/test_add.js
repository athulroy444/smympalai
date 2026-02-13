
async function testAdd() {
    try {
        console.log("Testing Add Executive...");
        const newExec = {
            name: "Test User 2",
            position: "Test Position 2",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
        };

        const response = await fetch('http://localhost:5000/api/content/executives', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newExec)
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Success:", response.status, data);
        } else {
            console.error("Error:", response.status, response.statusText);
            const text = await response.text();
            console.error("Response body:", text);
        }
    } catch (err) {
        console.error("Fetch Error:", err);
    }
}

testAdd();
