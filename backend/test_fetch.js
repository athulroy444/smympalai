async function testRegister() {
    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'Test Unit',
                password: 'testpassword',
                role: 'unit',
                entityId: 1
            })
        });
        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Response:", data);
    } catch (err) {
        console.error("Error:", err.message);
    }
}

testRegister();
