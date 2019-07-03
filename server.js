// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (client) => {

  client.on('message', (msgData) => {
    const msg = JSON.parse(msgData);
    const {username}  = msg;
    const {newMessage} = msg;
    console.log('user: ', username);
    console.log('content: ', newMessage);
  }); 

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => console.log('Client disconnected'));

});




