import { Context as AppContext, Provider as AppProvider } from "./AppContext";
import { Context as VideoContext, Provider as VideoProvider } from "./VideoContext";
import { Context as TorrentContext, Provider as TorrentProvider } from "./TorrentContext";

export const Contexts = { AppContext, VideoContext, TorrentContext };
export const Providers = { AppProvider, VideoProvider, TorrentProvider };
