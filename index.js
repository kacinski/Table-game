const express = require('express');
const path = require('path');
const { createServer } = require('http');
const uuid = require('uuid/v4');
const WebSocket = require('ws');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const server = createServer(app);
const wss = new WebSocket.Server({ server });

const clients = {

}


function sendToAll(data) {
  Object.keys(clients).forEach(id => {
    clients[id].send(JSON.stringify(data))
  })
}

const table = [];

wss.on('connection', function (ws) {
  ws.id = uuid();

  clients[ws.id] = ws;



  ws.send(JSON.stringify(table));

  ws.on('message', function incoming(data) {

    table.push(+data);
    sendToAll([+data]);
  });


  ws.on('close', function () {
    console.log('stopping client interval');
    delete clients[ws.id]

  });
});

server.listen(8080, function () {
  console.log('Listening on http://localhost:8080');
});
