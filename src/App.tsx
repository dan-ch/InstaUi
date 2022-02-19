import React from "react";
import { Provider } from "react-redux";
import { RoutesConfig } from "routes/RoutesConfig";
import { store, persistor } from "./store";
import "./App.scss";
import "./styles/global.scss";
import { PersistGate } from "redux-persist/integration/react";


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RoutesConfig />
      </PersistGate>
    </Provider>
  );
}

export default App;
