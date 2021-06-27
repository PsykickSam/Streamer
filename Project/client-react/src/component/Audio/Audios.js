import React, { useContext, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
// Router Links
import Link from "../../router/Link";
// Context
import { Context as AudioContext } from "../../context/AudioContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  singleVideo: {
    margin: 8,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const Audios = ({ routeLinks }) => {
  const {
    state: { audios },
  } = useContext(AudioContext);
  const classes = useStyles();


  return (
    <Box m={3}>
      <Grid container className={classes.root} justify="center">
        <Grid item xs={12}>
          <Grid
            container
            justify={audios.length > 0 ? "flex-start" : "center"}
            spacing={2}
          >
            {audios !== undefined ? (
              audios.length > 0 ? (
                audios.map((video) => {
                  return (
                    <Grid item key={video.id} xs={3}>
                    </Grid>
                  );
                })
              ) : (
                <h2>No Audios Found</h2>
              )
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withRouter(Audios);
