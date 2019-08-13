import firebase from 'firebase/app';
import 'firebase/database';

export let initSchedules = uid => {
  console.log('Try to init schedule');
  firebase.database().ref('schedules/' + uid + '/Schedule1').set({
    courses: [true]
  }).then(() => {
    console.log('Successfully init schedule');
  }).catch((err) => {
    console.log('Not successful :(', err);
  })
};