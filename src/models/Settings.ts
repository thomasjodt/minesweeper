export class Settings {
  public columns: number
  public rows: number
  public mines: number

  constructor(rows: number, columns: number, mines: number) {
    this.columns = columns
    this.rows = rows
    this.mines = mines
  }
}
