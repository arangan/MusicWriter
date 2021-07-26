import { nanoid } from 'nanoid';
import { Column } from './Column';

export class Row {
  id:string;
  cols: Array<Column>;

  constructor() {
    this.cols = new Array<Column>();
    this.id = nanoid();
  }
}
