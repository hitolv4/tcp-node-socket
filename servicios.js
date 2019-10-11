let clientes = require('./data.json')
let {
  cutStr,
  complete
} = require('./utils/utils')

const conibs = ((data) => {
  let nac = cutStr(data, 0, 35, 'CONIBS')[1][0]
  let ci = Number(cutStr(data, 0, 35, nac)[1].slice(0, 9))
  let consulta = String(cutStr(data, 0, 35, '000000000')).split('  ')[1].slice(-2)
  let str = 'u' + String(ci)
  let arrU = clientes.cliente[str] //clientes.cliente.
  let standar = String(data).slice(2)

  switch (consulta) {
    case 'CL':
      let consultaCL = complete(consulta, clientes.servicios.CONIBS.retorno.CL.consulta, ' ', 'izq')
      let numeroClienteCL = complete(arrU.numeroDeCliente, clientes.servicios.CONIBS.retorno.CL.numeroCliente, ' ', 'izq')
      let nombreCL = complete(arrU.nombre, clientes.servicios.CONIBS.retorno.CL.nombre, ' ', 'der')
      let emailCL = complete(arrU.email, clientes.servicios.CONIBS.retorno.CL.email, ' ', 'der')
      let telefonoCelularCL = complete(arrU.telefonoCel, clientes.servicios.CONIBS.retorno.CL.telefonoCelular, ' ', 'izq')
      let clienteSisaCL = arrU.sisa
      let clientePrestacionesCL = arrU.prestaciones
      let codigoServicioNominaCL = complete(arrU.codNomina, clientes.servicios.CONIBS.retorno.CL.codigoServicioNomina, ' ', 'der')
      let codigoProveedoresCL = complete(arrU.codProveedor, clientes.servicios.CONIBS.retorno.CL.codigoServicioProveedores, ' ', 'der')
      let diaHabilCL = arrU.diaHabilConsulta
      let proximoDiaHabilCL = arrU.proximoDiaHabil
      let fechaNacimientoCL = arrU.fechaNacimiento

      return `@${standar}${consultaCL}${numeroClienteCL}${nombreCL}${emailCL}${telefonoCelularCL}${clienteSisaCL}${clientePrestacionesCL}${codigoServicioNominaCL}${codigoProveedoresCL}${diaHabilCL}${proximoDiaHabilCL}${fechaNacimientoCL} FF` // @${standar}${consultaCL}${numeroClienteCL}${nombreCL}${emailCL}${telefonoCelularCL}${telefonoCelularCL}${clienteSisaCL}${clientePrestacionesCL}${codigoServicioNominaCL}${codigoProveedoresCL}${diaHabilCL}${proximoDiaHabilCL}${fechaNacimientoCL} FF

    case 'CT':
      let cuentas = arrU.cuentas
      let strCuentas = ''
      let consultaCT = complete(consulta, clientes.servicios.CONIBS.retorno.CT.consulta, ' ', 'izq')
      let cuentaCT = ''
      let cuentaFullCT = ''
      let estatusCT = ''
      let aplicacionCT = ''
      let tipoCuentaCT = ''
      let subProductoCT = ''
      let monedaCT = ''
      let oficinaCT = ''
      let descripcionCT = ''
      let saldoTotalCT = ''
      let diferidoCT = ''
      let retenidoCT = ''
      let disponibleCT = ''
      let firmasConjuntasCT = ''
      Object.keys(cuentas).forEach(el => {
        console.log(cuentas[el])
        cuentaCT = complete(cuentas[el].cuenta, clientes.servicios.CONIBS.retorno.CT.cuenta, ' ', 'izq')
        cuentaFullCT = cuentas[el].cuentaFull
        estatusCT = cuentas[el].status
        aplicacionCT = cuentas[el].aplicacion
        tipoCuentaCT = cuentas[el].tipoCuenta
        subProductoCT = cuentas[el].subProducto
        monedaCT = cuentas[el].moneda
        oficinaCT = complete(cuentas[el].oficina, clientes.servicios.CONIBS.retorno.CT.oficina, ' ', 'izq')
        descripcionCT = complete(cuentas[el].descripcionProducto, clientes.servicios.CONIBS.retorno.CT.descripcionProducto, ' ', 'der')
        saldoTotalCT = complete(cuentas[el].saldoTotal, clientes.servicios.CONIBS.retorno.CT.saldoTotal, ' ', 'monto')
        diferidoCT = complete(cuentas[el].diferido, clientes.servicios.CONIBS.retorno.CT.diferido, ' ', 'monto')
        retenidoCT = complete(cuentas[el].retenido, clientes.servicios.CONIBS.retorno.CT.retenido, ' ', 'monto')
        disponibleCT = complete(cuentas[el].disponible, clientes.servicios.CONIBS.retorno.CT.disponible, ' ', 'monto')
        firmasConjuntasCT = cuentas[el].firmasConjuntas


        strCuentas = strCuentas + ` CT${cuentaCT}${cuentaFullCT}${estatusCT}${aplicacionCT}${tipoCuentaCT}${subProductoCT}${monedaCT}${oficinaCT}${descripcionCT}${saldoTotalCT}${diferidoCT}${retenidoCT}${disponibleCT}${firmasConjuntasCT}`
      })

      return `@${standar}${strCuentas} FF`

    case 'TC':
      let tarjetas = arrU.tarjetasCredito
      let strTarjetas = ''
      let consultaTC = complete(consulta, clientes.servicios.CONIBS.retorno.TC.consulta, ' ', 'izq')
      let cuentaTC = ''
      let numeroTarjetaTC = ''
      let plazoTC = ''
      let limiteCreditoTC = ''
      let disponibleTC = ''
      let saldoDeudorTC = ''
      let pagoMinimoTC = ''
      let pagarAntesTC = ''
      let saldoUltimaFacturacionTC = ''
      let fechaCorteTC = ''
      let marcaProductoTC = ''

      Object.keys(tarjetas).forEach(el => {
        cuentaTC = tarjetas[el].numeroCuenta
        numeroTarjetaTC = tarjetas[el].numeroTarjeta
        plazoTC = tarjetas[el].plazo
        limiteCreditoTC = complete(tarjetas[el].limiteCredito, clientes.servicios.CONIBS.retorno.TC.limiteCredito, ' ', 'monto')
        disponibleTC = complete(tarjetas[el].disponible, clientes.servicios.CONIBS.retorno.TC.disponible, ' ', 'monto')
        saldoDeudorTC = complete(tarjetas[el].saldoDeudor, clientes.servicios.CONIBS.retorno.TC.saldoDeudor, ' ', 'monto')
        pagoMinimoTC = complete(tarjetas[el].pagoMinimo, clientes.servicios.CONIBS.retorno.TC.pagoMinimo, ' ', 'monto')
        pagarAntesTC = tarjetas[el].pagarAntes
        saldoUltimaFacturacionTC = complete(tarjetas[el].saldoUltimaFacturacion, clientes.servicios.CONIBS.retorno.TC.SaldoUltimaFacturacion, ' ', 'monto')
        fechaCorteTC = tarjetas[el].fechaCorte
        marcaProductoTC = complete(tarjetas[el].marcaProducto, clientes.servicios.CONIBS.retorno.TC.marcaProducto, ' ', 'der')
        strTarjetas = strTarjetas + ` TC${cuentaTC}${numeroTarjetaTC}${plazoTC}${limiteCreditoTC}${disponibleTC}${saldoDeudorTC}${pagoMinimoTC}${pagarAntesTC}${saldoUltimaFacturacionTC}${fechaCorteTC}${marcaProductoTC}`
        console.log(`i-${strTarjetas}-f`)
      })
      return `#${standar}${strTarjetas} FF`
    default:
      return 'consulta invalida'
  }
})

