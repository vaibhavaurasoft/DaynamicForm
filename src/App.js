// import React, { useState, useEffect } from "react";
// import { FormBuilder as FormBuilderIo, Formio, FormEdit } from "@formio/react";
// import { formIoData } from "./consts";
// import "./styles.css";
// import "react-form-builder2/dist/app.css";
// import "formiojs/dist/formio.full.css";

// const url = `https://safe-springs-353/06.herokuapp.com/api/formdata?cid=`;

// export default function App() {
//   const [formData, setFormData] = useState(formIoData);

//   // Custom event handler for capturing user input from input fields
//   const handleInputChange = (event) => {
//     console.log("User input:", event.target.value);
//   };

//   useEffect(() => {
//     // Initialize the form after the component mounts to capture changes in the form fields
//     Formio.createForm(document.getElementById("formio-result"), {
//       components: formData.components,
//     }).then((form) => {
//       console.log(form.component.components);
//       form.on("submit", (data) => console.log("submit", data));
//       // Add event listeners to form input elements to capture user input
//       const inputElements = document.querySelectorAll("input");
//       inputElements.forEach((input) => {
//         input.addEventListener("input", handleInputChange);
//       });

//       // Add event listeners to newly added form elements to capture user input
//       form.on("elementEdit", (element) => {
//         if (element.component.type === "textfield") {
//           const inputElement = document.querySelector(
//             `[name="${element.component.key}"]`
//           );
//           if (inputElement) {
//             inputElement.addEventListener("input", handleInputChange);
//           }
//         }
//       });
//     });

//     // Clean up the event listeners when the component unmounts
//     return () => {
//       const inputElements = document.querySelectorAll("input");
//       inputElements.forEach((input) => {
//         input.removeEventListener("input", handleInputChange);
//       });
//     };
//   }, [formData]);

//   return (
//     <div className="App">
//       <h2>Form builder playground</h2>
//       <div>
//         <button className="green" onClick={() => {}}>
//           display result
//         </button>

//         <FormBuilderIo
//           form={formIoData}
//           onSubmit={(data) => {
//             console.log(data);
//           }}
//           saveForm={(data) => setFormData(data)}
//           saveText="Save Form"
//           onSubmitDone={(data) => console.log(data)}
//         />
//         <div style={{ display: "none" }}>
//           <div id="formio-result" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   const [formData, setFormData] = useState(formIoData);
//   const printResult = () => {

//     Formio.createForm(document.getElementById("formio-result"), {
//       components: formData.components,
//     }).then((form) => {
//       console.log(form.component.components);
//       form.on("submit", (data) => console.log("submit", data));
//     });
//   };

//   return (
//     <div className="App d-flex justify-content-center align-items-center p-5">
//       {/* <h2>Form builder playground</h2> */}
//       {/* <h2> Daynamic Form </h2> */}

//       <div className="p-5 w-75 border " >
//         {/* <button className="green" onClick={printResult}>
//           display result
//         </button> */}

//         <FormBuilderIo
//           form={formIoData}
//           // onSubmit={(data) => {
//             // console.log(data);
//           // }}
//           // saveForm={(data) => setFormData(data)}
//           // saveText="Save Form"
//           // onSubmitDone={(data) => console.log(data)}
//         />
//       </div>
//     </div>
//   );
// }

import React from 'react'
// import HorizontalNonLinearStepper from './componet/step'
// import StepForm from './componet/step'
// import StepForm2 from './componet/step2';
import StepForm3 from './testing/StepForm3';
function App() {
  return (
    <>
      {/* <StepForm /> */}
      <StepForm3 />
    </>
  );
}

export default App
