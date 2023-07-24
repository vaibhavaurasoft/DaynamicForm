// import React, { useState } from "react";
// import "./FormBuilder.css";

// const FormBuilder = () => {
//   const [fields, setFields] = useState([]);
//   const [formData, setFormData] = useState({});

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const field = event.dataTransfer.getData("field");
//     setFields((prevFields) => [...prevFields, field]);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     console.log("Form Data:", formData);
//   };

//   const renderFields = () => {
//     return fields.map((field, index) => {
//       switch (field) {
        // case "input-text":
        //   return (
        //     <div key={index} className="form-field">
        //       <label>Input Text</label>
        //       <input
        //         type="text"
        //         className="form-control"
        //         onChange={(event) =>
        //           handleInputChange("input-text", event.target.value)
        //         }
        //       />
        //     </div>
        //   );



        // case "input-range":
        //   return (
        //     <div key={index} className="form-field">
        //       <label>Input Range</label>
        //       <input
        //         type="range"
        //         className="form-control"
        //         onChange={(event) =>
        //           handleInputChange("input-range", event.target.value)
        //         }
        //       />
        //     </div>
        //   );
        // case "input-dropdown":
        //   return (
        //     <div key={index} className="form-field">
        //       <label>Input Dropdown</label>
        //       <select
        //         className="form-control"
        //         onChange={(event) =>
        //           handleInputChange("input-dropdown", event.target.value)
        //         }
        //       >
        //         <option value="option1">Option 1</option>
        //         <option value="option2">Option 2</option>
        //         <option value="option3">Option 3</option>
        //       </select>
        //     </div>
        //   );
        // case "input-email":
        //   return (
        //     <div key={index} className="form-field">
        //       <label>Input Email</label>
        //       <input
        //         type="email"
        //         className="form-control"
        //         onChange={(event) =>
        //           handleInputChange("input-email", event.target.value)
        //         }
        //       />
        //     </div>
        //   );

        // case "input-file":
        //   return (
        //     <div key={index} className="form-field">
        //       <label>Input File</label>
        //       <input
        //         type="file"
        //         className="form-control"
        //         onChange={(event) =>
        //           handleInputChange("input-file", event.target.value)
        //         }
        //       />
        //     </div>
        //   );
        // case "input-select":
        //   return (
        //     <div key={index} className="form-field">
        //       <label>Input Select</label>
        //       <select
        //         className="form-control"
        //         onChange={(event) =>
        //           handleInputChange("input-select", event.target.value)
        //         }
        //       >
        //         <option value="option1">Option 1</option>
        //         <option value="option2">Option 2</option>
        //         <option value="option3">Option 3</option>
        //       </select>
        //     </div>
        //   );
        // case "input-number":
        //   return (
        //     <div key={index} className="form-field">
        //       <label>Input Number</label>
        //       <input
        //         type="number"
        //         className="form-control"
        //         onChange={(event) =>
        //           handleInputChange("input-number", event.target.value)
        //         }
        //       />
        //     </div>
        //   );
        // case "input-password":
        //   return (
        //     <div key={index} className="form-field">
        //       <label>Input password</label>
        //       <input
        //         type="password"
        //         className="form-control"
        //         onChange={(event) =>
        //           handleInputChange("input-password", event.target.value)
        //         }
        //       />
        //     </div>
        //   );
        // case "input-checkbox":
        //   return (
        //     <div key={index} className="form-field">
        //       <label>Input checkbox</label>
        //       <input
        //         type="checkbox"
        //         className="form-control"
        //         onChange={(event) =>
        //           handleInputChange("input-checkbox", event.target.value)
        //         }
        //       />
        //     </div>
        //   );
        // case "input-color":
        //   return (
        //     <div key={index} className="form-field">
        //       <label>Input color</label>
        //       <input
        //         type="color"
        //         className="form-control"
        //         onChange={(event) =>
        //           handleInputChange("input-color", event.target.value)
        //         }
        //       />
        //     </div>
        //   );
//         default:
//           return null;
//       }
//     });
//   };

