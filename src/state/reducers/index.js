import { combineReducers } from "redux";
import boardReducer from "./boardReducer";

const reducers = combineReducers({
  board: boardReducer,
});

export default reducers;
