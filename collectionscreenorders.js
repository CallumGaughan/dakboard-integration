// NetSuite REST API endpoint and credentials
const accountId = '94cd18aa732a5464c88e53565aa8f94322454f2faad49b67d66d0dc190760e71';
const consumerKey = '3d4c293617e89864a89273063c678bfc6dd3f64ab6595fb4b59f2eab6189df99';
const consumerSecret = '<YOUR_CONSUMER_SECRET>';
const tokenId = '8ab45cc26f610a5ccec6713cbf18f17a1ba2f7a31985d23c208c2d561945fb37';
const tokenSecret = '397051201e15d2a6dadc6d01543ea773c2cdcc84cd1b9dc801978375469f89f2';

const endpoint = `https://5760103.suitetalk.api.netsuite.com/services/rest/record/v1/salesOrder`;

// Set up the authentication header (OAuth 1.0)
const oauthHeaders = {
  'Authorization': `OAuth oauth_consumer_key="${consumerKey}", oauth_token="${tokenId}", oauth_signature_method="HMAC-SHA256", oauth_timestamp="${Math.floor(Date.now() / 1000)}", oauth_nonce="${Math.random().toString(36).substring(2)}", oauth_version="1.0"`,
  'Content-Type': 'application/json'
};

// Function to fetch orders from NetSuite
async function fetchOrders() {
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: oauthHeaders
    });

    // Check if the response is successful
    if (response.ok) {
      const data = await response.json();
      displayOrders(data); // Pass data to the function that will display on DAKboard
    } else {
      console.error('Failed to fetch data from NetSuite', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching orders from NetSuite:', error);
  }
}

// Function to display the orders on the DAKboard (in the browser)
function displayOrders(data) {
  const ordersList = document.getElementById('orders-list');
  ordersList.innerHTML = ''; // Clear the existing orders

  // Loop through orders and add them to the list
  data.items.forEach(order => {
    const listItem = document.createElement('li');
    listItem.textContent = `Order ID: ${order.id}, Status: ${order.status, Order Type: ${order.orderType}}`;
    ordersList.appendChild(listItem);
  });
}

// Fetch orders when the page loads
window.onload = fetchOrders;


