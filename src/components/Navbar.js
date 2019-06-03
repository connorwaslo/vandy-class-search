import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
  state = {};
  
  render() {
    return (
      <div style={{position: 'absolute', top: 0, backgroundColor: 'lightgrey', height: '10vh', width: '100vw',
                  paddingTop: '5vh'}}>
        <Link to='/dashboard'
              style={{position: 'absolute', left: '5vw'}}>BETTER YES</Link>
        <Link to='/profile'
          style={{position: 'absolute', right: '5vw'}}>Profile</Link>
      </div>
    )
  }
}

export default Navbar;