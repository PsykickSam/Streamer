import React, { useReducer } from "react";

// Self
import Log from "../Log";

const createAppContext = (actions, reducer, initialState) => {
  const Context = React.createContext();
  Log.info("Application context created!");

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchActions = [];
    Log.info("Reducer created!");

    if (actions) {
      for (let name in actions) {
        dispatchActions[name] = actions[name](dispatch);
        Log.info("Attach dispatch with action - " + name);
      }
    } else {
      Log.multi("Actions are not provided!", actions).Error();
    }

    Log.multi("Current State!", state).Info();
    Log.multi("Current Actions!", dispatchActions).Info();

    return (
      <Context.Provider value={{ state, ...dispatchActions }}>
        {children}
      </Context.Provider>
    );
  };

  Log.info("Context & Provider returned successfully");
  return { Context, Provider };
};

export default createAppContext;
