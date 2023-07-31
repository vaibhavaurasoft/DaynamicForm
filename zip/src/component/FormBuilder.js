// import React, { useState, useEffect } from "react";
// import "./FormBuilder.css";
// import api from "../api/api";

// const FormBuilder = ({ onSaveForm, formLayout }) => {
//   const [fields, setFields] = useState([]);
//   const [formData, setFormData] = useState({});
//   const [formName, setFormName] = useState("");
//   const [layoutName, setLayoutName] = useState("hdfc");
//   const [layouts, setLayouts] = useState([]);
//   const [selectedLayout, setSelectedLayout] = useState(null);
//   var stepname = localStorage.getItem("activeStep");

// const handleSaveLayout = async () => {
//   try {
//     // Fetch layouts data from local storage
//     const storedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");

//     // Prepare the layout object to save
//     const layoutToSave = {
//       name: layoutName,
//       fields: fields.map((field) => ({ ...field })), // Create a copy of fields to avoid references
//     };

//     if (stepname === "4") {
//       // Save the layout for the current step in the backend
//       await api.post("/formlayout", {
//         formName: formName,
//         step: parseInt(stepname),
//         layoutName,
//         formData: layoutToSave,
//         layouts: storedLayouts, // Include the layouts data in the request body
//       });
//     }

//     // Save the layout for the current step in local storage
//     const newLayouts = [...storedLayouts];
//     // newLayouts.push({
//     //   // step: stepname,
//     //   // ...layoutToSave,
//     // });
//     localStorage.setItem("layouts", JSON.stringify(newLayouts));

//     onSaveForm(formName, fields);
//   } catch (error) {
//     console.error("Error saving layout:", error);
//   }
// };
//   // Function to handle loading a layout
//   const handleLoadLayout = async (layout) => {
//     try {
//       const response = await api.get(`/formlayout/${layout._id}`);
//       const loadedLayout = response.data.data.fields;

//       // Set the formName state with the loaded layout's formName
//       setFormName(loadedLayout.formName);

//       // Set the fields state with the loaded layout's fields
//       setFields(loadedLayout.formData.fields.map((field) => ({ ...field })));
//     } catch (error) {
//       console.error("Error loading layout:", error);
//     }
//   };

//   // Function to delete all layouts (clears local storage and reloads the page)
//   const deleteAllLayout = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   // Effect hook to fetch layouts for the current step when the component mounts or formLayout/stepname changes
//   useEffect(() => {
//     const fetchLayouts = async () => {
//       try {
//         // Fetch layouts for the current step from the backend
//         const response = await api.get("/formlayout");
//         if (response.status === 200) {
//           const data = response.data.data;
//           // Filter layouts for the current step
//           const filteredLayouts = data.filter(
//             (layout) => layout.step === parseInt(stepname)
//           );
//           setLayouts(data);

//           // // Fetch fields for the selected layout (if any)
//           // const initialLayout = filteredLayouts.find(
//           //   (layout) => layout.name === formLayout
//           // );
//           // if (initialLayout) {
//           //   setSelectedLayout(initialLayout);
//           //   setFields(initialLayout.fields);
//           //   setFormName(initialLayout.name);
//           //   setLayoutName(initialLayout.layoutName);
//           // }
//         } else {
//           console.error("Failed to fetch layouts");
//         }
//       } catch (error) {
//         console.error("Error fetching layouts:", error);
//       }
//     };

//     fetchLayouts();
//   }, [formLayout, stepname]);

//   // Function to handle dropping a field on the form container
//   const handleDrop = (event) => {
//     event.preventDefault();
//     const field = event.dataTransfer.getData("field");
//     setFields((prevFields) => [...prevFields, { type: field, label: field }]);
//   };

//   // Function to handle input change for form fields
//   const handleInputChange = (field, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [field]: value,
//     }));
//   };

// // Function to handle form name change
// const handleFormNameChange = (event) => {
//   setFormName(event.target.value);
// };

// // Function to handle changing field label
// const handleFieldLabelChange = (index, newLabel) => {
//   const updatedFields = [...fields];
//   updatedFields[index].label = newLabel;
//   setFields(updatedFields);
// };

// // Function to handle updating option name for dropdown fields
// const handleUpdateOptionName = (index, optionIndex, newOptionName) => {
//   const updatedFields = [...fields];
//   if (updatedFields[index].options) {
//     updatedFields[index].options[optionIndex] = newOptionName;
//   } else {
//     updatedFields[index].options = [newOptionName];
//   }
//   setFields(updatedFields);
// };

// // Function to handle drag over the form container
// const handleDragOver = (event) => {
//   event.preventDefault();
// };

// // Function to handle adding an option for dropdown fields
// const handleAddOption = (index) => {
//   const updatedFields = [...fields];
//   if (!updatedFields[index].options) {
//     updatedFields[index].options = [];
//   }
//   updatedFields[index].options.push("New Option");
//   setFields(updatedFields);
// };

// // Effect hook (empty dependency array) to perform side effect (fetching layouts) only once on component mount
// useEffect(() => {}, [handleSaveLayout, stepname]);

// // Function to render the form fields
// const renderFields = () => {
//   return fields.map((field, index) => {
//     return (
//       <div key={index} className="form-field">
//         <label
//           onDoubleClick={() => {
//             const newLabel = prompt("Enter new label:", field.label);
//             if (newLabel) {
//               handleFieldLabelChange(index, newLabel);
//             }
//           }}
//         >
//           {field.label}
//         </label>
//         {renderInput(field, index, field.label)}
//       </div>
//     );
//   });
// };

// // Function to render the input element based on field type
// const renderInput = (field, index, label) => {
//   switch (field.type) {
//     case "input-text":
//       return (
//         <input
//           type="text"
//           name={label}
//           className="form-control"
//           onChange={(event) => handleInputChange(label, event.target.value)}
//         />
//       );
//     case "input-file":
//       return (
//         <input
//           type="file"
//           name={label}
//           className="form-control"
//           onChange={(event) => handleInputChange(label, event.target.value)}
//         />
//       );
//     case "input-dropdown":
//       return (
//         <div key={index} className="form-field">
//           <label>Input Dropdown</label>
//           <select
//             className="form-control"
//             onChange={(event) =>
//               handleInputChange(
//                 "input-dropdown",
//                 event.target.value,
//                 field.label
//               )
//             }
//           >
//             {field.options?.map((option, optionIndex) => (
//               <option key={optionIndex} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//           <button
//             className="btn btn-sm btn-secondary ms-2"
//             onClick={() => {
//               const newOptionName = prompt(
//                 "Enter new option name:",
//                 field.options?.[0]
//               );
//               if (newOptionName) {
//                 handleUpdateOptionName(index, 0, newOptionName);
//               }
//             }}
//           >
//             Edit Option
//           </button>
//           <button
//             className="btn btn-sm btn-success ms-2"
//             onClick={() => handleAddOption(index)}
//           >
//             Add Option
//           </button>
//           {/* Render additional "Edit Option" buttons for other options */}
//           {field.options?.map((option, optionIndex) => (
//             <button
//               key={optionIndex}
//               className="btn btn-sm btn-secondary ms-2"
//               onClick={() => {
//                 const newOptionName = prompt(
//                   "Enter new option name:",
//                   option
//                 );
//                 if (newOptionName) {
//                   handleUpdateOptionName(index, optionIndex, newOptionName);
//                 }
//               }}
//             >
//               Edit Option {optionIndex + 1}
//             </button>
//           ))}
//         </div>
//       );
//     // Add cases for other field types here...
//     default:
//       return null;
//   }
// };

// // Function to handle saving the form data
// const handleSaveData = async () => {
//   try {
//     // Prepare the data to save
//     const dataToSave = {
//       formName: formName,
//       formData: { ...formData }, // Create a copy of formData to avoid references
//     };

//     // Make the API request to save the form data
//     await api.post("/formdata", dataToSave);

//     // You can add any additional logic you want to perform after saving the data here

//     console.log("Form data saved successfully!");
//   } catch (error) {
//     console.error("Error saving form data:", error);
//   }
// };

// // Function to reset the form fields and data
// const handleResetForm = () => {
//   setFields([]);
//   setFormData({});
//   setFormName("");
// };

//   // JSX to render the FormBuilder component
//   return (
//     <div className="form-builder container">
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         className="form-container border-warning w-75 p-4"
//       >
//         {/* Render form fields */}
//         {renderFields()}

//         {/* Render form buttons */}
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
//           <button onClick={handleResetForm} className="btn btn-danger ms-2">
//             Reset Form
//           </button>
//         </div>

//         {/* Save Layout */}
//         <div className="m-3 d-flex justify-content-between ">
//           <input
//             type="text"
//             placeholder="Enter layout name"
//             value={layoutName}
//             onChange={(e) => setLayoutName(e.target.value)}
//           />
//           <button onClick={handleSaveLayout} className="btn btn-primary">
//             Save Layout
//           </button>
//         </div>

//         {/* Log Data */}
//         <button onClick={handleSaveData} className="btn btn-info ms-2">
//           Log Data
//         </button>

//         {/* Display saved layouts */}
//         <div>
//           <h4>Saved Layouts:</h4>
//           <ul>
//             {layouts.map((layout, index) => (
//               <li key={index}>
//                 <button
//                   className="btn btn-warning m-1"
//                   onClick={() => handleLoadLayout(layout)}
//                 >
//                   {layout.layoutName}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Delete All Layouts */}
//         {layouts.length > 0 && (
//           <div className="d-flex ">
//             <button onClick={deleteAllLayout} className="btn btn-danger">
//               Delete All Layout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// vaibhav

