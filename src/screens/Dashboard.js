import React, {Component} from 'react';
import Navbar from "../components/nav/Navbar";
import Searchbar from "../components/Searchbar";
import {Button} from '@material-ui/core';

class Dashboard extends Component {
  state = {
    search: ''
  };
  
  render() {
    return (
      <div style={{width: '100vw', height: '100vh'}}>
        <Navbar/>

        <Searchbar search={this.state.search} handleChange={this._handleChange}/>
      </div>
    )
  }

  _handleChange = event => {
    this.setState({
      search: event.target.value
    });
  }
}

export default Dashboard;