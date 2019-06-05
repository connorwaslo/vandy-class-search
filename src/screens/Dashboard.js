import React, {Component} from 'react';
import Navbar from "../components/nav/Navbar";
import Searchbar from "../components/Searchbar";
import courses from '../courses';
import ClassCard from "../components/ClassCard";
import {Container} from "@material-ui/core";

class Dashboard extends Component {
  state = {
    search: '',
    validCourses: {
      "AFRICAN AMERICAN AND DIASPORA STUDIES": [
        {
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
    }
  };

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
    const {validCourses} = this.state;
    const keys = Object.keys(validCourses);

    let cards = [];

    keys.forEach(key => {
      const courses = validCourses[key];
      courses.forEach((course, i) => {
          cards.push(<ClassCard
            key={i}
            major={key}
            code={course['Code']}
            name={course['Name']}
            credits={course['Credits']}
            axle={course['Axle']}
            prereqs={course['Pre-reqs']}
            coreqs={course['Co-reqs']}/>)
        }
      )
    });

    return cards.map(course => {
      return course;
    });
  };

  _submitSearch = event => {
    event.preventDefault();

    const {search, validCourses} = this.state;
    const allCourses = courses;

    // Loop through all majors
    // Loop through all classes and check if search in either/both CODE & NAME
    // If so, add major name as key to valid states, append class to key obj

    let results = {};

    let majors = Object.keys(allCourses);
    majors.forEach(major => {
      let classes = allCourses[major];
      classes.forEach(course => {
        // Check if search term included in course code or name
        if (course['Code'].includes(search) || course['Name'].includes(search)) {
          // If this major is already included in valid courses
          if (Object.keys(results).includes(major)) {
            results[major].push(course);
          } else {
            results[major] = [course];
          }
        }
      });
    });

    this.setState({
      validCourses: results
    });
  };

  _handleChange = event => {
    this.setState({
      search: event.target.value
    });
  }
}

export default Dashboard;