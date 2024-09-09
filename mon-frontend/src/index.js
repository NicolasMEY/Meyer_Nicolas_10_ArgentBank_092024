import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// REDUX
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
// il comprend par défault d'aller dans index.js de reducers

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);

// Persisgate, persistor ???
