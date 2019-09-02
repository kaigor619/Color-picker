import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers";
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk));

console.log(store.getState());
export default store;
