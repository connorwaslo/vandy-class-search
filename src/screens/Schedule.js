import React, {Component} from 'react';
import {connect} from "react-redux";
import {ReactAgenda} from 'react-agenda';
import 'react-agenda/build/styles.css';
import 'react-datetime/css/react-datetime.css';
import {removeScheduleCourse} from "../ducks/actions";

class Schedule extends Component {
  render() {
    let items = this.props.schedules['Schedule1'].courses;
    console.log('Items:', items);

    return (
      <div style={this.props.style}>
        <ReactAgenda
          items={items}
          onItemRemove={(items, item) => this.props.removeClass(item.name)}
          numberOfDays={5}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('StateToProps:', state.schedules);
  return {
    schedules: state.schedules
  }
};

const mapDispatchToProps = dispatch => {
  return {
    removeClass: (name) => {
      return dispatch(removeScheduleCourse('Schedule1', name));  // Todo: Make this schedule agnostic
    }
  }
};

Schedule = connect(mapStateToProps, mapDispatchToProps)(Schedule);

export default Schedule;