// import React, { useState, useEffect } from "react";
// import "./FormBuilder.css";
// import api from "../api/api";

// const FormBuilder = ({ onSaveForm, formLayout }) => {
//   const [fields, setFields] = useState([]);
//   const [formName, setFormName] = useState("");
//   const [layoutName, setLayoutName] = useState("hdfc");
//   const [formData, setFormData] = useState();
//   const [layouts, setLayouts] = useState([]);
//   const stepname = localStorage.getItem("activeStep");

//   // const handleSaveLayout = async () => {
//   //   try {
//   //     const storedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");

//   //     const layoutToSave = {
//   //       name: layoutName,
//   //       fields: fields.map((field) => ({ ...field })),
//   //     };

//   //     if (stepname === "4") {
//   //       await api.post("/formlayout", {
//   //         formName: formName,
//   //         step: parseInt(stepname),
//   //         layoutName,
//   //         formData: layoutToSave,
//   //         layouts: storedLayouts,
//   //       });
//   //     }

//   //     const newLayouts = [...storedLayouts];

//   //     localStorage.setItem("layouts", JSON.stringify(newLayouts));

//   //     onSaveForm(formName, fields);
//   //   } catch (error) {
//   //     console.error("Error saving layout:", error);
//   //   }
//   // };
//   const handleSaveLayout = async () => {
//     try {
//       const storedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");

//       const layoutToSave = {
//         name: layoutName,
//         fields: fields.map((field) => ({ ...field })),
//       };

//       setFormData(layoutToSave); // Add this line to set the formData state

//       if (stepname === "4") {
//         await api.post("/formlayout", {
//           formName: formName,
//           step: parseInt(stepname),
//           layoutName,
//           formData: layoutToSave,
//           layouts: storedLayouts,
//         });

//       }

//       const newLayouts = [...storedLayouts];

//       localStorage.setItem("layouts", JSON.stringify(newLayouts));

//       onSaveForm(formName, fields);
//     } catch (error) {
//       console.error("Error saving layout:", error);
//     }
//   };
//   const handleLoadLayout = async (layout) => {
//     try {
//       const response = await api.get(`/formlayout/${layout._id}`);
//       const loadedLayout = response.data.data;

//       // Set the formName state with the loaded layout's formName
//       setFormName(loadedLayout.formName);

//       // Set the fields state with the loaded layout's fields
//       setFields(loadedLayout.fields.map((field) => ({ ...field })));

//       // Set the layoutName state with the loaded layout's name
//       setLayoutName(loadedLayout.name);
//     } catch (error) {
//       console.error("Error loading layout:", error);
//     }
//   };

//   // working fine not i want that

//   const deleteAllLayout = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   // useEffect(() => {
//   //   const fetchLayouts = async () => {
//   //     try {
//   //       const response = await api.get("/formlayout");
//   //       if (response.status === 200) {
//   //         const data = response.data.data;
//   //         setLayouts(data);
//   //       } else {
//   //         console.error("Failed to fetch layouts");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching layouts:", error);
//   //     }
//   //   };

//   //   fetchLayouts();
//   // }, [formLayout, stepname]);
//   useEffect(() => {
//     const fetchLayouts = async () => {
//       try {
//         const response = await api.get("/formlayout");
//         if (response.status === 200) {
//           const data = response.data.data;
//           // Filter layouts for the current step
//           const filteredLayouts = data.filter(
//             (layout) => layout.step === stepname
//           );
//           setLayouts(filteredLayouts);
//         } else {
//           console.error("Failed to fetch layouts");
//         }
//       } catch (error) {
//         console.error("Error fetching layouts:", error);
//       }
//     };

//     fetchLayouts();
//   }, [stepname]);

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const field = event.dataTransfer.getData("field");
//     setFields((prevFields) => [...prevFields, { type: field, label: field }]);
//   };

//   const handleInputChange = (field, value) => {
//     setFormName((prevFormData) => ({
//       ...prevFormData,
//       [field]: value,
//     }));
//   };

//   // Function to handle form name change
//   const handleFormNameChange = (event) => {
//     setFormName(event.target.value);
//   };

//   // Function to handle changing field label
//   const handleFieldLabelChange = (index, newLabel) => {
//     const updatedFields = [...fields];
//     updatedFields[index].label = newLabel;
//     setFields(updatedFields);
//   };

//   // Function to handle updating option name for dropdown fields
//   const handleUpdateOptionName = (index, optionIndex, newOptionName) => {
//     const updatedFields = [...fields];
//     if (updatedFields[index].options) {
//       updatedFields[index].options[optionIndex] = newOptionName;
//     } else {
//       updatedFields[index].options = [newOptionName];
//     }
//     setFields(updatedFields);
//   };

//   // Function to handle drag over the form container
//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   // Function to handle adding an option for dropdown fields
//   const handleAddOption = (index) => {
//     const updatedFields = [...fields];
//     if (!updatedFields[index].options) {
//       updatedFields[index].options = [];
//     }
//     updatedFields[index].options.push("New Option");
//     setFields(updatedFields);
//   };

//   // Effect hook (empty dependency array) to perform side effect (fetching layouts) only once on component mount
//   useEffect(() => {}, [handleSaveLayout, stepname]);

//   // Function to render the form fields
//   const renderFields = () => {
//     return fields.map((field, index) => {
//       return (
//         <div key={index} className="form-field">
//           <label
//             onDoubleClick={() => {
//               const newLabel = prompt("Enter new label:", field.label);
//               if (newLabel) {
//                 handleFieldLabelChange(index, newLabel);
//               }
//             }}
//           >
//             {field.label}
//           </label>
//           {renderInput(field, index, field.label)}
//         </div>
//       );
//     });
//   };

//   // Function to render the input element based on field type
//   const renderInput = (field, index, label) => {
//     switch (field.type) {
//       case "input-text":
//         return (
//           <input
//             type="text"
//             name={label}
//             className="form-control"
//             onChange={(event) => handleInputChange(label, event.target.value)}
//           />
//         );
//       case "input-file":
//         return (
//           <input
//             type="file"
//             name={label}
//             className="form-control"
//             onChange={(event) => handleInputChange(label, event.target.value)}
//           />
//         );
//       case "input-dropdown":
//         return (
//           <div key={index} className="form-field">
//             <label>Input Dropdown</label>
//             <select
//               className="form-control"
//               onChange={(event) =>
//                 handleInputChange(
//                   "input-dropdown",
//                   event.target.value,
//                   field.label
//                 )
//               }
//             >
//               {field.options?.map((option, optionIndex) => (
//                 <option key={optionIndex} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//             <button
//               className="btn btn-sm btn-secondary ms-2"
//               onClick={() => {
//                 const newOptionName = prompt(
//                   "Enter new option name:",
//                   field.options?.[0]
//                 );
//                 if (newOptionName) {
//                   handleUpdateOptionName(index, 0, newOptionName);
//                 }
//               }}
//             >
//               Edit Option
//             </button>
//             <button
//               className="btn btn-sm btn-success ms-2"
//               onClick={() => handleAddOption(index)}
//             >
//               Add Option
//             </button>
//             {/* Render additional "Edit Option" buttons for other options */}
//             {field.options?.map((option, optionIndex) => (
//               <button
//                 key={optionIndex}
//                 className="btn btn-sm btn-secondary ms-2"
//                 onClick={() => {
//                   const newOptionName = prompt(
//                     "Enter new option name:",
//                     option
//                   );
//                   if (newOptionName) {
//                     handleUpdateOptionName(index, optionIndex, newOptionName);
//                   }
//                 }}
//               >
//                 Edit Option {optionIndex + 1}
//               </button>
//             ))}
//           </div>
//         );
//       // Add cases for other field types here...
//       default:
//         return null;
//     }
//   };

//   // Function to handle saving the form data
//   const handleSaveData = async () => {
//     try {
//       // Prepare the data to save
//       const dataToSave = {
//         formName: formName,
//         formData: { ...formData }, // Create a copy of formData to avoid references
//       };

//       // Make the API request to save the form data
//       await api.post("/formdata", dataToSave);

//       // You can add any additional logic you want to perform after saving the data here

//       console.log("Form data saved successfully!");
//     } catch (error) {
//       console.error("Error saving form data:", error);
//     }
//   };

//   // Function to reset the form fields and data
//   const handleResetForm = () => {
//     setFields([]);
//     setFormData({});
//     setFormName("");
//   };

//   return (
//     <div className="form-builder container">
//       <div
//         onDrop={handleDrop}
//         onDragOver={(event) => event.preventDefault()}
//         className="form-container border-warning w-75 p-4"
//       >
//         {/* Render form fields */}
//         {fields.map((field, index) => (
//           <div key={index} className="form-field">
//             <label
//               onDoubleClick={() => {
//                 const newLabel = prompt("Enter new label:", field.label);
//                 if (newLabel) {
//                   handleFieldLabelChange(index, newLabel);
//                 }
//               }}
//             >
//               {field.label}
//             </label>
//             {renderInput(field, index, field.label)}
//           </div>
//         ))}

//         {/* Render form buttons */}
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
//           <button onClick={handleResetForm} className="btn btn-danger ms-2">
//             Reset Form
//           </button>
//         </div>

