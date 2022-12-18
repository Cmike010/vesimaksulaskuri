import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

interface Props {
  activeStep : number;
  setActiveStep : React.Dispatch<React.SetStateAction<number>>;
}

const steps = [
  {
    label: 'Veden hinta',
    description: ``,
    url: "/"
  },
  {
    label: 'Mittarin koko',
    description: '',
    url: "/mittarinKoko/"
  },
  {
    label: 'Huoneistojen lukumäärä',
    description: '',
    url: "/huoneistojenMaara/"
  },
  {
    label: 'Ajanjakso',
    description: ``,
    url: "/aikaValinta/"
  },
  {
    label: 'VedenkulutusPaivassa',
    description: ``,
    url: "/vedenkulutus/"
  },
  {
    label: 'Yhteenveto',
    description: ``,
    url: "/laskelma/"
  }

];

const Stepper : React.FC<Props> = (props : Props) => {
  const theme = useTheme();
  
  const maxSteps = steps.length;
  const navigate = useNavigate();
  

  const handleNext = () => {
    props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
    navigate(steps[props.activeStep + 1].url!);
  };

  const handleBack = () => {
    props.setActiveStep((prevActiveStep) => prevActiveStep - 1)
    navigate(steps[props.activeStep - 1].url!);
  };

  return (
    <Grid container justifyContent={"center"}>
        <Grid item sx={{
                    maxWidth : "60%"}}>
            <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={props.activeStep}
                nextButton={
                <Button
                    size="small"
                    onClick={handleNext}
                    disabled={props.activeStep === maxSteps - 1}
                >
                    Seuraava
                    {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                    ) : (
                    <KeyboardArrowRight />
                    )}
                </Button>
                }
                backButton={
                <Button size="small" onClick={handleBack} disabled={props.activeStep === 0}>
                    {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                    ) : (
                    <KeyboardArrowLeft />
                    )}
                    Takaisin
                </Button>
                }
            />
      </Grid>
    </Grid>
  );
}

export default Stepper;