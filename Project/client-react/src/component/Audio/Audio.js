import React, { useContext, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Button, Container } from "@material-ui/core";
// Router Links
import Link from "../../router/Link";
// Image
import IMG_Play from "../../assets/images/audio/play-button.svg";

/*
`linear-gradient(
  60deg,
  hsl(0, 75%, 50%) 10%,
  hsl(20, 75%, 50%) 10%,
  hsl(20, 75%, 50%) 25%,
  hsl(50, 75%, 50%) 25%,
  hsl(50, 75%, 50%) 40%,
  hsl(130, 75%, 50%) 40%,
  hsl(130, 75%, 50%) 55%,
  hsl(200, 75%, 50%) 55%,
  hsl(200, 75%, 50%) 70%,
  hsl(260, 75%, 50%) 70%,
  hsl(260, 75%, 50%) 85%,
  hsl(0, 75%, 50%) 85%
)`
*/

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    marginTop: "-64px", // This is the top navigation bar height
  },
  player: {
    // marginTop: "64px", // Fixing the position by adding the navigation bar height
    position: "relative",
    boxShadow: "0 0 10px black",
    background: `linear-gradient(
      60deg,
      hsl(0, 0%, 0%) 40%,
      hsl(0, 50%, 50%) 100%
    )`,
    webkitBackgroundClip: "text",
   	webkitTextFillColor: "transparent",
   	animation: "50s BeProud linear infinite",
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
  playerContainer: {
    width: "100%"
  },
}));

const Audio = ({ routeLinks }) => {
  const classes = useStyles();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "./scripts/player.script.js";
    script.async = false;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Container align="center" className={classes.container}>
      <Box className={classes.player}>
        <div className={classes.playerContainer}>
          <Button></Button>
        </div>
      </Box>
    </Container>
  );
};

export default withRouter(Audio);
