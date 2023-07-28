
import React, { useState, useEffect } from "react";
import "./FormBuilder.css";
import api from "../api/api"

const FormBuilder = ({ onSaveForm, formLayout }) => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [formName, setFormName] = useState("");
  const [layoutName, setLayoutName] = useState("");
  const [layouts, setLayouts] = useState([]);

  var stepname = localStorage.getItem("activeStep");

  // const handleSaveLayout = () => {
  //   const layoutToSave = {
  //     name: layoutName,
  //     fields: fields.map((field) => ({ ...field })),
  //   };

  //   api
  //     .post("/form-layout", { layout: layoutToSave })
  //     .then((response) => {
  //       console.log(response.data.message);
  //       onSaveForm(formName, fields);
  //       setLayoutName(""); // Clear the layout name input after saving
  //     })
  //     .catch((error) => {
  //       console.error("Error saving form layout:", error);
  //     });
  //   // Save the layout for the current step in local storage
  //   const storedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");
  //   const newLayouts = [...storedLayouts];
  //   newLayouts.push({
  //     step: stepname,
  //     ...layoutToSave,
  //   });
  //   localStorage.setItem("layouts", JSON.stringify(newLayouts));

  //   onSaveForm(formName, fields);
  //   localStorage.setItem("layouts", JSON.stringify(newLayouts));
  //   // Send the form layout to the backend API
  // };
  const handleSaveLayout = () => {
    const layoutToSave = {
      name: layoutName,
      fields: fields.map((field) => ({ ...field })),
    };

    // Save the layout for the current step in local storage
    const storedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");
    const newLayouts = [...storedLayouts];
    newLayouts.push({
      step: stepname,
      ...layoutToSave,
    });
    // localStorage.setItem("layouts", JSON.stringify(newLayouts));

    // Send the form layout to the backend API using the custom axios instance
    api
      .post("/form-layout", { layout: layoutToSave })
      .then((response) => {
        console.log(response.data.message);
        onSaveForm(formName, fields);
        setLayoutName(""); // Clear the layout name input after saving
      })
      .catch((error) => {
        console.error("Error saving form layout:", error);
      });
  };

  useEffect(() => {
    // Fetch the saved layouts from the backend API
    api
      .get("/form-layout")
      .then((response) => {
        // Check if the response data is an array before setting the state
        if (Array.isArray(response.data)) {
          setLayouts(response.data);
        } else {
          console.error("Invalid API response:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching form layouts:", error);
      });
  }, []); // Run this effect only once on component mount

  const handleLoadLayout = (layout) => {
    const loadedFields = layout.fields.map((field) => ({ ...field }));
    setFormData({});
    setFields(loadedFields);
  };

  const deleteAllLayout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const savedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");
    const filteredLayouts = savedLayouts.filter(
      (layout) => layout.step === stepname
    );
    setLayouts(filteredLayouts);
  }, [stepname]);

  const handleDrop = (event) => {
    event.preventDefault();
    const field = event.dataTransfer.getData("field");
    setFields((prevFields) => [...prevFields, { type: field, label: field }]);
  };

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

  const handleUpdateOptionName = (index, optionIndex, newOptionName) => {
    const updatedFields = [...fields];
    if (updatedFields[index].options) {
      updatedFields[index].options[optionIndex] = newOptionName;
    } else {
      updatedFields[index].options = [newOptionName];
    }
    setFields(updatedFields);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleAddOption = (index) => {
    const updatedFields = [...fields];
    if (!updatedFields[index].options) {
      updatedFields[index].options = [];
    }
    updatedFields[index].options.push("New Option");
    setFields(updatedFields);
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
          {renderInput(field, index, field.label)}
        </div>
      );
    });
  };

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
      // Rest of the cases...
      default:
        return null;
    }
  };

  const logData = () => {
    for (const fieldName in formData) {
      console.log(`${fieldName}: ${formData[fieldName]}`);
    }
  };

  const handleResetForm = () => {
    setFields([]);
    setFormData({});
    setFormName("");
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
          <button onClick={handleResetForm} className="btn btn-danger ms-2">
            Reset Form
          </button>
        </div>
        <div className="m-3 d-flex justify-content-between ">
          <input
            type="text"
            placeholder="Enter layout name"
            value={layoutName}
            onChange={(e) => setLayoutName(e.target.value)}
          />
          <button onClick={handleSaveLayout} className="btn btn-primary">
            Save Layout
          </button>
        </div>
        <button onClick={logData} className="btn btn-info ms-2">
          Log Data
        </button>
        <div>
          <h4>Saved Layouts:</h4>
          <ul>
            {layouts.map((layout, index) => (
              <li key={index}>
                {layout.name}
                {/* You can add more details or a button to load the layout */}
              </li>
            ))}
          </ul>
        </div>
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
