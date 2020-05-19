import React from "react";
import { BrowserRouter } from "react-router-dom";

// Component
//// Layout
import Navigation from "./component/Layout/Navigation";
///// Torrent
import Torrent from "./component/Torrent/Torrent";
//// Video
import Videos from "./component/Video/Videos";
import Video from "./component/Video/Video";
import Upload from "./component/Video/Upload";
//// Home
import Home from "./component/Home/Home";
//// Error
import Error404 from "./component/Error/404";

// Router
import Router from "./routers/index";
import Route from "./routers/Route";

// Links
import routerLinks from "./routers/route.links";

// Provider
import Provider from "./Provider";

// Log
import Log from "./Log";

// Style
import "./App.css";

const App = () => {
  Log.info("Component - App is loaded");
  return (
    <div className="App">
      <Navigation routerLinks />
      <Router>
        <Route exact name={routerLinks.home.home.name} path={routerLinks.home.home.route} Component={Home} />
        <Route exact name={routerLinks.main.videos.name} path={routerLinks.main.videos.route} Component={Videos} />
        <Route exact name={routerLinks.main.video.name} path={routerLinks.main.video.route} Component={Video} />
        <Route exact name={routerLinks.main.upload.name} path={routerLinks.main.upload.route} Component={Upload} />
        <Route exact name={routerLinks.main.torrent.name} path={routerLinks.main.torrent.route} Component={Torrent} />
        <Route exact path={"*"} Component={Error404} />
      </Router>
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
