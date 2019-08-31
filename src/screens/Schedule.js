import React, {Component} from 'react';
import {connect} from "react-redux";
import {ReactAgenda, ReactAgendaCtrl, Modal} from 'vandy-agenda';
import 'react-agenda/build/styles.css';
import 'react-datetime/css/react-datetime.css';
import {removeScheduleCourse, addSchedule, changeScheduleSelection, changeScheduleName} from "../ducks/actions";
import {renameSchedule} from "../utils/FirebaseUtils";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      showModal: false
    }
  }

  render() {
    const {schedules, selection} = this.props;

    let name = schedules[selection].name;
    let items;
    if (schedules[selection].courses === true) {
      items = [];
    } else {
      // Because this is an object, have to run through keys and then build list retrieving from hashmap
      items = Object.keys(schedules[selection].courses).map(key => {
        return schedules[selection].courses[key];
      });
    }

    // Convert schedules to type digestable by agenda

    console.log('schedules:', this.props.schedules);
    return (
      <div style={this.props.style}>
        {/*<ScheduleSidebar style={this.props.style}/>*/}
        <ReactAgenda
          items={items}
          name={name}
          numberOfDays={5}
          allSchedules={this.props.schedules}
          createSchedule={this._createSchedule}
          selectSchedule={this._selectSchedule}
          editName={this._editName}
          onItemRemove={(items, item) => this.props.removeClass(this.props.selection, item.name)}  // Schedule Index, Class name
          onCellSelect={this._handleCellSelection}
          onRangeSelection={() => this.setState({showModal:true})}/>
        {
          this.state.showModal ?
            <Modal clickOutside={() => this.setState({showModal: false})}>
              <div className='modal-content'>
                <ReactAgendaCtrl/>
              </div>
            </Modal> : null
        }
      </div>
    )
  }

  _createSchedule = () => {
    const uid = firebase.auth().currentUser.uid;

    // Get number of schedules and use length as the new key
    const index = this.props.schedules.length;

    firebase.database().ref('schedules/' + uid + '/' + index).update({
      name: 'New Schedule',
      courses: [true]
    }).then(() => {
      this.props.addSchedule('New Schedule');
      this.props.changeSchedule(this.props.schedules.length - 1); // Has to be -1 because length +1
    })
  };

  _selectSchedule = (index) => {
    this.props.changeSchedule(index);
  };

  _editName = (newName) => {
    const uid = firebase.auth().currentUser.uid;

    this.props.changeScheduleName(this.props.selection, newName);

    // Change the name in firebase
    renameSchedule(uid, this.props.selection, newName);
  };

  _handleCellSelection = item => {
    console.log('Selection:', item);
  };

  _convertSchedulesType = () => {
    let {schedules} = this.props;
    let scheds = [];
    if (schedules === Object(schedules)) {
      Object.keys(schedules).forEach(key => {
        scheds.push(schedules[key]);
      })
    } else {
      scheds = schedules;
    }

    return scheds;
  }
}

const mapStateToProps = state => {
  return {
    schedules: state.schedules,
    selection: state.auth.selectSchedule
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeScheduleName: (index, newName) => {
      return dispatch(changeScheduleName(index, newName));
    },
    addSchedule: (title) => {
      return dispatch(addSchedule(title));
    },
    changeSchedule: (index) => {
      return dispatch(changeScheduleSelection(index));
    },
    removeClass: (index, name) => {
      return dispatch(removeScheduleCourse(index, name));
    }
  }
};

Schedule = connect(mapStateToProps, mapDispatchToProps)(Schedule);

export default Schedule;