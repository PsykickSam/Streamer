import React, { useContext, useEffect } from "react";
import ReactPlayer from "react-player";
import { withRouter, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Grid, Typography, Avatar } from "@material-ui/core";

// Context
import { Context as VideoContext } from "../../context/VideoContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  player: {
    maxHeight: 461,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  color: {
    backgroundColor: "#222",
  },
}));

const Video = (props) => {
  const {
    state: { video },
    getVideo,
  } = useContext(VideoContext);
  const classes = useStyles();
  const { id } = useParams();

  // Run single time
  useEffect(() => {
    getVideo(id);
  }, []);
  // Run single time

  return (
    <Box mt={3} mb={3}>
      <Container>
        <Grid container className={classes.root}>
          <Grid item xs={12} md={12}>
            <Grid container>
              <Grid item xs={12} md={8}>
                <ReactPlayer
                  url={video.video}
                  controls={true}
                  fileConfig={{ forceHLS: video.hls }}
                  muted
                  className={(classes.player, "react-player-css")}
                  width={"100%"}
                  height={"auto"}
                />
                <Box mt={2}>
                  <Typography className={classes.title} align="left">
                    {video.title}
                  </Typography>
                  <Box mt={2}>
                    <Grid container justify="flex-start" spacing={2}>
                      <Grid key={"Image"} item>
                        <Box>
                          <Avatar
                            variant="circle"
                            className={classes.square}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRc7rJJ3Zpa_j08U6nDKVwDE_R9nyKJPcgajMqWpdI6sxqNafI1&usqp=CAU"
                          >
                            N
                          </Avatar>
                        </Box>
                      </Grid>
                      <Grid key={"Content"} item>
                        <Box>
                          <Typography variant="body2" color="textSecondary" className={classes.channel} align="left">
                            Channel
                          </Typography>
                          <Typography variant="body2" color="textSecondary" className={classes.others} align="left">
                            Views 1k • Year: 2020
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
// 850 480
export default withRouter(Video);
