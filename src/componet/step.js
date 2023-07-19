

// import React, { useState } from 'react';
// import { Stepper, Step, StepLabel, Button } from '@mui/material';

// const steps = ['Step 1', 'Step 2', 'Step 3']; // Add more steps as needed

// const StepForm = () => {
//   const [activeStep, setActiveStep] = useState(0);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   return (
//     <div>
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <div>
//         {activeStep === steps.length ? (
//           <div>
//             <p>All steps completed</p>
//           </div>
//         ) : (
//           <div>
//             {/* Render the content of each step here */}
//             {activeStep === 0 && <p>Step 1 Content</p>}
//             {activeStep === 1 && <p>Step 2 Content</p>}
//             {activeStep === 2 && <p>Step 3 Content</p>}
//             {/* Add more steps content as needed */}
//             <div>
//               <Button disabled={activeStep === 0} onClick={handleBack}>
//                 Back
//               </Button>
//               <Button variant="contained" color="primary" onClick={handleNext}>
//                 {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StepForm;


import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";

const StepForm2 = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(4); // Initialize with 4 steps
  const steps = Array.from(
    { length: totalSteps },
    (_, index) => `Step ${index + 1}`
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