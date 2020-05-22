import React, { useContext, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import IconFolderOpen from "@material-ui/icons/FolderOpen";
import IconFolder from "@material-ui/icons/Folder";
import IconFile from "@material-ui/icons/InsertDriveFile";
import IconMovie from "@material-ui/icons/Movie";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import { Link } from "react-router-dom";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import { useSpring, animated } from "react-spring/web.cjs";
import { Box, Container, Grid, Typography, TextField, Button } from "@material-ui/core";
import { Collapse, Tooltip } from "@material-ui/core";

// Context
import { Contexts } from "../../context/index";

// Transition
const TransitionComponent = (props) => {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
};

// Component
const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 0,
    marginTop: 4,
    marginBottom: 4,
    paddingLeft: 12,
    // borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
  label: {
    clear: "both",
    display: "inline-block",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: 13,
  },
}))((props) => <TreeItem {...props} align="left" TransitionComponent={TransitionComponent} />);

// Styles
const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3),
  },
  torrentDirectories: {
    height: "100vh",
  },
  button: {
    width: "100%",
    height: "100%",
  },
}));

const pathTreeBuilder = (torrent, setPageState) => {
  const files = torrent.files;
  const pathsList = {};
  const filesList = {};
  let counter = 0;

  files.forEach((file, fileIndex) => {
    const splitPath = file.path.split("/");
    const folders = splitPath.slice(0, -1);
    const foldersString = splitPath.slice(0, -1).join(",");
    const fileName = splitPath.slice(-1).join("");
    const fileFolder = splitPath.slice(-2)[0];

    if (!Object.keys(filesList).includes(`${fileFolder}`)) {
      filesList[fileFolder] = [];
    }

    filesList[fileFolder].push({ fileName, fullPath: file.path, fileId: file.id, fileIndex });

    if (
      !Object.values(pathsList)
        .map((value) => value.join(","))
        .includes(foldersString)
    ) {
      pathsList[++counter] = folders;
    }
  });

  Object.keys(pathsList).forEach((key, index) => {
    pathsList[key].forEach((value, i) => {
      if (!Object.keys(pathsList).includes(value)) {
        pathsList[value] = { name: value, child: i - 1, parent: pathsList[key][i - 1] };
      }
    });

    delete pathsList[key];
  });

  const pathsListReversed = Object.values(pathsList).sort((a, b) => (a.child < b.child ? 1 : -1));
  let finalList = [];
  let lastChildIndex = 0;
  let lastChildParent = "";

  pathsListReversed.forEach((sortedPath, index) => {
    if (index === 0 || lastChildIndex === sortedPath.child) {
      finalList.push(
        <StyledTreeItem
          key={Date.now() * Math.random() * Math.random() * (index + 2)}
          nodeId={`${Date.now() * Math.random()}`}
          label={sortedPath.name}
        >
          {Object.keys(filesList).includes(sortedPath.name)
            ? filesList[sortedPath.name].map((singleFile, i) => {
                const fileType = singleFile.fileName.split(".").slice(-1).join("");
                const icon = ["mp4", "mkv", "avi"].includes(fileType) ? <IconMovie /> : <IconFile />;
                return (
                  <StyledTreeItem
                    key={Date.now() * Math.random() * Math.random() * (i + 1)}
                    nodeId={`${Date.now() * Math.random()}`}
                    label={singleFile.fileName}
                    icon={icon}
                    onClick={() => {
                      console.log(singleFile.fullPath, singleFile.fileId, singleFile.fileIndex);
                      setPageState({
                        playUrl: `http://localhost:4000/api/torrent/render/${torrent.id}/${singleFile.fileIndex}`,
                      });
                    }}
                  />
                );
              })
            : null}
        </StyledTreeItem>
      );
    } else {
      finalList = [
        <StyledTreeItem key={Date.now()} nodeId={`${Date.now() * Math.random()}`} label={lastChildParent}>
          {finalList}
          {Object.keys(filesList).includes(sortedPath.name)
            ? filesList[sortedPath.name].map((singleFile, i) => {
                const fileType = singleFile.fileName.split(".").slice(-1).join("");
                const icon = ["mp4", "mkv", "avi"].includes(fileType) ? <IconMovie /> : <IconFile />;
                return (
                  <StyledTreeItem
                    key={Date.now() * Math.random() * Math.random() * (i + 1)}
                    nodeId={`${Date.now() * Math.random()}`}
                    label={singleFile.fileName}
                    icon={icon}
                    onClick={() => {
                      console.log(singleFile.fullPath, singleFile.fileId, singleFile.fileIndex);
                      setPageState({
                        playUrl: `http://localhost:4000/api/torrent/render/${torrent.id}/${singleFile.fileIndex}`,
                      });
                    }}
                  />
                );
              })
            : null}
        </StyledTreeItem>,
      ];
    }

    lastChildIndex = sortedPath.child;
    lastChildParent = sortedPath.parent;
  });

  return finalList;
};

