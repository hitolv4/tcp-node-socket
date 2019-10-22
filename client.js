const net = require('net');
const color = require('colors');

let socket = require('./socketdev.json')


const sendFull = (async (traza) => {
  let format
  try {
    if (String(traza.servicio).toUpperCase() === 'CONIBS' || String(traza.servicio).toUpperCase() === 'TRBLCPRO') {
      format = await serviceCall(traza)
    } else if (String(traza.servicio).toUpperCase() === 'BLTRPR') {
      format = await trasferencia(traza)
    }
    if (!format) {
      console.log('no hay nada que enviar')
    } else {
      let conex = await openConnetion(Number(socket.servicio[String(traza.servicio).toUpperCase()].port), socket.servicio[String(traza.servicio).toUpperCase()].ip)
      let send = await sendData(`  ${format}        `) // la trama debe tener 2 espacios en blanco para dar la respuesta que corresponde
    }
  } catch (err) {
    console.log(err)
  }
})

const trasferencia = ((traza) => {
  let servicio = String(traza.servicio).toUpperCase()
  let nacionalidad = String(traza.nacionalidad).toUpperCase()
  let numeroCliente = complete(traza.numeroCliente, 9, 0, 'izq')
  let ci = complete(traza.ci, 10, 0, 'izq')
  let tipoTransaccion = traza.tipoTransaccion
  let cuentaOrigen = traza.cuentaOrigen
  let cuentaDestino = traza.cuentaDestino
  let nombreclienteDestino = complete(String(traza.nombrecliente).toUpperCase(), 40, ' ', 'der')
  let montoTrasferencia = complete(traza.montoTrasferencia, 15, 0, 'izq')
  let resto = complete(traza.resto, 110, ' ', 'der')

  //console.log(`ini--${servicio}${tipoTransaccion}${numeroCliente}${cuentaOrigen}${cuentaDestino}${nacionalidad}${ci}${nombreclienteDestino}${montoTrasferencia}${resto}--fin`)
  return `${servicio}${tipoTransaccion}${numeroCliente}${cuentaOrigen}${cuentaDestino}${nacionalidad}${ci}${nombreclienteDestino}${montoTrasferencia}${resto}`


})

const serviceCall = ((traza) => {
  let servicioU = String(traza.servicio).toUpperCase()
  let nacionalidadU = String(traza.nacionalidad).toUpperCase()
  let ciC = complete(traza.ci, 9, 0, 'izq')
  let consultaU = String(traza.consulta).toUpperCase()
  let numeroClienteC = complete(traza.numeroCliente, 9, 0, 'izq')
  //openConnetion(PORT, HOST)

  switch (servicioU) {
    case 'CONIBS':
      return consultaS(servicioU, nacionalidadU, ciC, numeroClienteC, consultaU)
    case 'TRBLCPRO':
      return `${nacionalidadU}${ciC}`;
    default:
      break
  }
})

let consultaS = (servicio, nacionalidad, ci, numeroCliente, consulta) => {
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



let complete = ((str, pos, char, side) => {
  if (String(str).length < Number(pos)) {
    let comp = Number(pos) - String(str).length
    if (side === 'izq') {
      return String(char).repeat(comp) + str
    } else if (side === 'der') {
      return str + String(char).repeat(comp)
    } else if (side === 'monto') {
      return String(char).repeat(comp - 1) + str + ' '
    }
  } else {
    return str
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
let traza = {
  servicio: 'bltrpr',
  nacionalidad: 'v',
  ci: '8749897',
  consulta: 'ct',
  numeroCliente: '26596812',
  tipoTransaccion: '01',
  cuentaOrigen: '01750394420073374226',
  cuentaDestino: '01750394460024048021',
  nombrecliente: 'QUINTERO CARRILLO, JOSE',
  montoTrasferencia: '100000',
  resto: ''

}
// let servicio = 'conibs' //readlineSync.question(`coloque el servicio`.green)
// let nacionalidad = 'v' //readlineSync.question(`coloque nacionalidad`.green)
// let ci = '8749897' //readlineSync.question(`coloque la cedula de identidad`.green)
// let consulta = 'ct' //readlineSync.question(`coloque tipo de consulta`.green)
// let numeroCliente = '000000000'
sendFull(traza)


//sendData('  CONIBSV013112617000000000AL        ') // la trama debe tener 2 espacios en blanco para dar la respuesta que corresponde