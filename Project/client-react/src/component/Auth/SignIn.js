import React, { useState, useEffect } from "react";
import {
  lighten,
  makeStyles,
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import socketIOClient from "socket.io-client";
import { Panorama, Theaters } from "@material-ui/icons";
import { purple, green } from "@material-ui/core/colors";
import {
  Box,
  Typography,
  FormControl,
  Input,
  FormGroup,
  Container,
  Button,
  Modal,
  Fade,
  Backdrop,
  TextField,
  LinearProgress,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";
import Image from "material-ui-image";

// Constants
import Constants from "../../Constants";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    marginTop: "-64px", // This is the top navigation bar height
  },
  auth: {
    // marginTop: "64px", // Fixing the position by adding the navigation bar height
    position: "relative",
    boxShadow: "0 0 10px black",
    backgroundColor: "ghostwhite",
    width: 500,
    height: 500,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    "&:after": {
      background: "#424242",
      boxShadow: "0 0 20px black",
      transform: "translate(-50%, -50%)",
      position: "absolute",
      content: '""',
      top: "50%",
      left: "50%",
      width: 470,
      height: 470,
      zIndex: -1,
    },
  },
  title: {
    userSelect: "none",
  },
  authContainer: {
    width: "100%",
  },
  authInputs: {
    width: "80%",
    marginTop: 24,
  },
}));

const authInputTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: green[500],
    },
  },
});

const SignIn = () => {
  const classes = useStyles();

  // Execute - Single Execution On Load
  useEffect(() => {}, []);
  // Execute - Single Execution On Load

  return (
    <Container align="center" className={classes.container}>
      <Box className={classes.auth}>
        <div className={classes.authContainer}>
          <Typography variant="h3" className={classes.title}>
            Sign In
          </Typography>

          <ThemeProvider theme={authInputTheme}>
            <form className={classes.authForm} noValidate autoComplete="off">
              <div>
                <TextField
                  required
                  id="email"
                  label="Email"
                  className={classes.authInputs}
                />
              </div>
              <div>
                <TextField
                  required
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  className={classes.authInputs}
                />
              </div>
              <div>
                <Button variant="outlined" className={classes.authInputs}>
                  Sign In
                </Button>
              </div>
            </form>
          </ThemeProvider>
        </div>
      </Box>
    </Container>
  );
};

export default SignIn;