//   return (
//     <div className="form-builder container">
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         className="form-container border-warning w-75 p-4"
//       >
//         {renderFields()}
//         <button onClick={handleSubmit} className="btn btn-primary mt-3">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;

/////////////////////////////////////////////////////////////////////////////////////
// data save in localstorage

// import React, { useState, useEffect } from "react";
// import "./FormBuilder.css";

// const FormBuilder = () => {
//   const [fields, setFields] = useState([]);
//   const [formData, setFormData] = useState({});

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const field = event.dataTransfer.getData("field");
//     setFields((prevFields) => [...prevFields, field]);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     // Save form data to localStorage
//     localStorage.setItem("formData", JSON.stringify(formData));
//     console.log("Form Data:", formData);
//   };
//   // Load saved form data from localStorage on component mount
//   useEffect(() => {
//     const savedFormData = localStorage.getItem("formData");
//     if (savedFormData) {
//       setFormData(JSON.parse(savedFormData));
//     }
//   }, []);

//   const renderFields = () => {
//     return fields.map((field, index) => {
//       switch (field) {
//         case "input-text":
//           return (
//             <div key={index} className="form-field">
//               <label>Input Text</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 onChange={(event) =>
//                   handleInputChange("input-text", event.target.value)
//                 }
//                 value={formData["input-text"] || ""}
//               />
//             </div>
//           );
//         case "input-range":
//           return (
//             <div key={index} className="form-field">
//               <label>Input Range</label>
//               <input
//                 type="range"
//                 className="form-control"
//                 onChange={(event) =>
//                   handleInputChange("input-range", event.target.value)
//                 }
//                 value={formData["input-range"] || ""}
//               />
//             </div>
//           );
//         case "input-dropdown":
//           return (
//             <div key={index} className="form-field">
//               <label>Input Dropdown</label>
//               <select
//                 className="form-control"
//                 onChange={(event) =>
//                   handleInputChange("input-dropdown", event.target.value)
//                 }
//                 value={formData["input-dropdown"] || ""}
//               >
//                 <option value="option1">Option 1</option>
//                 <option value="option2">Option 2</option>
//                 <option value="option3">Option 3</option>
//               </select>
//             </div>
//           );
//         // Add other cases for the remaining fields...
//         default:
//           return null;
//       }
//     });
//   };

//   return (
//     <div className="form-builder container">
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         className="form-container border-warning w-75 p-4"
//       >
//         {renderFields()}
//         <button onClick={handleSubmit} className="btn btn-primary mt-3">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;


//////////////////////////////////////////////////////////////////////////
// working to save layout

// import React, { useState, useEffect } from "react";
// import "./FormBuilder.css";

// const FormBuilder = () => {
//   const [fields, setFields] = useState([]);
//   const [formData, setFormData] = useState({});

//   // Load saved form data and form layout from localStorage on component mount
//   useEffect(() => {
//     const savedFormData = localStorage.getItem("formData");
//     const savedFormLayout = localStorage.getItem("formLayout");

//     if (savedFormData) {
//       setFormData(JSON.parse(savedFormData));
//     }

//     if (savedFormLayout) {
//       setFields(JSON.parse(savedFormLayout));
//     }
//   }, []);

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const field = event.dataTransfer.getData("field");
//     setFields((prevFields) => [...prevFields, field]);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     // Save form data and form layout to localStorage
//     localStorage.setItem("formData", JSON.stringify(formData));
//     localStorage.setItem("formLayout", JSON.stringify(fields));
//     console.log("Form Data:", formData);
//   };

//   const renderFields = () => {
//     return fields.map((field, index) => {
//       switch (field) {
//         case "input-text":
//           return (
//             <div key={index} className="form-field">
//               <label>Input Text</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 onChange={(event) =>
//                   handleInputChange("input-text", event.target.value)
//                 }
//                 value={formData["input-text"] || ""}
//               />
//             </div>
//           );
//         case "input-range":
//           return (
//             <div key={index} className="form-field">
//               <label>Input Range</label>
//               <input
//                 type="range"
//                 className="form-control"
//                 onChange={(event) =>
//                   handleInputChange("input-range", event.target.value)
//                 }
//                 value={formData["input-range"] || ""}
//               />
//             </div>
//           );
//         case "input-dropdown":
//           return (
//             <div key={index} className="form-field">
//               <label>Input Dropdown</label>
//               <select
//                 className="form-control"
//                 onChange={(event) =>
//                   handleInputChange("input-dropdown", event.target.value)
//                 }
//                 value={formData["input-dropdown"] || ""}
//               >
//                 <option value="option1">Option 1</option>
//                 <option value="option2">Option 2</option>
//                 <option value="option3">Option 3</option>
//               </select>
//             </div>
//           );
//         // Add other cases for the remaining fields...
//         default:
//           return null;
//       }
//     });
//   };

