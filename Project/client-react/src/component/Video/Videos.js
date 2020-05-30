import React, { useContext, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";

// Router Links
import Link from "../../router/Link";

// Component
//// Video
import SingleVideo from "./SingleVideo";

// Context
import { Context as VideoContext } from "../../context/VideoContext";

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

const videoItem = (video, routeLinks) => {
  return Link.Video(<SingleVideo title={video.title} thumbnail={video.thumbnail} />, {
    [routeLinks.main.video.params.param.id]: video.id,
  });
};

const Videos = ({ routeLinks }) => {
  const {
    state: { videos },
    getListVideos,
  } = useContext(VideoContext);
  const classes = useStyles();

  useEffect(() => {
    getListVideos();
  }, []);

  return (
    <div>
      <Box m={3}>
        <Grid container className={classes.root} justify="center">
          <Grid item xs={12}>
            <Grid container justify="flex-start" spacing={2}>
              {videos !== undefined
                ? videos.length >= 0
                  ? videos.map((video) => {
                      return (
                        <Grid item key={video.id} xs={3}>
                          {videoItem(video, routeLinks)}
                        </Grid>
                      );
                    })
                  : null
                : null}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default withRouter(Videos);
