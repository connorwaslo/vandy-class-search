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

    // Todo: This gives a hooks error for some reason when in Button props...
    // className={formStyles().submit}

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

    // Save this answer to Firebase Realtime database
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref('profiles/' + uid).set({
      year: this.state.yearSel
    }).catch((error) => {
      console.log('Error:', error.message);
    });

    history.push('/dashboard');
  }
}

export default ProfileQuestions;