import createAppContext from "./createAppContext";

// Reducer
import reducer from "../reducer/index";

// Action
import action from "../action/index";

const { Context, Provider } = createAppContext(action.App, reducer.App, {
  serverVersion: "",
});

export { Context, Provider };