//         {/* Save Layout */}
//         <div className="m-3 d-flex justify-content-between ">
//           <input
//             type="text"
//             placeholder="Enter layout name"
//             value={layoutName}
//             onChange={(e) => setLayoutName(e.target.value)}
//           />
//           <button onClick={handleSaveLayout} className="btn btn-primary">
//             Save Layout
//           </button>
//         </div>

//         {/* Log Data */}
//         <button onClick={handleSaveData} className="btn btn-info ms-2">
//           Log Data
//         </button>

//         {/* Display saved layouts */}
//         <div>
//           <h4>Saved Layouts:</h4>
//           <ul>
//             {layouts.map((layout, index) => (
//               <li key={index}>
//                 <button
//                   className="btn btn-warning m-1"
//                   onClick={() => handleLoadLayout(layout)}
//                 >
//                   {layout.name}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Delete All Layouts */}
//         {layouts.length > 0 && (
//           <div className="d-flex ">
//             <button onClick={deleteAllLayout} className="btn btn-danger">
//               Delete All Layout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;

////////////////////////////////////////////////////////////////////////////////////////
// It is working properly.  There is a function in this court in which we show the name of all the saved forms and on click on the name of those forms we set the fields of the form, now I want you to take this code and create a function with the latest saver form.  Create a new page so whenever I come to the website first of all I should see whatever form I have saved after that now another option should appear ad form and if I click on any saved word form then all the friends of the phone  set in the form here is my code

// import React, { useState, useEffect } from "react";
// import "./FormBuilder.css";
// import api from "../api/api";

// const FormBuilder = ({ onSaveForm, formLayout }) => {
//   const [fields, setFields] = useState([]);
//   const [formName, setFormName] = useState("");
//   const [layoutName, setLayoutName] = useState("");
//   const [formData, setFormData] = useState();
//   const [layouts, setLayouts] = useState([]);
//   const stepname = localStorage.getItem("activeStep");

//   // const handleSaveLayout = async () => {
//   //   try {
//   //     const storedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");

//   //     const layoutToSave = {
//   //       name: layoutName,
//   //       fields: fields.map((field) => ({ ...field })),
//   //     };

//   //     if (stepname === "4") {
//   //       await api.post("/formlayout", {
//   //         formName: formName,
//   //         step: parseInt(stepname),
//   //         layoutName,
//   //         formData: layoutToSave,
//   //         layouts: storedLayouts,
//   //       });
//   //     }

//   //     const newLayouts = [...storedLayouts];

//   //     localStorage.setItem("layouts", JSON.stringify(newLayouts));

//   //     onSaveForm(formName, fields);
//   //   } catch (error) {
//   //     console.error("Error saving layout:", error);
//   //   }
//   // };

//   const handleSaveLayout = async () => {
//     try {
//       const storedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");

//       const layoutToSave = {
//         name: layoutName,
//         fields: fields.map((field) => ({ ...field })),
//       };

//       setFormData(layoutToSave); // Add this line to set the formData state

//       const newLayouts = [...storedLayouts];

//       localStorage.setItem("layouts", JSON.stringify(newLayouts));

//       onSaveForm(formName, fields);

//       if (stepname === "4") {
//         await api.post("/formlayout", {
//           formName: formName,
//           step: parseInt(stepname),
//           layoutName,
//           formData: layoutToSave,
//           layouts: storedLayouts,
//         });

//       }
//     } catch (error) {
//       console.error("Error saving layout:", error);
//     }
//   };
//   const handleLoadLayout = async (layout) => {
//     try {
//       const response = await api.get(`/formlayout/${layout._id}`);
//       const loadedLayout = response.data.data;

//       // Set the formName state with the loaded layout's formName
//       setFormName(loadedLayout.formName);

//       // Set the fields state with the loaded layout's fields
//       setFields(loadedLayout.fields.map((field) => ({ ...field })));

//       // Set the layoutName state with the loaded layout's name
//       setLayoutName(loadedLayout.name);
//     } catch (error) {
//       console.error("Error loading layout:", error);
//     }
//   };

//   // working fine not i want that

//   const deleteAllLayout = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   // useEffect(() => {
//   //   const fetchLayouts = async () => {
//   //     try {
//   //       const response = await api.get("/formlayout");
//   //       if (response.status === 200) {
//   //         const data = response.data.data;
//   //         setLayouts(data);
//   //       } else {
//   //         console.error("Failed to fetch layouts");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching layouts:", error);
//   //     }
//   //   };

//   //   fetchLayouts();
//   // }, [formLayout, stepname]);
//   useEffect(() => {
//     const fetchLayouts = async () => {
//       try {
//         const response = await api.get("/formlayout");
//         if (response.status === 200) {
//           const data = response.data.data;
//           // Filter layouts for the current step
//           const filteredLayouts = data.filter(
//             (layout) => layout.step === stepname
//           );
//           setLayouts(filteredLayouts);
//         } else {
//           console.error("Failed to fetch layouts");
//         }
//       } catch (error) {
//         console.error("Error fetching layouts:", error);
//       }
//     };

//     fetchLayouts();
//   }, [stepname]);

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const field = event.dataTransfer.getData("field");
//     setFields((prevFields) => [...prevFields, { type: field, label: field }]);
//   };

//   const handleInputChange = (field, value) => {
//     setFormName((prevFormData) => ({
//       ...prevFormData,
//       [field]: value,
//     }));
//   };

//   // Function to handle form name change
//   const handleFormNameChange = (event) => {
//     setFormName(event.target.value);
//   };

//   // Function to handle changing field label
//   const handleFieldLabelChange = (index, newLabel) => {
//     const updatedFields = [...fields];
//     updatedFields[index].label = newLabel;
//     setFields(updatedFields);
//   };

//   // Function to handle updating option name for dropdown fields
//   const handleUpdateOptionName = (index, optionIndex, newOptionName) => {
//     const updatedFields = [...fields];
//     if (updatedFields[index].options) {
//       updatedFields[index].options[optionIndex] = newOptionName;
//     } else {
//       updatedFields[index].options = [newOptionName];
//     }
//     setFields(updatedFields);
//   };

//   // Function to handle drag over the form container
//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   // Function to handle adding an option for dropdown fields
//   const handleAddOption = (index) => {
//     const updatedFields = [...fields];
//     if (!updatedFields[index].options) {
//       updatedFields[index].options = [];
//     }
//     updatedFields[index].options.push("New Option");
//     setFields(updatedFields);
//   };

//   // Effect hook (empty dependency array) to perform side effect (fetching layouts) only once on component mount
//   useEffect(() => {}, [handleSaveLayout, stepname]);

//   // Function to render the form fields
//   const renderFields = () => {
//     return fields.map((field, index) => {
//       return (
//         <div key={index} className="form-field">
//           <label
//             onDoubleClick={() => {
//               const newLabel = prompt("Enter new label:", field.label);
//               if (newLabel) {
//                 handleFieldLabelChange(index, newLabel);
//               }
//             }}
//           >
//             {field.label}
//           </label>
//           {renderInput(field, index, field.label)}
//         </div>
//       );
//     });
//   };

//   // Function to render the input element based on field type
//   const renderInput = (field, index, label) => {
//     switch (field.type) {
//       case "input-text":
//         return (
//           <input
//             type="text"
//             name={label}
//             className="form-control"
//             onChange={(event) => handleInputChange(label, event.target.value)}
//           />
//         );
//       case "input-file":
//         return (
//           <input
//             type="file"
//             name={label}
//             className="form-control"
//             onChange={(event) => handleInputChange(label, event.target.value)}
//           />
//         );
//       case "input-dropdown":
//         return (
//           <div key={index} className="form-field">
//             <label>Input Dropdown</label>
//             <select
//               className="form-control"
//               onChange={(event) =>
//                 handleInputChange(
//                   "input-dropdown",
//                   event.target.value,
//                   field.label
//                 )
//               }
//             >
//               {field.options?.map((option, optionIndex) => (
//                 <option key={optionIndex} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//             <button
//               className="btn btn-sm btn-secondary ms-2"
//               onClick={() => {
//                 const newOptionName = prompt(
//                   "Enter new option name:",
//                   field.options?.[0]
//                 );
//                 if (newOptionName) {
//                   handleUpdateOptionName(index, 0, newOptionName);
//                 }
//               }}
//             >
//               Edit Option
//             </button>
//             <button
//               className="btn btn-sm btn-success ms-2"
//               onClick={() => handleAddOption(index)}
//             >
//               Add Option
//             </button>
//             {/* Render additional "Edit Option" buttons for other options */}
//             {field.options?.map((option, optionIndex) => (
//               <button
//                 key={optionIndex}
//                 className="btn btn-sm btn-secondary ms-2"
//                 onClick={() => {
//                   const newOptionName = prompt(
//                     "Enter new option name:",
//                     option
//                   );
//                   if (newOptionName) {
//                     handleUpdateOptionName(index, optionIndex, newOptionName);
//                   }
//                 }}
//               >
//                 Edit Option {optionIndex + 1}
//               </button>
//             ))}
//           </div>
//         );
//       // Add cases for other field types here...
//       default:
//         return null;
//     }
//   };

//   // Function to handle saving the form data
//   const handleSaveData = async () => {
//     try {
//       // Prepare the data to save
//       const dataToSave = {
//         formName: formName,
//         formData: { ...formData }, // Create a copy of formData to avoid references
//       };

//       // Make the API request to save the form data
//       await api.post("/formdata", dataToSave);

//       // You can add any additional logic you want to perform after saving the data here

