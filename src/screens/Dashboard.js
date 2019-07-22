import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setSearchResults, changePage, setTotalPages} from "../ducks/actions";
import Navbar from "../components/nav/Navbar";
import courses from '../axle_pb_bus_courses';
import {Container} from "@material-ui/core";
import ChangePage from "../components/search/ChangePage";
import SearchResults from "../components/search/SearchResults";
import FilterSection from "../components/search/FilterSection";
import Schedule from "./Schedule";
import onlyMajors from '../course_data/majors';

export const PAGE_SIZE  = 25;

class Dashboard extends Component {
  render() {
    const {page, validCourses} = this.props;

    return (
      <div>
        <Navbar/>

        <div style={{position: 'absolute', left: 0, width: '50vw'}}>
          <FilterSection onSubmit={this._submitSearch}/>
          <Container maxWidth='md'>
            <SearchResults validCourses={validCourses} page={page} pageSize={PAGE_SIZE} />
          </Container>
          {this._renderChangePage(page)}
        </div>
        <Schedule style={{position: 'fixed', right: 0, width: '50vw', marginTop: '15vh'}}/>
      </div>
    )
  }

  _renderChangePage = page => {
    const {totalPages} = this.props;
    if (totalPages === -1) {
      return null;
    } else if (totalPages === 0) {
      return (
        <Container maxWidth='xs'>
          <p style={{textAlign: 'center'}}>No results :(</p>
        </Container>
      );
    } else {
      return (
        <ChangePage
          page={page}
          numPages={totalPages}
          handleBack={this._pageBack}
          handleNext={this._pageNext}/>
      );
    }
  };

  _submitSearch = (event, searches) => {
    event.preventDefault();

    // Reset search if there's only one and it's blank
    if (searches.length === 1 && searches[0].search.trim() === '') {
      // Clear all results
      this.props.setSearchResults({});
      this.props.setTotalPages(-1);
      return;
    }

    // Automatically go back to the first page
    this.props.changePage(1);

    // Loop through all majors
    // Loop through all classes and check if search in either/both CODE & NAME
    // If so, add major name as key to valid states, append class to key obj
    let finalResults = courses;
    let numResults = 0;

    searches.forEach((searchObj) => {
      // Just do nothing if th search term is blank
      if (searchObj.search.trim() === '') {
        return;
      }

      numResults = 0;  // Reset this on every search iteration
      let results = {};
      let search = searchObj.search;
      let searchType = searchObj.type;
      let majors = Object.keys(finalResults);

      // Todo: Waiting on the data for this
      if (searchType === 'major') {
        let classes = [];
        let editedSearch = search.toLowerCase();
        let allMajors = Object.keys(onlyMajors);
        let applicableMajors = [];

        // Find the majors that apply here
        allMajors.forEach(major => {
          console.log('Looking @ major:', major);
          if (major.toLowerCase().includes(editedSearch)) {
            applicableMajors.push(major);
            console.log('Applicable:', major);
          }
        });

        // Get all applicable classes for the majors that the user searched
        applicableMajors.forEach(major => {

          let sections = Object.keys(onlyMajors[major]);
          sections.forEach(section => {
            // Don't include notes in class results
            if (section !== 'Notes') {
              console.log('Classes:', onlyMajors[major][section]);
              classes.push(...onlyMajors[major][section]);
            }
          })
        });

        // Remove duplicates from classes
        classes = [...new Set(classes)];
        classes = classes.map(course => {
          return course.toLowerCase().replace(/\s/g, '');
        });

        console.log('Classes:', classes);

        // Search through undergrad catalog to get actual class info now
        majors.forEach(major => {
          courses[major].forEach(course => {
            let code = course['Code'].toLowerCase().replace(/\s+/g, '');

            // Check if this class code is in the major
            if (classes.includes(code.toLowerCase().trim())) {
              numResults++;
              if (Object.keys(results).includes(major)) {
                results[major].push(course);
              } else {
                results[major] = [course];
              }
            }
          });
        })
      } else if (searchType === 'minor') {
        let classes = [];
        let editedSearch = search.toLowerCase();
        let allMinors = Object.keys(onlyMajors);
        let applicableMinors = [];

        // Find the majors that apply here
        allMinors.forEach(minor => {
          console.log('Looking @ minor:', minor);
          if (minor.toLowerCase().includes(editedSearch)) {
            applicableMinors.push(minor);
            console.log('Applicable:', minor);
          }
        });

        // Get all applicable classes for the majors that the user searched
        applicableMinors.forEach(minor => {

          let sections = Object.keys(onlyMajors[minor]);
          sections.forEach(section => {
            // Don't include notes in class results
            if (section !== 'Notes') {
              console.log('Classes:', onlyMajors[minor][section]);
              classes.push(...onlyMajors[minor][section]);
            }
          })
        });

        // Remove duplicates from classes
        classes = [...new Set(classes)];
        classes = classes.map(course => {
          return course.toLowerCase().replace(/\s/g, '');
        });

        console.log('Classes:', classes);

        // Search through undergrad catalog to get actual class info now
        majors.forEach(major => {
          courses[major].forEach(course => {
            let code = course['Code'].toLowerCase().replace(/\s+/g, '');

            // Check if this class code is in the major
            if (classes.includes(code.toLowerCase().trim())) {
              numResults++;
              if (Object.keys(results).includes(major)) {
                results[major].push(course);
              } else {
                results[major] = [course];
              }
            }
          });
        })
      } else {
        // Todo: Consider flipping order and having if statements outside majors loop
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

    // this.totalPages = Math.trunc((numResults + PAGE_SIZE - 1) / PAGE_SIZE);
    this.props.setTotalPages(Math.trunc((numResults + PAGE_SIZE - 1) / PAGE_SIZE));
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
    page: state.results.page,
    totalPages: state.results.totalPages
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchResults: (results) => {
      dispatch(setSearchResults(results));
    },
    changePage: (page) => {
      dispatch(changePage(page));
    },
    setTotalPages: (totalPages) => {
      dispatch(setTotalPages(totalPages));
    }
  }
};

Dashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default Dashboard;