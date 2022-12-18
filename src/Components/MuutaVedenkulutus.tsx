import { Button, Grid, TextField, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';

interface Props {
  vedenkulutus : number;
  setVedenkulutus : Dispatch<SetStateAction<number>>;
  setNaytaStepper : Dispatch<SetStateAction<boolean>>;
}

interface Virhe {
  virhe? : string;
}

const MuutaVedenkulutus : React.FC<Props> = (props : Props) : React.ReactElement => {

  const syote : Syote = useRef({});
  const [virheIlmoitukset, setVirheIlmoitukset] = useState<Virhe>({})
  const navigate = useNavigate();

  const syoteKasittelija = (e : React.ChangeEvent<HTMLInputElement>) : void => {
    syote.current[e.target.name] = e.target.value;
  }

  const peruuta = () => {
    props.setNaytaStepper(true);
    navigate("/vedenkulutus");
  }

  const tarkastaSyote = () => {
    let virheet : Virhe = {};
    let apuVedenkulutus = undefined;
    if ("muutaVedenkulutus" in syote.current === false){
      apuVedenkulutus = props.vedenkulutus;
    }

    else if (syote.current.muutaVedenkulutus.length === 0){
      virheet = {...virheet, virhe : "Syötä vedenkulutuksen määrä vuorokaudessa!"}
    }

    else {
      let charCheck = false;
      for (let i = 0; i < syote.current.muutaVedenkulutus.length; i++){
        if (isNaN(syote.current.muutaVedenkulutus[i])){
          charCheck = true;
        }
      }
      if (charCheck) {
        virheet = {...virheet, virhe : "Syötä vain numeroita!"}
      }
    }

    if (Object.entries(virheet).length > 0) {
      setVirheIlmoitukset({...virheet});
    }

    else {
      setVirheIlmoitukset({});
      if (apuVedenkulutus != undefined){
        props.setNaytaStepper(true);
        navigate("/vedenkulutus/");
      }

      else {
        props.setVedenkulutus(syote.current.muutaVedenkulutus);
        props.setNaytaStepper(true);
        navigate("/vedenkulutus/");
      }
    }
  }

  return (
    <Container>
      <Grid container sx={{ maxWidth: "70%", margin: "auto" }} justifyContent={"center"} textAlign={"center"}>
        <Grid item xs={12} mb={3}>
          <Typography variant='h4' mb={2}>Muuta vedenkulutuksen määrää:</Typography>
          <TextField defaultValue={props.vedenkulutus}
                      name="muutaVedenkulutus"
                      error={Boolean(virheIlmoitukset.virhe)}
                      helperText={virheIlmoitukset.virhe}
                      onChange={syoteKasittelija}/>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} sx={{maxWidth : "60%", margin : "auto", marginTop : "20px"}}>
        <Grid item>
          <Button size='large' sx={{marginRight : 2}} onClick={peruuta}>Peruuta</Button>
          <Button size='large' sx={{marginLeft : 2}} variant='contained' onClick={tarkastaSyote}>Muuta määrää</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MuutaVedenkulutus;