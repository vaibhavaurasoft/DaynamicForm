import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";

const StepForm2 = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(4); // Initialize with 4 steps
  const steps = Array.from(
    { length: totalSteps },
    (_, index) => `Step ${index + 1}`
  );

  const messages = [
    "Hello", // Message for Step 1
    "Hyy", // Message for Step 2
    "Gooo", // Message for Step 3
  ];

  const nextStep = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep((currentStep) => currentStep + 1);
    }
  };

  const backStep = () => {
    if (activeStep > 0) {
      setActiveStep((currentStep) => currentStep - 1);
    }
  };

  const addStep = () => {
    setTotalSteps((currentTotalSteps) => currentTotalSteps + 1);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 && <p>{messages[0]}</p>}
        {activeStep === 1 && <p>{messages[1]}</p>}
        {activeStep === 2 && <p>{messages[2]}</p>}
        {/* Add more conditions for additional steps if needed */}
      </div>
      <Button variant="outlined" onClick={nextStep}>
        Next Step
      </Button>
      <br />
      <br />
      <br />
      <Button variant="outlined" onClick={backStep}>
        Previous Step
      </Button>
      <br />
      <br />
      <br />
      <Button variant="outlined" onClick={addStep}>
        Add More Step
      </Button>
    </div>
  );
};

export default StepForm2;