//       console.log("Form data saved successfully!");
//     } catch (error) {
//       console.error("Error saving form data:", error);
//     }
//   };

//   // Function to reset the form fields and data
//   const handleResetForm = () => {
//     setFields([]);
//     setFormData({});
//     setFormName("");
//   };

//   return (
//     <div className="form-builder container">
//       <div
//         onDrop={handleDrop}
//         onDragOver={(event) => event.preventDefault()}
//         className="form-container border-warning w-75 p-4"
//       >
//         {/* Render form fields */}
//         {fields.map((field, index) => (
//           <div key={index} className="form-field">
//             <label
//               onDoubleClick={() => {
//                 const newLabel = prompt("Enter new label:", field.label);
//                 if (newLabel) {
//                   handleFieldLabelChange(index, newLabel);
//                 }
//               }}
//             >
//               {field.label}
//             </label>
//             {renderInput(field, index, field.label)}
//           </div>
//         ))}

//         {/* Render form buttons */}
//         <div className="form-buttons">
//           <button onClick={handleResetForm} className="btn btn-danger ms-2">
//             Reset Form
//           </button>
//         </div>

//         {/* Save Layout */}
//         <div className="m-3 d-flex justify-content-between ">
//           <input
//             type="text"
//             placeholder="Enter layout name"
//             value={layoutName}
//             onChange={(e) => setLayoutName(e.target.value)}
//           />
//           <button onClick={handleSaveLayout} className="btn btn-primary">
//             Save and next
//           </button>
//         </div>

//         {/* Log Data */}
//         <button onClick={handleSaveData} className="btn btn-info ms-2">
//           Log Data
//         </button>

//         {/* Display saved layouts */}
//         <div>
//           <h4>Saved Layouts:</h4>
//           <ul>
//             {layouts.map((layout, index) => (
//               <li key={index}>
//                 <button
//                   className="btn btn-warning m-1"
//                   onClick={() => handleLoadLayout(layout)}
//                 >
//                   {layout.name}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Delete All Layouts */}
//         {layouts.length > 0 && (
//           <div className="d-flex ">
//             <button onClick={deleteAllLayout} className="btn btn-danger">
//               Delete All Layout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;

////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import "./FormBuilder.css";
// import api from "../api/api";

// const FormBuilder = ({ onSaveForm, formLayout }) => {
//   const [fields, setFields] = useState([]);
//   const [formName, setFormName] = useState("");
//   const [layoutName, setLayoutName] = useState("");
//   const [formData, setFormData] = useState();
//   const [layouts, setLayouts] = useState([]);
//   const stepname = localStorage.getItem("activeStep");

//   // window.prompt()

//   // drag and drop hone per
//   const handleDrop = (event) => {
//     event.preventDefault();
//     const field = event.dataTransfer.getData("field");
//     setFields((prevFields) => [...prevFields, { type: field, label: field }]);
//   };

//   // Function to handle changing field label
//   const handleFieldLabelChange = (index, newLabel) => {
//     const updatedFields = [...fields];
//     updatedFields[index].label = newLabel;
//     setFields(updatedFields);
//   };

//   // Function to handle adding an option for dropdown fields
//   const handleAddOption = (index) => {
//     const updatedFields = [...fields];
//     if (!updatedFields[index].options) {
//       updatedFields[index].options = [];
//     }
//     updatedFields[index].options.push("New Option");
//     setFields(updatedFields);
//   };

//   // Function to handle updating option name for dropdown fields
//   const handleUpdateOptionName = (index, optionIndex, newOptionName) => {
//     const updatedFields = [...fields];
//     if (updatedFields[index].options) {
//       updatedFields[index].options[optionIndex] = newOptionName;
//     } else {
//       updatedFields[index].options = [newOptionName];
//     }
//     setFields(updatedFields);
//   };
// //  save layout
//   const handleSaveLayout = async () => {
//     try {
//       // for sending data in bakcend
//       const storedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");
//       // current layout ko ssave krne k liye
//       const layoutToSave = {
//         name: layoutName,
//         fields: fields.map((field) => ({ ...field })),
//       };

//       setFormData(layoutToSave);
//       // jo layout banaya h usko localstorage me save krne k liye
//       const newLayouts = [...storedLayouts];

//       localStorage.setItem("layouts", JSON.stringify(newLayouts));
//       // sidebar me data send krna k liye
//       onSaveForm(formName, fields);
//       // jo bhi data localstorage me h usko bakend me bhje k liye
//       if (stepname === "2") {
//         await api.post("/formlayout", {
//           // formName: formName,
//           step: parseInt(stepname),
//           layoutName,
//           formData: layoutToSave,
//           layouts: storedLayouts,
//         });
//       }
//     } catch (error) {
//       console.error("Error saving layout:", error);
//     }
//   };
//   // all save layout ko fetch krne k liye
//   useEffect(() => {
//     const fetchLayouts = async () => {
//       try {
//         // ckend s api hit ki
//         const response = await api.get("/formlayout");
//         if (response.status === 200) {
//           const data = response.data.data;
//           // data ko fetch krne per ko current step ki details h usi step per dikhane k liye
//           const filteredLayouts = data.filter(
//             // step
//             (layout) => layout.step === stepname
//           );
//           setLayouts(filteredLayouts);
//         } else {
//           console.error("Failed to fetch layouts");
//         }
//       } catch (error) {
//         console.error("Error fetching layouts:", error);
//       }
//     };

//     fetchLayouts();
//   }, [stepname]);
//   // saved layout ko click krne per us layout ki field set krna
//   const handleLoadLayout = async (layout) => {
//     try {
//       const response = await api.get(`/formlayout/${layout._id}`);
//       const loadedLayout = response.data.data;

//       // selec form ka name show krne k liye
//       // setFormName(loadedLayout.formName);

//       // select from ki field save krne k liye
//       setFields(loadedLayout.fields.map((field) => ({ ...field })));

//       // Set the layoutName state with the loaded layout's name
//       setLayoutName(loadedLayout.name);
//     } catch (error) {
//       console.error("Error loading layout:", error);
//     }
//   };

//   // localstorage ko clear krne per

//   const deleteAllLayout = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   // input fileld
//   const handleInputChange = (field, value) => {
//     setFormName((prevFormData) => ({
//       ...prevFormData,
//       [field]: value,
//     }));
//   };

//   // Effect hook (empty dependency array) to perform side effect (fetching layouts) only once on component mount
//   useEffect(() => {}, [handleSaveLayout, stepname]);

//   // Function to render the form fields
//   // const renderFields = () => {
//   //   return fields.map((field, index) => {
//   //     return (
//   //       <div key={index} className="form-field">
//   //         <label
//   //           onDoubleClick={() => {
//   //             const newLabel = prompt("Enter new label:", field.label);
//   //             if (newLabel) {
//   //               handleFieldLabelChange(index, newLabel);
//   //             }
//   //           }}
//   //         >
//   //           {field.label}
//   //         </label>
//   //         {renderInput(field, index, field.label)}
//   //       </div>
//   //     );
//   //   });
//   // };

//   const renderFields = () => {
//     return fields.map((field, index) => (
//       <div key={index} className="form-field">
//         <label>{field.label}</label>
//         {renderInput(field, index, field.label)}
//       </div>
//     ));
//   };

//   // Function to render the input element based on field type
//   const renderInput = (field, index, label) => {
//     switch (field.type) {
//       case "input-text":
//         return (
//           <input
//             type="text"
//             name={label}
//             className="form-control"
//             onChange={(event) => handleInputChange(label, event.target.value)}
//           />
//         );
//       case "input-file":
//         return (
//           <input
//             type="file"
//             name={label}
//             className="form-control"
//             onChange={(event) => handleInputChange(label, event.target.value)}
//           />
//         );
//       // case "input-dropdown":
//       //   return (
//       //     <div key={index} className="form-field">
//       //       <label>Input Dropdown</label>
//       //       <select
//       //         className="form-control"
//       //         onChange={(event) =>
//       //           handleInputChange(
//       //             "input-dropdown",
//       //             event.target.value,
//       //             field.label
//       //           )
//       //         }
//       //       >
//       //         {field.options?.map((option, optionIndex) => (
//       //           <option key={optionIndex} value={option}>
//       //             {option}
//       //           </option>
//       //         ))}
//       //       </select>
//       //       <button
//       //         className="btn btn-sm btn-secondary ms-2"
//       //         onClick={() => {
//       //           const newOptionName = prompt(
//       //             "Enter new option name:",
//       //             field.options?.[0]
//       //           );
//       //           if (newOptionName) {
//       //             handleUpdateOptionName(index, 0, newOptionName);
//       //           }
//       //         }}
//       //       >
//       //         Edit Option
//       //       </button>
//       //       <button
//       //         className="btn btn-sm btn-success ms-2"
//       //         onClick={() => handleAddOption(index)}
//       //       >
//       //         Add Option
//       //       </button>
//       //       {/* Render additional "Edit Option" buttons for other options */}
//       //       {field.options?.map((option, optionIndex) => (
//       //         <button
//       //           key={optionIndex}
//       //           className="btn btn-sm btn-secondary ms-2"
//       //           onClick={() => {
//       //             const newOptionName = prompt(
//       //               "Enter new option name:",
//       //               option
//       //             );
//       //             if (newOptionName) {
//       //               handleUpdateOptionName(index, optionIndex, newOptionName);
//       //             }
//       //           }}
//       //         >
//       //           Edit Option {optionIndex + 1}
//       //         </button>
//       //       ))}
//       //     </div>
//       //   );
//       case "input-dropdown":
//         return (
//           <div key={index} className="form-field">
//             <label>Input Dropdown</label>
//             <select
//               className="form-control"
//               onChange={(event) =>
//                 handleInputChange(
//                   "input-dropdown",
//                   event.target.value,
//                   field.label
//                 )
//               }
//             >
//               {field.options?.map((option, optionIndex) => (
//                 <option key={optionIndex} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//             <button
//               className="btn btn-sm btn-success ms-2"
//               onClick={() => handleAddOption(index)}
//             >
//               Add More Option
//             </button>
//             {field.options?.map((option, optionIndex) => (
//               <button
//                 key={optionIndex}
//                 className="btn btn-sm btn-secondary ms-2"
//                 onClick={() => {
//                   const newOptionName = prompt(
//                     "Enter new option name:",
//                     option
//                   );
//                   if (newOptionName) {
//                     handleUpdateOptionName(index, optionIndex, newOptionName);
//                   }
//                 }}
//               >
//                 Edit Option {optionIndex + 1}
//               </button>
//             ))}
//           </div>
//         );
//       // Add cases for other field types here...
//       default:
//         return null;
//     }
//   };

