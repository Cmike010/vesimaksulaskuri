import { Button, Grid, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';


interface Props {
  huoneistojenMaara : number;
  setHuoneistojenMaara : Dispatch<SetStateAction<number>>;
  setNaytaStepper : Dispatch<SetStateAction<boolean>>;
}

const HuoneistojenMaara : React.FC<Props> = (props : Props) : React.ReactElement => {

const changeStepper = () => {
    props.setNaytaStepper(false);
  }

  return (
    <Container>
      <Grid container sx={{ maxWidth: "70%", margin: "auto" }} justifyContent={"center"} textAlign={"center"}>
        <Grid item xs={12}>
          <Typography variant='h4' mb={2}>Huoneistojen lukumäärä:</Typography>
          <Typography variant='h4' mb={2}>{props.huoneistojenMaara}</Typography>
          <Button variant='contained'
                  component={Link}
                  onClick={changeStepper}
                  to={`/muutaHuoneistojenMaara/`}
                  >Muuta lukumäärää</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HuoneistojenMaara;