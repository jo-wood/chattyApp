// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');
const  messages  = require('./message-db.js')
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

const clients = [];
let clientsLength = 0;


function addMessageToDb(newMessage) {
  messages.push(newMessage);
  console.log('message db: ', messages);
}

SocketServer.prototype.broadcast = (msg) => {

  clients.map((c) => {
    c.send(JSON.stringify(msg));
  });
}


wss.on('connection', (client) => {

  clients.push(client);
  clientsLength = wss.clients.size;
  wss.broadcast({numberOfUsers: clientsLength});


  wss.broadcast({ initialLoad: messages });


  client.on('message', (msgData) => {
    const msg = JSON.parse(msgData);
    if (msg.nameNotify) {
      let notification = msg.nameNotify;
      wss.broadcast({ nameNotify: notification});
    } else if (msg.initialLoad) {
      let load = msg.initialLoad;
      wss.broadcast({ initialLoad: load })
    } else {
      const { username, content } = msg;
      const renderMessage = {
        username: username,
        content: content,
        messageId: uuid()
      };
      addMessageToDb(renderMessage);
      wss.broadcast({ newMessage: renderMessage });
    }

  }); 



  client.on('close', () => {
    clientsLength = wss.clients.size;
    wss.broadcast({ numberOfUsers: clientsLength });
    console.log('Client disconnected');
  });

});




