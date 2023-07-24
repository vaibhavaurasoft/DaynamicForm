import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, TextField } from "@mui/material";

const Stepformlearn = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(4);
  const [stepNames, setStepNames] = useState(
    Array.from({ length: totalSteps }, (_, index) => `Step ${index + 1}`)
  );

  const messages = [
    "vaibhav",
    "kavita", 
    "Gooo", 
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
    setStepNames((currentStepNames) => [
      ...currentStepNames,
      `Step ${totalSteps + 1}`,
    ]);
  };

  const handleStepNameChange = (number , newName) => {
    const updatedStepNames = [...stepNames];
    updatedStepNames[number] = newName;
    setStepNames(updatedStepNames);
  };

  return (
    <div className=" container">
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepNames.map((label, index) => (
          <Step key={index}>
            <StepLabel>
              <input
                label={`Step ${index + 1}`}
                value={label}
                onChange={(e) => handleStepNameChange(index, e.target.value)}
                variant="outlined"
                style={{border:"none"}}
                className="w-50"
              />
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {/* Show DynamicForm on Step 2 */}
        {activeStep === 2 && <p>{messages[1]}</p>}
        {activeStep === 3 && <p>{messages[2]}</p>}
      </div>
      <div className="d-flex justify-content-center">
        <Button
          variant="outlined"
          style={{ color: "green", margin: "10px" }}
          onClick={backStep}
        >
          Previous Step
        </Button>
        <br />
        <br />
        <br />
        <Button
          variant="outlined"
          onClick={nextStep}
          style={{ color: "red", margin: "10px" }}
        >
          Next Step
        </Button>
        <br />
        <br />
        <br />
        <Button
          variant="outlined"
          onClick={addStep}
          style={{ color: "black", margin: "10px" }}
        >
          Add More Step
        </Button>
      </div>
    </div>
  );
};


export default Stepformlearn;
