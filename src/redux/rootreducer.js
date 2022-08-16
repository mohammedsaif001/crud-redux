import { combineReducers } from "redux";
import reducer from "./reducer";

const rootreducer = combineReducers({
  user: reducer,
});

export default rootreducer;
