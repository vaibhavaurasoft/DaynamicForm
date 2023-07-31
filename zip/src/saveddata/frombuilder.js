// import React, { useState, useEffect } from "react";
// import "./FormBuilder.css";
// import api from "../api/api";

// const FormBuilder = ({ onSaveForm, formLayout }) => {
//   // State variables
//   const [fields, setFields] = useState([]); // Stores the form fields
//   const [formData, setFormData] = useState({}); // Stores the form data
//   const [formName, setFormName] = useState(""); // Stores the form name
//   const [layoutName, setLayoutName] = useState(""); // Stores the layout name
//   const [layouts, setLayouts] = useState([]); // Stores the saved layouts
//   const [selectedLayout, setSelectedLayout] = useState(null); // Stores the selected layout (if any)
//   const stepname = localStorage.getItem("activeStep"); // Get the active step from local storage

//   // Function to handle saving the layout
//   const handleSaveLayout = async () => {
//     // Prepare the layout object to save
//     const layoutToSave = {
//       name: layoutName,
//       fields: fields.map((field) => ({ ...field })), // Create a copy of fields to avoid references
//     };

//     try {
//       // Save the layout for the current step in the backend
//       await api.post("/formlayout", {
//         formName: formName,
//         step: parseInt(stepname),
//         layoutName,
//         formData: layoutToSave,
//       });

//       // Call the onSaveForm function to pass form data to the parent component
//       onSaveForm(formName, fields);
//     } catch (error) {
//       console.error("Error saving layout:", error);
//     }
//   };

//   // Function to handle loading a layout
//   const handleLoadLayout = async (layout) => {
//     try {
//       const response = await api.get(`/formlayout/${layout._id}`);
//       const loadedLayout = response.data.data;

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
//           setLayouts(filteredLayouts);

//           // Fetch fields for the selected layout (if any)
//           const initialLayout = filteredLayouts.find(
//             (layout) => layout.name === formLayout
//           );
//           if (initialLayout) {
//             setSelectedLayout(initialLayout);
//             setFields(initialLayout.fields);
//             setFormName(initialLayout.name);
//             setLayoutName(initialLayout.layoutName);
//           }
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

/////////////////////////////////////////////////////////////////////////////////31

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

//   const handleSaveLayout = async () => {
//     try {
//       // Fetch layouts data from local storage
//       const storedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");

//       // Prepare the layout object to save
//       const layoutToSave = {
//         name: layoutName,
//         fields: fields.map((field) => ({ ...field })), // Create a copy of fields to avoid references
//       };

//       if (stepname === "4") {
//         // Save the layout for the current step in the backend
//         await api.post("/formlayout", {
//           formName: formName,
//           step: parseInt(stepname),
//           layoutName,
//           formData: layoutToSave,
//           layouts: storedLayouts, // Include the layouts data in the request body
//         });
//       }

//       // Save the layout for the current step in local storage
//       const newLayouts = [...storedLayouts];
//       // newLayouts.push({
//       //   // step: stepname,
//       //   // ...layoutToSave,
//       // });
//       localStorage.setItem("layouts", JSON.stringify(newLayouts));

//       onSaveForm(formName, fields);
//     } catch (error) {
//       console.error("Error saving layout:", error);
//     }
//   };

//   // Function to handle loading a layout
//   const handleLoadLayout = async (layout) => {
//     try {
//       const response = await api.get(`/formlayout/${layout._id}`);
//       const loadedLayout = response.data.data;

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
//           setLayouts(filteredLayouts);

//           // Fetch fields for the selected layout (if any)
//           const initialLayout = filteredLayouts.find(
//             (layout) => layout.name === formLayout
//           );
//           if (initialLayout) {
//             setSelectedLayout(initialLayout);
//             setFields(initialLayout.fields);
//             setFormName(initialLayout.name);
//             setLayoutName(initialLayout.layoutName);
//           }
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
////////////////////////////////////////////final
import React, { useState, useEffect } from "react";
import "./FormBuilder.css";
import api from "../api/api";

