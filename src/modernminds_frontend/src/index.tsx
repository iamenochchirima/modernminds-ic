import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer} from "react-toastify"
import "../assets/main.css";
import AppContext from "./context/AppContext";
import App from "./App";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <AppContext>
      <App />
      <ToastContainer />
    </AppContext>
  </React.StrictMode>
);