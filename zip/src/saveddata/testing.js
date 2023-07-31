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
      if (stepname === "4") {
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
            Save and next
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
