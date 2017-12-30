import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./rootReducer";

let reduxDevTools = f => f;
if (window.devToolsExtension) {
  reduxDevTools = window.devToolsExtension();
}

const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunkMiddleware), reduxDevTools)
  );

  // Hot reloading reducer state so we won't loose state when hot reloading components
  if (module.hot) {
    module.hot.accept("./rootReducer", () => {
      const nextRootReducer = require("./rootReducer").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