//   // Function to handle saving the form data
//   const handleSaveData = async () => {
//     try {
//       // Prepare the data to save
//       const dataToSave = {
//         formName: formName,
//         formData: { ...formData }, // Create a copy of formData to avoid references
//       };

//       // Make the API request to save the form data
//       await api.post("/formdata", dataToSave);

//       // You can add any additional logic you want to perform after saving the data here

//       console.log("Form data saved successfully!");
//     } catch (error) {
//       console.error("Error saving form data:", error);
//     }
//   };

//   // Function to reset the form fields and data
//   const handleResetForm = () => {
//     setFields([]);
//     setFormData({});
//     setFormName("");
//   };

//   return (
//     <div className="form-builder container">
//       <div
//         onDrop={handleDrop}
//         onDragOver={(event) => event.preventDefault()}
//         className="form-container border-warning w-75 p-4"
//       >
//         {/* Render form fields */}
//         {fields.map((field, index) => (
//           <div key={index} className="form-field">
//             <label
//               onDoubleClick={() => {
//                 const newLabel = prompt("Enter new label:", field.label);
//                 if (newLabel) {
//                   handleFieldLabelChange(index, newLabel);
//                 }
//               }}
//             >
//               {field.label}
//             </label>
//             {renderInput(field, index, field.label)}
//           </div>
//         ))}

//         {/* Render form buttons */}
//         <div className="form-buttons">
//           <button onClick={handleResetForm} className="btn btn-danger ms-2">
//             Reset Form
//           </button>
//         </div>

//         {/* Save Layout */}
//         <div className="m-3 d-flex justify-content-between ">
//           <input
//             type="text"
//             placeholder="Enter layout name"
//             value={layoutName}
//             onChange={(e) => setLayoutName(e.target.value)}
//           />
//           <button onClick={handleSaveLayout} className="btn btn-primary">
//             Save 
//           </button>
//         </div>

//         {/* Log Data */}
//         <button onClick={handleSaveData} className="btn btn-info ms-2">
//           Log Data
//         </button>

//         {/* Display saved layouts */}
//         <div>
//           <h4>Saved Layouts:</h4>
//           <ul>
//             {layouts.map((layout, index) => (
//               <li key={index}>
//                 <button
//                   className="btn btn-warning m-1"
//                   onClick={() => handleLoadLayout(layout)}
//                 >
//                   {layout.name}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Delete All Layouts */}
//         {layouts.length > 0 && (
//           <div className="d-flex ">
//             <button onClick={deleteAllLayout} className="btn btn-danger">
//               Delete All Layout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;
//vaibahv 30
///////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import "./FormBuilder.css";
// import api from "../api/api";

// const FormBuilder = ({ onSaveForm, formLayout }) => {
//   const [fields, setFields] = useState([]);
//   // form name
//   const [formName, setFormName] = useState("");
//   // layout
//   const [layout, setLayouts] = useState([]);
//   const [layoutName, setLayoutName] = useState("");
//   // saving data
//   const [formData, setFormData] = useState();

//   // drop layout
//   const handleDrop = (event) => {
//     event.preventDefault();
//     const field = event.dataTransfer.getData("field");
//     setFields((prevFields) => [...prevFields, { type: field, label: field }]);
//   };

//   //    label chnage
//   const handleFieldLabelChange = (index, newLabel) => {
//     const updatedFields = [...fields];
//     updatedFields[index].label = newLabel;
//     setFields(updatedFields);
//   };
//   // add new option
//   const handleAddOption = (index) => {
//     const updatedFields = [...fields];
//     if (!updatedFields[index].options) {
//       updatedFields[index].options = [];
//     }
//     updatedFields[index].options.push("Edit Options");
//     setFields(updatedFields);
//   };

//   // dropdown option change
//   const handleUpdateOptionName = (index, optionIndex, newOptionName) => {
//     const updatedFields = [...fields];
//     if (updatedFields[index].options) {
//       updatedFields[index].options[optionIndex] = newOptionName;
//     } else {
//       updatedFields[index].options = [newOptionName];
//     }
//     setFields(updatedFields);
//   };
// };

// // save layout
// const handleSaveLayout = async () => {
//   try {
//     // for sending data in bakcend
//     const storedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");
//     // current layout ko ssave krne k liye
//     const layoutToSave = {
//       name: layoutName,
//       fields: fields.map((field) => ({ ...field })),
//     };

//     setFormData(layoutToSave);
//     // jo layout banaya h usko localstorage me save krne k liye
//     const newLayouts = [...storedLayouts];

//     localStorage.setItem("layouts", JSON.stringify(newLayouts));
//     // sidebar me data send krna k liye
//     onSaveForm(formName, fields);
//     // jo bhi data localstorage me h usko bakend me bhje k liye
//     if (stepname === "4") {
//       await api.post("/formlayout", {
//         // formName: formName,
//         step: parseInt(stepname),
//         layoutName,
//         formData: layoutToSave,
//         layouts: storedLayouts,
//       });
//     }
//   } catch (error) {
//     console.error("Error saving layout:", error);
//   }
// };
// // all save layout ko fetch krne k liye
// useEffect(() => {
//   const fetchLayouts = async () => {
//     try {
//       // ckend s api hit ki
//       const response = await api.get("/formlayout");
//       if (response.status === 200) {
//         const data = response.data.data;
//         // data ko fetch krne per ko current step ki details h usi step per dikhane k liye
//         const filteredLayouts = data.filter(
//           // step
//           (layout) => layout.step === stepname
//         );
//         setLayouts(filteredLayouts);
//       } else {
//         console.error("Failed to fetch layouts");
//       }
//     } catch (error) {
//       console.error("Error fetching layouts:", error);
//     }
//   };

//   fetchLayouts();
// }, [stepname]);

// // saved layout ko click krne per us layout ki field set krna
// const handleLoadLayout = async (layout) => {
//   try {
//     const response = await api.get(`/formlayout/${layout._id}`);
//     const loadedLayout = response.data.data;

//     // selec form ka name show krne k liye
//     // setFormName(loadedLayout.formName);

//     // select from ki field save krne k liye
//     setFields(loadedLayout.fields.map((field) => ({ ...field })));

//     // Set the layoutName state with the loaded layout's name
//     setLayoutName(loadedLayout.name);
//   } catch (error) {
//     console.error("Error loading layout:", error);
//   }

//   // localstorage ko clear krne per
//   const deleteAllLayout = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   // Effect hook (empty dependency array) to perform side effect (fetching layouts) only once on component mount
//   useEffect(() => {}, [handleSaveLayout, stepname]);

//   //   data for console or save
//   const handleSaveData = async () => {
//     try {
//       // Prepare the data to save
//       const dataToSave = {
//         formName: formName,
//         formData: { ...formData }, // Create a copy of formData to avoid references
//       };

//       // Make the API request to save the form data
//       await api.post("/formdata", dataToSave);

//       // You can add any additional logic you want to perform after saving the data here

//       console.log("Form data saved successfully!", dataToSave);
//     } catch (error) {
//       console.error("Error saving form data:", error);
//     }
//   };
//   // Function to reset the form fields and data
//   const handleResetForm = () => {
//     setFields([]);
//     setFormData({});
//     setFormName("");
//   };

//   const renderFields = () => {
//     return fields.map((field, index) => (
//       <div key={index} className="form-field">
//         <label>{field.label}</label>
//         {renderInput(field, index, field.label)}
//       </div>
//     ));
//   };

