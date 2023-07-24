import React, { useState, useEffect } from "react";
import "./FormBuilder.css";

const FormBuilder = ({ onSaveForm, formLayout }) => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [formName, setFormName] = useState("");

  useEffect(() => {
    if (formLayout) {
      setFields(formLayout);
    }
  }, [formLayout]);

  useEffect(() => {
    loadSavedForm();
  }, []);

  const handleDragStart = (event, fieldType) => {
    event.dataTransfer.setData("field", fieldType);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const field = event.dataTransfer.getData("field");
    setFields((prevFields) => [...prevFields, { type: field, label: field }]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
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

  const renderInput = () => {
    return fields.map((field, index) => {
      switch (field) {
        case "input-text":
          return (
            <div key={index} className="form-field">
              <label>Input Text</label>
              <input
                type="text"
                className="form-control"
                onChange={(event) =>
                  handleInputChange("input-text", event.target.value)
                }
              />
            </div>
          );

        case "input-range":
          return (
            <div key={index} className="form-field">
              <label>Input Range</label>
              <input
                type="range"
                className="form-control"
                onChange={(event) =>
                  handleInputChange("input-range", event.target.value)
                }
              />
            </div>
          );
        case "input-dropdown":
          return (
            <div key={index} className="form-field">
              <label>Input Dropdown</label>
              <select
                className="form-control"
                onChange={(event) =>
                  handleInputChange("input-dropdown", event.target.value)
                }
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          );
        case "input-email":
          return (
            <div key={index} className="form-field">
              <label>Input Email</label>
              <input
                type="email"
                className="form-control"
                onChange={(event) =>
                  handleInputChange("input-email", event.target.value)
                }
              />
            </div>
          );

        case "input-file":
          return (
            <div key={index} className="form-field">
              <label>Input File</label>
              <input
                type="file"
                className="form-control"
                onChange={(event) =>
                  handleInputChange("input-file", event.target.value)
                }
              />
            </div>
          );
        case "input-select":
          return (
            <div key={index} className="form-field">
              <label>Input Select</label>
              <select
                className="form-control"
                onChange={(event) =>
                  handleInputChange("input-select", event.target.value)
                }
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          );
        case "input-number":
          return (
            <div key={index} className="form-field">
              <label>Input Number</label>
              <input
                type="number"
                className="form-control"
                onChange={(event) =>
                  handleInputChange("input-number", event.target.value)
                }
              />
            </div>
          );
        case "input-password":
          return (
            <div key={index} className="form-field">
              <label>Input password</label>
              <input
                type="password"
                className="form-control"
                onChange={(event) =>
                  handleInputChange("input-password", event.target.value)
                }
              />
            </div>
          );
        case "input-checkbox":
          return (
            <div key={index} className="form-field">
              <label>Input checkbox</label>
              <input
                type="checkbox"
                className="form-control"
                onChange={(event) =>
                  handleInputChange("input-checkbox", event.target.value)
                }
              />
            </div>
          );
        case "input-color":
          return (
            <div key={index} className="form-field">
              <label>Input color</label>
              <input
                type="color"
                className="form-control"
                onChange={(event) =>
                  handleInputChange("input-color", event.target.value)
                }
              />
            </div>
          );
        // Add other cases for other fields
        default:
          return null;
      }
    });
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
      <div className="d-flex">
        <div
          className="border w-25 d-flex flex-column"
          style={{ background: "" }}
        >
          <div
            draggable
            onDragStart={(event) => handleDragStart(event, "input-text")}
            style={{
              backgroundColor: "lightblue",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            Input Text
          </div>
          {/* Rest of the draggable field types */}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
