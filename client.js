const net = require("net");
const color = require("colors");

console.log("cliente");

const HOST = "127.0.0.1"; //  10.112.2.11
const PORT = 9000; //   8047

let client = null;

const openConnetion = () => {
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
  });

  client.connect(PORT, HOST, () => {
    console.log("Connection Opened Successfully".green);
  });
};

const sendData = data => {
  if (!client) {
    console.log("Connection is not open or closed".red);
    return;
  }
  client.write(data);
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

const sendFull = (async (servicio, nacionalidad, ci, consulta) => {
  //await sendData('  CONIBSV013112617000000000CL        ') // la trama debe tener 2 espacios en blanco para dar la respuesta que corresponde
  let format = await serviceCall(servicio, nacionalidad, ci, numeroCliente = '000000000', consulta)
  console.log(`  ${format}        `)
  await sendData(`  ${format}        `) // la trama debe tener 2 espacios en blanco para dar la respuesta que corresponde
})

const serviceCall = ((servicio, nacionalidad, ci, numeroCliente = '000000000', consulta) => {
  let servicioU = String(servicio).toUpperCase()
  let nacionalidadU = String(nacionalidad).toUpperCase()
  let ciC = complete(ci, 9, 0)
  let consultaU = String(consulta).toUpperCase()
  let numeroClienteC
  if (numeroCliente !== '000000000') {
    numeroClienteC = complete(numeroCliente, 9, ' ')
  } else {
    numeroClienteC = numeroCliente
  }
  return `${servicioU}${nacionalidadU}${ciC}${numeroClienteC}${consultaU}`
})

let complete = ((str, pos, char) => {

  if (str.length < Number(pos)) {
    let comp = Number(pos) - String(str).length
    return String(char).repeat(comp) + str
  }
})

openConnetion();
let servicio = 'conibs' //readlineSync.question(`coloque el servicio`.green)
let nacionalidad = 'v' //readlineSync.question(`coloque nacionalidad`.green)
let ci = '15613504' //readlineSync.question(`coloque la cedula de identidad`.green)
let consulta = 'al' //readlineSync.question(`coloque tipo de consulta`.green)
sendFull(servicio, nacionalidad, ci, consulta)


//sendData('  CONIBSV013112617000000000AL        ') // la trama debe tener 2 espacios en blanco para dar la respuesta que corresponde