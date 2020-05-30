import React, { useContext, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";

// Router Links
import Link from "../../router/Link";

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
  const classes = useStyles();

  return (
    <div>
      <Box m={3}>
        <Grid container className={classes.root} justify="center">
          <Grid item xs={12}>
            <Grid container justify="flex-start" spacing={2}>
              <h1>HI THERE AUDIO IS ON THE WAY</h1>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default withRouter(Audios);
