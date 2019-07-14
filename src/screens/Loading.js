import React, {Component} from 'react';
import {connect} from "react-redux";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {changeAuthStatus, loginEmail, setClassTaken} from "../ducks/actions";

class Loading extends Component {
  componentDidMount() {
    let {setClassTaken, changeAuthStatus, loginEmail} = this.props;
    console.log('Mounted');

    firebase.auth().onAuthStateChanged(user => {
      console.log('Check auth status');
      if (user) {
        console.log('Loggedin:', user.email);
        const uid = firebase.auth().currentUser.uid;

        changeAuthStatus(true);
        loginEmail(user.email);

        // Get courses the user has taken too
        firebase.database().ref('courses/Taken' + uid).once('value')
          .then(snap => {
            if (snap.val()) {
              let courses = Object.keys(snap.val());
              courses.forEach(course => {
                // Add class to state as class taken
                setClassTaken(course);
              });
            }

            // Finally, set loading to done
            this.props.finish();
          })
      } else {
        console.log('No user');
        // Just return blank and normal state
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
}

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
    }
  }
};

Loading = connect(null, mapDispatchToProps)(Loading);

export default Loading;