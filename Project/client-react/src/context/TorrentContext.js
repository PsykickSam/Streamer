import createAppContext from "./createAppContext";

// Reducer
import reducer from "../reducer/index";

// Action
import action from "../action/index";

const { Context, Provider } = createAppContext(action.Torrent, reducer.Torrent, { torrent: {}, torrents: [] });

export { Context, Provider };
