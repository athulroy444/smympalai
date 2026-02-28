const axios = require('axios');

async function testRegister() {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
            username: 'Test Unit',
            password: 'testpassword',
            role: 'unit',
            entityId: 1
        });
        console.log("Success:", response.data);
    } catch (err) {
        console.error("Failed:", err.response ? err.response.data : err.message);
    }
}

testRegister();
