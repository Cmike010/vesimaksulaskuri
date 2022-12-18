import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  setNaytaStepper : Dispatch<SetStateAction<boolean>>;
  vesimittarinKoko : VesimittarinKoko[];
  setVesimittarinKoko : Dispatch<SetStateAction<VesimittarinKoko[]>>;
}

interface Virhe {
  talousVesiVirheIlmoitus? : string;
  jateVesiVirheIlmoitus? : string;
}

const MuokkaaMittarinHintaa : React.FC<Props> = (props : Props) : React.ReactElement => {

  const { id } = useParams<any>();
  const navigate = useNavigate();
  const syote : Syote = useRef<Syote>({});
  const [virheIlmoitukset, setVirheIlmoitukset] = useState<Virhe>({})

  const peruuta = () => {
    
    props.setNaytaStepper(true);
    navigate("/mittarinKoko/");
  }

  const syoteKasittelija = (e : React.ChangeEvent<HTMLInputElement>) : void => {
    syote.current[e.target.name] = e.target.value;
  }

  const muokkaa = () => {
    let virheet : Virhe = {};
    let apuTalousvesiHinta = undefined;
    let apuJatevesiHinta = undefined;
    const apuTaulukko = props.vesimittarinKoko;
    if ("TalousvesiHinta" in syote.current === false){
      apuTalousvesiHinta = props.vesimittarinKoko[Number(id)].talousvedenPerusmaksu;
    }

    else if (syote.current.TalousvesiHinta.length === 0){
      virheet = {...virheet, talousVesiVirheIlmoitus : "Syötä hinta!"}
    }

    else {
      let apuHinta = syote.current.TalousvesiHinta.replace(/,/, '.');
      let charCheck = false;
      for (let i = 0; i < apuHinta.length; i++){
        if (apuHinta[i] !== "."){
          if (isNaN(apuHinta[i])){
            charCheck = true;
          }
        }
      }
      if (charCheck) {
        virheet = {...virheet, talousVesiVirheIlmoitus : "Syötä vain numeroita!"}
      }

      else {
        apuTaulukko[Number(id)].talousvedenPerusmaksu = Number(apuHinta)
      }
    }

    if ("JatevesiHinta" in syote.current === false){
      apuJatevesiHinta = props.vesimittarinKoko[Number(id)].jatevedenPerusmaksu;
    }

    else if (syote.current.JatevesiHinta.length === 0){
      virheet = {...virheet, jateVesiVirheIlmoitus : "Syötä hinta!"}
    }

    else {
      let apuHinta = syote.current.JatevesiHinta.replace(/,/, '.');
      let charCheck = false;
      for (let i = 0; i < apuHinta.length; i++){
        if (apuHinta[i] !== "."){
          if (isNaN(apuHinta[i])){
            charCheck = true;
          }
        }
      }
      if (charCheck) {
        virheet = {...virheet, jateVesiVirheIlmoitus : "Syötä vain numeroita!"}
      }

      else {
        apuTaulukko[Number(id)].jatevedenPerusmaksu = Number(apuHinta)
      }
    }

    if (Object.entries(virheet).length > 0) {
      setVirheIlmoitukset({...virheet});
    }

    else {
      setVirheIlmoitukset({});
      props.setVesimittarinKoko(apuTaulukko);
      props.setNaytaStepper(true);
      navigate("/mittarinKoko/");
    }
  }

  return(
    <>
      <Grid container justifyContent={"center"} sx={{maxWidth : "60%", margin : "auto"}}>
        <Grid item>
          <Typography variant='h4' mb={5}>Muokkaa hintaa</Typography>
          <Typography>Talousveden perusmaksu:</Typography>
          <TextField defaultValue={props.vesimittarinKoko[Number(id)].talousvedenPerusmaksu}
                      name="TalousvesiHinta"
                      error={Boolean(virheIlmoitukset.talousVesiVirheIlmoitus)}
                      helperText={virheIlmoitukset.talousVesiVirheIlmoitus}
                      onChange={syoteKasittelija}>
          </TextField>
          <Typography mt={2}>Jäteveden perusmaksu:</Typography>
          <TextField defaultValue={props.vesimittarinKoko[Number(id)].jatevedenPerusmaksu}
                      name="JatevesiHinta"
                      error={Boolean(virheIlmoitukset.jateVesiVirheIlmoitus)}
                      helperText={virheIlmoitukset.jateVesiVirheIlmoitus}
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

export default MuokkaaMittarinHintaa;