import firebase from 'firebase/app';
import 'firebase/database';

export let initSchedules = uid => {
  firebase.database().ref('schedules/' + uid).set([
    {
      name: 'Schedule1',
      courses: {
        0: true
      }
    }
  ]).then(() => {
    console.log('Successfully init schedule');
  }).catch((err) => {
    console.log('Not successful init\'ing schedule :(', err);
  })
};

export let renameSchedule = (uid, index, name) => {
  firebase.database().ref('schedules/' + uid + '/' + index).update({
    name: name
  }).then(() => {
    console.log('Updated name successfully');
  }).catch((err) => {
    console.log('Couldn\'t rename schedule...', err);
  })
};

export let saveSchedule = (uid, index, courses) => {
  firebase.database().ref('schedules/' + uid + '/' + index).update({
    courses: courses
  }).then(() => {
    console.log('Saving courses:', courses);
    console.log('Saved schedule', index, 'successfully');
  }).catch((err) => {
    console.log('Couldn\'t save schedule...', err);
  });
};