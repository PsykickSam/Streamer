import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  VideoLibrary as VideoLibraryIcon,
  Menu as MenuIcon,
  History as HistoryIcon
} from "@material-ui/icons";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box
} from "@material-ui/core";

// Router Links
import Link from "../../router/Link";

const useStyles = makeStyles({
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12
  },
  drawer: {
    width: 250
  }
});

const toggleDrawer = (anchor, open, stateHolder) => (event) => {
  if (
    event.type === "keydown" &&
    (event.key === "Tab" || event.key === "Shift")
  ) {
    return;
  }

  stateHolder.setState({ ...stateHolder.state, [anchor]: open });
};

const NavBar = ({ routerLinks }) => {
  const [state, setState] = useState({
    left: false
  });
  const stateHolder = { state, setState };
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer("left", true, stateHolder)}
          >
            <MenuIcon />
          </IconButton>
          <Typography varient="title">Video Streamer</Typography>

          <Box className={classes.rightToolbar}>
            <Link.Upload />
            <Link.Torrent />
            <Link.Audios />
            <Link.Videos />
            <Link.SignUp />
            <Link.SignIn />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false, stateHolder)}
      >
        <Box m={2}>
          <Typography align="left" variant="h5" margin="dense">
            Streamer
          </Typography>
        </Box>
        <Divider />
        <div className={classes.drawer}>
          <List>
            <ListItem button key={"Videos"} onClick={() => console.log("Hehe")}>
              <ListItemIcon>
                <VideoLibraryIcon />
              </ListItemIcon>
              <ListItemText primary={"Videos"} />
            </ListItem>
            <ListItem button key={"Recents"}>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary={"Recents"} />
            </ListItem>
            <ListItem button key={"Sign Up"}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={"Sign Up"} />
            </ListItem>
            <ListItem button key={"Sign In"}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={"Sign In"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default NavBar;
