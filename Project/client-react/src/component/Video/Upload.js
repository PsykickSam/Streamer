import React, { useState, useEffect } from "react";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import socketIOClient from "socket.io-client";
import { Panorama, Theaters } from "@material-ui/icons";
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
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";
import Image from "material-ui-image";

// Constants
import Constants from "../../Constants";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  inputTop: {
    width: 350,
    marginBottom: theme.spacing(1),
  },
  input: {
    width: 350,
    marginTop: theme.spacing(1.5),
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
    borderWidth: "0",
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
  const fileExt = "." + Name.slice(-1);

  stateHolder.setState({
    ...stateHolder.state,
    v_name: fileName,
    v_name_ext: fileExt,
    [event.target.name]: video,
  });
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const onChangeUpload = (event, tabNumber, setState) => {
  setState({ tab_current: tabNumber });
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const Upload = () => {
  const fReader = new FileReader();
  const [socket, setSocket] = useState({
    socket: socketIOClient(Constants.Url.serverUrl),
  });
  const [state, setState] = useState({
    v_id: `${Date.now()}${String(Math.random()).substr(2)}`,
    v_name: "",
    v_name_ext: "",
    v_desc: "",
    v_file: null,
    v_thumbnail: null,
    d_thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfO2uBQZ2-m7MkBvge4dwsLxEt6hztJtg1kA&usqp=CAU",
    v_file_size: "",
    mod_upload: false,
    mod_up_progress: 0,
    mod_up_size: 0,
    mod_up_chunk: 0,
    tab_current: 0,
  });
  const stateHolder = { state, setState };
  const classes = useStyles();

  // Execute - Single Execution On Load
  useEffect(() => {}, []);
  // Execute - Single Execution On Load

  return (
    <Container align="left">
      <Box className={classes.container}>
        <Typography variant="h4" margin="dense">
          Uploader
        </Typography>
        <Typography variant="p" margin="dense">
          Upload your video and audio files view them online. Make your medias
          private or share to public so that people can watch.
        </Typography>
      </Box>
      <Box className={classes.container}>
        <Box>
          <Tabs
            indicatorColor="primary"
            value={state.tab_current}
            onChange={(event, tabNumber) =>
              onChangeUpload(event, tabNumber, setState)
            }
            aria-label="Uploader Tab"
          >
            <Tab label="Video" {...a11yProps(0)} />
            <Tab label="Audio" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Box display="flex" p={1}>
          <Box align="left" p={1}>
            <TabPanel value={state.tab_current} index={0}>
              <FormGroup>
                <FormControl>
                  <TextField
                    id="up-name"
                    className={classes.inputTop}
                    value={state.v_name}
                    name="v_name"
                    label="Video Name"
                    onChange={(event) => onTriggerChange(event, stateHolder)}
                  />
                </FormControl>
                <FormControl className={classes.input}>
                  <InputLabel htmlFor="up-type">Video Type</InputLabel>
                  <Select
                    inputProps={{
                      id: "up-type",
                      name: "v_type",
                    }}
                    placeholder="Video Type"
                    onChange={(event) => onTriggerChange(event, stateHolder)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"A"}>Music</MenuItem>
                    <MenuItem value={"E"}>Entertainment</MenuItem>
                    <MenuItem value={"M"}>Movie</MenuItem>
                    <MenuItem value={"S"}>Science</MenuItem>
                    <MenuItem value={"D"}>Education</MenuItem>
                    <MenuItem value={"T"}>Travel</MenuItem>
                    <MenuItem value={"O"}>Others</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.input}>
                  <TextField
                    id="up-description"
                    rows={5}
                    multiline={true}
                    name="v_desc"
                    label="Video Description"
                    value={state.v_desc}
                    onChange={(event) => onTriggerChange(event, stateHolder)}
                  />
                </FormControl>
                <FormControl>
                  <Button
                    variant="outlined"
                    component="label"
                    className={classes.input}
                    startIcon={<Theaters />}
                  >
                    Choose Video
                    <Input
                      type="file"
                      style={{ display: "none" }}
                      name="v_file"
                      onChange={(event) =>
                        onTriggerChangeFile(event, stateHolder)
                      }
                    />
                  </Button>
                </FormControl>
                <FormControl>
                  <Button
                    variant="outlined"
                    component="label"
                    className={classes.input}
                    startIcon={<Panorama />}
                  >
                    Choose Thumbnail
                    <Input
                      type="file"
                      style={{ display: "none" }}
                      name="v_thumbnail"
                      onChange={(event) =>
                        onTriggerChangeFile(event, stateHolder)
                      }
                    />
                  </Button>
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
            </TabPanel>
            <TabPanel value={state.tab_current} index={1}>
              <FormGroup>
                <FormControl>
                  <TextField
                    id="up-name"
                    className={classes.inputTop}
                    value={state.v_name}
                    name="a_name"
                    label="Audio Name"
                    onChange={(event) => onTriggerChange(event, stateHolder)}
                  />
                </FormControl>
                <FormControl className={classes.input}>
                  <InputLabel htmlFor="up-type">Audio Type</InputLabel>
                  <Select
                    inputProps={{
                      id: "up-type",
                      name: "v_type",
                    }}
                    placeholder="Audio Type"
                    onChange={(event) => onTriggerChange(event, stateHolder)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"A"}>Music</MenuItem>
                    <MenuItem value={"S"}>Song</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <Button
                    variant="outlined"
                    component="label"
                    className={classes.input}
                    startIcon={<Theaters />}
                  >
                    Choose Audio
                    <Input
                      type="file"
                      style={{ display: "none" }}
                      name="v_file"
                      onChange={(event) =>
                        onTriggerChangeFile(event, stateHolder)
                      }
                    />
                  </Button>
                </FormControl>
                <FormControl>
                  <Button
                    variant="outlined"
                    component="label"
                    className={classes.input}
                    startIcon={<Panorama />}
                  >
                    Choose Thumbnail
                    <Input
                      type="file"
                      style={{ display: "none" }}
                      name="v_thumbnail"
                      onChange={(event) =>
                        onTriggerChangeFile(event, stateHolder)
                      }
                    />
                  </Button>
                </FormControl>
                <FormControl>
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.input}
                    onClick={() => {}}
                  >
                    Upload
                  </Button>
                </FormControl>
              </FormGroup>
            </TabPanel>
          </Box>
          <Box align="right" p={1} display="flex">
            <List>
              <ListItem>
                <Typography variant="h4" display="inline-flex">
                  Your File Details
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={"File Name: " + state.v_name}
                  secondary="This is your file name"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={"File Size: " + state.v_file_size}
                  secondary="This is your file name"
                />
              </ListItem>
              <ListItem>
                <ListItemText primary={"File Description: " + state.v_desc} />
              </ListItem>
              <ListItem>
                <Image
                  src={state.d_thumbnail}
                  aspectRatio={16 / 9}
                  imageStyle={{ width: 300, height: "auto" }}
                />
              </ListItem>
            </List>
          </Box>
        </Box>
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
              variant="secondary"
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
  );
};

export default Upload;
