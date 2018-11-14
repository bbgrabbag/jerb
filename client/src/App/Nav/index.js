import React from 'react'
import styled from 'styled-components'

//packages
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const Navigation = styled.div`
  grid-area: nav;
  width: 60%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 2em;
  padding-right: 1em;
  & a {
    color: whitesmoke;
    margin-left: 2em;
  }
`

const Header = styled.div`
  background-color: rgba(127, 191, 255, 0.8);
  width: 100%;
  height: 8vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
  & .brand {
    display: flex;
    align-items: center;
    & h1 {
      color: whitesmoke;
      transform: scale(0.8);
    }
    & a h1 {
      color: whitesmoke;
      transform: scale(1);
    }
    & a h1 i {
      margin-right: 0.2em;
    }
  }
`

function Nav(props) {
  let { isAuthenticated } = props
  let style = { display: isAuthenticated ? 'flex' : 'none' }

  return (
    <Header>
      <div className="brand">
        <Link to="/">
          <h1>
            <i className="fa fa-briefcase" aria-hidden="true" />
            Jerb.
          </h1>
        </Link>
        <h1>Where the jerbs at</h1>
      </div>
      <Navigation className="nav-links" style={style}>
        <Link to="/profile-page">
          <i className="fa fa-home" />
        </Link>
        <Link to="/add-post">
          <i className="fa fa-plus" />
        </Link>
        <Link to="/view-posts">
          <i className="fa fa-eye" />
        </Link>
      </Navigation>
    </Header>
  )
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated })

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(Nav)
)
