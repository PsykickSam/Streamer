import React from "react";
import { Providers } from "./context/index";
// Log
import Log from "./Log";

const Provider = ({ children }) => {
  Log.info("Provider initialized with 'Application Provider'");
  if (Providers !== null) {
    let MainProvider = null;

    Object.values(Providers).forEach((Provider, Index) => {
      if (Index !== 0)
        MainProvider = <Provider>{ MainProvider }</Provider>
      else
        MainProvider = <Provider>{ children }</Provider>
    });

    return MainProvider;
  } else {
    return { children };
  }
};

export default Provider;