//   const renderInput = (field, index, label) => {
//     switch (field.type) {
//       case "input-text":
//         return (
//           <input
//             type="text"
//             name={label}
//             className="form-control"
//             onChange={(event) => handleInputChange(label, event.target.value)}
//           />
//         );
//       case "input-file":
//         return (
//           <input
//             type="file"
//             name={label}
//             className="form-control"
//             onChange={(event) => handleInputChange(label, event.target.value)}
//           />
//         );
//       case "input-dropdown":
//         return (
//           <div key={index} className="form-field">
//             <label>Input Dropdown</label>
//             <select
//               className="form-control"
//               onChange={(event) =>
//                 handleInputChange(
//                   "input-dropdown",
//                   event.target.value,
//                   field.label
//                 )
//               }
//             >
//               {field.options?.map((option, optionIndex) => (
//                 <option key={optionIndex} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//             <button
//               className="btn btn-sm btn-success ms-2"
//               onClick={() => handleAddOption(index)}
//             >
//               Add More Option
//             </button>
//             {field.options?.map((option, optionIndex) => (
//               <button
//                 key={optionIndex}
//                 className="btn btn-sm btn-secondary ms-2"
//                 onClick={() => {
//                   const newOptionName = prompt(
//                     "Enter new option name:",
//                     option
//                   );
//                   if (newOptionName) {
//                     handleUpdateOptionName(index, optionIndex, newOptionName);
//                   }
//                 }}
//               >
//                 Edit Option {optionIndex + 1}
//               </button>
//             ))}
//           </div>
//         );
//       // Add cases for other field types here...
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="form-builder container">
//       <div
//         onDrop={handleDrop}
//         onDragOver={(event) => event.preventDefault()}
//         className="form-container border-warning w-75 p-4"
//       >
//         {/* Render form fields */}
//         {fields.map((field, index) => (
//           <div key={index} className="form-field">
//             <label
//               onDoubleClick={() => {
//                 const newLabel = prompt("Enter new label:", field.label);
//                 if (newLabel) {
//                   handleFieldLabelChange(index, newLabel);
//                 }
//               }}
//             >
//               {field.label}
//             </label>
//             {renderInput(field, index, field.label)}
//           </div>
//         ))}

//         {/* Render form buttons */}
//         <div className="form-buttons">
//           <button onClick={handleResetForm} className="btn btn-danger ms-2">
//             Reset Form
//           </button>
//         </div>

//         {/* Save Layout */}
//         <div className="m-3 d-flex justify-content-between ">
//           <input
//             type="text"
//             placeholder="Enter layout name"
//             value={layoutName}
//             onChange={(e) => setLayoutName(e.target.value)}
//           />
//           <button onClick={handleSaveLayout} className="btn btn-primary">
//             Save and next
//           </button>
//         </div>

//         {/* Log Data */}
//         <button onClick={handleSaveData} className="btn btn-info ms-2">
//           Log Data
//         </button>

//         {/* Display saved layouts */}
//         <div>
//           <h4>Saved Layouts:</h4>
//           <ul>
//             {layouts.map((layout, index) => (
//               <li key={index}>
//                 <button
//                   className="btn btn-warning m-1"
//                   onClick={() => handleLoadLayout(layout)}
//                 >
//                   {layout.name}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Delete All Layouts */}
//         {layouts.length > 0 && (
//           <div className="d-flex ">
//             <button onClick={deleteAllLayout} className="btn btn-danger">
//               Delete All Layout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default FormBuilder;

////////////////////////////////////////////////////gpt

// import React, { useState, useEffect } from "react";
// import "./FormBuilder.css";
// import api from "../api/api"; // Replace this with your API implementation

// const FormBuilder = ({ onSaveForm, formLayout }) => {
//   const [fields, setFields] = useState([]);
//   const [formName, setFormName] = useState("");
//   const [layoutName, setLayoutName] = useState("");
//   const [formData, setFormData] = useState();
//   const [layouts, setLayouts] = useState([]);

//   const stepname = "4"; // Replace this with your actual step name or pass it as a prop

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const field = event.dataTransfer.getData("field");
//     setFields((prevFields) => [...prevFields, { type: field, label: field }]);
//   };

//   const handleFieldLabelChange = (index, newLabel) => {
//     const updatedFields = [...fields];
//     updatedFields[index].label = newLabel;
//     setFields(updatedFields);
//   };

//   const handleAddOption = (index) => {
//     const updatedFields = [...fields];
//     if (!updatedFields[index].options) {
//       updatedFields[index].options = [];
//     }
//     updatedFields[index].options.push("Edit Options");
//     setFields(updatedFields);
//   };

//   const handleUpdateOptionName = (index, optionIndex, newOptionName) => {
//     const updatedFields = [...fields];
//     if (updatedFields[index].options) {
//       updatedFields[index].options[optionIndex] = newOptionName;
//     } else {
//       updatedFields[index].options = [newOptionName];
//     }
//     setFields(updatedFields);
//   };

//   const handleSaveLayout = async () => {
//     try {
//       const storedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");
//       const layoutToSave = {
//         name: layoutName,
//         fields: fields.map((field) => ({ ...field })),
//       };
//       setFormData(layoutToSave);

//       const newLayouts = [...storedLayouts];
//       localStorage.setItem("layouts", JSON.stringify(newLayouts));

//       onSaveForm(formName, fields); // Replace this with the actual onSaveForm function

//       if (stepname === "4") {
//         await api.post("/formlayout", {
//           formName: formName, // Replace this with the actual formName
//           step: parseInt(stepname),
//           layoutName,
//           formData: layoutToSave,
//           layouts: storedLayouts,
//         });
//       }
//     } catch (error) {
//       console.error("Error saving layout:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchLayouts = async () => {
//       try {
//         const response = await api.get("/formlayout");
//         if (response.status === 200) {
//           const data = response.data.data;
//           const filteredLayouts = data.filter(
//             (layout) => layout.step === stepname
//           );
//           setLayouts(filteredLayouts);
//         } else {
//           console.error("Failed to fetch layouts");
//         }
//       } catch (error) {
//         console.error("Error fetching layouts:", error);
//       }
//     };

//     fetchLayouts();
//   }, [stepname]);

//   const handleLoadLayout = async (layout) => {
//     try {
//       const response = await api.get(`/formlayout/${layout._id}`);
//       const loadedLayout = response.data.data;

//       setFields(loadedLayout.fields.map((field) => ({ ...field })));
//       setLayoutName(loadedLayout.name);
//     } catch (error) {
//       console.error("Error loading layout:", error);
//     }
//   };

//   const deleteAllLayout = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   const handleSaveData = async () => {
//     try {
//       const dataToSave = {
//         formName: formName,
//         formData: { ...formData },
//       };

//       await api.post("/formdata", dataToSave);

//       console.log("Form data saved successfully!", dataToSave);
//     } catch (error) {
//       console.error("Error saving form data:", error);
//     }
//   };
//  const handleResetForm = () => {
//    setFields([]);
//    setFormData({});
//    setFormName("");
//  };

//   const renderFields = () => {
//     return fields.map((field, index) => (
//       <div key={index} className="form-field">
//         <label>{field.label}</label>
//         {renderInput(field, index, field.label)}
//       </div>
//     ));
//   };

//   const renderInput = (field, index, label) => {
//     switch (field.type) {
//       case "input-text":
//         return (
//           <input
//             type="text"
//             name={label}
//             className="form-control"
//             onChange={(event) => handleInputChange(label, event.target.value)}
//           />
//         );
//       case "input-file":
//         return (
//           <input
//             type="file"
//             name={label}
//             className="form-control"
//             onChange={(event) => handleInputChange(label, event.target.value)}
//           />
//         );
//       case "input-dropdown":
//         return (
//           <div key={index} className="form-field">
//             <label>Input Dropdown</label>
//             <select
//               className="form-control"
//               onChange={(event) =>
//                 handleInputChange(
//                   "input-dropdown",
//                   event.target.value,
//                   field.label
//                 )
//               }
//             >
//               {field.options?.map((option, optionIndex) => (
//                 <option key={optionIndex} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//             <button
//               className="btn btn-sm btn-success ms-2"
//               onClick={() => handleAddOption(index)}
//             >
//               Add More Option
//             </button>
//             {field.options?.map((option, optionIndex) => (
//               <button
//                 key={optionIndex}
//                 className="btn btn-sm btn-secondary ms-2"
//                 onClick={() => {
//                   const newOptionName = prompt(
//                     "Enter new option name:",
//                     option
//                   );
//                   if (newOptionName) {
//                     handleUpdateOptionName(index, optionIndex, newOptionName);
//                   }
//                 }}
//               >
//                 Edit Option {optionIndex + 1}
//               </button>
//             ))}
//           </div>
//         );
//       // Add cases for other field types here...
//       default:
//         return null;
//     }
//   };

//   const handleInputChange = (field, value) => {
//     // Implement your logic to handle input changes
//   };

//   return (
//     <div className="form-builder container">
//       <div
//         onDrop={handleDrop}
//         onDragOver={(event) => event.preventDefault()}
//         className="form-container border-warning w-75 p-4"
//       >
//         {renderFields()}

//         <div className="form-buttons">
//           <button onClick={handleResetForm} className="btn btn-danger ms-2">
//             Reset Form
//           </button>
//         </div>

//         <div className="m-3 d-flex justify-content-between ">
//           <input
//             type="text"
//             placeholder="Enter layout name"
//             value={layoutName}
//             onChange={(e) => setLayoutName(e.target.value)}
//           />
//           <button onClick={handleSaveLayout} className="btn btn-primary">
//             Save and next
//           </button>
//         </div>

//         <button onClick={handleSaveData} className="btn btn-info ms-2">
//           Log Data
//         </button>

//         <div>
//           <h4>Saved Layouts:</h4>
//           <ul>
//             {layouts.map((layout, index) => (
//               <li key={index}>
//                 <button
//                   className="btn btn-warning m-1"
//                   onClick={() => handleLoadLayout(layout)}
//                 >
//                   {layout.name}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {layouts.length > 0 && (
//           <div className="d-flex ">
//             <button onClick={deleteAllLayout} className="btn btn-danger">
//               Delete All Layout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;
//////////////

// import React, { useState, useEffect } from "react";
// import "./FormBuilder.css";
// import api from "../api/api";

