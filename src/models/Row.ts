import { Column } from './Column';

export class Row {
  cols: Array<Column>;

  constructor() {
    this.cols = new Array<Column>();
  }
}
