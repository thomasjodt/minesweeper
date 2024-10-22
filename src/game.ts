/* eslint-disable @typescript-eslint/prefer-destructuring,@typescript-eslint/no-unnecessary-condition */
import { MineCell } from './models'
let isMineRevealed = false

const reveal = (matrix: MineCell[][], row: number, col: number, app: HTMLElement) => {
  const cell = matrix[row]?.[col]
  return () => {
    if (cell.hasFlag || cell.isShowed) return
    cell.isShowed = true

    if (cell.value === 0 && !cell.hasMine) {
      revealNear(matrix, row, col)
    }

    if (cell.hasMine) {
      revealAllMines(matrix)
    }
    printTable(matrix, app)
  }
}

const placeFlag = (matrix: MineCell[][], row: number, col: number, app: HTMLElement) => {
  return (event: Event) => {
    event.preventDefault()
    if (matrix[row][col].isShowed) return
    const cell = matrix[row][col]
    cell.hasFlag = !cell.hasFlag
    printTable(matrix, app)
  }
}

const revealNear = (matrix: (MineCell)[][], row: number, col: number): void => {
  const cell = matrix[row][col]
  cell.isShowed = true
  if (matrix[row - 1]?.[col - 1]?.value === 0 && !(matrix[row - 1]?.[col - 1]?.isShowed)) revealNear(matrix, row - 1, col - 1)
  if (matrix[row - 1]?.[col]?.value === 0 && !(matrix[row - 1]?.[col]?.isShowed)) revealNear(matrix, row - 1, col)
  if (matrix[row - 1]?.[col + 1]?.value === 0 && !(matrix[row - 1]?.[col + 1]?.isShowed)) revealNear(matrix, row - 1, col + 1)
  if (matrix[row]?.[col - 1]?.value === 0 && !(matrix[row]?.[col - 1]?.isShowed)) revealNear(matrix, row, col - 1)
  if (matrix[row]?.[col + 1]?.value === 0 && !(matrix[row]?.[col + 1]?.isShowed)) revealNear(matrix, row, col + 1)
  if (matrix[row + 1]?.[col - 1]?.value === 0 && !(matrix[row + 1]?.[col - 1]?.isShowed)) revealNear(matrix, row + 1, col - 1)
  if (matrix[row + 1]?.[col]?.value === 0 && !(matrix[row + 1]?.[col]?.isShowed)) revealNear(matrix, row + 1, col)
  if (matrix[row + 1]?.[col + 1]?.value === 0 && !(matrix[row + 1]?.[col + 1]?.isShowed)) revealNear(matrix, row + 1, col + 1)

  if (matrix[row - 1]?.[col - 1] !== undefined) matrix[row - 1][col - 1].isShowed = true
  if (matrix[row - 1]?.[col] !== undefined) matrix[row - 1][col].isShowed = true
  if (matrix[row - 1]?.[col + 1] !== undefined) matrix[row - 1][col + 1].isShowed = true
  if (matrix[row]?.[col - 1] !== undefined) matrix[row][col - 1].isShowed = true
  if (matrix[row]?.[col + 1] !== undefined) matrix[row][col + 1].isShowed = true
  if (matrix[row + 1]?.[col - 1] !== undefined) matrix[row + 1][col - 1].isShowed = true
  if (matrix[row + 1]?.[col] !== undefined) matrix[row + 1][col].isShowed = true
  if (matrix[row + 1]?.[col + 1] !== undefined) matrix[row + 1][col + 1].isShowed = true
}

const revealAllMines = (matrix: MineCell[][]): void => {
  isMineRevealed = true
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col].hasMine) {
        matrix[row][col].isShowed = true
      }
    }
  }
}

const getRandomPosition = (row: number, col: number): number[] => {
  const colPos = Math.floor(Math.random() * col)
  const rowPos = Math.floor(Math.random() * row)
  return [rowPos, colPos]
}

export const getMatrix = (rows: number, cols: number, mines: number): MineCell[][] => {
  let placedMines = 0

  // Generar la matriz
  const table = new Array<MineCell[]>(rows).fill([])
  const filledTable = table.map(
    () => new Array<MineCell | null>(cols)
      .fill(null)
      .map(() => new MineCell())
  )

  // Agregar las minas
  while (placedMines < mines) {
    const [row, col] = getRandomPosition(rows, cols)

    if (!filledTable[row][col].hasMine) {
      filledTable[row][col].hasMine = true
      placedMines++
    }
  }
  // Agregar los valores de minas alrededor
  let value = 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (filledTable[row - 1]?.[col - 1]?.hasMine) value++
      if (filledTable[row - 1]?.[col]?.hasMine) value++
      if (filledTable[row - 1]?.[col + 1]?.hasMine) value++

      if (filledTable[row]?.[col - 1]?.hasMine) value++
      if (filledTable[row]?.[col + 1]?.hasMine) value++

      if (filledTable[row + 1]?.[col - 1]?.hasMine) value++
      if (filledTable[row + 1]?.[col]?.hasMine) value++
      if (filledTable[row + 1]?.[col + 1]?.hasMine) value++

      filledTable[row][col].value = value
      value = 0
    }
  }

  // Devolver la matriz completa
  return filledTable
}

export const printTable = (matrix: MineCell[][], app: HTMLElement): void => {
  app.innerHTML = ''
  const $table = document.createElement('div')
  $table.classList.add('board')

  // Crear las filas
  for (let i = 0; i < matrix.length; i++) {
    const $row = document.createElement('div')
    $row.classList.add('row')
    const row = matrix[i]

    for (let j = 0; j < row.length; j++) {
      const $cell = document.createElement('button')
      const cell = row[j]

      // Mostrar valor al hacer clic
      $cell.onclick = reveal(matrix, i, j, app)
      $cell.oncontextmenu = placeFlag(matrix, i, j, app)

      if (cell.hasFlag) {
        $cell.classList.add('flagged')
        $cell.innerText = '🚩'
      }
      if (cell.isShowed) {
        $cell.disabled = true
        $cell.innerText = (cell.hasMine) ? '💣' : (cell.value > 0) ? cell.value.toString() : ''
        if (cell.hasMine) $cell.classList.add('mine')
      }

      // Deshabilitar los botones si se han descubierto las minas
      if (isMineRevealed) {
        $cell.onclick = null
        $cell.oncontextmenu = (event: Event) => {
          event.preventDefault()
        }
      }
      $row.append($cell)
    }
    $table.append($row)
  }
  app.append($table)
}

export const restartGame = (matrix: MineCell[][], app: HTMLElement): void => {
  isMineRevealed = false
  printTable(matrix, app)
}
