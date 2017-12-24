import React, { Component } from 'react';

//packages
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../Redux/auth";

//components
import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";
import Signup from "./Signup";
import Login from "./Login";
import ProfilePage from "./ProfilePage";
import PostList from "./PostList";
import PostForm from "./PostForm";
import LoadingPage from "./LoadingPage";
import ProtectedRoute from "./ProtectedRoute";

class App extends Component {
    componentDidMount() {
        this.props.verify()
    }
    render() {
        return (
            <div className="app-wrapper">
                <Header></Header>
                <Nav></Nav>
                <div className="content-wrapper">
                    {this.props.loading ?
                        <LoadingPage /> :
                        <Switch>
                            <Route exact path='/' component={Signup} />
                            <Route path='/login' component={Login} />
                            <ProtectedRoute path='/add-post' component={PostForm} />
                            <ProtectedRoute path='/profile-page' component={ProfilePage} />
                            <ProtectedRoute path='/view-posts' component={PostList} />
                        </Switch>
                    }
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { loading: state.loading }
}
export default withRouter(connect(mapStateToProps, { verify })(App));