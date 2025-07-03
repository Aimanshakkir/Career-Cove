// Simple test script to verify server functionality
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testServer() {
  try {
    console.log('Testing server endpoints...');
    
    // Test server is running
    const response = await fetch(`${BASE_URL}/dashboard`, {
      headers: {
        'Authorization': 'Bearer invalid-token'
      }
    });
    
    if (response.status === 401) {
      console.log('✅ Server is running and authentication middleware is working');
    } else {
      console.log('❌ Unexpected response from server');
    }
    
  } catch (error) {
    console.log('❌ Server is not running or not accessible');
    console.log('Please start the server with: npm start');
  }
}

testServer();