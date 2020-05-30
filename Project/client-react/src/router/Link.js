import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Button } from "@material-ui/core";

// Router Links
import routerLinks from "./route.links";

const Link = () => {};

Link.Video = (children = null, params = null) => (
  <ReactLink
    to={routerLinks.main.video.link + routerLinks.main.video.params.bind(params)}
    style={{ textDecoration: "none" }}
  >
    {children === null ? <Button>Video</Button> : children}
  </ReactLink>
);
Link.Torrent = () => (
  <ReactLink to={routerLinks.main.torrent.link} style={{ textDecoration: "none" }}>
    <Button>Torrent</Button>
  </ReactLink>
);
Link.Audio = () => (
  <ReactLink to={routerLinks.main.audio.link} style={{ textDecoration: "none" }}>
    <Button>Audio</Button>
  </ReactLink>
);
Link.Audios = () => (
  <ReactLink to={routerLinks.main.audios.link} style={{ textDecoration: "none" }}>
    <Button>Audios</Button>
  </ReactLink>
);
Link.Videos = () => (
  <ReactLink to={routerLinks.main.videos.link} style={{ textDecoration: "none" }}>
    <Button>Videos</Button>
  </ReactLink>
);
Link.Upload = () => (
  <ReactLink to={routerLinks.main.upload.link} style={{ textDecoration: "none" }}>
    <Button>Upload</Button>
  </ReactLink>
);
Link.SignUp = () => (
  <ReactLink to={routerLinks.home.home.link} style={{ textDecoration: "none" }}>
    <Button>SignUp</Button>
  </ReactLink>
);
Link.SignIn = () => (
  <ReactLink to={routerLinks.home.home.link} style={{ textDecoration: "none" }}>
    <Button>SignIn</Button>
  </ReactLink>
);

export default Link;
