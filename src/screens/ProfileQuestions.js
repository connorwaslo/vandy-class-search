import React, {Component} from 'react';
import {Container} from "@material-ui/core";
import ProfQues from "../components/ProfQues";

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
      <Container>
        <ProfQues question={questions[0]} handleChange={this._handleChange} value={yearSel}/>
      </Container>
    )
  }

  _handleChange = event => {
    this.setState({
      yearSel: event.target.value
    });
  };
}

export default ProfileQuestions;