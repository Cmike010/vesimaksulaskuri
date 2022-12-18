interface VedenHinnat {
    id : number,
    tyyppi : string,
    hinta : number
  }

interface Syote {
    [key : string] : any;
    annettuSyote? : number;
}

interface VesimittarinKoko {
  id? : number,
  rakennus? : string,
  mittarinKoko? : string,
  talousvedenPerusmaksu? : number,
  jatevedenPerusmaksu? : number
}
  