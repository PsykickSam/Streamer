import React from "react";
import { Switch } from "react-router-dom";

const Router = ({ children }) => {
  return (
    <>
      <Switch>{children}</Switch>
    </>
  );
};

export default Router;