//   return (
//     <div className="form-builder container">
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         className="form-container border-warning w-75 p-4"
//       >
//         {renderFields()}
//         <button onClick={handleSubmit} className="btn btn-primary mt-3">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;
///////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import "./FormBuilder.css";

// const FormBuilder = ({ onSaveForm }) => {
//   const [fields, setFields] = useState([]);
//   const [formData, setFormData] = useState({});
//   const [formName, setFormName] = useState(""); // New state to store form name

//   useEffect(() => {
//     // Load saved form data and form layout from localStorage on component mount
//     const savedFormData = localStorage.getItem("formData");
//     const savedFormLayout = localStorage.getItem("formLayout");

//     if (savedFormData) {
//       setFormData(JSON.parse(savedFormData));
//     }

//     if (savedFormLayout) {
//       setFields(JSON.parse(savedFormLayout));
//     }
//   }, []);

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const field = event.dataTransfer.getData("field");
//     setFields((prevFields) => [...prevFields, field]);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     if (formName.trim() === "") {
//       alert("Please enter a form name before saving.");
//       return;
//     }

//     // Save form data and form layout to localStorage
//     localStorage.setItem("formData", JSON.stringify(formData));
//     localStorage.setItem("formLayout", JSON.stringify(fields));

//     // Save the form layout with the provided form name
//     onSaveForm(formName, fields);

//     console.log("Form Data:", formData);
//   };

//   const handleReset = () => {
//     // Clear the form data and form layout
//     setFields([]);
//     setFormData({});
//   };

//   const renderFields = () => {
//     return fields.map((field, index) => {
//       switch (field) {
//         case "input-text":
//           return (
//             <div key={index} className="form-field">
//               <label>Input Text</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 onChange={(event) =>
//                   handleInputChange("input-text", event.target.value)
//                 }
//                 value={formData["input-text"] || ""}
//               />
//             </div>
//           );
//         case "input-range":
//           return (
//             <div key={index} className="form-field">
//               <label>Input Range</label>
//               <input
//                 type="range"
//                 className="form-control"
//                 onChange={(event) =>
//                   handleInputChange("input-range", event.target.value)
//                 }
//                 value={formData["input-range"] || ""}
//               />
//             </div>
//           );
//         case "input-dropdown":
//           return (
//             <div key={index} className="form-field">
//               <label>Input Dropdown</label>
//               <select
//                 className="form-control"
//                 onChange={(event) =>
//                   handleInputChange("input-dropdown", event.target.value)
//                 }
//                 value={formData["input-dropdown"] || ""}
//               >
//                 <option value="option1">Option 1</option>
//                 <option value="option2">Option 2</option>
//                 <option value="option3">Option 3</option>
//               </select>
//             </div>
//           );
//         // Add other cases for the remaining fields...
//         default:
//           return null;
//       }
//     });
//   };

//   return (
//     <div className="form-builder container">
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         className="form-container border-warning w-75 p-4"
//       >
//         {renderFields()}
//         <div className="d-flex mt-3">
//           <input
//             type="text"
//             value={formName}
//             onChange={(e) => setFormName(e.target.value)}
//             placeholder="Enter Form Name"
//             className="form-control me-3"
//           />
//           <button onClick={handleSubmit} className="btn btn-primary">
//             Save Form
//           </button>
//           <button onClick={handleReset} className="btn btn-danger ms-3">
//             Reset Form
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;


///////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import "./FormBuilder.css";

