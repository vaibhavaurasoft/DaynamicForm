import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import DynamicForm from "./DynamicForm"; // Import the DynamicForm component
import FormBuilder from "../component2/FormBuilder";
import FieldSidebar from "../component2/FieldSidebar";

const StepForm3 = () => {
  const [activeStep, setActiveStep] = useState(1);
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
    <div className=" container" >
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 && <DynamicForm />} {/* Show DynamicForm on Step 1 */}
        {activeStep === 1 && (
          <>
            {" "}
            <FieldSidebar />
             {/* <FormBuilder /> */}
          </>
        )}{" "}
        {/* Show DynamicForm on Step 1 */}
        {activeStep === 2 && <p>{messages[1]}</p>}
        {activeStep === 3 && <p>{messages[2]}</p>}
        {/* Add more conditions for additional steps if needed */}
      </div>
      <div className="d-flex justify-content-center">
        <Button
          variant="outlined"
          style={{ color: "green", margin: "10px" }}
          onClick={backStep}
        >
          Prives Step
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

export default StepForm3;
