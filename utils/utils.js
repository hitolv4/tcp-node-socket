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

const cutStr = ((str, pos1, pos2, point) => {
  return String(str).slice(pos1, pos2).split(point)
})

module.exports = {
  complete,
  cutStr
}