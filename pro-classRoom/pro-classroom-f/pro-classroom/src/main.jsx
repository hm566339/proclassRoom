import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import AppHome from "./AppHome";
import "./index.css";
import store from "./redux/store";
import { AllClassAssignment } from "./page/Student/AllClassAssignment";
import { Submission } from "./page/Student/Submission";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AppHome />
    </Provider>
  </StrictMode>
);
