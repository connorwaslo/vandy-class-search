import React, {Component} from 'react';
import ClassCard from "./ClassCard";

class SearchResults extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // Valid courses must be different to update
    return this.props.validCourses !== nextProps.validCourses || this.props.page !== nextProps.page;
  }

  render() {
    console.log('Render search results');

    const {page, validCourses, pageSize} = this.props;
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

    let start = (page - 1) * pageSize;
    let end = start + pageSize;
    let curPage = cards.slice(start, end);

    return curPage.map(course => {
      return course;
    });
  }
}

export default SearchResults;