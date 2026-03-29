const axios = require('axios');

const test = async () => {
    try {
        console.log('Testing Login...');
        const loginRes = await axios.post('http://localhost:5000/api/users/login', {
            email: 'admin@salesauto.com',
            password: 'password123'
        });
        const token = loginRes.data.token;
        console.log('Login Successful!');

        console.log('Testing Lead Creation...');
        const leadRes = await axios.post('http://localhost:5000/api/leads', {
            name: 'Test Lead',
            email: 'test@example.com',
            phone: '1234567890',
            source: 'Website',
            region: 'North America'
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Lead Creation Successful:', leadRes.data);

        console.log('Testing Get Leads...');
        const leadsRes = await axios.get('http://localhost:5000/api/leads', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Get Leads Successful! Count:', leadsRes.data.length);

    } catch (err) {
        console.error('Test Failed:', err.response ? err.response.data : err.message);
    }
};

test();
