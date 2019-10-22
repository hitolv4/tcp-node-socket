let clientes = require("./data.json");
let errores = require("./error.json");
let {
  cutStr,
  complete
} = require("./utils/utils");

const conibs = data => {
  let nac = cutStr(data, 0, 35, "CONIBS")[1][0];
  let ci = Number(cutStr(data, 0, 35, nac)[1].slice(0, 9));
  let consulta = String(cutStr(data, 0, 35, "000000000"))
    .split("  ")[1]
    .slice(-2);
  let str = "u" + String(ci);
  let arrU = clientes.cliente[str]; //clientes.cliente.
  let standar = String(data).slice(2);

  switch (consulta) {
    case "CL":
      let consultaCL = complete(
        consulta,
        clientes.servicios.CONIBS.retorno.CL.consulta,
        " ",
        "izq"
      );
      let numeroClienteCL = complete(
        arrU.numeroDeCliente,
        clientes.servicios.CONIBS.retorno.CL.numeroCliente,
        " ",
        "izq"
      );
      let nombreCL = complete(
        arrU.nombre,
        clientes.servicios.CONIBS.retorno.CL.nombre,
        " ",
        "der"
      );
      let emailCL = complete(
        arrU.email,
        clientes.servicios.CONIBS.retorno.CL.email,
        " ",
        "der"
      );
      let telefonoCelularCL = complete(
        arrU.telefonoCel,
        clientes.servicios.CONIBS.retorno.CL.telefonoCelular,
        " ",
        "izq"
      );
      let clienteSisaCL = arrU.sisa;
      let clientePrestacionesCL = arrU.prestaciones;
      let codigoServicioNominaCL = complete(
        arrU.codNomina,
        clientes.servicios.CONIBS.retorno.CL.codigoServicioNomina,
        " ",
        "der"
      );
      let codigoProveedoresCL = complete(
        arrU.codProveedor,
        clientes.servicios.CONIBS.retorno.CL.codigoServicioProveedores,
        " ",
        "der"
      );
      let diaHabilCL = arrU.diaHabilConsulta;
      let proximoDiaHabilCL = arrU.proximoDiaHabil;
      let fechaNacimientoCL = arrU.fechaNacimiento;

      return `@${standar}${consultaCL}${numeroClienteCL}${nombreCL}${emailCL}${telefonoCelularCL}${clienteSisaCL}${clientePrestacionesCL}${codigoServicioNominaCL}${codigoProveedoresCL}${diaHabilCL}${proximoDiaHabilCL}${fechaNacimientoCL} FF`; // @${standar}${consultaCL}${numeroClienteCL}${nombreCL}${emailCL}${telefonoCelularCL}${telefonoCelularCL}${clienteSisaCL}${clientePrestacionesCL}${codigoServicioNominaCL}${codigoProveedoresCL}${diaHabilCL}${proximoDiaHabilCL}${fechaNacimientoCL} FF

    case "CT":
      let cuentas = arrU.cuentas;
      let strCuentas = "";
      let consultaCT = complete(
        consulta,
        clientes.servicios.CONIBS.retorno.CT.consulta,
        " ",
        "izq"
      );
      let cuentaCT = "";
      let cuentaFullCT = "";
      let estatusCT = "";
      let aplicacionCT = "";
      let tipoCuentaCT = "";
      let subProductoCT = "";
      let monedaCT = "";
      let oficinaCT = "";
      let descripcionCT = "";
      let saldoTotalCT = "";
      let diferidoCT = "";
      let retenidoCT = "";
      let disponibleCT = "";
      let firmasConjuntasCT = "";
      Object.keys(cuentas).forEach(el => {
        console.log(cuentas[el]);
        cuentaCT = complete(
          cuentas[el].cuenta,
          clientes.servicios.CONIBS.retorno.CT.cuenta,
          " ",
          "izq"
        );
        cuentaFullCT = cuentas[el].cuentaFull;
        estatusCT = cuentas[el].status;
        aplicacionCT = cuentas[el].aplicacion;
        tipoCuentaCT = cuentas[el].tipoCuenta;
        subProductoCT = cuentas[el].subProducto;
        monedaCT = cuentas[el].moneda;
        oficinaCT = complete(
          cuentas[el].oficina,
          clientes.servicios.CONIBS.retorno.CT.oficina,
          " ",
          "izq"
        );
        descripcionCT = complete(
          cuentas[el].descripcionProducto,
          clientes.servicios.CONIBS.retorno.CT.descripcionProducto,
          " ",
          "der"
        );
        saldoTotalCT = complete(
          cuentas[el].saldoTotal,
          clientes.servicios.CONIBS.retorno.CT.saldoTotal,
          " ",
          "monto"
        );
        diferidoCT = complete(
          cuentas[el].diferido,
          clientes.servicios.CONIBS.retorno.CT.diferido,
          " ",
          "monto"
        );
        retenidoCT = complete(
          cuentas[el].retenido,
          clientes.servicios.CONIBS.retorno.CT.retenido,
          " ",
          "monto"
        );
        disponibleCT = complete(
          cuentas[el].disponible,
          clientes.servicios.CONIBS.retorno.CT.disponible,
          " ",
          "monto"
        );
        firmasConjuntasCT = cuentas[el].firmasConjuntas;

        strCuentas =
          strCuentas +
          ` CT${cuentaCT}${cuentaFullCT}${estatusCT}${aplicacionCT}${tipoCuentaCT}${subProductoCT}${monedaCT}${oficinaCT}${descripcionCT}${saldoTotalCT}${diferidoCT}${retenidoCT}${disponibleCT}${firmasConjuntasCT}`;
      });

      return `@${standar}${strCuentas} FF`;

    case "TC":
      let tarjetas = arrU.tarjetasCredito;
      let strTarjetas = "";
      let consultaTC = complete(
        consulta,
        clientes.servicios.CONIBS.retorno.TC.consulta,
        " ",
        "izq"
      );
      let cuentaTC = "";
      let numeroTarjetaTC = "";
      let plazoTC = "";
      let limiteCreditoTC = "";
      let disponibleTC = "";
      let saldoDeudorTC = "";
      let pagoMinimoTC = "";
      let pagarAntesTC = "";
      let saldoUltimaFacturacionTC = "";
      let fechaCorteTC = "";
      let marcaProductoTC = "";

      Object.keys(tarjetas).forEach(el => {
        cuentaTC = tarjetas[el].numeroCuenta;
        numeroTarjetaTC = tarjetas[el].numeroTarjeta;
        plazoTC = tarjetas[el].plazo;
        limiteCreditoTC = complete(
          tarjetas[el].limiteCredito,
          clientes.servicios.CONIBS.retorno.TC.limiteCredito,
          " ",
          "monto"
        );
        disponibleTC = complete(
          tarjetas[el].disponible,
          clientes.servicios.CONIBS.retorno.TC.disponible,
          " ",
          "monto"
        );
        saldoDeudorTC = complete(
          tarjetas[el].saldoDeudor,
          clientes.servicios.CONIBS.retorno.TC.saldoDeudor,
          " ",
          "monto"
        );
        pagoMinimoTC = complete(
          tarjetas[el].pagoMinimo,
          clientes.servicios.CONIBS.retorno.TC.pagoMinimo,
          " ",
          "monto"
        );
        pagarAntesTC = tarjetas[el].pagarAntes;
        saldoUltimaFacturacionTC = complete(
          tarjetas[el].saldoUltimaFacturacion,
          clientes.servicios.CONIBS.retorno.TC.SaldoUltimaFacturacion,
          " ",
          "monto"
        );
        fechaCorteTC = tarjetas[el].fechaCorte;
        marcaProductoTC = complete(
          tarjetas[el].marcaProducto,
          clientes.servicios.CONIBS.retorno.TC.marcaProducto,
          " ",
          "der"
        );
        strTarjetas =
          strTarjetas +
          ` TC${cuentaTC}${numeroTarjetaTC}${plazoTC}${limiteCreditoTC}${disponibleTC}${saldoDeudorTC}${pagoMinimoTC}${pagarAntesTC}${saldoUltimaFacturacionTC}${fechaCorteTC}${marcaProductoTC}`;
        console.log(`i-${strTarjetas}-f`);
      });
      return `#${standar}${strTarjetas} FF`;
    default:
      return "consulta invalida";
  }
};

