import React, {Component} from 'react';
import {Container, Button} from "@material-ui/core";
import {Route} from 'react-router-dom';
import ProfQues from "../components/ProfQues";
import LoginForm from "../components/LoginForm";
import formStyles from "../styles/FormStyles";

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
      <Container>
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

    history.push('/dashboard');
  }
}

export default ProfileQuestions;