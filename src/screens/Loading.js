import React, {Component} from 'react';
import {connect} from "react-redux";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {
  changeAuthStatus, loginEmail, setClassTaken, setTotalPages,
  addSchedule, addScheduleCourse, loadScheduleCourseFromDatabase
} from "../ducks/actions";
import {PAGE_SIZE} from "./Dashboard";
import {guid} from 'react-agenda';
import {getObjectSize} from "../utils/Utils";

class Loading extends Component {
  componentDidMount() {
    let {setClassTaken, setTotalPages, changeAuthStatus, loginEmail, validCourses} = this.props;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const uid = firebase.auth().currentUser.uid;

        changeAuthStatus(true);
        loginEmail(user.email);

        // Get courses the user has taken too
        firebase.database().ref('coursesTaken/' + uid).once('value')
          .then(snap => {
            if (snap.val()) {
              let courses = Object.keys(snap.val());
              courses.forEach(course => {
                // Add class to state as class taken
                setClassTaken(course);
              });
            }

            // Change total page count
            let pages = Math.trunc((getObjectSize(validCourses) + PAGE_SIZE - 1) / PAGE_SIZE);

            // If there's no results, then just set it to -1
            if (pages === 0)
              setTotalPages(-1);
            else
              setTotalPages(pages);

            // Make sure the total page count is correct
            this._totalPages(validCourses);

            // Grab schedules too
            firebase.database().ref('schedules/' + uid).once('value')
              .then(snap => {
                if (snap.val()) {
                  let scheds = snap.val();

                  let schedIndex = 0;
                  scheds.forEach(schedule => {
                    this.props.addSchedule(schedule.name);

                    let index = 0;

                    console.log('Schedule courses:', Object.keys(schedule.courses));
                    Object.keys(schedule.courses).forEach(key => {
                      if (schedule.courses[key] === true) {
                        return;
                      }

                      // Preprocessing before adding them to state
                      let course = JSON.parse(JSON.stringify(schedule.courses[key])); // Copy course object
                      let courseStartTime = new Date(course.startDateTime);
                      let courseEndTime = new Date(course.endDateTime);

                      console.log('StartDateTime Hours:', typeof course.startDateTime, course.startDateTime);

                      // All that matters is the hour and minute. Snag those and then make them today.
                      const startTime = [courseStartTime.getHours(), courseStartTime.getMinutes()];
                      const endTime = [courseEndTime.getHours(), courseEndTime.getMinutes()];

                      course.startDateTime = new Date(Date.now());
                      course.startDateTime.setHours(startTime[0], startTime[1], 0);
                      course.endDateTime = new Date(Date.now());
                      course.endDateTime.setHours(endTime[0], endTime[1]);
                      course._id = guid();

                      console.log('Initial course:', course);

                      let addCourses = [];
                      if (course.freq === 'MWF') {
                        let day2Start = new Date(course.startDateTime);
                        day2Start.setDate(day2Start.getDate() + 2);
                        let day2End = new Date(course.endDateTime);
                        day2End.setDate(day2End.getDate() + 2);

                        let day4Start = new Date(course.startDateTime);
                        day4Start.setDate(day4Start.getDate() + 4);
                        let day4End = new Date(course.endDateTime);
                        day4End.setDate(day4End.getDate() + 4);

                        // Add initial course
                        addCourses.push(course);
                        addCourses.push({
                          _id: guid(),
                          startDateTime: day2Start,
                          endDateTime: day2End,
                          name: course.name
                        });
                        addCourses.push({
                          _id: guid(),
                          startDateTime: day4Start,
                          endDateTime: day4End,
                          name: course.name
                        });

                        index += 3;
                      } else if (course.freq === 'TR') {
                        let day1Start = new Date(course.startDateTime);
                        day1Start.setDate(day1Start.getDate() + 1);
                        let day1End = new Date(course.endDateTime);
                        day1End.setDate(day1End.getDate() + 1);

                        let day2Start = new Date(course.startDateTime);
                        day2Start.setDate(day2Start.getDate() + 3);
                        let day2End = new Date(course.endDateTime);
                        day2End.setDate(day2End.getDate() + 3);

                        // Add initial course
                        addCourses.push({
                          _id: guid(),
                          startDateTime: day1Start,
                          endDateTime: day1End,
                          name: course.name
                        });
                        addCourses.push({
                          _id: guid(),
                          startDateTime: day2Start,
                          endDateTime: day2End,
                          name: course.name
                        });

                        index += 2;
                      }

                      addCourses.forEach(course => {
                        this.props.loadClassToSchedule(schedIndex, course);
                      });
                    });

                    schedIndex++;
                  });

                  // Finally, set loading to done
                  // this.props.history.push('/dashboard');
                  this.props.finish();
                } else {
                  // this.props.history.push('/dashboard');
                  this.props.finish();
                }
              });
          })
      } else {
        console.log('No user');

        // Reset the number of pages to -1 because no data available
        this.props.setTotalPages(-1);

        // Do nothing
        this.props.finish();
      }
    })
  };

  render() {
    return (
      <div style={{width: '100%', height: '100%', dislay: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h1 style={{textAlign: 'center'}}>Loading...</h1>
      </div>
    )
  }

  _totalPages = (validCourses) => {
    // Change total page count
    let pages = Math.trunc((getObjectSize(validCourses) + PAGE_SIZE - 1) / PAGE_SIZE);
    setTotalPages(pages);
  };
}

const mapStateToProps = state => {
  return {
    validCourses: state.results.validCourses
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeAuthStatus: (status) => {
      dispatch(changeAuthStatus(status));
    },
    loginEmail: (email) => {
      dispatch(loginEmail(email));
    },
    setClassTaken: (course) => {
      dispatch(setClassTaken(course));
    },
    setTotalPages: (totalPages) => {
      dispatch(setTotalPages(totalPages));
    },
    addSchedule: (title) => {
      dispatch(addSchedule(title));
    },
    addClassToSchedule: (title, course) => {
      dispatch(addScheduleCourse(title, course));
    },
    loadClassToSchedule: (index, course) => {
      dispatch(loadScheduleCourseFromDatabase(index, course));
    }
  }
};

Loading = connect(mapStateToProps, mapDispatchToProps)(Loading);

export default Loading;