const trblcpro = data => {
  let nac = cutStr(data, 0, 35, " ")[2][0];
  let ciC = cutStr(data, 0, 35, nac)[1].slice(0, 9);
  let ci = Number(cutStr(data, 0, 35, nac)[1].slice(0, 9));
  let str = "u" + String(ci);
  let arrU = clientes.cliente[str];
  let preguntas = arrU.preguntaSecreta;
  let arrPreguntas = [];
  let id = "";
  let pregunta = "";
  let respuesta = "";
  Object.keys(preguntas).forEach(el => {
    id = preguntas[el].id;
    pregunta = complete(
      preguntas[el].pregunta,
      clientes.servicios.TRBLCPRO.retorno.pregunta,
      " ",
      "der"
    );
    respuesta = preguntas[el].respuesta;
    strPreguntas = arrPreguntas.push(`${id}${pregunta}${respuesta}`);
  });
  let random =
    arrPreguntas[Math.floor(Math.random() * arrPreguntas.length)] +
    arrPreguntas[Math.floor(Math.random() * arrPreguntas.length)] +
    arrPreguntas[Math.floor(Math.random() * arrPreguntas.length)] +
    arrPreguntas[Math.floor(Math.random() * arrPreguntas.length)];
  return `P${nac}${ciC}${random}`;
};

