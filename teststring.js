let data = require('./data.json')
const countString = (string) => string.length
const stringSplit = (string => {
  return string.split(" ")
});
let arr = data.servicios.conibs.parametros
let arrU = data.cliente.u15613504
console.log(arrU)
acu = 0
Object.keys(arr).forEach(el => acu += parseInt(arr[el]))
console.log(acu)

let string = '�CONIBSV013112617000000000CL       '
let cut
console.log(string.split('CONIBS')[1][0])
console.log(string.slice(7, 9))
console.log(countString(string))
//console.log(stringSplit('CONIBSV008749897000000000CL        '))