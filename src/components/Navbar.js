import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import ProfileButton from './ProfileButton';

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
        {/*<Link to='/profile'
          style={{position: 'absolute', right: '5vw'}}>Profile</Link>*/}
        <ProfileButton
          anchorEl={this.state.anchorEl}
          nav={this._nav}
          handleClick={this._handleClick}
          handleClose={this._handleClose} />
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
}

export default withRouter(Navbar);