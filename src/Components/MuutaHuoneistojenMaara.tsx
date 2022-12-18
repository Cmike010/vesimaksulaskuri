import { Button, Grid, TextField, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';


interface Props {
  huoneistojenMaara : number;
  setHuoneistojenMaara : Dispatch<SetStateAction<number>>;
  setNaytaStepper : Dispatch<SetStateAction<boolean>>;
}

interface Virhe {
  virhe? : string;
}

const MuutaHuoneistojenMaara : React.FC<Props> = (props : Props) : React.ReactElement => {

  const syote : Syote = useRef({});
  const [virheIlmoitukset, setVirheIlmoitukset] = useState<Virhe>({})
  const navigate = useNavigate();

  const syoteKasittelija = (e : React.ChangeEvent<HTMLInputElement>) : void => {
    syote.current[e.target.name] = e.target.value;
    props.setHuoneistojenMaara(syote.current.huoneistotLkm);
    console.log(props.huoneistojenMaara);
  }

  const peruuta = () => {
    props.setNaytaStepper(true);
    navigate("/huoneistojenMaara");
  }

  const tarkastaSyote = () => {
    let virheet : Virhe = {};
    let apuHuoneistojenMaara = undefined;
    if ("huoneistotLkm" in syote.current === false){
      apuHuoneistojenMaara = props.huoneistojenMaara;
    }

    else if (syote.current.huoneistotLkm.length === 0){
      virheet = {...virheet, virhe : "Syötä huoneistojen lukumäärä!"}
    }

    else {
      let charCheck = false;
      for (let i = 0; i < syote.current.huoneistotLkm.length; i++){
        if (isNaN(syote.current.huoneistotLkm[i])){
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
      if (apuHuoneistojenMaara != undefined){
        props.setNaytaStepper(true);
        navigate("/huoneistojenMaara/");
      }

      else {
        props.setHuoneistojenMaara(syote.current.huoneistotLkm);
        props.setNaytaStepper(true);
        navigate("/huoneistojenMaara/");
      }
    }
  }

  return (
    <Container>
      <Grid container sx={{ maxWidth: "70%", margin: "auto" }} justifyContent={"center"} textAlign={"center"}>
        <Grid item xs={12} mb={3}>
          <Typography variant='h4' mb={2}>Muuta huoneistojen lukumäärä:</Typography>
          <TextField defaultValue={props.huoneistojenMaara}
                      name="huoneistotLkm"
                      error={Boolean(virheIlmoitukset.virhe)}
                      helperText={virheIlmoitukset.virhe}
                      onChange={syoteKasittelija}/>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} sx={{maxWidth : "60%", margin : "auto", marginTop : "20px"}}>
        <Grid item>
          <Button size='large' sx={{marginRight : 2}} onClick={peruuta}>Peruuta</Button>
          <Button size='large' sx={{marginLeft : 2}} variant='contained' onClick={tarkastaSyote}>Muuta lukumäärää</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MuutaHuoneistojenMaara;