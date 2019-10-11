const net = require('net');
const color = require('colors');

let socket = require('./socketdev.json')


const sendFull = (async (servicio, nacionalidad, ci, consulta) => {
  let format = await serviceCall(servicio, nacionalidad, ci, numeroCliente = '000000000', consulta)
  if (!format) {
    console.log('no hay nada que enviar')
  } else {
    let conex = await openConnetion(Number(socket.servicio[String(servicio).toUpperCase()].port), socket.servicio[String(servicio).toUpperCase()].ip)
    let send = await sendData(`  ${format}        `) // la trama debe tener 2 espacios en blanco para dar la respuesta que corresponde
  }
})

const serviceCall = ((servicio, nacionalidad, ci, numeroCliente = '000000000', consulta) => {
  let servicioU = String(servicio).toUpperCase()
  let nacionalidadU = String(nacionalidad).toUpperCase()
  let ciC = complete(ci, 9, 0)
  let consultaU = String(consulta).toUpperCase()
  let numeroClienteC
  //openConnetion(PORT, HOST)
  if (numeroCliente !== '000000000') {
    numeroClienteC = complete(numeroCliente, 9, 0)
  } else {
    numeroClienteC = numeroCliente
  }

  switch (servicioU) {
    case 'CONIBS':
      return consultaS(servicioU, nacionalidadU, ciC, numeroClienteC, consultaU)
    case 'TRBLCPRO':
      return `${nacionalidadU}${ciC}`;
    default:
      break
  }
})

let consultaS = (servicio, nacionalidad, ci, numeroClite, consulta) => {
  switch (consulta) {
    case 'CL':
      return `${servicio}${nacionalidad}${ci}${numeroCliente}${consulta}`;
    case 'CT':
      return `${servicio}${nacionalidad}${ci}${numeroCliente}${consulta}`;
    case 'TC':
      return `${servicio}${nacionalidad}${ci}${numeroCliente}${consulta}`;
    default:
      return false
  }
}


let complete = ((str, pos, char) => {
  if (str.length < Number(pos)) {
    let comp = Number(pos) - String(str).length
    return String(char).repeat(comp) + str
  }
})

let client = null;
const openConnetion = (puerto, ip) => {
  if (client) {
    console.log("connection is already open".red);
    return;
  }
  client = new net.Socket();

  client.on("error", err => {
    client.destroy();
    console.error(`ERROR: can't open connection ${err.message}`.red);
    client = null;
  });

  client.on("data", data => {
    console.log(data.toString().red);
    closeConnection()
  });

  client.connect(puerto, ip, () => {
    console.log("Connection Opened Successfully".green);
  });
};

const sendData = data => {
  if (!client) {
    console.log("Connection is not open or closed".red);
    return;
  }
  client.write(data)
};

const closeConnection = () => {
  if (!client) {
    console.log("Connection is not open or closed".red);
    return;
  }
  client.destroy();
  client = null;
  console.log("connection closed".yellow);
};
////////////////////////////////////////////////////////////////////////////
//openConnetion()
let servicio = 'TRBLCPRO' //readlineSync.question(`coloque el servicio`.green)
let nacionalidad = 'v' //readlineSync.question(`coloque nacionalidad`.green)
let ci = '8749897' //readlineSync.question(`coloque la cedula de identidad`.green)
let consulta = 'tc' //readlineSync.question(`coloque tipo de consulta`.green)
sendFull(servicio, nacionalidad, ci, consulta)


//sendData('  CONIBSV013112617000000000AL        ') // la trama debe tener 2 espacios en blanco para dar la respuesta que corresponde