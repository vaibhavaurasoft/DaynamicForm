import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";

const StepForm2 = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [totalStep,SettotalSteps]= useState(3)
//   const steps = ["step1", "step2", "step3"];
  const steps = Array.from(
    { length: totalStep },
    (_, index) => `Step ${index + 1}`
  );


  const nextStep = () => {
    if (activeStep < totalStep) {
      setActiveStep((currentStep) => currentStep + 1);
    }
  };
  const backStep = () => {
    if (activeStep > 0) {
      setActiveStep((currentStep) => currentStep - 1);
    }
  };

const addStep = ()=>{
    SettotalSteps((currentTotalStep)=> currentTotalStep+1 )
}

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((lable, index) => (
          <Step key={index}>
            <StepLabel>{lable}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Button variant="outlined" onClick={() => nextStep()}>
        Next Step
      </Button>
      <br />
      <br />
      <br />
      <Button variant="outlined" onClick={() => backStep()}>
        {" "}
        Previc Step
      </Button>
      <br />
      <br />
      <br />
      <Button variant="outlined" onClick={() => addStep()}>
        Add More Step
      </Button>
    </div>
  );
};

export default StepForm2;