const Torrent = ({ routeLinks }) => {
  const classes = useStyles();
  const { state, saveTorrent, downloadTorrent } = useContext(Contexts.TorrentContext);
  const [pageState, setPageState] = useState({
    playUrl: "",
    isDownload: false,
    magnetUri:
      // "magnet:?xt=urn:btih:94E05039DEEDBED65CCC8656A55A3A2B2BD256A6&dn=Ta%20Ra%20Rum%20Pum%20%282007%29%20720p%20HDRip%20x264%20AAC%20Link2Download&tr=http%3a%2f%2fsiena.crazyhd.com%2fannounce.php%3fpid%3d83dea680119f42ecf9a0858fc48789e6&tr=http%3a%2f%2fz.crazyhd.com%3a2710%2f83dea680119f42ecf9a0858fc48789e6%2fannounce",
      // "magnet:?xt=urn:btih:a52e9fca917f54a6c73be204f107630bedd1617e&dn=scoob.2020.1080p.web.dl.dd5.1.hevc.x265.rmteam.mkv&tr=http%3a%2f%2fsiena.crazyhd.com%2fannounce.php%3fpid%3d83dea680119f42ecf9a0858fc48789e6&tr=http%3a%2f%2fz.crazyhd.com%3a2710%2f83dea680119f42ecf9a0858fc48789e6%2fannounce"
      "magnet:?xt=urn:btih:BC126D4DA14AFAD1384B47BC4F0F34868930D5D3&dn=%5bFreeCourseLab.com%5d%20Udemy%20-%20Projects%20in%20Machine%20Learning%20%20Beginner%20To%20Professional&tr=http%3a%2f%2f0d.kebhana.mx%3a80%2fannounce&tr=udp%3a%2f%2ftw.opentracker.ga%3a36920%2fannounce&tr=udp%3a%2f%2ftemp1.opentracker.gq%3a6969%2fannounce&tr=udp%3a%2f%2ftemp2.opentracker.gq%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=http%3a%2f%2ftorrent.nwps.ws%3a80%2fannounce&tr=udp%3a%2f%2fexplodie.org%3a6969%2fannounce&tr=https%3a%2f%2fopentracker.xyz%3a443%2fannounce&tr=https%3a%2f%2ft.quic.ws%3a443%2fannounce&tr=https%3a%2f%2ftracker.fastdownload.xyz%3a443%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2fipv4.tracker.harry.lu%3a80%2fannounce&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.justseed.it%3a1337%2fannounce&tr=udp%3a%2f%2fopen.demonii.si%3a1337%2fannounce",
  });

  useEffect(() => {}, []);

  return (
    <Box mt={3} mb={3}>
      <Container>
        <Grid container className={classes.root}>
          <Grid item xs={12} md={12}>
            <Grid container>
              <Grid item xs={12} md={3} className={classes.torrentDirectories}>
                <TreeView
                  defaultExpanded={["1"]}
                  defaultCollapseIcon={<IconFolder />}
                  defaultExpandIcon={<IconFolderOpen />}
                  // defaultEndIcon={<CloseSquare />}
                >
                  {/* <Tooltip title=""></Tooltip> */}
                  {Object.keys(state.torrent).length > 0 ? (
                    <StyledTreeItem nodeId="1" label="/">
                      {pathTreeBuilder(state.torrent, setPageState)}
                    </StyledTreeItem>
                  ) : (
                    "No files to load"
                  )}
                </TreeView>
              </Grid>
              <Grid item xs={12} md={1} />
              <Grid item xs={12} md={8}>
                <ReactPlayer
                  url={pageState.playUrl}
                  controls={true}
                  muted
                  className={(classes.player, "react-player-css")}
                  width={"100%"}
                  height={"auto"}
                />

                <Box mt={2}>
                  <Grid container justify="flex-start" style={{ display: "inline-flex" }} spacing={1}>
                    <Grid item xs={12}>
                      <TextField
                        label="Magnet Url"
                        size="small"
                        variant="outlined"
                        fullWidth
                        value={pageState.magnetUri}
                        onChange={(event) => {
                          setPageState({ magnetUri: event.target.value, isDownload: false });
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box mt={2}>
                  <Grid container justify="flex-start" style={{ display: "inline-flex" }} spacing={1}>
                    <Grid item xs={3}>
                      <Button
                        variant="outlined"
                        size="medium"
                        color="default"
                        className={classes.button}
                        onClick={() => {
                          saveTorrent(pageState.magnetUri, (param) => {
                            if (!param.error) setPageState({ isDownload: true });
                          });
                        }}
                      >
                        Save & Show Files
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="outlined"
                        size="medium"
                        color="default"
                        className={classes.button}
                        disabled={!pageState.isDownload}
                        onClick={() => {}}
                      >
                        Download
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Torrent;
