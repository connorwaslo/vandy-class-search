import React, {Component} from 'react';
import {connect} from "react-redux";
import {ReactAgenda, ReactAgendaCtrl, guid, Modal} from 'react-agenda';
import 'react-agenda/build/styles.css';
import 'react-datetime/css/react-datetime.css';

class Schedule extends Component {
  render() {
    const items = this.props.schedules['Schedule1'].courses;

    return (
      <div style={this.props.style}>
        <ReactAgenda
          items={items}
          numberOfDays={5}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    schedules: state.schedules
  }
};

Schedule = connect(mapStateToProps, null)(Schedule);

export default Schedule;