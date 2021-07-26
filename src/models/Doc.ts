import { Section } from '.';
import { Body } from './Body';
import { Column } from './Column';
import { Header } from './Header';
import { Row } from './Row';
import { Taalam } from './Taalam';


export class Doc {
  Header: Header;
  Body: Body;
  taalam:Taalam;


  constructor(taal:Taalam) {
    this.Header = new Header();
    this.Body = new Body();
    this.taalam = taal;
  }

  AddRow(section:Section):void {
    const cols = new Array<Column>(this.taalam); //.fill(new Column(),0,this.taalam);
    for(let ctr=0; ctr<this.taalam; ctr++) {
      cols[ctr] = new Column();
    }

    const row = new Row();
    row.cols = cols;

    section.rows.push(row);
  }
}
