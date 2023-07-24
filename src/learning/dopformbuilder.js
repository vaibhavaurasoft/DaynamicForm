// import React, { useState, useEffect } from "react";

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

////////////////////////////////////////////////////////////////////////
// understanding
