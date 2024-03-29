const net = require('net');
const colors = require('colors')
const port = 9000;

let server = net.createServer();

server.on('connection', (socket) => {
  let remoteaddress = `${socket.remoteAddress}:${socket.remotePort}`
  console.log(`new client is made ${remoteaddress}`.blue)

  socket.on('data', (data) => {
    console.log(`data from ${remoteaddress}  ${data}`.green)
    socket.write(`Server says :hello ${remoteaddress} you send ${data}`)
  })

  socket.once('close', () => {
    console.log(`connection closed from ${remoteaddress}`.white)
  })
  socket.on('error', (err) => {
    console.error(`Connection ${remoteaddress} error ${err.message}`.red);

  })
});


server.listen(port, () => {
  console.log(`server listenig to ${server.address().port} port`.cyan)
});