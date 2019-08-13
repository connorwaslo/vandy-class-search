import React, {Component} from 'react';
import clsx from 'clsx';
import {Button, CssBaseline, makeStyles, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {logOut} from "../../ducks/actions";
import {Link, withRouter} from 'react-router-dom';
import ProfileButton from './ProfileButton';
import firebase from 'firebase/app';
import 'firebase/auth';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '10vh',
    background: 'lightgrey'
  },
  button: {
    margin: theme.spacing(2)
  }
}));

function Navbar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchor] = React.useState(null);

  let _nav = dir => {
    props.history.push(dir);
  };

  let _handleClick = event => {
    setAnchor(event.currentTarget);
  };

  let _handleClose = () => {
    setAnchor(null);
  };

  let _logout = () => {
    firebase.auth().signOut()
      .then(() => {
        props.logOut(); // Clear auth state in store

        // Navigate back to login screen
        props.history.push('/login');
      })
      .catch((error) => {
        console.log('Error logging out:', error.message);
      })
  };

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <div
        color='primary'
        className={classes.appBar}
      >
        <Link to='/dashboard'
              className={classes.button}
              style={{position: 'absolute', left: '5vw', top: '1vh'}}>BETTER YES</Link>
        <ProfileButton
          className={classes.button}
          anchorEl={anchorEl}
          nav={_nav}
          handleClick={_handleClick}
          handleClose={_handleClose}
          logout={_logout}/>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut());
    }
  }
};

Navbar = connect(null, mapDispatchToProps)(Navbar);

export default withRouter(Navbar);