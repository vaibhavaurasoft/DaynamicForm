import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Route } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Route>
      <App />
    </Route>
  </React.StrictMode>,
  rootElement
);
