export class Header {
  symbol: string;
  raagam: string;
  taal: string;
  aroh: string;
  avroh: string;
  taalMatra = 10;
  constructor() {
    this.symbol = 'உ';
    this.raagam =  ''; //\u0803'; //'\u03C0';
    this.taal = 'A\u00A9';
    this.aroh = '';
    this.avroh = '';
  }
}
