import firebase from 'firebase/app';
import 'firebase/database';

export let initSchedules = uid => {
  console.log('Try to init schedule');
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