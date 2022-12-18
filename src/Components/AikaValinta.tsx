import { Grid, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Dispatch, SetStateAction } from 'react';
import { Container } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react';
import { fi } from 'date-fns/locale';

interface Props {
  alkuValue : Date | null;
  setAlkuValue : Dispatch<SetStateAction<Date | null>>;
  loppuValue : Date | null;
  setLoppuValue : Dispatch<SetStateAction<Date | null>>;
}

const AikaValinta : React.FC<Props> = (props : Props) : React.ReactElement => {

  return (
    <Container>
      <Grid container sx={{ maxWidth: "70%", margin: "auto" }} justifyContent={"center"} textAlign={"center"}>
        <Grid item xs={12}>
          <Typography variant='h4' mb={2}>Valitse ajanjakso</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
            <Grid container justifyContent={"center"}>
              <Grid item xs={8} mb={3}>
                <DatePicker
                label="Aloitus päivämäärä"
                openTo="day"
                views={['year', 'month', 'day']}
                value={props.alkuValue}
                onChange={(newValue) => {
                  props.setAlkuValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={8}>
                <DatePicker
                label="Lopetus päivämäärä"
                openTo="day"
                views={['year', 'month', 'day']}
                value={props.loppuValue}
                onChange={(newValue) => {
                  props.setLoppuValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AikaValinta;