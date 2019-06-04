import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import ProfileButton from './ProfileButton';
import firebase from 'firebase/app';
import 'firebase/auth';

class Navbar extends Component {
  state = {
    anchorEl: null
  };
  
  render() {
    return (
      <div style={{position: 'absolute', top: 0, backgroundColor: 'lightgrey', height: '10vh', width: '100vw',
                  paddingTop: '5vh'}}>
        <Link to='/dashboard'
              style={{position: 'absolute', left: '5vw'}}>BETTER YES</Link>
        <ProfileButton
          anchorEl={this.state.anchorEl}
          nav={this._nav}
          handleClick={this._handleClick}
          handleClose={this._handleClose}
          logout={this._logout}/>
      </div>
    )
  }

  _nav = dir => {
    this.props.history.push(dir);
  };

  _handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  _handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  _logout = () => {
    firebase.auth().signOut()
      .then(() => {
        // Navigate back to login screen
        this.props.history.push('/login');
      })
      .catch((error) => {
        console.log('Error logging out:', error.message);
      })
  }
}

export default withRouter(Navbar);