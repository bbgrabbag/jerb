import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import axios from "axios";

//state
import auth from "./auth";
import postings from "./postings";
import loading from "./loading";

axios.interceptors.request.use((config) => {
    let token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});
export { axios };

let store = createStore(combineReducers({
    auth,
    postings,
    loading
}), applyMiddleware(thunk));

export default store;
