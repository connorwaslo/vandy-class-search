import {changeAuthStatus, loginEmail, setClassTaken} from "../ducks/actions";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export let initProfileData = async (store) => {
  initAuthData(store);
};

let initAuthData = async (store) => {
  console.log('initAuthData');
  const loggedIn = store.getState().auth.loggedIn;  // Loading directly from store is probably not a best practice...

  // Check to see if user is still signed in
  await firebase.auth().onAuthStateChanged((user) => {
    console.log('checkAuthState');
    // If the user is signed in
    if (user) {
      console.log('User logged in', user.email);
      // Only update store if it conflicts with reality
      if (!loggedIn) {
        console.log('Updating login state');
        store.dispatch(changeAuthStatus(true));
        store.dispatch(loginEmail(user.email));
      }

      // Initialize profile-specific data from firebase in the store
      initTakenCourses(store);
    } else {
      if (loggedIn) {
        store.dispatch(changeAuthStatus(false));
      }

      console.log('Not logged in, past dispatch loading false');
    }
  });
};

let initTakenCourses = async (store) => {
  console.log('initTakenCourses');
  const uid = firebase.auth().currentUser.uid;

  // Load set of courses taken and convert them into an array
  await firebase.database().ref('coursesTaken/' + uid).once('value').then((snap) => {
    console.log('Firebase get coursesTaken');
    // If no saved data for the user, just do nothing
    if (!snap.val()) {
      console.log('No vals, loading false');
      return;
    }

    // If the user does have saved data, load it to store
    let courses = Object.keys(snap.val());
    // Update the store to include each course code in the store
    courses.forEach((course) => {
      store.dispatch(setClassTaken(course));
    });
  });
};