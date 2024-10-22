import './style.css'
import { getMatrix, printTable, restartGame } from './game.ts'
import { Settings } from './models'

const $app = document.getElementById('app') as HTMLElement
const $restartButton = document.getElementById('restart-game') as HTMLButtonElement

const settings = new Settings(8, 8, 12)
const matrix = getMatrix(settings.rows, settings.columns, settings.columns)

$restartButton.onclick = () => {
  const matrix = getMatrix(settings.rows, settings.columns, settings.rows)
  restartGame(matrix, $app)
}
printTable(matrix, $app)
