import { Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';

interface Props {
  hinnat : VedenHinnat[];
  setHinnat : Dispatch<SetStateAction<VedenHinnat[]>>;
  setNaytaStepper : Dispatch<SetStateAction<boolean>>;
}

const Hinnat : React.FC<Props> = (props : Props) : React.ReactElement => {

  const yhteisHinta = () => {
    let apuYhteisHinta = 0;
    for (let i = 0; i < props.hinnat.length; i++){
        apuYhteisHinta += props.hinnat[i].hinta;
    }

    return apuYhteisHinta.toFixed(2);
  }

  const changeStepper = () => {
    props.setNaytaStepper(false);
  }

  return (
    <Container>
      <Grid>
        <Grid item xs={12}>
          <Typography variant='h4' textAlign={"center"}>Veden hinta</Typography>
        </Grid>
        <Grid item>
          <TableContainer sx={{ maxWidth: "70%", margin: "auto" }}>
            <Table sx={{ marginRight: "0px" }}>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align='center' sx={{ fontWeight: "bold" }}>euroa/m³</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Muuta hintaa</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.hinnat.map((vesi: VedenHinnat, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align='right'>{vesi.tyyppi}</TableCell>
                      <TableCell align='center'>{vesi.hinta.toFixed(2)}</TableCell>
                      <TableCell>
                        <IconButton
                          component={Link}
                          onClick={changeStepper}
                          to={`/muokkaaHinta/${vesi.id}`}>

                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell align='right'
                    sx={{ fontWeight: "bold" }}
                  >Yhteensä
                  </TableCell>
                  <TableCell align='center'
                    sx={{ fontWeight: "bold" }}
                  >
                    {yhteisHinta()}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hinnat;