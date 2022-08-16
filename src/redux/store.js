import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootreducer from "./rootreducer";
const store = createStore(
  rootreducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