// const FormBuilder = ({ onSaveForm, formLayout, onNextStep }) => {
//   const [fields, setFields] = useState([]);
//   const [formName, setFormName] = useState("");
//   const [layoutName, setLayoutName] = useState("");
//   const [formData, setFormData] = useState();
//   const [layouts, setLayouts] = useState([]);
//   const stepname = localStorage.getItem("activeStep");

//   // drag and drop hone per
//   const handleDrop = (event) => {
//     event.preventDefault();
//     const field = event.dataTransfer.getData("field");
//     setFields((prevFields) => [...prevFields, { type: field, label: field }]);
//   };

//   // Function to handle changing field label
//   const handleFieldLabelChange = (index, newLabel) => {
//     const updatedFields = [...fields];
//     updatedFields[index].label = newLabel;
//     setFields(updatedFields);
//   };

//   // Function to handle adding an option for dropdown fields
//   const handleAddOption = (index) => {
//     const updatedFields = [...fields];
//     if (!updatedFields[index].options) {
//       updatedFields[index].options = [];
//     }
//     updatedFields[index].options.push("New Option");
//     setFields(updatedFields);
//   };

//   // Function to handle updating option name for dropdown fields
//   const handleUpdateOptionName = (index, optionIndex, newOptionName) => {
//     const updatedFields = [...fields];
//     if (updatedFields[index].options) {
//       updatedFields[index].options[optionIndex] = newOptionName;
//     } else {
//       updatedFields[index].options = [newOptionName];
//     }
//     setFields(updatedFields);
//   };
//   //  save layout
//   const handleSaveLayout = async () => {
//     try {
//       // for sending data in bakcend
//       const storedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");
//       // current layout ko ssave krne k liye
//       const layoutToSave = {
//         name: layoutName,
//         fields: fields.map((field) => ({ ...field })),
//       };

//       setFormData(layoutToSave);
//       // jo layout banaya h usko localstorage me save krne k liye
//       const newLayouts = [...storedLayouts];

//       localStorage.setItem("layouts", JSON.stringify(newLayouts));
//       // sidebar me data send krna k liye
//       onSaveForm(formName, fields);
//       // jo bhi data localstorage me h usko bakend me bhje k liye
//       if (stepname === "2") {
//         await api.post("/formlayout", {
//           // formName: formName,
//           step: parseInt(stepname),
//           layoutName,
//           formData: layoutToSave,
//           layouts: storedLayouts,
//         });
//       }
//     } catch (error) {
//       console.error("Error saving layout:", error);
//     }
//   };
//   // all save layout ko fetch krne k liye
//   useEffect(() => {
//     const fetchLayouts = async () => {
//       try {
//         // ckend s api hit ki
//         const response = await api.get("/formlayout");
//         if (response.status === 200) {
//           const data = response.data.data;
//           // data ko fetch krne per ko current step ki details h usi step per dikhane k liye
//           const filteredLayouts = data.filter(
//             // step
//             (layout) => layout.step === stepname
//           );
//           setLayouts(filteredLayouts);
//         } else {
//           console.error("Failed to fetch layouts");
//         }
//       } catch (error) {
//         console.error("Error fetching layouts:", error);
//       }
//     };

//     fetchLayouts();
//   }, [stepname]);
//   // saved layout ko click krne per us layout ki field set krna
//   const handleLoadLayout = async (layout) => {
//     try {
//       const response = await api.get(`/formlayout/${layout._id}`);
//       const loadedLayout = response.data.data;

//       // selec form ka name show krne k liye
//       // setFormName(loadedLayout.formName);

//       // select from ki field save krne k liye
//       setFields(loadedLayout.fields.map((field) => ({ ...field })));

//       // Set the layoutName state with the loaded layout's name
//       setLayoutName(loadedLayout.name);
//     } catch (error) {
//       console.error("Error loading layout:", error);
//     }
//   };

//   // localstorage ko clear krne per

//   const deleteAllLayout = async () => {
//     await api.delete(`/formlayout`);
//     localStorage.clear();
//     window.location.reload();
//   };

//   // input fileld
//   const handleInputChange = (field, value) => {
//     setFormName((prevFormData) => ({
//       ...prevFormData,
//       [field]: value,
//     }));
//   };

//   // Effect hook (empty dependency array) to perform side effect (fetching layouts) only once on component mount
//   useEffect(() => {}, [handleSaveLayout, stepname]);

//   const handleSaveAndNext = async () => {
//     // ... (previous code to handle saving the layout)

//     // Call the onNextStep callback function to move to the next step
//     onNextStep();
//   };

//   // Function to render the form fields
//   const renderFields = () => {
//     return fields.map((field, index) => (
//       <div key={index} className="form-field">
//         <label>{field.label}</label>
//         {renderInput(field, index, field.label)}
//       </div>
//     ));
//   };

//   // Function to render the input element based on field type
//   const renderInput = (field, index, label) => {
//     switch (field.type) {
//       case "input-text":
//         return (
//           <input
//             type="text"
//             name={label}
//             className="form-control"
//             onChange={(event) => handleInputChange(label, event.target.value)}
//           />
//         );
//       case "input-file":
//         return (
//           <input
//             type="file"
//             name={label}
//             className="form-control"
//             onChange={(event) => handleInputChange(label, event.target.value)}
//           />
//         );

//       case "input-dropdown":
//         return (
//           <div key={index} className="form-field">
//             {/* <label>Input Dropdown</label> */}
//             <select
//               name={label}
//               className="form-control"
//               onChange={(event) =>
//                 handleInputChange(
//                   "input-dropdown",
//                   event.target.value,
//                   field.label
//                 )
//               }
//             >
//               {field.options?.map((option, optionIndex) => (
//                 <option key={optionIndex} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//             <button
//               className="btn btn-sm btn-success ms-2"
//               onClick={() => handleAddOption(index)}
//             >
//               Add More Option
//             </button>
//             {field.options?.map((option, optionIndex) => (
//               <button
//                 key={optionIndex}
//                 className="btn btn-sm btn-secondary ms-2"
//                 onClick={() => {
//                   const newOptionName = prompt(
//                     "Enter new option name:",
//                     option
//                   );
//                   if (newOptionName) {
//                     handleUpdateOptionName(index, optionIndex, newOptionName);
//                   }
//                 }}
//               >
//                 Edit Option {optionIndex + 1}
//               </button>
//             ))}
//           </div>
//         );
//       // Add cases for other field types here...
//       default:
//         return null;
//     }
//   };

//   // Function to handle saving the form data
//   const handleSaveData = async () => {
//     try {
//       // Prepare the data to save
//       const dataToSave = {
//         formName: formName,
//         formData: { ...formData }, // Create a copy of formData to avoid references
//       };

//       // Make the API request to save the form data
//       await api.post("/formdata", dataToSave);

//       // You can add any additional logic you want to perform after saving the data here

//       console.log("Form data saved successfully!");
//     } catch (error) {
//       console.error("Error saving form data:", error);
//     }
//   };

//   // Function to reset the form fields and data
//   const handleResetForm = () => {
//     setFields([]);
//     setFormData({});
//     setFormName("");
//   };

//   return (
//     <div className="form-builder container">
//       <div
//         onDrop={handleDrop}
//         onDragOver={(event) => event.preventDefault()}
//         className="form-container border-warning w-75 p-4"
//       >
//         {/* Render form fields */}
//         {fields.map((field, index) => (
//           <div key={index} className="form-field">
//             <label
//               onDoubleClick={() => {
//                 const newLabel = prompt("Enter new label:", field.label);
//                 if (newLabel) {
//                   handleFieldLabelChange(index, newLabel);
//                 }
//               }}
//             >
//               {field.label}
//             </label>
//             {renderInput(field, index, field.label)}
//           </div>
//         ))}

//         {/* Render form buttons */}
//         <div className="form-buttons">
//           <button onClick={handleResetForm} className="btn btn-danger ms-2">
//             Reset Form
//           </button>
//         </div>

//         {/* Save Layout */}
//         <div className="m-3 d-flex justify-content-between ">
//               <input
//                 type="text"
//                 placeholder="Enter layout name"
//                 value={layoutName}
//                 onChange={(e) => setLayoutName(e.target.value)}
//               />
//           {stepname && stepname === "2" ? (
//               <button onClick={handleSaveLayout} className="btn btn-primary">
//                 Save
//               </button>
//           ) : (
//             <button
//               onClick={handleSaveLayout}
//               // onClick={handleSaveAndNext}
//               className="btn btn-primary"
//             >
//               Save and next
//             </button>
//           )}
//         </div>

//         {/* Log Data */}
//         <button onClick={handleSaveData} className="btn btn-info ms-2">
//           Log Data
//         </button>

//         {/* Display saved layouts */}
//         <div>
//           <h4>Saved Layouts:</h4>
//           <ul>
//             {layouts.map((layout, index) => (
//               <li key={index}>
//                 <button
//                   className="btn btn-warning m-1"
//                   onClick={() => handleLoadLayout(layout)}
//                 >
//                   {layout.name}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Delete All Layouts */}
//         {layouts.length > 0 && (
//           <div className="d-flex ">
//             <button onClick={deleteAllLayout} className="btn btn-danger">
//               Delete All Layout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;



import React, { useState, useEffect } from "react";
import "./FormBuilder.css";
import api from "../api/api";

