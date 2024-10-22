export class MineCell {
  id: string
  value: number
  hasMine: boolean
  hasFlag: boolean
  hasClue: boolean
  isShowed: boolean

  constructor() {
    this.id = crypto.randomUUID()
    this.value = 0
    this.hasMine = false
    this.hasClue = false
    this.hasFlag = false
    this.isShowed = false
  }
}
