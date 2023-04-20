// Import modules
const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://mqtt.casi.io', {username:'3c5080278d63e18c6aff21054f1c4d8ce304fa89', password:'3c5080278d63e18c6aff21054f1c4d8ce304fa89'})

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Create express app and http server
const app = express();
const server = http.createServer(app);

// Initialize socket.io on the server
const io = socketIO(server);

client.on('connect', function () {
    console.log("Connected to mqtt broker");
    client.subscribe('casi/production/in/69af441143c8da93471dd63f4bc0c763/test_int', function (err) {
      if (!err) {
        client.publish('presence', 'Hello mqtt')
      }
    })
  })
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

client.on('message', function (topic, message) {
    // message is Buffer
    io.emit('getData/69af441143c8da93471dd63f4bc0c763/test_int', message.toString());
    console.log(topic)
    console.log(message.toString())
  })

// Serve static files from the public directory
app.use(express.static('public'));

// Start the server
server.listen(9005, () => {
  console.log('Server listening on port 9005');
});
