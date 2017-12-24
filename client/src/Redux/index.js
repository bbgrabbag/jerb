import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

//state
import auth from "./auth";
import postings from "./postings";
import loading from "./loading";

let store = createStore(combineReducers({
    auth,
    postings,
    loading
}), applyMiddleware(thunk));

export default store;
