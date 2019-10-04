let clientes = require('./data.json')

const conibs = ((data) => {
  let nac = cutStr(data, 0, 35, 'CONIBS')[1][0]
  let ci = cutStr(data, 0, 35, nac).slice(0, 9).toString()
  let consulta = cutStr(data, 0, 35, '000000000').split('   ')[0]
  let str = 'u' + String(ci)
  let arrU = clientes.cliente[str]
  //console.log(clientes.cliente.u15613504)
  console.log(arrU)
  console.log(str)
  return arrU.nacionalidad
})

const cutStr = ((str, pos1, pos2, point) => {
  return String(str).slice(pos1, pos2).split(point)
})

module.exports = {
  conibs
}