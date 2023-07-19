import React from "react";
import FormBuilder from "./FormBuilder";

const FieldSidebar = () => {
  // getting value
  const handleDragStart = (event, field) => {
    event.dataTransfer.setData("field", field);
  };

  return (
    <div className="d-flex p-3">
      <div
        className="border w-25 d-flex flex-column "
        style={{ background: "" }}
      >
        {/* 1 */}
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
        {/* 2  */}

        <div
          draggable
          onDragStart={(event) => handleDragStart(event, "input-range")}
          style={{
            backgroundColor: "lightpink",

            padding: "10px",
            marginBottom: "10px",
          }}
        >
          Input Range
        </div>
        {/* 3 */}
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, "input-dropdown")}
          style={{
            backgroundColor: "lightblue",

            padding: "10px",
            marginBottom: "10px",
          }}
        >
          Input Dropdown
        </div>
        {/* 4 */}
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, "input-email")}
          style={{
            backgroundColor: "lightpink",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          Input Email
        </div>
        {/* 5 */}
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, "input-file")}
          style={{
            // backgroundColor: "lightpink",
            backgroundColor: "lightblue",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          Input file
        </div>
        {/* 6 */}
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, "input-number")}
          style={{
            backgroundColor: "lightpink",
            // backgroundColor: "lightblue",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          Input Number
        </div>
        {/* 7 */}
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, "input-password")}
          style={{
            // backgroundColor: "lightpink",
            backgroundColor: "lightblue",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          Input Password
        </div>
        {/* 8 */}
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, "input-color")}
          style={{
            backgroundColor: "lightpink",
            // backgroundColor: "lightblue",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          Input checkbox
        </div>
        {/* 9 */}
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, "input-color")}
          style={{
            // backgroundColor: "lightpink",
            backgroundColor: "lightblue",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          Input color
        </div>
      </div>
      <FormBuilder />
    </div>
  );
};

export default FieldSidebar;
