import React from 'react';
import ReactDOM from 'react-dom';

//router
import { BrowserRouter as Router } from "react-router-dom";

//redux
import { Provider } from "react-redux";
import store from "./Redux";

//app
import App from "./App";

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById("root")
);