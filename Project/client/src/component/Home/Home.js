import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

// Context
import { Context as AppContext } from "../../context/AppContext";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3),
  },
}));

const function_Trigger = async (func) => {
  await func();
};

const Home = ({ routeLinks }) => {
  const { state, getServerVersion } = useContext(AppContext);
  const classes = useStyles();

  useEffect(() => {
    function_Trigger(getServerVersion);
  }, []);

  return (
    <div>
      <Typography align="center" variant="h2" margin="dense" className={classes.title}>
        Welcome to Streamer
      </Typography>
      <Typography align="center" variant="body1" margin="dense">
        Client Version: 0.0.1
      </Typography>
      <Typography align="center" variant="body1" margin="dense">
        Server Version: {state.serverVersion}
      </Typography>
    </div>
  );
};

export default Home;
