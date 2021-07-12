import { Body } from './Body';
import { Header } from './Header';

export class Doc {
  Header: Header;
  Body: Body;

  constructor() {
    this.Header = new Header();
    this.Body = new Body();
  }
}