const FormBuilder = ({ onSaveForm, formLayout }) => {
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState("");
  const [layoutName, setLayoutName] = useState("hdfc");
  const [formData, setFormData] = useState();
  const [layouts, setLayouts] = useState([]);
  const stepname = localStorage.getItem("activeStep");

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

  // Function to handle form name change
  const handleFormNameChange = () => {
    const savedFormName = localStorage.getItem("formName");
    if (savedFormName) {
      setFormName(savedFormName);
    } else {
      const newFormName = prompt("Enter form name:");
      if (newFormName) {
        setFormName(newFormName);
        localStorage.setItem("formName", newFormName);
      }
    }
  };

  useEffect(() => {
    handleFormNameChange();
  }, []);

  const handleSaveLayout = async () => {
    try {
      const storedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");

      const layoutToSave = {
        name: layoutName,
        fields: fields.map((field) => ({ ...field })),
      };

      setFormData(layoutToSave);

      if (stepname === "4") {
        await api.post("/formlayout", {
          formName: formName,
          step: parseInt(stepname),
          layoutName,
          formData: layoutToSave,
          layouts: storedLayouts,
        });
      }

      const newLayouts = [...storedLayouts];

      localStorage.setItem("layouts", JSON.stringify(newLayouts));

      onSaveForm(formName, fields);
    } catch (error) {
      console.error("Error saving layout:", error);
    }
  };

  const deleteAllLayout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const handleLoadLayout = async (layout) => {
    try {
      const response = await api.get(`/formlayout/${layout._id}`);
      const loadedLayout = response.data.data;

      // Set the formName state with the loaded layout's formName
      setFormName(loadedLayout.formName);

      // Set the fields state with the loaded layout's fields
      setFields(loadedLayout.fields.map((field) => ({ ...field })));

      // Set the layoutName state with the loaded layout's name
      setLayoutName(loadedLayout.name);
    } catch (error) {
      console.error("Error loading layout:", error);
    }
  };
  // Effect hook to fetch layouts for the current step when the component mounts or formLayout/stepname changes
  useEffect(() => {
    const fetchLayouts = async () => {
      try {
        // Fetch layouts for the current step from the backend
        const response = await api.get("/formlayout");
        if (response.status === 200) {
          const data = response.data.data;
          // Filter layouts for the current step
          const filteredLayouts = data.filter(
            (layout) => layout.step === parseInt(stepname)
          );
          setLayouts(data);

          // // Fetch fields for the selected layout (if any)
          // const initialLayout = filteredLayouts.find(
          //   (layout) => layout.name === formLayout
          // );
          // if (initialLayout) {
          //   setSelectedLayout(initialLayout);
          //   setFields(initialLayout.fields);
          //   setFormName(initialLayout.name);
          //   setLayoutName(initialLayout.layoutName);
          // }
        } else {
          console.error("Failed to fetch layouts");
        }
      } catch (error) {
        console.error("Error fetching layouts:", error);
      }
    };

    fetchLayouts();
  }, [formLayout, stepname]);

  // Function to handle dropping a field on the form container
  const handleDrop = (event) => {
    event.preventDefault();
    const field = event.dataTransfer.getData("field");
    setFields((prevFields) => [...prevFields, { type: field, label: field }]);
  };

  // Function to handle input change for form fields
  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  // Function to handle changing field label
  const handleFieldLabelChange = (index, newLabel) => {
    const updatedFields = [...fields];
    updatedFields[index].label = newLabel;
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

  // Function to handle drag over the form container
  const handleDragOver = (event) => {
    event.preventDefault();
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

  // Effect hook (empty dependency array) to perform side effect (fetching layouts) only once on component mount
  useEffect(() => {}, [handleSaveLayout, stepname]);

  // Function to render the form fields
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
          {renderInput(field, index, field.label)}
        </div>
      );
    });
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
              className="btn btn-sm btn-secondary ms-2"
              onClick={() => {
                const newOptionName = prompt(
                  "Enter new option name:",
                  field.options?.[0]
                );
                if (newOptionName) {
                  handleUpdateOptionName(index, 0, newOptionName);
                }
              }}
            >
              Edit Option
            </button>
            <button
              className="btn btn-sm btn-success ms-2"
              onClick={() => handleAddOption(index)}
            >
              Add Option
            </button>
            {/* Render additional "Edit Option" buttons for other options */}
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
          <button onClick={handleResetForm} className="btn btn-danger ms-2">
            Reset Form
          </button>
        </div>

        {/* Save Layout */}
        <div className="m-3 d-flex justify-content-between ">
          <input
            type="text"
            id="formName"
            className="form-control"
            value={formName}
            onChange={handleFormNameChange}
          />
          <button onClick={handleSaveLayout} className="btn btn-primary">
            Save Layout
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
