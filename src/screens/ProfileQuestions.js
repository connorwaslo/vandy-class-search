import React, {Component} from 'react';
import {Container, Button} from "@material-ui/core";
import {Route} from 'react-router-dom';
import ProfQues from "../components/ProfQues";
import firebase from 'firebase/app';
import 'firebase/database';

class ProfileQuestions extends Component {
  state = {
    yearSel: 'First Year',
    profile: {
      year: 0,
      // majors: [],
      // minors: []
    },
    questions: [
      'What year are you going into?',
      // 'Major(s)?',
      // 'Minor(s)'
    ]
  };
  
  render() {
    const {yearSel, questions} = this.state;

    return (
      <Container maxWidth='sm'>
        <ProfQues question={questions[0]} handleChange={this._handleChange} value={yearSel}/>
        <Route render={({history}) => (
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={e => this._submitAnswer(e, history)}>
            Submit
          </Button>
        )} />
      </Container>
    )
  }

  _handleChange = event => {
    this.setState({
      yearSel: event.target.value
    });
  };

  _submitAnswer = (event, history) => {
    event.preventDefault();

    // Convert year sel to int to save data
    let yearConv = 0;
    switch (this.state.yearSel) {
      case 'First Year':
        yearConv = 1;
        break;
      case 'Sophomore':
        yearConv = 2;
        break;
      case 'Junior':
        yearConv = 3;
        break;
      case 'Senior':
        yearConv = 4;
        break;
      default:
        yearConv = 0;
        break;
    }

    // Save this answer to Firebase Realtime database
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref('profiles/' + uid).set({
      year: yearConv
    }).catch((error) => {
      console.log('Error:', error.message);
    });

    history.push('/dashboard');
  }
}

export default ProfileQuestions;