const net = require('net');
const readlineSync = require('readline-sync');
const color = require('colors');

console.log('cliente')

const HOST = '127.0.0.1';
const PORT = 9000;

let client = null;

const openConnetion = () => {
  if (client) {
    console.log('connection is already open'.red)
    setTimeout(() => {
      menu()
    }, 0);
    return
  }
  client = new net.Socket();

  client.on('error', (err) => {
    client.destroy();
    console.error(`ERROR: can't open connection ${err.message}`.red);
    client = null
    setTimeout(() => {
      menu()
    }, 0);
  })

  client.on("data", (data) => {
    console.log(`Received ${data}`.cyan)
    setTimeout(() => {
      menu()
    }, 0);
  })

  client.connect(PORT, HOST, () => {
    console.log('Connection Opened Successfully'.green)
    setTimeout(() => {
      menu()
    }, 0);
  })
}

const sendData = (data) => {
  if (!client) {
    console.log('Connection is not open or closed'.red)
    setTimeout(() => {
      menu()
    }, 0)
    return
  }
  client.write(data)
}

const closeConnection = () => {
  if (!client) {
    console.log('Connection is not open or closed'.red)
    setTimeout(() => {
      menu()
    }, 0)
    return
  }
  client.destroy();
  client = null
  console.log('connection closed'.yellow)
  setTimeout(() => {
    menu()
  }, 0)
}

const menu = () => {
  let lineRead = readlineSync.question(`\n\n Enter option (1- Open, 2-Send, 3-Close, 4-Quit):`.black);
  switch (lineRead) {
    case '1':
      console.log('Option 1 selected');
      openConnetion()

      break;
    case '2':
      console.log('Option 2 selected')
      let data = readlineSync.question(`\n\n Enter msj:`.green);
      sendData(data)
      break;
    case '3':
      console.log('Option 3 selected')
      closeConnection()

      break;
    case '4':
      console.log('Option 4 selected')

      break;
    default:
      setTimeout(() => {
        menu()
      }, 0)
      break;
  }
}
setTimeout(() => {
  menu()
}, 0)