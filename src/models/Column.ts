import { Note } from './Note';
export class Column {
  Note: Note;
  constructor() {
    this.Note = new Note();
  }
}
