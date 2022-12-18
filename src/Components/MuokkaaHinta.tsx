import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  hinnat : VedenHinnat[];
  setHinnat : Dispatch<SetStateAction<VedenHinnat[]>>;
  setNaytaStepper : Dispatch<SetStateAction<boolean>>;
}

interface Virhe {
  virheIlmoitus? : string;
}

const MuokkaaHinta : React.FC<Props> = (props : Props) : React.ReactElement => {

  const { id } = useParams<any>();
  const navigate = useNavigate();
  const syote : Syote = useRef<Syote>({});
  const [virheet, setVirheet] = useState<Virhe>({})

  const peruuta = () => {
    props.setNaytaStepper(true);
    navigate("/");
  }

  const syoteKasittelija = (e : React.ChangeEvent<HTMLInputElement>) : void => {
    syote.current[e.target.name] = e.target.value;
  }

  const muokkaa = () => {
    const apuTaulukko = props.hinnat;
    if (!syote.current.hinta || syote.current.hinta.length === 0){
      setVirheet({virheIlmoitus : "Syötä tai muokkaa hintaa!"})
    }
    else {
      let apuHinta = syote.current.hinta.replace(/,/, '.');
      let charCheck = false;
      for (let i = 0; i < apuHinta.length; i++){
        if (apuHinta[i] !== "."){
          if (isNaN(apuHinta[i])){
            charCheck = true;
          }
        }
      }
      console.log(charCheck);
      if (charCheck){
        setVirheet({virheIlmoitus : "Syötä vain numeroita!"});
      }
      else {
      apuTaulukko[Number(id)].hinta = Number(apuHinta);
      props.setHinnat(apuTaulukko);
      props.setNaytaStepper(true);
      navigate("/");
      }
    }
  }

  return(
    <>
      <Grid container justifyContent={"center"} sx={{maxWidth : "60%", margin : "auto"}}>
        <Grid item>
          <Typography variant='h4' mb={5}>Muokkaa hintaa</Typography>
          <Typography>{props.hinnat[Number(id)].tyyppi}:</Typography>
          <TextField defaultValue={props.hinnat[Number(id)].hinta}
                      name="hinta"
                      error={Boolean(virheet.virheIlmoitus)}
                      helperText={virheet.virheIlmoitus}
                      onChange={syoteKasittelija}>
          </TextField>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} sx={{maxWidth : "60%", margin : "auto", marginTop : "20px"}}>
        <Grid item>
          <Button size='large'sx={{marginRight : 2}} onClick={peruuta}>Peruuta</Button>
          <Button size='large' variant='contained' sx={{marginLeft : 2}} onClick={muokkaa}>Muokkaa</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default MuokkaaHinta;