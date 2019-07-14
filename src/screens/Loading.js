import React, {Component} from 'react';
import {connect} from "react-redux";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {changeAuthStatus, loginEmail, setClassTaken, setTotalPages} from "../ducks/actions";
import {PAGE_SIZE} from "./Dashboard";
import {getObjectSize} from "../utils/Utils";

class Loading extends Component {
  componentDidMount() {
    let {setClassTaken, setTotalPages, changeAuthStatus, loginEmail, validCourses} = this.props;
    console.log('Mounted');

    firebase.auth().onAuthStateChanged(user => {
      console.log('Check auth status');
      if (user) {
        console.log('Loggedin:', user.email);
        const uid = firebase.auth().currentUser.uid;

        changeAuthStatus(true);
        loginEmail(user.email);

        // Get courses the user has taken too
        firebase.database().ref('coursesTaken/' + uid).once('value')
          .then(snap => {
            console.log('Check database', snap.val());
            if (snap.val()) {
              console.log('Has value');
              let courses = Object.keys(snap.val());
              courses.forEach(course => {
                console.log('Save', course);
                // Add class to state as class taken
                setClassTaken(course);
              });
            } else {
              console.log('No val');
            }

            // Change total page count
            let pages = Math.trunc((getObjectSize(validCourses) + PAGE_SIZE - 1) / PAGE_SIZE);
            console.log('Page Math:', pages);
            setTotalPages(pages);

            // Make sure the total page count is correct
            this._totalPages(validCourses);

            // Finally, set loading to done
            this.props.finish();
          })
      } else {
        console.log('No user');

        // Make sure the total page count is correct
        this._totalPages(validCourses);

        // Do nothing
        this.props.finish();
      }
    })
  };

  render() {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  _totalPages = (validCourses) => {
    // Change total page count
    let pages = Math.trunc((getObjectSize(validCourses) + PAGE_SIZE - 1) / PAGE_SIZE);
    console.log('Valid Courses:', getObjectSize(validCourses), 'Page Math:', pages);
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
    }
  }
};

Loading = connect(mapStateToProps, mapDispatchToProps)(Loading);

export default Loading;