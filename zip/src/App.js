import "./App.css";
import StepForm3 from "./component/StepForm3";

function App() {
  // Check if the user has already entered a form name
  const storedFormName = localStorage.getItem("formName");

  return (
    <div className="App">
      <StepForm3 />
    </div>
  );
}

export default App;


// // App.js
// import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import StepForm3 from "./component/StepForm3";
// import FormListPage from "./component/FormListPage";

// const App = () => {
//   return (
//     // <Router>
//         // <Route path="/" exact component={FormListPage} />
//         <FormListPage/>
//     // </Router>
//   );
// };

// export default App;
