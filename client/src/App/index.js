import React, { Component } from 'react'
import './index.css'

//packages
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { verify } from '../Redux/auth'

//components
import Footer from './Footer'
import Nav from './Nav'
import Signup from './Signup'
import Login from './Login'
import ProfilePage from './ProfilePage'
import PostList from './PostList'
import PostForm from './PostForm'
import LoadingPage from './LoadingPage'
import ProtectedRoute from './ProtectedRoute'

class App extends Component {
  componentDidMount() {
    this.props.verify()
  }
  render() {
    let { loading, isAuthenticated } = this.props
    let style = {
      gridTemplateRows: isAuthenticated ? `15% 85% 15% 10%` : `15% 60% 15% 10%`
    }
    return (
      <div className="app-wrapper" style={style}>
        <Nav />
        <div className="content-wrapper">
          {loading ? (
            <LoadingPage />
          ) : (
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route exact path="/" component={Login} />
              <ProtectedRoute path="/add-post" component={PostForm} />
              <ProtectedRoute path="/profile-page" component={ProfilePage} />
              <ProtectedRoute path="/view-posts" component={PostList} />
            </Switch>
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { loading: state.loading, isAuthenticated: state.auth.isAuthenticated }
}
export default withRouter(
  connect(
    mapStateToProps,
    { verify }
  )(App)
)
