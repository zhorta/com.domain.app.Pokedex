export function generateRandomColor() {
  return '0xff' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
}

export function arrayToMatrix(array, columns) {
  const matrix = []
  for (let i = 0; i < array.length; i += columns) {
    matrix.push(array.slice(i, i + columns))
  }
  return matrix
}
