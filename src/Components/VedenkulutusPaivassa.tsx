import { Button, Grid, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';
import React from 'react';

interface Props {
  vedenkulutus : number;
  setVedenkulutus : Dispatch<SetStateAction<number>>;
  setNaytaStepper : Dispatch<SetStateAction<boolean>>;
}

const VedenkulutusPaivassa : React.FC<Props> = (props : Props) : React.ReactElement => {


  const changeStepper = () => {
    props.setNaytaStepper(false);
  }

  return (
    <Container>
      <Grid container sx={{ maxWidth: "70%", margin: "auto" }} justifyContent={"center"} textAlign={"center"}>
        <Grid item xs={12}>
          <Typography variant='h4' mb={3}>Talouden vedenkulutus vuorokaudessa</Typography>
          <Typography variant='h6' mb={3}>
            Keskimäärin yksi suomalainen kuluttaa vettä noin 120 litraa vuorokaudessa. Aseta tässä 
            taloutesi arvioitu vedenkulutus vuorokaudessa.
          </Typography>
        </Grid>
        <Grid item xs={12} mb={3}>
          <Typography variant='h6' mb={2}>Talouden vedenkulutus vuodokaudessa litroina:</Typography>
          <Typography variant='h5'>{props.vedenkulutus} litraa</Typography>
        </Grid>
        <Grid item>
        <Button variant='contained'
                  component={Link}
                  onClick={changeStepper}
                  to={`/muutaVedenkulutus/`}
                  >Muuta litramäärää</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default VedenkulutusPaivassa;