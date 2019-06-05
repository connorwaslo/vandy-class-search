import React, {Component} from 'react';
import Navbar from "../components/nav/Navbar";
import Searchbar from "../components/Searchbar";
import courses from '../courses';
import ClassCard from "../components/ClassCard";
import {Container} from "@material-ui/core";

class Dashboard extends Component {
  state = {
    search: '',
    validCourses: [{
      "Code": "AADS 1010",
      "Name": "Introdution to African American and Diaspora Studies ",
      "Credits": 3,
      "Axle": "P",
      "Pre-reqs": 0,
      "Co-reqs": 0
    },
      {
        "Code": "AADS 1016",
        "Name": "Race Matters",
        "Credits": 3,
        "Axle": "US",
        "Pre-reqs": 0,
        "Co-reqs": 0
      }]
  };

  // allCourses = courses;

  render() {
    return (
      <div style={{width: '100vw', height: '100vh'}}>
        <Navbar/>

        <Searchbar search={this.state.search} onSubmit={this._submitSearch} handleChange={this._handleChange}/>
        <Container maxWidth='md'>
          {this._renderCards()}
        </Container>
      </div>
    )
  }

  _renderCards = () => {
    return this.state.validCourses.map((course, i) => {
      console.log('Course:', course);
        return (
          <ClassCard
            key={i}
            code={course['Code']}
            name={course['Name']}
            credits={course['Credits']}
            axle={course['Axle']}
            prereqs={course['Pre-reqs']}
            coreqs={course['Co-reqs']}/>
        )
      }
    )
  }

  _submitSearch = () => {

  };

  _handleChange = event => {
    this.setState({
      search: event.target.value
    });
  }
}

export default Dashboard;