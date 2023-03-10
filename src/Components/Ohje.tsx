import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const CustomizedDialogs = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container justifyContent={"end"}>
        <Grid item xs={4} mr={3}>
            <Button variant="outlined" onClick={handleClickOpen} size="large">
                Ohje
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Vesimaksulaskuri ohje
                </BootstrapDialogTitle>
                <DialogContent dividers>
                <Typography gutterBottom>
                    Vesimaksulaskurilla voit arvioida vesimaksun hinnan haluamallesi ajanjaksolle.
                </Typography>
                <Typography gutterBottom>
                    Voit muuttaa laskennassa k??ytettyj?? arvoja vastaamaan tilannettasi. Veden hinnat
                    m????r??ytyv??t kuntakohtaisesti. Tarkista oman kuntasi hinnat oman kuntasi tietol??hteest??.
                </Typography>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Ok
                </Button>
                </DialogActions>
            </BootstrapDialog>
      </Grid>
    </Grid>
  );
}

export default CustomizedDialogs;
