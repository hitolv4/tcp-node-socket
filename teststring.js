let data = require('./data.json')
const countString = (string) => string.length
const stringSplit = (string => {
  return string.split(" ")
});
let arr = data.servicios.CONIBS.retorno.TC
let arrU = data.cliente.u26596812
let STRING = '#CONIBSV008749897000000000TC         TC4448066322005607444806632200560706        6000000,00         3241922,82         2758077,18               0,00 16082019        1261993,68 28072019Visa Platinum        TC5213056312011285521305631201128506        6000000,00         3241922,82         3018509,26           70993,88 09082019        1253107,43 22072019Master Platinum      FF'
let string = '�V01311261702POSEE TARJETA DE CREDITO VISA 1(SI) O 2(NO)  S05POSEE TARJETA SOCIALISTA 1(SI) O 2(NO)       N08POSEE CTA NI#OS(AS) DE LA PATRIA 1(SI)O 2(NO)N11POSEE CREDITO MANUFACTURERO 1(SI) O 2(NO)    N'
let test = 'PV00874989709POSEE CREDITO TURISMO 1(SI) O 2(NO)          N11POSEE CREDITO MANUFACTURERO 1(SI) O 2(NO)    N11POSEE CREDITO MANUFACTURERO 1(SI) O 2(NO)    N10POSEE  CREDITO COMERCIAL 1(SI) O 2(NO)       N'
let acu = 0

let analizar = ((string, llave, ini, pos) => {
  return `${llave}:inicio--${string.slice(ini,pos)}--fin`
})
Object.keys(arr).forEach(el => {
  //console.log(`${el}:${arr[el]}`)
  console.log(`${arr[el]} : ${analizar(string, el, acu, acu + Number(arr[el]))}`)
  return acu += parseInt(arr[el])
})
console.log(`total de caracteres del servicio ${string.slice(1,3)}:  ${acu}`)
console.log(`Test string:  ${countString(test)}`)
console.log(`string as400: ${countString(string)}`)




//console.log(string.split('CONIBS')[1][0])
//console.log(analizar(string, 'servicio', 0, 3))
//console.log(` cuenta:${string.slice(3, 15)}`)
//console.log(` cuentaFull:${string.slice(15,35)}`)
//console.log(`estatus:${string.slice(35,36)}`)
//
//

//console.log(stringSplit('CONIBSV008749897000000000CL        '))