const FormBuilder = ({ onSaveForm, formLayout }) => {
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState("");
  const [layoutName, setLayoutName] = useState("");
  const [formData, setFormData] = useState();
  const [layouts, setLayouts] = useState([]);
  const stepname = localStorage.getItem("activeStep");

  // window.prompt()

  // drag and drop hone per
  const handleDrop = (event) => {
    event.preventDefault();
    const field = event.dataTransfer.getData("field");
    setFields((prevFields) => [...prevFields, { type: field, label: field }]);
  };

  // Function to handle changing field label
  const handleFieldLabelChange = (index, newLabel) => {
    const updatedFields = [...fields];
    updatedFields[index].label = newLabel;
    setFields(updatedFields);
  };

  // Function to handle adding an option for dropdown fields
  const handleAddOption = (index) => {
    const updatedFields = [...fields];
    if (!updatedFields[index].options) {
      updatedFields[index].options = [];
    }
    updatedFields[index].options.push("New Option");
    setFields(updatedFields);
  };

  // Function to handle updating option name for dropdown fields
  const handleUpdateOptionName = (index, optionIndex, newOptionName) => {
    const updatedFields = [...fields];
    if (updatedFields[index].options) {
      updatedFields[index].options[optionIndex] = newOptionName;
    } else {
      updatedFields[index].options = [newOptionName];
    }
    setFields(updatedFields);
  };
  //  save layout
  const handleSaveLayout = async () => {
    try {
      // for sending data in bakcend
      const storedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");
      // current layout ko ssave krne k liye
      const layoutToSave = {
        name: layoutName,
        fields: fields.map((field) => ({ ...field })),
      };

      setFormData(layoutToSave);
      // jo layout banaya h usko localstorage me save krne k liye
      const newLayouts = [...storedLayouts];

      localStorage.setItem("layouts", JSON.stringify(newLayouts));
      // sidebar me data send krna k liye
      onSaveForm(formName, fields);
      // jo bhi data localstorage me h usko bakend me bhje k liye
      if (stepname === "2") {
        await api.post("/formlayout", {
          // formName: formName,
          step: parseInt(stepname),
          layoutName,
          formData: layoutToSave,
          layouts: storedLayouts,
        });
      }
    } catch (error) {
      console.error("Error saving layout:", error);
    }
  };
  // all save layout ko fetch krne k liye
  useEffect(() => {
      let person = prompt("Please enter form name");
      setLayoutName(person);  

    const fetchLayouts = async () => {
      try {
        // ckend s api hit ki
        const response = await api.get("/formlayout");
        if (response.status === 200) {
          const data = response.data.data;
          // data ko fetch krne per ko current step ki details h usi step per dikhane k liye
          const filteredLayouts = data.filter(
            // step
            (layout) => layout.step === stepname
          );
          setLayouts(filteredLayouts);
        } else {
          console.error("Failed to fetch layouts");
        }
      } catch (error) {
        console.error("Error fetching layouts:", error);
      }
    };

    fetchLayouts();
  }, [stepname]);
  // saved layout ko click krne per us layout ki field set krna
  const handleLoadLayout = async (layout) => {
    try {
      const response = await api.get(`/formlayout/${layout._id}`);
      const loadedLayout = response.data.data;

      // selec form ka name show krne k liye
      // setFormName(loadedLayout.formName);

      // select from ki field save krne k liye
      setFields(loadedLayout.fields.map((field) => ({ ...field })));

      // Set the layoutName state with the loaded layout's name
      setLayoutName(loadedLayout.name);
    } catch (error) {
      console.error("Error loading layout:", error);
    }
  };

  // localstorage ko clear krne per

  const deleteAllLayout = () => {
    localStorage.clear();
    window.location.reload();
  };

  // input fileld
  const handleInputChange = (field, value) => {
    setFormName((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  // Effect hook (empty dependency array) to perform side effect (fetching layouts) only once on component mount
  useEffect(() => {}, [handleSaveLayout, stepname]);

  // Function to render the form fields
  // const renderFields = () => {
  //   return fields.map((field, index) => {
  //     return (
  //       <div key={index} className="form-field">
  //         <label
  //           onDoubleClick={() => {
  //             const newLabel = prompt("Enter new label:", field.label);
  //             if (newLabel) {
  //               handleFieldLabelChange(index, newLabel);
  //             }
  //           }}
  //         >
  //           {field.label}
  //         </label>
  //         {renderInput(field, index, field.label)}
  //       </div>
  //     );
  //   });
  // };

  const renderFields = () => {
    return fields.map((field, index) => (
      <div key={index} className="form-field">
        <label>{field.label}</label>
        {renderInput(field, index, field.label)}
      </div>
    ));
  };

  // Function to render the input element based on field type
  const renderInput = (field, index, label) => {
    switch (field.type) {
      case "input-text":
        return (
          <input
            type="text"
            name={label}
            className="form-control"
            onChange={(event) => handleInputChange(label, event.target.value)}
          />
        );
      case "input-file":
        return (
          <input
            type="file"
            name={label}
            className="form-control"
            onChange={(event) => handleInputChange(label, event.target.value)}
          />
        );
      // case "input-dropdown":
      //   return (
      //     <div key={index} className="form-field">
      //       <label>Input Dropdown</label>
      //       <select
      //         className="form-control"
      //         onChange={(event) =>
      //           handleInputChange(
      //             "input-dropdown",
      //             event.target.value,
      //             field.label
      //           )
      //         }
      //       >
      //         {field.options?.map((option, optionIndex) => (
      //           <option key={optionIndex} value={option}>
      //             {option}
      //           </option>
      //         ))}
      //       </select>
      //       <button
      //         className="btn btn-sm btn-secondary ms-2"
      //         onClick={() => {
      //           const newOptionName = prompt(
      //             "Enter new option name:",
      //             field.options?.[0]
      //           );
      //           if (newOptionName) {
      //             handleUpdateOptionName(index, 0, newOptionName);
      //           }
      //         }}
      //       >
      //         Edit Option
      //       </button>
      //       <button
      //         className="btn btn-sm btn-success ms-2"
      //         onClick={() => handleAddOption(index)}
      //       >
      //         Add Option
      //       </button>
      //       {/* Render additional "Edit Option" buttons for other options */}
      //       {field.options?.map((option, optionIndex) => (
      //         <button
      //           key={optionIndex}
      //           className="btn btn-sm btn-secondary ms-2"
      //           onClick={() => {
      //             const newOptionName = prompt(
      //               "Enter new option name:",
      //               option
      //             );
      //             if (newOptionName) {
      //               handleUpdateOptionName(index, optionIndex, newOptionName);
      //             }
      //           }}
      //         >
      //           Edit Option {optionIndex + 1}
      //         </button>
      //       ))}
      //     </div>
      //   );
      case "input-dropdown":
        return (
          <div key={index} className="form-field">
            <label>Input Dropdown</label>
            <select
              className="form-control"
              onChange={(event) =>
                handleInputChange(
                  "input-dropdown",
                  event.target.value,
                  field.label
                )
              }
            >
              {field.options?.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              className="btn btn-sm btn-success ms-2"
              onClick={() => handleAddOption(index)}
            >
              Add More Option
            </button>
            {field.options?.map((option, optionIndex) => (
              <button
                key={optionIndex}
                className="btn btn-sm btn-secondary ms-2"
                onClick={() => {
                  const newOptionName = prompt(
                    "Enter new option name:",
                    option
                  );
                  if (newOptionName) {
                    handleUpdateOptionName(index, optionIndex, newOptionName);
                  }
                }}
              >
                Edit Option {optionIndex + 1}
              </button>
            ))}
          </div>
        );
      // Add cases for other field types here...
      default:
        return null;
    }
  };

  // Function to handle saving the form data
  const handleSaveData = async () => {
    try {
      // Prepare the data to save
      const dataToSave = {
        formName: formName,
        formData: { ...formData }, // Create a copy of formData to avoid references
      };

      // Make the API request to save the form data
      await api.post("/formdata", dataToSave);

      // You can add any additional logic you want to perform after saving the data here

      console.log("Form data saved successfully!");
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  // Function to reset the form fields and data
  const handleResetForm = () => {
    setFields([]);
    setFormData({});
    setFormName("");
  };

  return (
    <div className="form-builder container">
      <div
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        className="form-container border-warning w-75 p-4"
      >
        {/* Render form fields */}
        {fields.map((field, index) => (
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
            {renderInput(field, index, field.label)}
          </div>
        ))}

        {/* Render form buttons */}
        <div className="form-buttons">
          <button onClick={handleResetForm} className="btn btn-danger ms-2">
            Reset Form
          </button>
        </div>

        {/* Save Layout */}
        <div className="m-3 d-flex justify-content-between ">
          <input
            type="text"
            placeholder="Enter layout name"
            value={layoutName}
            onChange={(e) => setLayoutName(e.target.value)}
          />
          <button onClick={handleSaveLayout} className="btn btn-primary">
            Save
          </button>
        </div>

        {/* Log Data */}
        <button onClick={handleSaveData} className="btn btn-info ms-2">
          Log Data
        </button>

        {/* Display saved layouts */}
        <div>
          <h4>Saved Layouts:</h4>
          <ul>
            {layouts.map((layout, index) => (
              <li key={index}>
                <button
                  className="btn btn-warning m-1"
                  onClick={() => handleLoadLayout(layout)}
                >
                  {layout.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Delete All Layouts */}
        {layouts.length > 0 && (
          <div className="d-flex ">
            <button onClick={deleteAllLayout} className="btn btn-danger">
              Delete All Layout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;