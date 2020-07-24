import createAppContext from "./createAppContext";

// Reducer
import reducer from "../reducer/index";

// Action
import action from "../action/index";

const { Context, Provider } = createAppContext(action.Video, reducer.Video, {
  videos: [],
  video: {}
});

export { Context, Provider };
