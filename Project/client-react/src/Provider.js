import React from "react";
import { Providers } from "./context/index";

// Log
import Log from "./Log";

const Provider = ({ children }) => {
  Log.info("Provider initialized with 'Application Provider'");
  if (Providers !== null) {
    return (
      <Providers.TorrentProvider>
        <Providers.VideoProvider>
          <Providers.AppProvider>{children}</Providers.AppProvider>
        </Providers.VideoProvider>
      </Providers.TorrentProvider>
    );
  } else {
    return { children };
  }
};

export default Provider;
