import React, { useState, useEffect } from "react";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import socketIOClient from "socket.io-client";
import {
  Box,
  Typography,
  FormControl,
  Input,
  FormGroup,
  Container,
  Button,
  Modal,
  Fade,
  Backdrop,
  TextField,
  LinearProgress,
} from "@material-ui/core";

// Constants
import Constants from "../../Constants";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  input: {
    width: 350,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
  },
  modalTitle: {
    textAlign: "center",
  },
  modalDescription: {
    textAlign: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  progress: {
    marginBottom: theme.spacing(2),
  },
  progressPercent: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontWeight: "bold",
  },
  btn: {
    display: "block",
    width: "100%",
  },
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 30,
    width: 350,
    backgroundColor: lighten("#ff6c5c", 0.5),
  },
  bar: {
    backgroundColor: "#ff6c5c",
  },
})(LinearProgress);

const onTriggerChange = (event, stateHolder) => {
  stateHolder.setState({
    ...stateHolder.state,
    [event.target.name]: event.target.value,
  });
};

const onTriggerChangeFile = (event, stateHolder) => {
  const video = event.target.files[0];
  const Name = video.name.split(".");
  const fileName = Name.slice(0, -1).join(".");
  const fileExt = '.' + Name.slice(-1);

  stateHolder.setState({
    ...stateHolder.state,
    v_name: fileName,
    v_name_ext: fileExt,
    [event.target.name]: video,
  });
};

const Upload = () => {
  const fReader = new FileReader();
  const [socket, setSocket] = useState({
    socket: socketIOClient(Constants.Url.serverUrl),
  });
  const [state, setState] = useState({
    v_id: `${Date.now()}${String(Math.random()).substr(2)}`,
    v_name: "",
    v_name_ext: '',
    v_desc: "",
    v_file: null,
    v_thumbnail: null,
    mod_upload: false,
    mod_up_progress: 0,
    mod_up_size: 0,
    mod_up_chunk: 0,
  });
  const stateHolder = { state, setState };
  const classes = useStyles();

  // Execute - Single Execution On Load
  useEffect(() => {}, []);
  // Execute - Single Execution On Load

  return (
    <>
      <Container align="center">
        <Box className={classes.container}>
          <Typography variant="h4" margin="dense">
            Video Uploader
          </Typography>
        </Box>
        <Box className={classes.container}>
          <FormGroup>
            <FormControl>
              <Button
                variant="outlined"
                component="label"
                className={classes.input}
              >
                Choose Video
                <Input
                  type="file"
                  style={{ display: "none" }}
                  name="v_file"
                  onChange={(event) => onTriggerChangeFile(event, stateHolder)}
                />
              </Button>
            </FormControl>
            <FormControl>
              <Button
                variant="outlined"
                component="label"
                className={classes.input}
                disabled
              >
                Choose Thumbnail
                <Input
                  type="file"
                  style={{ display: "none" }}
                  name="v_thumbnail"
                  onChange={(event) => onTriggerChangeFile(event, stateHolder)}
                />
              </Button>
            </FormControl>
            <FormControl>
              <TextField
                id="up-name"
                className={classes.input}
                value={state.v_name}
                name="v_name"
                label="Video Name"
                onChange={(event) => onTriggerChange(event, stateHolder)}
              />
            </FormControl>
            <FormControl>
              <TextField
                id="up-description"
                rows={5}
                multiline={true}
                className={classes.input}
                name="v_desc"
                label="Video Description"
                value={state.v_desc}
                onChange={(event) => onTriggerChange(event, stateHolder)}
              />
            </FormControl>
            <FormControl>
              <Button
                variant="contained"
                color="default"
                className={classes.input}
                onClick={() => {
                  if (state.v_file) {
                    setState({ ...state, mod_upload: true });
                    
                    fReader.onload = (event) => {
                      socket.socket.emit("Upload", {
                        Id: state.v_id,
                        Name: state.v_name,
                        Extension: state.v_name_ext,
                        Description: state.v_desc,
                        Video: event.target.result,
                      });
                    };

                    socket.socket.emit("Start", {
                      Id: state.v_id,
                      Name: state.v_name,
                      Extension: state.v_name_ext,
                      Size: state.v_file.size,
                    });

                    socket.socket.on("Finish", () => {
                      setState({
                        ...state,
                        mod_upload: true,
                        mod_up_progress: 100,
                        mod_up_size: parseInt(state.v_file.size / 1048576),
                        mod_up_chunk: parseInt(state.v_file.size / 1048576),
                      });
                    });

                    socket.socket.on("MoreData", (data) => {
                      const percent = data["Percent"];
                      const place = data["Place"] * 524288;
                      const newFile = state.v_file.slice(
                        place,
                        place + Math.min(524288, state.v_file.size - place)
                      );
                      fReader.readAsBinaryString(newFile);

                      setState({
                        ...state,
                        mod_upload: true,
                        mod_up_progress: percent,
                        mod_up_size: parseInt(state.v_file.size / 1048576),
                        mod_up_chunk: parseInt(place / 1048576),
                      });
                    });
                  }
                }}
              >
                Upload
              </Button>
            </FormControl>
          </FormGroup>
        </Box>

        {/* Modal - Video Uploading Progress Bar */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={state.mod_upload}
          onClose={() => {}}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={state.mod_upload}>
            <Box className={classes.paper}>
              <Typography variant="h4" className={classes.modalTitle}>
                Video Uploader
              </Typography>
              <Typography
                variant="subtitle1"
                className={classes.modalDescription}
              >
                Please Wait, Video is Uploading...
              </Typography>

              <Typography
                variant="body1"
                className={classes.progressPercent}
                align="center"
              >
                {parseInt(state.mod_up_progress)}% - {state.mod_up_chunk}/
                {state.mod_up_size} MB
              </Typography>
              <BorderLinearProgress
                className={classes.progress}
                variant="determinate"
                color="secondary"
                value={state.mod_up_progress}
              />
              <Button
                className={classes.btn}
                varient="secondary"
                disabled={state.mod_up_progress !== 100}
                onClick={() => {
                  // setState({
                  //   ...state,
                  //   mod_upload: false,
                  //   mod_up_progress: 0
                  // });

                  socket.socket.disconnect();
                  window.location.reload();
                }}
              >
                Done
              </Button>
            </Box>
          </Fade>
        </Modal>
        {/* Modal - Video Uploading Progress Bar */}
      </Container>
    </>
  );
};

export default Upload;
