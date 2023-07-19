// import React, { useState, useEffect } from "react";
// import { FormBuilder as FormBuilderIo, Formio } from "@formio/react"; // Add Formio import
// import { formIoData } from "../consts";
// import "react-form-builder2/dist/app.css";
// import "formiojs/dist/formio.full.css";

// const DynamicForm = () => {
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
//     <div>
//       <FormBuilderIo
//         form={formIoData}
//         onSubmit={(data) => {
//           console.log(data);
//         }}
//         saveForm={(data) => setFormData(data)}
//         saveText="Save Form"
//         onSubmitDone={(data) => console.log(data)}
//       />
//       <div style={{ display: "none" }}>
//         <div id="formio-result" />
//       </div>
//     </div>
//   );
// };

// export default DynamicForm;

import React, { useState, useEffect, useRef } from "react";
import { FormBuilder as FormBuilderIo, Formio } from "@formio/react";
import { formIoData } from "../consts";
import "react-form-builder2/dist/app.css";
import "formiojs/dist/formio.full.css";

const DynamicForm = () => {
  const [formData, setFormData] = useState(formIoData);
  const submissionDataRef = useRef(null);

  // Custom event handler for capturing user input from input fields
  const handleInputChange = (event) => {
    console.log("User input:", event.target.value);
  };

  useEffect(() => {
    // Initialize the form after the component mounts to capture changes in the form fields
    Formio.createForm(document.getElementById("formio-result"), {
      components: formData.components,
    }).then((form) => {
      console.log(form.component.components);

      // Add event listeners to form input elements to capture user input
      const inputElements = document.querySelectorAll("input");
      inputElements.forEach((input) => {
        input.addEventListener("input", handleInputChange);
      });

      // Add event listeners to newly added form elements to capture user input
      form.on("elementEdit", (element) => {
        if (element.component.type === "textfield") {
          const inputElement = document.querySelector(
            `[name="${element.component.key}"]`
          );
          if (inputElement) {
            inputElement.addEventListener("input", handleInputChange);
          }
        }
      });

      // Update the submissionDataRef with the latest data when the form is submitted
      form.on("submit", (data) => {
        console.log("submit", data);
        submissionDataRef.current = data;
      });
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      const inputElements = document.querySelectorAll("input");
      inputElements.forEach((input) => {
        input.removeEventListener("input", handleInputChange);
      });
    };
  }, [formData]);

  // Function to handle form submission
  const handleSubmit = () => {
    console.log("Form submission data:", submissionDataRef.current);
  };

  return (
    <div>
      <FormBuilderIo
        form={formIoData}
        onSubmit={(data) => {
          console.log(data);
        }}
        saveForm={(data) => setFormData(data)}
        saveText="Save Form"
        onSubmitDone={(data) => console.log(data)}
      />
      <div style={{ display: "none" }}>
        <div id="formio-result" />
      </div>
      <button onClick={handleSubmit}>Submit Form</button>
    </div>
  );
};

export default DynamicForm;
