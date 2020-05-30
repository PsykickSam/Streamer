import React, { useContext, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";
import IconFolderOpen from "@material-ui/icons/FolderOpen";
import IconFolder from "@material-ui/icons/Folder";
import IconFile from "@material-ui/icons/InsertDriveFile";
import IconMovie from "@material-ui/icons/Movie";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import { useSpring, animated } from "react-spring/web.cjs";
import { Box, Collapse, Tooltip, Container, Grid, Snackbar, TextField, Button } from "@material-ui/core";

// Helper
import { Helper } from "../../Helper";

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
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
  label: {
    clear: "both",
    display: "inline-block",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: 15,
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

const pathTreeBuilder = (torrent, pageState, setPageState) => {
  const files = torrent.files;
  const pathsList = {};
  const filesList = {};
  let counter = 0;

  files.forEach((file, fileIndex) => {
    const splitPath = ("Your Torrent/" + file.path).split("/");
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
  let nodeId = 0;

  pathsListReversed.forEach((sortedPath, index) => {
    if (index === 0 || lastChildIndex === sortedPath.child) {
      finalList.push(
        <StyledTreeItem
          key={Date.now() * Math.random() * Math.random() * (index + 2)}
          nodeId={(nodeId = nodeId + 1)}
          label={sortedPath.name}
        >
          {Object.keys(filesList).includes(sortedPath.name)
            ? filesList[sortedPath.name].map((singleFile, i) => {
                return (
                  <Tooltip title={singleFile.fileName}>
                    <StyledTreeItem
                      key={Date.now() * Math.random() * Math.random() * (i + 1)}
                      nodeId={(nodeId = nodeId + 1)}
                      label={singleFile.fileName}
                      icon={Helper.mediaFileTypeChecker(singleFile.fileName) ? <IconMovie /> : <IconFile />}
                      onClick={() => {
                        if (!Helper.mediaFileTypeChecker(singleFile.fileName)) {
                          setPageState({
                            ...pageState,
                            playURL: "",
                            showPoster: false,
                            snackbar: {
                              isShow: true,
                              message: "Sorry! File is not playable as media",
                              severity: "warning",
                            },
                          });
                          return;
                        }

                        const playURL = `http://localhost:4000/api/torrent/render/${singleFile.fileIndex}/${torrent.hash}`;
                        const isVideo = Helper.mediaTypeCheker(singleFile.fileName);
                        setPageState({ ...pageState, playURL, isVideo });
                      }}
                    />
                  </Tooltip>
                );
              })
            : null}
        </StyledTreeItem>
      );
    } else {
      finalList = [
        <StyledTreeItem key={Date.now()} nodeId={(nodeId = nodeId + 1)} label={lastChildParent}>
          {finalList}
          {Object.keys(filesList).includes(sortedPath.name)
            ? filesList[sortedPath.name].map((singleFile, i) => {
                return (
                  <Tooltip title={singleFile.fileName}>
                    <StyledTreeItem
                      key={Date.now() * Math.random() * Math.random() * (i + 1)}
                      nodeId={(nodeId = nodeId + 1)}
                      label={singleFile.fileName}
                      icon={Helper.mediaFileTypeChecker(singleFile.fileName) ? <IconMovie /> : <IconFile />}
                      onClick={() => {
                        if (!Helper.mediaFileTypeChecker(singleFile.fileName)) {
                          setPageState({
                            ...pageState,
                            playURL: "",
                            showPoster: false,
                            snackbar: {
                              isShow: true,
                              message: "Sorry! File is not playable as media",
                              severity: "warning",
                            },
                          });
                          return;
                        }

                        const playURL = `http://localhost:4000/api/torrent/render/${singleFile.fileIndex}/${torrent.hash}`;
                        const isVideo = Helper.mediaTypeCheker(singleFile.fileName);
                        setPageState({ ...pageState, playURL, isVideo });
                      }}
                    />
                  </Tooltip>
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
  const { state, showTorrent, attachTorrent, detachTorrent } = useContext(Contexts.TorrentContext);
  const [pageState, setPageState] = useState({
    snackbar: { isShow: false, message: "", severity: "success" },
    isVideo: true,
    playURL: "",
    isAttachable: false,
    isAttached: false,
    poster: "https://c4.wallpaperflare.com/wallpaper/615/275/818/boombox-sound-dark-technology-wallpaper-preview.jpg",
    magnetUri:
      // "magnet:?xt=urn:btih:94E05039DEEDBED65CCC8656A55A3A2B2BD256A6&dn=Ta%20Ra%20Rum%20Pum%20%282007%29%20720p%20HDRip%20x264%20AAC%20Link2Download&tr=http%3a%2f%2fsiena.crazyhd.com%2fannounce.php%3fpid%3d83dea680119f42ecf9a0858fc48789e6&tr=http%3a%2f%2fz.crazyhd.com%3a2710%2f83dea680119f42ecf9a0858fc48789e6%2fannounce",
      // "magnet:?xt=urn:btih:a52e9fca917f54a6c73be204f107630bedd1617e&dn=scoob.2020.1080p.web.dl.dd5.1.hevc.x265.rmteam.mkv&tr=http%3a%2f%2fsiena.crazyhd.com%2fannounce.php%3fpid%3d83dea680119f42ecf9a0858fc48789e6&tr=http%3a%2f%2fz.crazyhd.com%3a2710%2f83dea680119f42ecf9a0858fc48789e6%2fannounce"
      // "magnet:?xt=urn:btih:BC126D4DA14AFAD1384B47BC4F0F34868930D5D3&dn=%5bFreeCourseLab.com%5d%20Udemy%20-%20Projects%20in%20Machine%20Learning%20%20Beginner%20To%20Professional&tr=http%3a%2f%2f0d.kebhana.mx%3a80%2fannounce&tr=udp%3a%2f%2ftw.opentracker.ga%3a36920%2fannounce&tr=udp%3a%2f%2ftemp1.opentracker.gq%3a6969%2fannounce&tr=udp%3a%2f%2ftemp2.opentracker.gq%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=http%3a%2f%2ftorrent.nwps.ws%3a80%2fannounce&tr=udp%3a%2f%2fexplodie.org%3a6969%2fannounce&tr=https%3a%2f%2fopentracker.xyz%3a443%2fannounce&tr=https%3a%2f%2ft.quic.ws%3a443%2fannounce&tr=https%3a%2f%2ftracker.fastdownload.xyz%3a443%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2fipv4.tracker.harry.lu%3a80%2fannounce&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.justseed.it%3a1337%2fannounce&tr=udp%3a%2f%2fopen.demonii.si%3a1337%2fannounce",
      // "magnet:?xt=urn:btih:88594aaacbde40ef3e2510c47374ec0aa396c08e&dn=bbb_sunflower_1080p_30fps_normal.mp4&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80%2Fannounce&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=http%3A%2F%2Fdistribution.bbb3d.renderfarming.net%2Fvideo%2Fmp4%2Fbbb_sunflower_1080p_30fps_normal.mp4",
      // "magnet:?xt=urn:btih:a5df6162d3c9f6e090e42d9cdfbaf0d42f80ad7a&dn=%5bFreeTutorials.Eu%5d%20Udemy%20-%20Machine%20Learning%20Projects%20A-Z%20%20Kaggle%20and%20Real%20World%20Pro&tr=udp%3a%2f%2ftracker.tiny-vps.com%3a6969%2fannounce&tr=udp%3a%2f%2fthetracker.org%3a80%2fannounce&tr=udp%3a%2f%2ftracker.cyberia.is%3a6969%2fannounce&tr=udp%3a%2f%2fopen.demonii.si%3a1337%2fannounce&tr=udp%3a%2f%2fdenis.stalker.upeer.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.port443.xyz%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.filemail.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.moeking.me%3a6969%2fannounce&tr=udp%3a%2f%2fretracker.netbynet.ru%3a2710%2fannounce&tr=udp%3a%2f%2f00.syo.mx%3a53%2fannounce&tr=https%3a%2f%2f1.tracker.eu.org%3a443%2fannounce&tr=https%3a%2f%2f2.tracker.eu.org%3a443%2fannounce&tr=http%3a%2f%2ftracker2.dler.org%3a80%2fannounce&tr=https%3a%2f%2f3.tracker.eu.org%3a443%2fannounce&tr=udp%3a%2f%2fbt.oiyo.tk%3a6969%2fannounce&tr=https%3a%2f%2ftracker.vectahosting.eu%3a2053%2fannounce&tr=http%3a%2f%2fre-tracker.uz%3a80%2fannounce&tr=udp%3a%2f%2fretracker.baikal-telecom.net%3a2710%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=udp%3a%2f%2ftracker.birkenwald.de%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.filepit.to%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.skynetcloud.tk%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.novg.net%3a6969%2fannounce&tr=udp%3a%2f%2fexodus.desync.com%3a6969%2fannounce&tr=udp%3a%2f%2fchihaya.toss.li%3a9696%2fannounce&tr=http%3a%2f%2ftracker.bz%3a80%2fannounce&tr=udp%3a%2f%2fexplodie.org%3a6969%2fannounce&tr=udp%3a%2f%2fretracker.lanta-net.ru%3a2710%2fannounce&tr=udp%3a%2f%2ftracker.uw0.xyz%3a6969%2fannounce&tr=http%3a%2f%2f0d.kebhana.mx%3a443%2fannounce&tr=http%3a%2f%2fopen.trackerlist.xyz%3a80%2fannounce&tr=udp%3a%2f%2ftorrentclub.tech%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.nyaa.uk%3a6969%2fannounce&tr=http%3a%2f%2fvps02.net.orel.ru%3a80%2fannounce&tr=http%3a%2f%2ftracker.openzim.org%3a80%2fannounce&tr=udp%3a%2f%2fretracker.hotplug.ru%3a2710%2fannounce&tr=https%3a%2f%2fopentracker.xyz%3a443%2fannounce&tr=https%3a%2f%2ftracker.fastdownload.xyz%3a443%2fannounce&tr=https%3a%2f%2ft.quic.ws%3a443%2fannounce&tr=udp%3a%2f%2ftracker4.itzmx.com%3a2710%2fannounce&tr=http%3a%2f%2ft.acg.rip%3a6699%2fannounce&tr=udp%3a%2f%2ftracker.dler.org%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.dyn.im%3a6969%2fannounce&tr=http%3a%2f%2ft.nyaatracker.com%3a80%2fannounce&tr=http%3a%2f%2ftracker4.emce.org%3a12345%2fannounce&tr=udp%3a%2f%2fbt.xxx-tracker.com%3a2710%2fannounce&tr=udp%3a%2f%2fipv4.tracker.harry.lu%3a80%2fannounce&tr=udp%3a%2f%2ftracker.iamhansen.xyz%3a2000%2fannounce&tr=udp%3a%2f%2fbigfoot1942.sektori.org%3a6969%2fannounce&tr=udp%3a%2f%2fhk1.opentracker.ga%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.internetwarriors.net%3a1337%2fannounce&tr=udp%3a%2f%2fopen.stealth.si%3a80%2fannounce",
      // "magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4"
      // "magnet:?xt=urn:btih:6a02592d2bbc069628cd5ed8a54f88ee06ac0ba5&dn=CosmosLaundromatFirstCycle&tr=http%3A%2F%2Fbt1.archive.org%3A6969%2Fannounce&tr=http%3A%2F%2Fbt2.archive.org%3A6969%2Fannounce&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io&ws=http%3A%2F%2Fia601508.us.archive.org%2F14%2Fitems%2F&ws=http%3A%2F%2Fia801508.us.archive.org%2F14%2Fitems%2F&ws=https%3A%2F%2Farchive.org%2Fdownload%2F"
      // "magnet:?xt=urn:btih:3b6d30b3431646bdfa76e0c32fb91a4f59758157&dn=Frozen%202%202019%201080P%20Blu%20Ray%20x265%20DD%205.1%20HEVC%20%5bshadow%5d.mkv&tr=http%3a%2f%2fsiena.crazyhd.com%2fannounce.php%3fpid%3d83dea680119f42ecf9a0858fc48789e6&tr=http%3a%2f%2fz.crazyhd.com%3a2710%2f83dea680119f42ecf9a0858fc48789e6%2fannounce"
      // "magnet:?xt=urn:btih:aa4e11a7cfcd32753bcfe75f0c5f964ab7ff0d14&dn=Jumanji.The.Next.Level.2019.1080P.BluRay.HEVC.DD5.1.H265-thEo.mkv&tr=http%3a%2f%2fsiena.crazyhd.com%2fannounce.php%3fpid%3d83dea680119f42ecf9a0858fc48789e6&tr=http%3a%2f%2fz.crazyhd.com%3a2710%2f83dea680119f42ecf9a0858fc48789e6%2fannounce",
      // "magnet:?xt=urn:btih:6559e625c2a528e20f745d1842c3af123f98e667&dn=Tomar%20Amar%20Golpo-Tahsan%20Khan-%20Mehazabien%20Chowdhury-%20Drama%20City-Bangla%20Natok%202020%20-%201080P%20WEB-HD%20AAC%20H264.mp4&tr=http%3a%2f%2fsiena.crazyhd.com%2fannounce.php%3fpid%3d83dea680119f42ecf9a0858fc48789e6&tr=http%3a%2f%2fz.crazyhd.com%3a2710%2f83dea680119f42ecf9a0858fc48789e6%2fannounce",
      "magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent",
  });

  useEffect(() => {}, []);

  return (
    <Box mt={3} mb={3}>
      <Container>
        {/* <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={pageState.isShowSnackbar}
          onClose={() => {
            setPageState({ ...pageState, isShowSnackbar: false, snackbarMessage: "" });
          }}
          message={pageState.snackbarMessage}
          key={"topcenter"}
        /> */}

        <Snackbar
          open={pageState.snackbar.isShow}
          autoHideDuration={3000}
          onClose={() => {
            setPageState({ ...pageState, snackbar: { isShow: false, message: "" } });
          }}
        >
          <MuiAlert elevation={6} variant="filled" severity={pageState.snackbar.severity}>
            {pageState.snackbar.message}
          </MuiAlert>
        </Snackbar>

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
                  {Object.keys(state.torrent).length > 0
                    ? pathTreeBuilder(state.torrent, pageState, setPageState)
                    : "No files to load"}
                </TreeView>
              </Grid>
              <Grid item xs={12} md={1} />
              <Grid item xs={12} md={8}>
                {pageState.isVideo ? (
                  <ReactPlayer
                    url={pageState.playURL}
                    controls={true}
                    className={(classes.player, "react-player-css")}
                    width={"100%"}
                    height={"auto"}
                    playing
                  />
                ) : (
                  <ReactAudioPlayer src={pageState.playURL} autoPlay controls autofocus />
                )}

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
                          setPageState({
                            ...pageState,
                            magnetUri: event.target.value,
                            isDownload: false,
                          });
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
                          showTorrent(pageState.magnetUri, (params) => {
                            console.log(params);
                            if (!params.error)
                              setPageState({
                                ...pageState,
                                playURL: "",
                                isAttachable: true,
                                isAttached: false,
                                snackbar: { isShow: true, message: params.message, severity: "success" },
                              });
                            else
                              setPageState({
                                ...pageState,
                                playURL: "",
                                isAttachable: false,
                                isAttached: false,
                                snackbar: { isShow: true, message: params.message, severity: "error" },
                              });
                          });
                        }}
                      >
                        Show Files
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="outlined"
                        size="medium"
                        color="default"
                        className={classes.button}
                        disabled={!pageState.isAttachable && !pageState.isAttached}
                        onClick={() => {
                          if (pageState.isAttachable) {
                            attachTorrent(state.torrent.magnet, (params) => {
                              if (!params.error) {
                                setPageState({
                                  ...pageState,
                                  playURL: "",
                                  isAttachable: false,
                                  isAttached: true,
                                  snackbar: { isShow: true, message: params.message, severity: "success" },
                                });
                              } else {
                                setPageState({
                                  ...pageState,
                                  playURL: "",
                                  isAttachable: false,
                                  isAttached: false,
                                  snackbar: { isShow: true, message: params.message, severity: "error" },
                                });
                              }
                            });
                          } else if (pageState.isAttached) {
                            detachTorrent(state.torrent.hash, (params) => {
                              if (!params.error) {
                                setPageState({
                                  ...pageState,
                                  playURL: "",
                                  isAttachable: false,
                                  isAttached: false,
                                  snackbar: { isShow: true, message: params.message, severity: "success" },
                                });
                              } else {
                                setPageState({
                                  ...pageState,
                                  playURL: "",
                                  isAttachable: false,
                                  isAttached: false,
                                  snackbar: { isShow: true, message: params.message, severity: "error" },
                                });
                              }
                            });
                          }
                        }}
                      >
                        {!pageState.isAttached ? "Attach" : "Detach"}
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
