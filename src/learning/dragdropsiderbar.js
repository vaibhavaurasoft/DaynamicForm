import React from "react";
import Dopformbuilder from "./dopformbuilder";
function Dragdropsiderbar() {
  const handleDragStart = (event, field) => {
    event.dataTransfer.setData("field", field);
  };

  return (
    <>
      <div className="container w-50">
        <div className="w-25">
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
        </div>
        <Dopformbuilder />
      </div>
    </>
  );
}

export default Dragdropsiderbar;
