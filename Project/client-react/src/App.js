import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Component
/// Layout
import Navigation from "./component/Layout/Navigation";
/// Torrent
import Torrent from "./component/Torrent/Torrent";
/// Video
import Videos from "./component/Video/Videos";
import Video from "./component/Video/Video";
import Upload from "./component/Video/Upload";
/// Audio
import Audios from "./component/Audio/Audios";
import Audio from "./component/Audio/Audio";
/// Home
import Home from "./component/Home/Home";
/// Auth
import SignIn from "./component/Auth/SignIn";
import SignUp from "./component/Auth/SignUp";
/// Error
import Error404 from "./component/Error/404";

// Router
import Router from "./router/index";
import Route from "./router/Route";

// Links
import routerLinks from "./router/route.links";

// Provider
import Provider from "./Provider";

// Log
import Log from "./Log";

// Style
import "./App.css";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const App = () => {
  Log.info("Component - App is loaded");
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Paper style={{ height: "100vh" }}>
          <Navigation routerLinks />
          <Router>
            <Route exact name={routerLinks.auth.signin.name} path={routerLinks.auth.signin.route} Component={SignIn} />
            <Route exact name={routerLinks.auth.signup.name} path={routerLinks.auth.signup.route} Component={SignUp} />
            <Route exact name={routerLinks.home.home.name} path={routerLinks.home.home.route} Component={Home} />
            <Route exact name={routerLinks.main.videos.name} path={routerLinks.main.videos.route} Component={Videos} />
            <Route exact name={routerLinks.main.video.name} path={routerLinks.main.video.route} Component={Video} />
            <Route exact name={routerLinks.main.upload.name} path={routerLinks.main.upload.route} Component={Upload} />
            <Route exact name={routerLinks.main.torrent.name} path={routerLinks.main.torrent.route} Component={Torrent} />
            <Route exact name={routerLinks.main.audios.name} path={routerLinks.main.audios.route} Component={Audios} />
            <Route exact name={routerLinks.main.audio.name} path={routerLinks.main.audio.route} Component={Audio} />
            <Route exact path={"*"} Component={Error404} />
          </Router>
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export default () => (
  <Provider
    children={
      <BrowserRouter>
        <App />
      </BrowserRouter>
    }
  />
);
