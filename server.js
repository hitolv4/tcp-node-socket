const net = require('net');
const port = 9000;

let server = net.createServer((socket) => {
  socket.write('saludo desde server');

})