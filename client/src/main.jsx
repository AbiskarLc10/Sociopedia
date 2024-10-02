import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeComponent from "./Components/ThemeComponent.jsx";
import { Contexts } from "./Context/stateContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeComponent>
            <Contexts>
            <App />
            </Contexts>
          </ThemeComponent>
        </BrowserRouter>
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
