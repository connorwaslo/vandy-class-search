import React, {Component} from 'react';
import Navbar from "../components/nav/Navbar";
import courses from '../courses';
import {Container, Typography} from "@material-ui/core";
import ChangePage from "../components/search/ChangePage";
import SearchResults from "../components/search/SearchResults";
import FilterSection from "../components/search/FilterSection";

class Dashboard extends Component {
  PAGE_SIZE = 25;
  totalPages = -1;
  state = {
    validCourses: {},
    page: 1
  };

  render() {
    const {page, validCourses} = this.state;

    return (
      <div>
        <Navbar/>

        <FilterSection onSubmit={this._submitSearch}/>
        <Container maxWidth='md'>
          <SearchResults validCourses={validCourses} page={page} pageSize={this.PAGE_SIZE} />
        </Container>
        {this._renderChangePage()}
      </div>
    )
  }

  _renderChangePage = () => {
    const {page} = this.state;

    if (this.totalPages === -1) {
      return null;
    }
    else if (this.totalPages === 0) {
      return (
        <Container maxWidth='xs'>
          <p style={{textAlign: 'center'}}>No results :(</p>
        </Container>
      );
    }
    else {
      return (
        <ChangePage
          page={page}
          numPages={this.totalPages}
          handleBack={this._pageBack}
          handleNext={this._pageNext}/>
      );
    }
  };

  _submitSearch = (event, searches, types) => {
    event.preventDefault();

    // Automatically go back to the first page
    this.setState({
      page: 1
    });

    // Loop through all majors
    // Loop through all classes and check if search in either/both CODE & NAME
    // If so, add major name as key to valid states, append class to key obj
    let finalResults = courses;
    let numResults = 0;

    searches.forEach((s, i) => {
      numResults = 0;  // Reset this on every search iteration
      let results = {};
      let search = s;
      let searchType = types[i];
      let majors = Object.keys(finalResults);

      majors.forEach(major => {
        let classes = finalResults[major];
        console.log('Searching', s, 'Classes:', classes);
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
            // Code Search = find only in class code
            if (searchTerms.every(term => code.includes(term))) {
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
          } else if (searchType === 'axle') {
            // AXLE Search = see what AXLE requirements it fulfills
            if (searchTerms.every(term => axle.includes(term))) {
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
          }
        });
      });

      // Update the final results to be only as big as the most recently narrowed down pool
      finalResults = results;
    });

    this.totalPages = Math.trunc((numResults + this.PAGE_SIZE - 1) / this.PAGE_SIZE);

    console.log('Results', numResults);
    this.setState({
      validCourses: finalResults
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