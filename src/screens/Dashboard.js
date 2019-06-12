import React, {Component} from 'react';
import Navbar from "../components/nav/Navbar";
import courses from '../courses';
import {Container} from "@material-ui/core";
import ChangePage from "../components/search/ChangePage";
import SearchResults from "../components/search/SearchResults";
import FilterSection from "../components/search/FilterSection";

class Dashboard extends Component {
  PAGE_SIZE = 25;
  totalPages = 1;
  state = {
    validCourses: {},
    page: 1
  };

  render() {
    const {page, validCourses} = this.state;
    console.log('Courses:', validCourses);

    return (
      <div>
        <Navbar/>

        <FilterSection onSubmit={this._submitSearch}/>
        <Container maxWidth='md'>
          <SearchResults validCourses={validCourses} page={page} pageSize={this.PAGE_SIZE} />
        </Container>
        <ChangePage
          page={page}
          numPages={this.totalPages}
          handleBack={this._pageBack}
          handleNext={this._pageNext}/>
      </div>
    )
  }

  _submitSearch = (event, searches, types) => {
    event.preventDefault();
    // Todo: Create a loop for searches and types rather than using the first value
    let search = searches[0];
    let searchType = types[0];
    const allCourses = courses;

    // Loop through all majors
    // Loop through all classes and check if search in either/both CODE & NAME
    // If so, add major name as key to valid states, append class to key obj

    let results = {};
    let numResults = 0;

    let majors = Object.keys(allCourses);
    majors.forEach(major => {
      let classes = allCourses[major];
      classes.forEach(course => {
        // Normalize to lower case and split terms at every space
        let wholeSearch = search.toLowerCase();
        let searchTerms = wholeSearch.split(' ');
        let code = course['Code'].toLowerCase();
        let name = course['Name'].toLowerCase();
        let axle = course['Axle'].toLowerCase();

        // Check what type of search this is
        if (searchType === 'generalSearch') {
          // Does course include all search terms in any order?
          let codeHasEvery = searchTerms.every(term => code.includes(term));
          let nameHasEvery = searchTerms.every(term => name.includes(term));
          let axleHasEvery = searchTerms.every(term => axle.includes(term));

          // General search = find in class code or name
          if (codeHasEvery || nameHasEvery || axleHasEvery) {
            numResults++;

            // If this major is already included in valid courses
            if (Object.keys(results).includes(major)) {
              if (!results[major].includes(course)) {
                results[major].push(course);
              }
            } else {
              results[major] = [course];
            }
          }
        } else if (searchType === 'classCode') {
          numResults++;

          // Code Search = find only in class code
          if (searchTerms.every(term => code.includes(term))) {
            // If this major is already included in valid courses
            if (Object.keys(results).includes(major)) {
              if (!results[major].includes(course)) {
                results[major].push(course);
              }
            } else {
              results[major] = [course];
            }
          }
        } else if (searchType === 'axle') {
          numResults++;

          // AXLE Search = see what AXLE requirements it fulfills
          if (searchTerms.every(term => axle.includes(term))) {
            // If this major is already included in valid courses
            if (Object.keys(results).includes(major)) {
              if (!results[major].includes(course)) {
                results[major].push(course);
              }
            } else {
              results[major] = [course];
            }
          }
        }
      });
    });

    this.totalPages = Math.trunc((numResults + this.PAGE_SIZE - 1) / this.PAGE_SIZE);

    console.log('Results', results);
    this.setState({
      validCourses: results
    });
  };

  _pageBack = event => {
    event.preventDefault();
    let backPage = this.state.page - 1;
    this.setState({
      page: backPage
    });
  };

  _pageNext = event => {
    event.preventDefault()
    let nextPage = this.state.page + 1;
    this.setState({
      page: nextPage
    });
  }
}

export default Dashboard;