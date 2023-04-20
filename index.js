// Import modules
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Create express app and http server
const app = express();
const server = http.createServer(app);

// Initialize socket.io on the server
const io = socketIO(server);

// Listen for client connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages from the client
  socket.on('chat message', (msg) => {
    console.log('Received message:', msg);

    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Listen for disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Serve static files from the public directory
app.use(express.static('public'));

// Start the server
server.listen(9005, () => {
  console.log('Server listening on port 9005');
});
