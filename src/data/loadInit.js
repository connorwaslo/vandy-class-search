import {setClassTaken} from "../ducks/actions";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export let initProfileData = store => {
  initAuthData(store);
  initTakenCourses(store);
};

let initAuthData = store => {

};

let initTakenCourses = store => {
  const uid = firebase.auth().currentUser.uid;
  console.log('UID:', uid);

  // Load set of courses taken and convert them into an array
  firebase.database().ref('coursesTaken/' + uid).once('value').then((snap) => {
    console.log('Snap:', snap.val());
    // If no saved data for the user, just do nothing
    if (!snap.val()) {
      return;
    }

    // If the user does have saved data, load it to store
    let courses = Object.keys(snap.val());
    // Update the store to include each course code in the store
    courses.forEach((course) => {
      store.dispatch(setClassTaken(course));
    })
  });
};