const bltrpr = (data) => {
  let servicio = String(data).slice(2, 8);
  let tipoTrasaccion = String(data).slice(8, 10);
  let numeroCliente = Number(String(data).slice(10, 19)).toString();
  let numeroCuentaOrigen = String(data).slice(19, 39);
  let numeroCuentaDestino = String(data.slice(39, 59));
  let Nacionalidad = String(data.slice(59, 60));
  let ci = Number(String(data.slice(60, 70))).toString();
  let nombre = String(data.slice(70, 110)).split("     ")[0];
  let montoTrasferencia = formatoMonto(
    Number(String(data.slice(110, 125))).toString()
  );
  //salida
  let codiError = "";
  let descripcionError = "";
  let codigoReferencia = "";
  let montoComisionInterbancaria = "";
  let montoiGTF = "";
  let montoIgtfComisionInterbancaria = "";
  let disponible = "";
  let str = "u" + String(ci);
  let arrU = clientes.cliente[str];
  let buscar = buscarcuentas(ci, numeroCuentaOrigen, numeroCuentaDestino);
  if (typeof (buscar) === 'object') {
    trasferencia = transferirFondos(buscar.montoOrigen, buscar.montoDestino, montoTrasferencia)
    if (typeof (trasferencia) === 'object') {
      disponible = complete(trasferencia.resultOrigen.replace('.', ''), clientes.servicios.BLTRPR.retorno.montoComisionInterbancaria, '0', 'izq')
      codiError = '00'
      descripcionError = complete(errores.errores.trasferencias[codiError], clientes.servicios.BLTRPR.retorno.descripcionError, ' ', 'der')
      codigoReferencia = '114318047'
      montoTrasferencia = data.slice(110, 125)
      montoComisionInterbancaria = complete('0', clientes.servicios.BLTRPR.retorno.montoComisionInterbancaria, '0', 'der')
      montoiGTF = complete('0', clientes.servicios.BLTRPR.retorno.montoIGTF, '0', 'der')
      montoIgtfComisionInterbancaria = complete('0', clientes.servicios.BLTRPR.retorno.montoIGTFComisionInterbancaria, '0', 'der')
      return `${servicio}${tipoTrasaccion}${codiError}${descripcionError}${codigoReferencia}${montoTrasferencia}${montoComisionInterbancaria}${montoiGTF}${montoIgtfComisionInterbancaria}${disponible}`
    } else {
      return trasferencia
    }
  } else {
    disponible = complete('0', clientes.servicios.BLTRPR.retorno.montoComisionInterbancaria, '0', 'izq')
    codiError = buscar
    descripcionError = complete(errores.errores.trasferencias[codiError], clientes.servicios.BLTRPR.retorno.descripcionError, ' ', 'der')
    codigoReferencia = complete('', clientes.servicios.BLTRPR.retorno.codReferencia, ' ', 'der')
    montoTrasferencia = complete('', clientes.servicios.BLTRPR.retorno.montoTrasferencia, ' ', 'der')
    montoComisionInterbancaria = complete('', clientes.servicios.BLTRPR.retorno.montoComisionInterbancaria, ' ', 'der')
    montoiGTF = complete('', clientes.servicios.BLTRPR.retorno.montoIGTF, ' ', 'der')
    montoIgtfComisionInterbancaria = complete('', clientes.servicios.BLTRPR.retorno.montoIGTFComisionInterbancaria, ' ', 'der')
    return `${servicio}${tipoTrasaccion}${codiError}${descripcionError}${codigoReferencia}${montoTrasferencia}${montoComisionInterbancaria}${montoiGTF}${montoIgtfComisionInterbancaria}${disponible}`
  }


};

// funciones para transferencia

const formatoMonto = monto => {
  let enteros = monto.length - 2;
  let enteroFormat = monto.slice(0, enteros);
  let decimalFormat = monto.slice(-2);
  return `${enteroFormat},${decimalFormat}`;
};

const buscarcuentas = (ci, origen, destino) => {
  let str = "u" + String(ci);
  let arrU = clientes.cliente[str];
  let trans = {}
  if (arrU) {
    if (arrU.cuentas[`c${origen}`] !== undefined && arrU.cuentas[`c${destino}`] !== undefined) {
      trans = {
        montoOrigen: arrU.cuentas[`c${origen}`].disponible,
        montoDestino: arrU.cuentas[`c${destino}`].disponible
      }
      return trans
    } else if (!arrU.cuentas[`c${origen}`]) {
      console.log('cuenta de origen no existe')
      return '07'
    } else if (!arrU.cuentas[`c${destino}`]) {
      return '14'
    }

    //switch (arrU) {
    //  case arrU.cuentas[`c${origen}`] === undefined:
    //    return '07'
    //  case !arrU.cuentas[`c${destino}`]:
    //    return '14'
    //  default:
    //    let trans = {
    //      montoOrigen: arrU.cuentas[`c${origen}`].disponible,
    //      montoDestino: arrU.cuentas[`c${destino}`].disponible
    //    }
    //    return trans
    //}
  } else {
    let resultado = 'usuario no existe'
    return resultado;
  }

};

const transferirFondos = (origen, destino, monto) => {
  let operacion = {
    resultOrigen: '',
    resultDestino: ''
  }
  if (parseFloat(origen) > parseFloat(destino)) {
    operacion.resultOrigen = (parseFloat(origen) - parseFloat(monto)).toFixed(2)
    operacion.resultDestino = (parseFloat(destino) + parseFloat(monto)).toFixed(2)
    return operacion
  } else {
    return '48';
  }
};

const operacion =

  module.exports = {
    conibs,
    trblcpro,
    bltrpr
  };