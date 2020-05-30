import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, Grid, Avatar } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  media: {
    height: 160,
  },
  title: {
    fontSize: 15,
  },
  channel: {
    fontSize: 12,
  },
  others: {
    fontSize: 10,
  },
});

const SingleVideo = ({ title, thumbnail }) => {
  const classes = useStyles();
  const title_wrap = title.substr(0, 20) + "...";

  return (
    <>
      <Card variant="outlined">
        <CardActionArea className={classes.root}>
          <CardMedia
            className={classes.media}
            image={"data:image/png;base64," + thumbnail}
            title="Contemplative Reptile"
          />
          <CardContent align="left">
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
                  <Typography className={classes.title} gutterBottom>
                    {title_wrap}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className={classes.channel}>
                    Channel
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className={classes.others}>
                    Views 1k • Year: 2020
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default SingleVideo;