// const FormBuilder = ({ onSaveForm, formLayout }) => {
//   const [fields, setFields] = useState([]);
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     if (formLayout) {
//       setFields(formLayout);
//     }
//   }, [formLayout]);

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const field = event.dataTransfer.getData("field");
//     setFields((prevFields) => [...prevFields, field]);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     onSaveForm("Form " + (fields.length + 1), fields);
//     setFields([]);
//     setFormData({});
//   };

//   const renderFields = () => {
//     return fields.map((field, index) => {
//       switch (field) {
//         case "input-text":
//           return (
//             <div key={index} className="form-field">
//               <label>Input Text</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 onChange={(event) =>
//                   handleInputChange("input-text", event.target.value)
//                 }
//               />
//             </div>
//           );
//         case "input-dropdown":
//           return (
//             <div key={index} className="form-field">
//               <label>Input Dropdown</label>
//               <select
//                 className="form-control"
//                 onChange={(event) =>
//                   handleInputChange("input-dropdown", event.target.value)
//                 }
//                 value={formData["input-dropdown"] || ""}
//               >
//                 <option value="option1">Option 1</option>
//                 <option value="option2">Option 2</option>
//                 <option value="option3">Option 3</option>
//               </select>
//             </div>
//           );
//         // Add other cases for other fields
//         default:
//           return null;
//       }
//     });
//   };

//   return (
//     <div className="form-builder container">
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         className="form-container border-warning w-75 p-4"
//       >
//         {renderFields()}
//         <button onClick={handleSubmit} className="btn btn-primary mt-3">
//           Save Form
//         </button>
//         <button
//           onClick={() => setFields([])}
//           className="btn btn-danger mt-3 ms-2"
//         >
//           Reset Form
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;

////////////////////////////////////////////////////////////////////////////////


// import React, { useState, useEffect } from "react";
// import "./FormBuilder.css";

// const FormBuilder = ({ onSaveForm, formLayout }) => {
//   const [fields, setFields] = useState([]);
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     if (formLayout) {
//       setFields(formLayout);
//     }
//   }, [formLayout]);

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const field = event.dataTransfer.getData("field");
//     setFields((prevFields) => [...prevFields, field]);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     onSaveForm("Form " + (fields.length + 1), fields);
//     setFields([]);
//     setFormData({});
//   };

//   const handleResetForm = () => {
//     setFields([]);
//     setFormData({});
//   };

//   const renderFields = () => {
//     return fields.map((field, index) => {
//       switch (field) {
//         case "input-text":
//           return (
//             <div key={index} className="form-field">
//               <label>Input Text</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 onChange={(event) =>
//                   handleInputChange("input-text", event.target.value)
//                 }
//               />
//             </div>
//           );
//         case "input-dropdown":
//           return (
//             <div key={index} className="form-field">
//               <label>Input Dropdown</label>
//               <select
//                 className="form-control"
//                 onChange={(event) =>
//                   handleInputChange("input-dropdown", event.target.value)
//                 }
//                 value={formData["input-dropdown"] || ""}
//               >
//                 <option value="option1">Option 1</option>
//                 <option value="option2">Option 2</option>
//                 <option value="option3">Option 3</option>
//               </select>
//             </div>
//           );
//         // Add other cases for other fields
//         default:
//           return null;
//       }
//     });
//   };

//   return (
//     <div className="form-builder container">
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         className="form-container border-warning w-75 p-4"
//       >
//         {renderFields()}
//         <div className="form-buttons">
//           <button onClick={handleSubmit} className="btn btn-primary">
//             Save Form
//           </button>
//           <button onClick={handleResetForm} className="btn btn-danger ms-2">
//             Reset Form
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;
////////////////////////////////////////////////
// 21 4.13

// import React, { useState, useEffect } from "react";
// import "./FormBuilder.css";

// const FormBuilder = ({ onSaveForm, formLayout }) => {
//   const [fields, setFields] = useState([]);
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     if (formLayout) {
//       setFields(formLayout);
//     }
//   }, [formLayout]);

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const field = event.dataTransfer.getData("field");
//     setFields((prevFields) => [...prevFields, field]);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     onSaveForm("Form " + (fields.length + 1), fields);
//     setFields([]);
//     setFormData({});
//     logFormValues(); 
//   };

//   const handleResetForm = () => {
//     setFields([]);
//     setFormData({});
//   };

  // const renderFields = () => {
  //   return fields.map((field, index) => {
  //     switch (field) {
  //       case "input-text":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input Text</label>
  //             <input
  //               type="text"
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-text", event.target.value)
  //               }
  //             />
  //           </div>
  //         );

  //       case "input-range":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input Range</label>
  //             <input
  //               type="range"
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-range", event.target.value)
  //               }
  //             />
  //           </div>
  //         );
  //       case "input-dropdown":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input Dropdown</label>
  //             <select
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-dropdown", event.target.value)
  //               }
  //             >
  //               <option value="option1">Option 1</option>
  //               <option value="option2">Option 2</option>
  //               <option value="option3">Option 3</option>
  //             </select>
  //           </div>
  //         );
  //       case "input-email":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input Email</label>
  //             <input
  //               type="email"
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-email", event.target.value)
  //               }
  //             />
  //           </div>
  //         );

  //       case "input-file":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input File</label>
  //             <input
  //               type="file"
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-file", event.target.value)
  //               }
  //             />
  //           </div>
  //         );
  //       case "input-select":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input Select</label>
  //             <select
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-select", event.target.value)
  //               }
  //             >
  //               <option value="option1">Option 1</option>
  //               <option value="option2">Option 2</option>
  //               <option value="option3">Option 3</option>
  //             </select>
  //           </div>
  //         );
  //       case "input-number":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input Number</label>
  //             <input
  //               type="number"
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-number", event.target.value)
  //               }
  //             />
  //           </div>
  //         );
  //       case "input-password":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input password</label>
  //             <input
  //               type="password"
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-password", event.target.value)
  //               }
  //             />
  //           </div>
  //         );
  //       case "input-checkbox":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input checkbox</label>
  //             <input
  //               type="checkbox"
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-checkbox", event.target.value)
  //               }
  //             />
  //           </div>
  //         );
  //       case "input-color":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input color</label>
  //             <input
  //               type="color"
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-color", event.target.value)
  //               }
  //             />
  //           </div>
  //         );
  //       // Add other cases for other fields
  //       default:
  //         return null;
  //     }
  //   });
  // };

//   const logFormValues = () => {
//     for (const field in formData) {
//       console.log(`${field}: ${formData[field]}`);
//     }
//   };

//   return (
//     <div className="form-builder container">
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         className="form-container border-warning w-75 p-4"
//       >
//         {renderFields()}
//         <div className="form-buttons">
//           <button onClick={handleSubmit} className="btn btn-primary">
//             Save Form
//           </button>
//           <button onClick={handleResetForm} className="btn btn-danger ms-2">
//             Reset Form
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;


////////////////////////////////////////////////////////////////
//21 4.35

// import React, { useState, useEffect } from "react";
// import "./FormBuilder.css";

// const FormBuilder = ({ onSaveForm, formLayout }) => {
//   const [fields, setFields] = useState([]);
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     if (formLayout) {
//       setFields(formLayout);
//     }
//   }, [formLayout]);

//   useEffect(() => {
//     loadSavedForm();
//   }, []);

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const field = event.dataTransfer.getData("field");
//     setFields((prevFields) => [...prevFields, field]);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     const formName = "Form " + (fields.length + 1);
//     onSaveForm(formName, fields);
//     saveFormToLocalStorage(formName, fields);
//     setFields([]);
//     setFormData({});
//     logFormValues();
//   };

//   const handleResetForm = () => {
//     setFields([]);
//     setFormData({});
//   };

  // const renderFields = () => {
  //   return fields.map((field, index) => {
  //     switch (field) {
  //       case "input-text":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input Text</label>
  //             <input
  //               type="text"
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-text", event.target.value)
  //               }
  //             />
  //           </div>
  //         );

  //       case "input-range":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input Range</label>
  //             <input
  //               type="range"
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-range", event.target.value)
  //               }
  //             />
  //           </div>
  //         );
  //       case "input-dropdown":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input Dropdown</label>
  //             <select
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-dropdown", event.target.value)
  //               }
  //             >
  //               <option value="option1">Option 1</option>
  //               <option value="option2">Option 2</option>
  //               <option value="option3">Option 3</option>
  //             </select>
  //           </div>
  //         );
  //       case "input-email":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input Email</label>
  //             <input
  //               type="email"
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-email", event.target.value)
  //               }
  //             />
  //           </div>
  //         );

  //       case "input-file":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input File</label>
  //             <input
  //               type="file"
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-file", event.target.value)
  //               }
  //             />
  //           </div>
  //         );
  //       case "input-select":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input Select</label>
  //             <select
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-select", event.target.value)
  //               }
  //             >
  //               <option value="option1">Option 1</option>
  //               <option value="option2">Option 2</option>
  //               <option value="option3">Option 3</option>
  //             </select>
  //           </div>
  //         );
  //       case "input-number":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input Number</label>
  //             <input
  //               type="number"
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-number", event.target.value)
  //               }
  //             />
  //           </div>
  //         );
  //       case "input-password":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input password</label>
  //             <input
  //               type="password"
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-password", event.target.value)
  //               }
  //             />
  //           </div>
  //         );
  //       case "input-checkbox":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input checkbox</label>
  //             <input
  //               type="checkbox"
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-checkbox", event.target.value)
  //               }
  //             />
  //           </div>
  //         );
  //       case "input-color":
  //         return (
  //           <div key={index} className="form-field">
  //             <label>Input color</label>
  //             <input
  //               type="color"
  //               className="form-control"
  //               onChange={(event) =>
  //                 handleInputChange("input-color", event.target.value)
  //               }
  //             />
  //           </div>
  //         );
  //       // Add other cases for other fields
  //       default:
  //         return null;
  //     }
  //   });
  // };


//   const logFormValues = () => {
//     for (const field in formData) {
//       console.log(`${field}: ${formData[field]}`);
//     }
//   };

//   const saveFormToLocalStorage = (formName, formLayout) => {
//     const savedForms = JSON.parse(localStorage.getItem("savedForms")) || {};
//     savedForms[formName] = formLayout;
//     localStorage.setItem("savedForms", JSON.stringify(savedForms));
//   };

//   const loadSavedForm = () => {
//     const savedForms = JSON.parse(localStorage.getItem("savedForms")) || {};
//     const formNames = Object.keys(savedForms);
//     if (formNames.length > 0) {
//       const lastFormName = formNames[formNames.length - 1];
//       setFields(savedForms[lastFormName]);
//     }
//   };

//   return (
//     <div className="form-builder container">
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         className="form-container border-warning w-75 p-4"
//       >
//         {renderFields()}
//         <div className="form-buttons">
//           <button onClick={handleSubmit} className="btn btn-primary">
//             Save Form
//           </button>
//           <button onClick={handleResetForm} className="btn btn-danger ms-2">
//             Reset Form
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;


///////////////////////////////////////////////////////////////
// 21 4.50

// import React, { useState, useEffect } from "react";
// import "./FormBuilder.css";

// const FormBuilder = ({ onSaveForm, formLayout }) => {
//   const [fields, setFields] = useState([]);
//   const [formData, setFormData] = useState({});
//   const [formName, setFormName] = useState("");

//   useEffect(() => {
//     if (formLayout) {
//       setFields(formLayout);
//     }
//   }, [formLayout]);

//   useEffect(() => {
//     loadSavedForm();
//   }, []);

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const field = event.dataTransfer.getData("field");
//     setFields((prevFields) => [...prevFields, field]);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [field]: value,
//     }));
//   };

//   const handleFormNameChange = (event) => {
//     setFormName(event.target.value);
//   };

//   const handleSubmit = () => {
//     onSaveForm(formName, fields);
//     saveFormToLocalStorage(formName, fields);
//     setFields([]);
//     setFormData({});
//     setFormName("");
//     logFormValues();
//   };

//   const handleResetForm = () => {
//     setFields([]);
//     setFormData({});
//     setFormName("");
//   };

//    const renderFields = () => {
//      return fields.map((field, index) => {
//        switch (field) {
//          case "input-text":
//            return (
//              <div key={index} className="form-field">
//                <label>Input Text</label>
//                <input
//                  type="text"
//                  className="form-control"
//                  onChange={(event) =>
//                    handleInputChange("input-text", event.target.value)
//                  }
//                />
//              </div>
//            );

//          case "input-range":
//            return (
//              <div key={index} className="form-field">
//                <label>Input Range</label>
//                <input
//                  type="range"
//                  className="form-control"
//                  onChange={(event) =>
//                    handleInputChange("input-range", event.target.value)
//                  }
//                />
//              </div>
//            );
//          case "input-dropdown":
//            return (
//              <div key={index} className="form-field">
//                <label>Input Dropdown</label>
//                <select
//                  className="form-control"
//                  onChange={(event) =>
//                    handleInputChange("input-dropdown", event.target.value)
//                  }
//                >
//                  <option value="option1">Option 1</option>
//                  <option value="option2">Option 2</option>
//                  <option value="option3">Option 3</option>
//                </select>
//              </div>
//            );
//          case "input-email":
//            return (
//              <div key={index} className="form-field">
//                <label>Input Email</label>
//                <input
//                  type="email"
//                  className="form-control"
//                  onChange={(event) =>
//                    handleInputChange("input-email", event.target.value)
//                  }
//                />
//              </div>
//            );

//          case "input-file":
//            return (
//              <div key={index} className="form-field">
//                <label>Input File</label>
//                <input
//                  type="file"
//                  className="form-control"
//                  onChange={(event) =>
//                    handleInputChange("input-file", event.target.value)
//                  }
//                />
//              </div>
//            );
//          case "input-select":
//            return (
//              <div key={index} className="form-field">
//                <label>Input Select</label>
//                <select
//                  className="form-control"
//                  onChange={(event) =>
//                    handleInputChange("input-select", event.target.value)
//                  }
//                >
//                  <option value="option1">Option 1</option>
//                  <option value="option2">Option 2</option>
//                  <option value="option3">Option 3</option>
//                </select>
//              </div>
//            );
//          case "input-number":
//            return (
//              <div key={index} className="form-field">
//                <label>Input Number</label>
//                <input
//                  type="number"
//                  className="form-control"
//                  onChange={(event) =>
//                    handleInputChange("input-number", event.target.value)
//                  }
//                />
//              </div>
//            );
//          case "input-password":
//            return (
//              <div key={index} className="form-field">
//                <label>Input password</label>
//                <input
//                  type="password"
//                  className="form-control"
//                  onChange={(event) =>
//                    handleInputChange("input-password", event.target.value)
//                  }
//                />
//              </div>
//            );
//          case "input-checkbox":
//            return (
//              <div key={index} className="form-field">
//                <label>Input checkbox</label>
//                <input
//                  type="checkbox"
//                  className="form-control"
//                  onChange={(event) =>
//                    handleInputChange("input-checkbox", event.target.value)
//                  }
//                />
//              </div>
//            );
//          case "input-color":
//            return (
//              <div key={index} className="form-field">
//                <label>Input color</label>
//                <input
//                  type="color"
//                  className="form-control"
//                  onChange={(event) =>
//                    handleInputChange("input-color", event.target.value)
//                  }
//                />
//              </div>
//            );
//          // Add other cases for other fields
//          default:
//            return null;
//        }
//      });
//    };


//   const logFormValues = () => {
//     for (const field in formData) {
//       console.log(`${field}: ${formData[field]}`);
//     }
//   };

//   const saveFormToLocalStorage = (formName, formLayout) => {
//     const savedForms = JSON.parse(localStorage.getItem("savedForms")) || {};
//     savedForms[formName] = formLayout;
//     localStorage.setItem("savedForms", JSON.stringify(savedForms));
//   };

//   const loadSavedForm = () => {
//     const savedForms = JSON.parse(localStorage.getItem("savedForms")) || {};
//     const formNames = Object.keys(savedForms);
//     if (formNames.length > 0) {
//       const lastFormName = formNames[formNames.length - 1];
//       setFields(savedForms[lastFormName]);
//     }
//   };

//   return (
//     <div className="form-builder container">
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         className="form-container border-warning w-75 p-4"
//       >
//         {renderFields()}
//         <div className="form-buttons">
//           <div className="form-group">
//             <label htmlFor="formName">Form Name:</label>
//             <input
//               type="text"
//               id="formName"
//               className="form-control"
//               value={formName}
//               onChange={handleFormNameChange}
//             />
//           </div>
//           <button onClick={handleSubmit} className="btn btn-primary">
//             Save Form
//           </button>
//           <button onClick={handleResetForm} className="btn btn-danger ms-2">
//             Reset Form
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;

//////////////////////////////////////////////////////////////////
// 21 10.51
// FormBuilder.js


import React, { useState, useEffect } from "react";
import "./FormBuilder.css";

const FormBuilder = ({ onSaveForm, formLayout }) => {
  // input fileds ke name
  const [fields, setFields] = useState([]);
  // input data
  const [formData, setFormData] = useState({});
  // save form forname ka name
  const [formName, setFormName] = useState("");

  // ager koi layout saved h to
  useEffect(() => {
    if (formLayout) {
      setFields(formLayout);
    }
  }, [formLayout]);

// site pr phli bar aane pr
  useEffect(() => {
    loadSavedForm();
  }, []);
// drop value aane pr
  const handleDrop = (event) => {
    event.preventDefault();
    const field = event.dataTransfer.getData("field");
    // state per fild type set krna
    setFields((prevFields) => [...prevFields, { type: field, label: field }]);
  };

  // drop over hone per
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // data input krne pr
  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleFormNameChange = (event) => {
    setFormName(event.target.value);
  };

  const handleFieldLabelChange = (index, newLabel) => {
    const updatedFields = [...fields];
    updatedFields[index].label = newLabel;
    setFields(updatedFields);
  };

  const handleSubmit = () => {
    onSaveForm(formName, fields);
    saveFormToLocalStorage(formName, fields);
    setFields([]);
    setFormData({});
    setFormName("");
    logFormValues();
  };

  const handleResetForm = () => {
    setFields([]);
    setFormData({});
    setFormName("");
  };

  const renderFields = () => {
    return fields.map((field, index) => {
      return (
        <div key={index} className="form-field">
          <label
            onDoubleClick={() => {
              const newLabel = prompt("Enter new label:", field.label);
              if (newLabel) {
                handleFieldLabelChange(index, newLabel);
              }
            }}
          >
            {field.label}
          </label>
          {renderInput(field, index)}
        </div>
      );
    });
  };

  const renderInput = (field, index) => {
    switch (field.type) {
      case "input-text":
        return (
          <input
            type="text"
            className="form-control"
            onChange={(event) =>
              handleInputChange(field.type, event.target.value)
            }
          />
        );

      // Rest of the cases for other field types...

      default:
        return null;
    }
  };

  const logFormValues = () => {
    for (const field in formData) {
      console.log(`${field}: ${formData[field]}`);
    }
  };

  const saveFormToLocalStorage = (formName, formLayout) => {
    const savedForms = JSON.parse(localStorage.getItem("savedForms")) || {};
    savedForms[formName] = formLayout;
    localStorage.setItem("savedForms", JSON.stringify(savedForms));
  };

  const loadSavedForm = () => {
    const savedForms = JSON.parse(localStorage.getItem("savedForms")) || {};
    const formNames = Object.keys(savedForms);
    if (formNames.length > 0) {
      const lastFormName = formNames[formNames.length - 1];
      setFormName(lastFormName);
      setFields(savedForms[lastFormName]);
    }
  };

  return (
    <div className="form-builder container">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="form-container border-warning w-75 p-4"
      >
        {renderFields()}
        <div className="form-buttons">
          <div className="form-group">
            <label htmlFor="formName">Form Name:</label>
            <input
              type="text"
              id="formName"
              className="form-control"
              value={formName}
              onChange={handleFormNameChange}
            />
          </div>
          <button onClick={handleSubmit} className="btn btn-primary">
            Save Form
          </button>
          <button onClick={handleResetForm} className="btn btn-danger ms-2">
            Reset Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;

