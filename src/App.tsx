import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AikaValinta from './Components/AikaValinta';
import Header from './Components/Header';
import Hinnat from './Components/Hinnat';
import HuoneistojenMaara from './Components/HuoneistojenMaara';
import Laskelma from './Components/Laskelma';
import MittarinKoko from './Components/MittarinKoko';
import MuokkaaHinta from './Components/MuokkaaHinta';
import MuokkaaMittarinHintaa from './Components/MuokkaaMittarinHintaa';
import MuutaHuoneistojenMaara from './Components/MuutaHuoneistojenMaara';
import MuutaVedenkulutus from './Components/MuutaVedenkulutus';
import Ohje from './Components/Ohje';
import Stepper from './Components/Stepper';
import VedenkulutusPaivassa from './Components/VedenkulutusPaivassa';

function App() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [hinnat, setHinnat] = useState<VedenHinnat[]>([{id : 0, tyyppi : "Talousvesi", hinta : 1.56},
                                                       {id : 1, tyyppi : "Jätevesi", hinta : 2.33}])
  const [vesimittarinKoko, setVesimittarinKoko] = useState<VesimittarinKoko[]>([{id : 0, rakennus : "Omakotitalo", mittarinKoko : "20", talousvedenPerusmaksu : 5.83, jatevedenPerusmaksu : 4.23},
                                                       {id : 1, rakennus : "Rivitalo", mittarinKoko : "25-32", talousvedenPerusmaksu : 14.87, jatevedenPerusmaksu : 10.79},
                                                       {id : 2, rakennus : "Kerrostalo", mittarinKoko : "40", talousvedenPerusmaksu : 32.21, jatevedenPerusmaksu : 23.32},
                                                       {id : 3, rakennus : "Kerrostalo", mittarinKoko : "50", talousvedenPerusmaksu : 35.39, jatevedenPerusmaksu : 25.64},
                                                     ])

  const [valittuMittari, setValittuMittari] = useState<VesimittarinKoko>(vesimittarinKoko[0])
  const [naytaStepper, setNaytaStepper] = useState(true);
  const [huoneistojenMaara, setHuoneistojenMaara] = useState(1);
  const [alkuValue, setAlkuValue] = React.useState<Date | null>(null);
  const [loppuValue, setLoppuValue] = React.useState<Date | null>(null);
  const [vedenkulutus, setVedenkulutus] = useState<number>(120);

  return (
    <>
      <Header/>
      <Ohje/>
      <Routes>
        <Route path='/' element={<Hinnat hinnat={hinnat} setHinnat={setHinnat} setNaytaStepper={setNaytaStepper} />}/>
        <Route path='/muokkaaHinta/:id' element={<MuokkaaHinta hinnat={hinnat} setHinnat={setHinnat} setNaytaStepper={setNaytaStepper}/>}/>
        <Route path='/mittarinKoko/' element={<MittarinKoko setValittuMittari={setValittuMittari} setNaytaStepper={setNaytaStepper} vesimittarinKoko={vesimittarinKoko} setVesimittarinKoko={setVesimittarinKoko}/>}/>
        <Route path='/muokkaaMittarinHintaa/:id' element={<MuokkaaMittarinHintaa setNaytaStepper={setNaytaStepper} vesimittarinKoko={vesimittarinKoko} setVesimittarinKoko={setVesimittarinKoko} />}/>
        <Route path='/huoneistojenMaara/' element={<HuoneistojenMaara huoneistojenMaara={huoneistojenMaara} setHuoneistojenMaara={setHuoneistojenMaara} setNaytaStepper={setNaytaStepper}/>}/>
        <Route path='/muutaHuoneistojenMaara/' element={<MuutaHuoneistojenMaara huoneistojenMaara={huoneistojenMaara} setHuoneistojenMaara={setHuoneistojenMaara} setNaytaStepper={setNaytaStepper}/>}/>
        <Route path='/aikaValinta/' element={<AikaValinta alkuValue={alkuValue} setAlkuValue={setAlkuValue} loppuValue={loppuValue} setLoppuValue={setLoppuValue}/>}/>
        <Route path='/vedenkulutus/' element={<VedenkulutusPaivassa setNaytaStepper={setNaytaStepper} vedenkulutus={vedenkulutus} setVedenkulutus={setVedenkulutus}/>}/>
        <Route path='/muutaVedenkulutus/' element={<MuutaVedenkulutus setNaytaStepper={setNaytaStepper} vedenkulutus={vedenkulutus} setVedenkulutus={setVedenkulutus}/>}/>
        <Route path='/laskelma/' element={<Laskelma hinnat={hinnat} vesimittarinKoko={vesimittarinKoko} valittuMittari={valittuMittari} huoneistojenMaara={huoneistojenMaara} alkuValue={alkuValue} loppuValue={loppuValue} vedenkulutus={vedenkulutus}/>}/>
      </Routes>
      {naytaStepper
      ? <Stepper activeStep={activeStep} setActiveStep={setActiveStep}/>
      : null
      }
    </>
  );
}

export default App;
