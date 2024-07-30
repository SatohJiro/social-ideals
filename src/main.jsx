import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import WebFont from "webfontloader";
import { store, persistor } from "@/redux/store";

WebFont.load({
  google: {
    families: ["Droid Sans", "Droid Serif"],
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App store={store} persistor={persistor} />
  </React.StrictMode>
);
