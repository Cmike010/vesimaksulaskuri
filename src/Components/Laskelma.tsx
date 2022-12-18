import { Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { format, differenceInCalendarDays } from 'date-fns';

interface Props {
  hinnat : VedenHinnat[];
  vesimittarinKoko : VesimittarinKoko[]
  valittuMittari : VesimittarinKoko;
  huoneistojenMaara : number;
  alkuValue : Date | null;
  loppuValue : Date | null;
  vedenkulutus : number;
}

const Laskelma : React.FC<Props> = (props : Props) : React.ReactElement => {

  const paivat = differenceInCalendarDays(props.loppuValue!, props.alkuValue!);
  const kuutiotPaivassa = props.vedenkulutus / 1000;
  const vedenkulutusYhteensa = Math.round((paivat * props.vedenkulutus / 1000));
  const hintaPaivassa = Number((((props.hinnat[0].hinta + props.hinnat[1].hinta) * kuutiotPaivassa) + (((props.valittuMittari.talousvedenPerusmaksu! + props.valittuMittari.jatevedenPerusmaksu!)/props.huoneistojenMaara)/30)));
  const hintaYhteensa = (hintaPaivassa * paivat).toFixed(2);
  console.log()

  return (
    <Container>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12} textAlign={"center"}>
          <Typography variant='h4'>Yhteenveto</Typography>
        </Grid>
        <Grid item>
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight : "bold"}}>Aloituspäivä</TableCell>
                <TableCell sx={{fontWeight : "bold"}}>Päättymispäivä</TableCell>
                <TableCell sx={{fontWeight : "bold"}}>Päiviä yhteensä</TableCell>
                <TableCell sx={{fontWeight : "bold"}}>Vedenkulutus päivässä/kuutiota</TableCell>
                <TableCell sx={{fontWeight : "bold"}}>Vedenkulutus yhteensä ajanjaksolla/kuutiota</TableCell>
                <TableCell sx={{fontWeight : "bold"}}>Hinta päivässä/euroa</TableCell>
                <TableCell sx={{fontWeight : "bold"}}>Hinta yhteensä ajanjaksolla/euroa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {props.alkuValue 
                ? <TableCell>{format(props.alkuValue!, "dd.M.yyyy")}</TableCell>
                : <TableCell sx={{color : "red"}}>Päivämäärää ei asetettu!</TableCell>
                }
                {props.loppuValue 
                ? <TableCell>{format(props.loppuValue!, "dd.M.yyyy")}</TableCell>
                : <TableCell sx={{color : "red"}}>Päivämäärää ei asetettu!</TableCell>
                }
                <TableCell>{paivat}</TableCell>
                <TableCell>{kuutiotPaivassa + " m³"}</TableCell>
                <TableCell>{vedenkulutusYhteensa + " m³"}</TableCell>
                <TableCell>{hintaPaivassa.toFixed(2)}</TableCell>
                <TableCell>{hintaYhteensa}</TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Laskelma;