import React, {Component} from 'react';
import {ReactAgenda, ReactAgendaCtrl, guid, Modal} from 'react-agenda';
import 'react-agenda/build/styles.css';
import 'react-datetime/css/react-datetime.css';

let now = new Date();

class Schedule extends Component {
  state = {
    items: [  // Some mock classes
      {
        _id: guid(),
        name: 'SPAN 4455 Development of Drama',
        startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
        endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 5)
      }
    ]
  };

  render() {
    const {items} = this.state;

    return (
      <div style={this.props.style}>
        <ReactAgenda
          items={items}
          numberOfDays={5}/>
      </div>
    )
  }
}

export default Schedule;