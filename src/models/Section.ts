import { nanoid } from 'nanoid';
import { Row } from './Row';

export class Section {
  id:string
  rows: Array<Row>;
  sectionHeader: string;
  constructor() {
    this.rows = new Array<Row>();
    this.sectionHeader = "-- SectionHeader --";
    this.id = nanoid();
  }
}
