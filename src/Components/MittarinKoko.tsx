import { IconButton, Radio, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Dispatch, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';

interface Props {
  setNaytaStepper : Dispatch<SetStateAction<boolean>>;
  vesimittarinKoko : VesimittarinKoko[];
  setVesimittarinKoko : Dispatch<SetStateAction<VesimittarinKoko[]>>;
  setValittuMittari : Dispatch<SetStateAction<VesimittarinKoko>>;
}

const MittarinKoko : React.FC<Props> = (props : Props) : React.ReactElement => {
  
  const [selectedValue, setSelectedValue] = useState(0);

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(Number(e.target.value));
    props.setValittuMittari(props.vesimittarinKoko[Number(e.target.value)]);
  }

  const changeStepper = () => {
    props.setNaytaStepper(false);
  }

  return (

    <Container sx={{
                    maxWidth : "70%",
                    pt : "10px",
                    pb : "10px",
                    mt : "10px"}}>
      <Typography variant='h4' textAlign={"center"}>Valitse mittarin koko</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mittarin koko mm</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Talousveden perusmaksu n. euroa/kk</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Jäteveden perusmaksu n. euroa/kk</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Muokkaa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.vesimittarinKoko.map((mittari : VesimittarinKoko, index : number) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Radio value={mittari.id} 
                            checked={selectedValue === mittari.id}
                            onChange={handleChange}/>
                  </TableCell>
                  <TableCell>{mittari.rakennus}</TableCell>
                  <TableCell>{mittari.mittarinKoko}</TableCell>
                  <TableCell align='center'>{mittari.talousvedenPerusmaksu}</TableCell>
                  <TableCell align='center'>{mittari.jatevedenPerusmaksu}</TableCell>
                  <TableCell>
                    <IconButton component={Link}
                                onClick={changeStepper}
                                to={`/muokkaaMittarinHintaa/${mittari.id}`}>
                      <EditIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MittarinKoko;