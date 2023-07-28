
// import React, { useEffect, useState } from "react";
// // import FieldSidebar from "../component2/FieldSidebar";
// import FieldSidebar from "./FieldSidebar";
// import { Stepper, Step, StepLabel, Button, TextField } from "@mui/material";


// const StepForm3 = () => {
//   const [activeStep, setActiveStep] = useState(1);
  // const [totalSteps, setTotalSteps] = useState(4);
  // const [stepNames, setStepNames] = useState(
  //   Array.from({ length: totalSteps }, (_, index) => `Step ${index + 1}`)
  // );

//   const messages = ["Hello", "Hyfry", "Gooo"];

  // const nextStep = () => {
    // if (activeStep < totalSteps - 1) {
    //   setActiveStep((currentStep) => currentStep + 1);
    // }
  // };

  // const backStep = () => {
    // if (activeStep > 0) {
    //   setActiveStep((currentStep) => currentStep - 1);
    // }
  // };

//   const addStep = () => {
//     setTotalSteps((currentTotalSteps) => currentTotalSteps + 1);
//     setStepNames((currentStepNames) => [
//       ...currentStepNames,
//       `Step ${totalSteps + 1}`,
//     ]);
//   };

//   const handleStepNameChange = (index, newName) => {
//     const updatedStepNames = [...stepNames];
//     updatedStepNames[index] = newName;
//     setStepNames(updatedStepNames);
//   };

  // useEffect(() => {
  //   localStorage.setItem("Step", JSON.stringify(stepNames));
  //   localStorage.setItem("activeStep", JSON.stringify(activeStep + 1));
  // }, [stepNames, activeStep]);

//   return (
//     <div className="container" style={{ overflowX: "auto" }}>
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {stepNames.map((label, index) => (
//           <Step key={index}>
//             <StepLabel>
//               <input
//                 label={`Step ${index + 1}`}
//                 value={label}
//                 onChange={(e) => handleStepNameChange(index, e.target.value)}
//                 variant="outlined"
//                 fullWidth
//                 className="stepformtitle"
//                 style={{ border: "none" }}
//               />
//             </StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <div>
        // {activeStep === 0 && <FieldSidebar step={activeStep + 1} />}
        // {activeStep === 1 && <FieldSidebar step={activeStep + 1} />}
        // {activeStep === 2 && <FieldSidebar step={activeStep + 1} />}
        // {activeStep === 3 && <p>{messages[2]}</p>}
//       </div>
//       <div className="d-flex justify-content-center">
//         <Button
//           variant="outlined"
//           style={{ color: "green", margin: "10px" }}
//           onClick={backStep}
//         >
//           Previous Step
//         </Button>
//         <br />
//         <br />
//         <br />
//         <Button
//           variant="outlined"
//           onClick={nextStep}
//           style={{ color: "red", margin: "10px" }}
//         >
//           Next Step
//         </Button>
//         <br />
//         <br />
//         <br />
//         <Button
//           variant="outlined"
//           onClick={addStep}
//           style={{ color: "black", margin: "10px" }}
//         >
//           Add More Step
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default StepForm3;

import React, { useState, useEffect } from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import FieldSidebar from "./FieldSidebar";

function Stepformlearn() {
  const Allsetps = ["superadmin", "admin", "teacher", "student","vaibhav"];
  const st = Allsetps.length
  const [totalSteps, setTotalSteps] = useState(st);
  const [activeStep, setActiveStep] = useState(0);
  const [stepNames, setStepNames] = useState(
    Array.from({ length: totalSteps }, (_, index) => `Step ${index + 1}`)
  );
  const BackStep = () => {
        if (activeStep > 0) {
          setActiveStep((currentStep) => currentStep - 1);
        }
  };

  const NextStep = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep((currentStep) => currentStep + 1);
    }
  };
    useEffect(() => {
      localStorage.setItem("Step", JSON.stringify(stepNames));
      localStorage.setItem("activeStep", JSON.stringify(activeStep + 1));
    }, [stepNames, activeStep]);

  return (
    <>
      <div className="container">
        <Stepper activeStep={activeStep}>
          {Allsetps.map((stap, index) => (
            <Step key={index}>
              <StepLabel>{stap}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && <FieldSidebar step={activeStep + 1} />}
        {activeStep === 1 && <FieldSidebar step={activeStep + 1} />}
        {activeStep === 2 && <FieldSidebar step={activeStep + 1} />}
        <button className="m-4 btn btn-outline-primary " onClick={BackStep}>
          Back Step
        </button>
        <button className="m-4 btn btn-outline-success " onClick={NextStep}>
          Next Step
        </button>
      </div>
    </>
  );
}

export default Stepformlearn;
