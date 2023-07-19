import React, { useState } from "react";
import "./FormBuilder.css";

const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});

  const handleDrop = (event) => {
    event.preventDefault();
    const field = event.dataTransfer.getData("field");
    setFields((prevFields) => [...prevFields, field]);
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

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  const renderFields = () => {
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
        default:
          return null;
      }
    });
  };

  return (
    <div className="form-builder container">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="form-container border-warning w-75 p-4"
      >
        {renderFields()}
        <button onClick={handleSubmit} className="btn btn-primary mt-3">
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormBuilder;
