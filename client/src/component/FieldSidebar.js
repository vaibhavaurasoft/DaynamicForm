import React, { useState } from "react";
import FormBuilder from "./FormBuilder";
import api from "../api/api";

const FieldSidebar = ({ step }) => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);

  const handleDragStart = (event, field) => {
    event.dataTransfer.setData("field", field);
  };

  const handleSaveForm = (formName, formLayout) => {
    const layoutToSave = {
      step: step.toString(),
      name: formName,
      fields: formLayout,
    };

    // Save the layout for the current step in local storage
    const storedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");
    const newLayouts = [...storedLayouts];
    newLayouts.push({
      step: step,
      ...layoutToSave,
    });
    localStorage.setItem("layouts", JSON.stringify(newLayouts));

    // Send the form layout to the backend API using the custom axios instance
    api
      .post("/form-layout", { layout: layoutToSave })
      .then((response) => {
        console.log(response.data.message);
        setForms((prevForms) => [
          ...prevForms,
          { name: formName, layout: formLayout },
        ]);
      })
      .catch((error) => {
        console.error("Error saving form layout:", error);
      });
  };

  const handleFormClick = (index) => {
    setSelectedForm(forms[index].layout);
  };

  const filteredForms = forms.filter((form) => form.step === step);

  return (
    <div className="d-flex p-3">
      <div
        className="border w-25 d-flex flex-column "
        style={{ background: "" }}
      >
        {/* Your draggable fields here */}
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
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, "input-dropdown")}
          style={{
            backgroundColor: "lightblue",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          dropdown
        </div>
      </div>
      <FormBuilder onSaveForm={handleSaveForm} formLayout={selectedForm} />
      <div className="w-25 ms-3">
        <h4>Saved Forms for Step {step}:</h4>
        <ul>
          {filteredForms.map((form, index) => (
            <li key={index} onClick={() => handleFormClick(index)}>
              {form.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FieldSidebar;
