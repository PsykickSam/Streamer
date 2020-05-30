import React from "react";
import { Route as ReactRoute } from "react-router-dom";

// Route
import routerLinks from "./route.links";

const Route = ({ exact = false, path, name, Component }) => {
  return (
    <ReactRoute exact={exact} path={path} name={name}>
      <Component routeLinks={routerLinks} />
    </ReactRoute>
  );
};

export default Route;
