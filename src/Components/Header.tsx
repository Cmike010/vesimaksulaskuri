import { Grid, Typography } from '@mui/material';
import React from 'react';

const Header : React.FC = () : React.ReactElement => {
  return (
    <Grid container 
          justifyContent={"center"} 
          pt={5} 
          pb={5} 
          mb={5}
          sx={{backgroundColor : "lightGray"}}>
        <Grid item>
          <Typography variant='h2'>VESIMAKSULASKURI</Typography>
        </Grid>
    </Grid>
  );
}

export default Header;