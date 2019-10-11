const net = require('net');
const colors = require('colors')
const serv = require('./servicios')
const {
  spacios,
  comibs
} = require('./param')
const port = 8000;

let server = net.createServer();

server.on('connection', (socket) => {
  let remoteaddress = `${socket.remoteAddress}:${socket.remotePort}`
  console.log(`new client is made ${remoteaddress}`.blue)

  socket.on('data', (data) => {
    console.log(`data from ${remoteaddress}  ${data}`.green)
    socket.write(serv.trblcpro(data))
    // let servicio = data.toString().slice(2, 8)
    // switch (servicio) {
    // case 'CONIBS':
    // if (data.length === spacios + comibs) {
    // console.log('String cumple con parametros')
    // socket.write(serv.conibs(data))
    // } else {
    // socket.write(`string no cumple con parametros el string mide ${data.length}`)
    // console.log(`string no cumple con parametros el string mide ${data.length}`)
    // }
    // break
    // default:
    // console.log('servicio invalido')
    // socket.write(`Servicio invalido`)
    // 
    // break
    // }

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