const trblcpro = ((data) => {
  let nac = cutStr(data, 0, 35, ' ')[2][0]
  let ciC = cutStr(data, 0, 35, nac)[1].slice(0, 9)
  let ci = Number(cutStr(data, 0, 35, nac)[1].slice(0, 9))
  let str = 'u' + String(ci)
  let arrU = clientes.cliente[str]
  let preguntas = arrU.preguntaSecreta
  let arrPreguntas = []
  let id = ''
  let pregunta = ''
  let respuesta = ''
  Object.keys(preguntas).forEach(el => {
    id = preguntas[el].id
    pregunta = complete(preguntas[el].pregunta, clientes.servicios.TRBLCPRO.retorno.pregunta, ' ', 'der')
    respuesta = preguntas[el].respuesta
    strPreguntas = arrPreguntas.push(`${id}${pregunta}${respuesta}`)
  })
  let random = arrPreguntas[Math.floor(Math.random() * arrPreguntas.length)] + arrPreguntas[Math.floor(Math.random() * arrPreguntas.length)] + arrPreguntas[Math.floor(Math.random() * arrPreguntas.length)] + arrPreguntas[Math.floor(Math.random() * arrPreguntas.length)]
  return `P${nac}${ciC}${random}`
})



module.exports = {
  conibs,
  trblcpro
}