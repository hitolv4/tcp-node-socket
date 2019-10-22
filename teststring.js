let data = require('./data.json')
const countString = (string) => string.length
const stringSplit = (string => {
  return string.split(" ")
});
let arr = data.servicios.BLTRPR.retorno
let arrU = data.cliente.u26596812
let stringR = 'BLTRPR0100transaccion exitosa                               114318047000000000100000000000000000000000000000000000000000000000000000000147164600'
let string = 'BLTRPR0149Cuenta Origen No Pertenece Al Cliente                                                                                  000000000000000' //BLTRPR010265968120175039442007337422601750394460024048022V0008749897QUINTERO CARRILLO, JOSE                 000000000100000                                                                                                              --
let test = 'BLTRPR0114numero de cuenta destino no existe                                                                                     000000000000000'
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
console.log(`string solo ${countString('000000000000000')}`)

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

console.log(`blacos:ini--${complete('',110,' ','izq')}--fin`)
//console.log(string.split('CONIBS')[1][0])
//console.log(analizar(string, 'servicio', 0, 3))
//console.log(` cuenta:${string.slice(3, 15)}`)
//console.log(` cuentaFull:${string.slice(15,35)}`)
//console.log(`estatus:${string.slice(35,36)}`)
//
//

//console.log(stringSplit('CONIBSV008749897000000000CL        '))