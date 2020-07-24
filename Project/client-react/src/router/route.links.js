const routerLinks = {
  main: {
    video: {
      name: "video",
      route: "/video/:id",
      link: "/video/",
      params: { param: { id: "id" }, bind: (param) => param.id },
    },
    videos: { name: "videos", route: "/videos", link: "/videos" },
    upload: { name: "upload", route: "/upload", link: "/upload" },
    recents: { name: "recents", route: "/recents", link: "/recents" },
    torrent: { name: "torrent", route: "/torrent", link: "/torrent" },
    audio: { name: "audio", route: "/audio", link: "/audio" },
    audios: { name: "audios", route: "/audios", link: "/audios" },
  },
  auth: {
    signin: { name: "signin", route: "/signin", link: "/signin" },
    signup: { name: "signup", route: "/signup", link: "/signup" },
  },
  home: {
    home: { name: "home", route: "/", link: "/" },
  },
};

export default routerLinks;
