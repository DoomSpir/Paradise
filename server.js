const express = require('express');
const { createBareServer } = require('@tomphttp/bare-server-node');
const { createServer } = require('node:http');
const path = require('node:path');

// Initialize the Bare Server (Backend for the proxy)
const bare = createBareServer('/bare/');

const app = express();

// Serve all static files in this folder (index.html, games, scripts)
app.use(express.static(__dirname));

// Ensure the root URL loads the index 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Create the actual HTTP server that handles both normal files and proxy traffic
const server = createServer();

server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
        // If it's proxy traffic, route it to the Bare engine
        bare.routeRequest(req, res);
    } else {
        // Otherwise, serve the normal website
        app(req, res);
    }
});

server.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`☁️ Paradise server is running on port ${PORT}`);
});
