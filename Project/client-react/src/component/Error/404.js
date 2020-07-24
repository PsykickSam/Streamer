import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3)
  }
}));

const Error404 = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography
        align="center"
        variant="h2"
        margin="dense"
        className={classes.title}
      >
        404 - Page Not Found!!!{" "}
      </Typography>
    </div>
  );
};

export default Error404;
