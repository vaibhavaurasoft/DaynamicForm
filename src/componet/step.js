
// import React, { useState } from "react";
// import { Stepper, Step, StepLabel, Button } from "@mui/material";

// const StepForm2 = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [totalSteps, setTotalSteps] = useState(4); // Initialize with 4 steps
//   const steps = Array.from(
//     { length: totalSteps },
//     (_, index) => `Step ${index + 1}`
//   );

//   const nextStep = () => {
//     if (activeStep < totalSteps - 1) {
//       setActiveStep((currentStep) => currentStep + 1);
//     }
//   };

//   const backStep = () => {
//     if (activeStep > 0) {
//       setActiveStep((currentStep) => currentStep - 1);
//     }
//   };

//   const addStep = () => {
//     setTotalSteps((currentTotalSteps) => currentTotalSteps + 1);
//   };

//   return (
//     <div>
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((label, index) => (
//           <Step key={index}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <Button variant="outlined" onClick={nextStep}>
//         Next Step
//       </Button>
//       <br />
//       <br />
//       <br />
//       <Button variant="outlined" onClick={backStep}>
//         Previous Step
//       </Button>
//       <br />
//       <br />
//       <br />
//       <Button variant="outlined" onClick={addStep}>
//         Add More Step
//       </Button>
//     </div>
//   );
// };

// export default StepForm2;


import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, TextField } from "@mui/material";

const StepForm2 = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(4); // Initialize with 4 steps
  const [stepNames, setStepNames] = useState(
    Array.from({ length: totalSteps }, (_, index) => `Step ${index + 1}`)
  );

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

  const handleStepNameChange = (index, newName) => {
    const updatedStepNames = [...stepNames];
    updatedStepNames[index] = newName;
    setStepNames(updatedStepNames);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepNames.map((label, index) => (
          <Step key={index}>
            <StepLabel>
              <TextField
                value={label}
                onChange={(e) => handleStepNameChange(index, e.target.value)}
                variant="outlined"
                className="bg-black"
              />
              lknl
            </StepLabel>
          </Step>
        ))}
      </Stepper>
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
