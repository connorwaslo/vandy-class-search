import React, {Component} from 'react';
import {ReactAgenda} from 'react-agenda';
import 'react-agenda/build/styles.css';
import 'react-datetime/css/react-datetime.css';

class Schedule extends Component {
  state = {};

  render() {
    return (
      <div style={this.props.style}>
        <ReactAgenda
          numberOfDays={5}/>
      </div>
    )
  }
}

export default Schedule;