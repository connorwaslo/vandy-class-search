import React, {Component} from 'react';
import Navbar from "../components/nav/Navbar";
import Searchbar from "../components/Searchbar";
import courses from '../courses';
import ClassCard from "../components/ClassCard";
import {Container} from "@material-ui/core";
import ChangePage from "../components/ChangePage";

class Dashboard extends Component {
  PAGE_SIZE = 5;
  totalPages = 1;
  state = {
    search: '',
    searchType: 'generalSearch',
    validCourses: {},
    page: 1
  };

  render() {
    const {page} = this.state;
    console.log('Total Pages:', this.totalPages);

    return (
      <div style={{width: '100vw', height: '100vh'}}>
        <Navbar/>

        <Searchbar
          search={this.state.search}
          searchType={this.state.searchType}
          onSubmit={this._submitSearch}
          handleChange={this._handleChange}
          handleTypeChange={this._handleTypeChange} />
        <Container maxWidth='md'>
          {this._renderCards()}
        </Container>
        <ChangePage
          page={page}
          numPages={this.totalPages}
          handleBack={this._pageBack}
          handleNext={this._pageNext}/>
      </div>
    )
  }

  _renderCards = () => {
    const {page, validCourses} = this.state;
    const keys = Object.keys(validCourses);

    let cards = [];

    let keyIndex = 0;
    keys.forEach(key => {
      const courses = validCourses[key];
      courses.forEach(course => {
          cards.push(<ClassCard
            key={keyIndex}
            major={key}
            code={course['Code']}
            name={course['Name']}
            credits={course['Credits']}
            axle={course['Axle']}
            prereqs={course['Pre-reqs']}
            coreqs={course['Co-reqs']}/>);

          keyIndex++;
        }
      )
    });

    return cards.map(course => {
      return course;
    });
  };

  _submitSearch = event => {
    event.preventDefault();

    const {search, searchType} = this.state;
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

    this.setState({
      validCourses: results
    });
  };

  _handleChange = event => {
    this.setState({
      search: event.target.value
    });
  };

  _handleTypeChange = event => {
    this.setState({
      searchType: event.target.value
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