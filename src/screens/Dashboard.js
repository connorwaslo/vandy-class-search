import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setSearchResults, changePage} from "../ducks/actions";
import Navbar from "../components/nav/Navbar";
import courses from '../axle_pb_bus_courses';
import {Container} from "@material-ui/core";
import ChangePage from "../components/search/ChangePage";
import SearchResults from "../components/search/SearchResults";
import FilterSection from "../components/search/FilterSection";

class Dashboard extends Component {
  PAGE_SIZE = 25;
  totalPages = -1;

  render() {
    const {page, validCourses} = this.props;

    return (
      <div>
        <Navbar/>

        <FilterSection onSubmit={this._submitSearch}/>
        <Container maxWidth='md'>
          <SearchResults validCourses={validCourses} page={page} pageSize={this.PAGE_SIZE} />
        </Container>
        {this._renderChangePage(page)}
      </div>
    )
  }

  _renderChangePage = page => {
    if (this.totalPages === -1) {
      return null;
    } else if (this.totalPages === 0) {
      return (
        <Container maxWidth='xs'>
          <p style={{textAlign: 'center'}}>No results :(</p>
        </Container>
      );
    } else {
      return (
        <ChangePage
          page={page}
          numPages={this.totalPages}
          handleBack={this._pageBack}
          handleNext={this._pageNext}/>
      );
    }
  };

  _submitSearch = (event, searches) => {
    event.preventDefault();
    console.log(searches);

    // Automatically go back to the first page
    this.props.changePage(1);

    // Loop through all majors
    // Loop through all classes and check if search in either/both CODE & NAME
    // If so, add major name as key to valid states, append class to key obj
    let finalResults = courses;
    let numResults = 0;

    searches.forEach((searchObj) => {
      numResults = 0;  // Reset this on every search iteration
      let results = {};
      let search = searchObj.search;
      let searchType = searchObj.type;
      let majors = Object.keys(finalResults);

      // Todo: Waiting on the data for this
      if (searchType === 'major') {

      } else if (searchType === 'minor') {

      } else {
        majors.forEach(major => {
          let classes = finalResults[major];
          classes.forEach(course => {
            // Normalize to lower case and split terms at every space
            let wholeSearch = search.toLowerCase();
            let searchTerms = wholeSearch.split(' ');
            let code = course['Code'].toLowerCase().replace(/\s+/g, '');
            let name = course['Name'].toLowerCase();
            let rawAxle = course['Axle'];
            let axles = rawAxle.map((ax) => {
              return ax.toLowerCase();
            });

            // Check what type of search this is
            if (searchType === 'general') {
              // Does course include all search terms in any order?
              let includesCode = code.includes(searchTerms.join('').replace(/\s+/g, ''));
              let nameHasEvery = searchTerms.every(term => name.includes(term));
              let axleHasEvery = searchTerms.every(term => {
                let includesOne = false;
                axles.forEach(ax => {
                  if (ax.includes(term)) {
                    includesOne = true;
                  }
                });
                // axle.includes(term)
                return includesOne;
              });

              // General search = find in class code or name
              if (includesCode || nameHasEvery || axleHasEvery) {
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
              // Trim the classcode and search though so that it doesn't matter between...
              // anth2160 and anth 2160
              let includesCode = code.includes(searchTerms.join('').replace(/\s+/g, ''));
              if (includesCode) {
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
              if (searchTerms.every(term => {
                let includesOne = false;
                axles.forEach(ax => {
                  if (ax.includes(term)) {
                    includesOne = true;
                  }
                });
                // axle.includes(term)
                return includesOne;
              })) {
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
            } else if (searchType === 'prereq') {

            }
          });
        });
      }

      // Update the final results to be only as big as the most recently narrowed down pool
      finalResults = results;
    });

    this.totalPages = Math.trunc((numResults + this.PAGE_SIZE - 1) / this.PAGE_SIZE);

    this.props.setSearchResults(finalResults);
  };

  _pageBack = event => {
    event.preventDefault();
    this.props.changePage(this.props.page - 1);
  };

  _pageNext = event => {
    event.preventDefault();
    this.props.changePage(this.props.page + 1);
  }
}

const mapStateToProps = state => {
  return {
    validCourses: state.results.validCourses,
    page: state.results.page
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchResults: (results) => {
      dispatch(setSearchResults(results));
    },
    changePage: (page) => {
      dispatch(changePage(page));
    }
  }
};

Dashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default Dashboard;