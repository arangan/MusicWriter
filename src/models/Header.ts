export class Header {
  symbol: string;
  raagam: string;
  taalam: string;
  aroh: string;
  avroh: string;
  taalMatra:number;
  
  constructor() {
    this.symbol = 'உ';
    this.raagam =  ''; //\u0803'; //'\u03C0';
    this.taalMatra = 10;
    this.taalam = 'A'; //'\u00A9' - copyright sign

    this.aroh = '';
    this.avroh = '';
  }
}
