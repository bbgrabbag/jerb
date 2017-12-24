import React, { Component } from 'react';

//packages
import { Switch, Route, withRouter } from "react-router-dom";

//components
import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";
import Signup from "./Signup";
import Login from "./Login";
import PostList from "./PostList";
import PostForm from "./PostForm";

class App extends Component {
   
    render() {
        return (
            <div className="app-wrapper">
                <Header></Header>
                <Nav></Nav>
                <div className="content-wrapper">
                    <Switch>
                        <Route exact path='/' component={Signup} />
                        <Route path='/login' component={Login} />
                        <Route path='/add-post' component={PostForm}/>
                        <Route path='/view-posts' component={PostList}/>
                    </Switch>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default withRouter(App);