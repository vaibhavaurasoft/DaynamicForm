// import React from "react";
// import FormBuilder from "./FormBuilder";

// const FieldSidebar = () => {
//   // getting value
//   const handleDragStart = (event, field) => {
//     event.dataTransfer.setData("field", field);
//   };

//   return (
//     <div className="d-flex p-3">
//       <div
//         className="border w-25 d-flex flex-column "
//         style={{ background: "" }}
//       >
        // {/* 1 */}
        // <div
        //   draggable
        //   onDragStart={(event) => handleDragStart(event, "input-text")}
        //   style={{
        //     backgroundColor: "lightblue",
        //     padding: "10px",
        //     marginBottom: "10px",
        //   }}
        // >
        //   Input Text
        // </div>
        // {/* 2  */}

        // <div
        //   draggable
        //   onDragStart={(event) => handleDragStart(event, "input-range")}
        //   style={{
        //     backgroundColor: "lightpink",

        //     padding: "10px",
        //     marginBottom: "10px",
        //   }}
        // >
        //   Input Range
        //  </div>
        // {/* 3 */}
        // <div
        //   draggable
        //   onDragStart={(event) => handleDragStart(event, "input-dropdown")}
        //   style={{
        //     backgroundColor: "lightblue",

        //     padding: "10px",
        //     marginBottom: "10px",
        //   }}
        // >
        //   Input Dropdown
        // </div>
        // {/* 4 */}
        // <div
        //   draggable
        //   onDragStart={(event) => handleDragStart(event, "input-email")}
        //   style={{
        //     backgroundColor: "lightpink",
        //     padding: "10px",
        //     marginBottom: "10px",
        //   }}
        // >
        //   Input Email
        // </div>
        // {/* 5 */}
        // <div
        //   draggable
        //   onDragStart={(event) => handleDragStart(event, "input-file")}
        //   style={{
        //     // backgroundColor: "lightpink",
        //     backgroundColor: "lightblue",
        //     padding: "10px",
        //     marginBottom: "10px",
        //   }}
        // >
        //   Input file
        // </div>
        // {/* 6 */}
        // <div
        //   draggable
        //   onDragStart={(event) => handleDragStart(event, "input-number")}
        //   style={{
        //     backgroundColor: "lightpink",
        //     // backgroundColor: "lightblue",
        //     padding: "10px",
        //     marginBottom: "10px",
        //   }}
        // >
        //   Input Number
        // </div>
        // {/* 7 */}
        // <div
        //   draggable
        //   onDragStart={(event) => handleDragStart(event, "input-password")}
        //   style={{
        //     // backgroundColor: "lightpink",
        //     backgroundColor: "lightblue",
        //     padding: "10px",
        //     marginBottom: "10px",
        //   }}
        // >
        //   Input Password
        // </div>
        // {/* 8 */}
        // <div
        //   draggable
        //   onDragStart={(event) => handleDragStart(event, "input-color")}
        //   style={{
        //     backgroundColor: "lightpink",
        //     // backgroundColor: "lightblue",
        //     padding: "10px",
        //     marginBottom: "10px",
        //   }}
        // >
        //   Input checkbox
        // </div>
        // {/* 9 */}
        // <div
        //   draggable
        //   onDragStart={(event) => handleDragStart(event, "input-color")}
        //   style={{
        //     // backgroundColor: "lightpink",
        //     backgroundColor: "lightblue",
        //     padding: "10px",
        //     marginBottom: "10px",
        //   }}
        // >
        //   Input color
        // </div>
//       </div>
//       <FormBuilder />
//     </div>
//   );
// };

// export default FieldSidebar;
///////////////////////////////////////////////////////////////////
// 2

// import React, { useState } from "react";
// import FormBuilder from "./FormBuilder";

// const FieldSidebar = () => {
//   const [forms, setForms] = useState([]);

//   const handleDragStart = (event, field) => {
//     event.dataTransfer.setData("field", field);
//   };

//   const handleSaveForm = (formName, formLayout) => {
//     setForms((prevForms) => [
//       ...prevForms,
//       { name: formName, layout: formLayout },
//     ]);
//   };

//   return (
//     <div className="d-flex p-3">
//       <div
//         className="border w-25 d-flex flex-column "
//         style={{ background: "" }}
//       >
//         {/* 1 */}
//         <div
//           draggable
//           onDragStart={(event) => handleDragStart(event, "input-text")}
//           style={{
//             backgroundColor: "lightblue",
//             padding: "10px",
//             marginBottom: "10px",
//           }}
//         >
//           Input Text
//         </div>
//         {/* 2 */}
//         <div
//           draggable
//           onDragStart={(event) => handleDragStart(event, "input-range")}
//           style={{
//             backgroundColor: "lightpink",
//             padding: "10px",
//             marginBottom: "10px",
//           }}
//         >
//           Input Range
//         </div>
//         {/* 3 */}
//         <div
//           draggable
//           onDragStart={(event) => handleDragStart(event, "input-dropdown")}
//           style={{
//             backgroundColor: "lightblue",
//             padding: "10px",
//             marginBottom: "10px",
//           }}
//         >
//           Input Dropdown
//         </div>
//         {/* 4 */}
//         <div
//           draggable
//           onDragStart={(event) => handleDragStart(event, "input-email")}
//           style={{
//             backgroundColor: "lightpink",
//             padding: "10px",
//             marginBottom: "10px",
//           }}
//         >
//           Input Email
//         </div>
//         {/* Add more draggable fields here */}
//       </div>
//       <FormBuilder onSaveForm={handleSaveForm} />
//       <div className="w-25 ms-3">
//         <h4>Saved Forms:</h4>
//         <ul>
//           {forms.map((form, index) => (
//             <li key={index}>{form.name}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default FieldSidebar;

/////////////////////////////////////////////////////////////////////////////////////////
// verifiy 21 4.26


import React, { useState } from "react";
import FormBuilder from "./FormBuilder";

const FieldSidebar = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);

  const handleDragStart = (event, field) => {
    event.dataTransfer.setData("field", field);
  };

  const handleSaveForm = (formName, formLayout) => {
    setForms((prevForms) => [
      ...prevForms,
      { name: formName, layout: formLayout },
    ]);
  };

  const handleFormClick = (index) => {
    setSelectedForm(forms[index].layout);
  };

  return (
    <div className="d-flex p-3">
      <div
        className="border w-25 d-flex flex-column "
        style={{ background: "" }}
      >
        {/* 1 */}
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
        {/* Add more draggable fields here */}
      </div>
      <FormBuilder onSaveForm={handleSaveForm} formLayout={selectedForm} />
      <div className="w-25 ms-3">
        <h4>Saved Forms:</h4>
        <ul>
          {forms.map((form, index) => (
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
