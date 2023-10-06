import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

const middleware = [thunk];

export const store = createStore(
  reducers,
  {},

  applyMiddleware(...middleware)
);
