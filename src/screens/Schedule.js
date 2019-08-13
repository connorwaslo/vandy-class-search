import React, {Component} from 'react';
import {connect} from "react-redux";
import {ReactAgenda, ReactAgendaCtrl, Modal} from 'vandy-agenda';
import 'react-agenda/build/styles.css';
import 'react-datetime/css/react-datetime.css';
import {removeScheduleCourse, addSchedule, removeSchedule, changeScheduleSelection, changeScheduleName} from "../ducks/actions";
import {ScheduleSidebar} from "../components/nav/ScheduleSidebar";
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

    console.log('Selection:', selection);

    let name = schedules[selection].name;
    let items;
    if (schedules[selection].courses === true) {
      items = [];
    } else {
      items = schedules[selection].courses;
    }

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
          onItemRemove={(items, item) => this.props.removeClass(item.name)}
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
      console.log('Added new schedule');
      this.props.addSchedule('New Schedule');
      this.props.changeSchedule(this.props.schedules.length - 1); // Has to be -1 because length +1
    })
  };

  _selectSchedule = (index) => {
    this.props.changeSchedule(index);
  };

  _editName = (newName) => {
    console.log('Edit Name', newName, '@ index:', this.props.selection);
    // e.preventDefault();
    const uid = firebase.auth().currentUser.uid;

    // Get number of

    this.props.changeScheduleName(this.props.selection, newName);
    // Change the name in firebase

    // Todo: Reorganize firebase to store array of schedules rather than schedules by key
    // Todo: Go through things by index and store title: '', courses: [...]

    // Then change the selection
  };

  _handleCellSelection = item => {
    console.log('Selection:', item);
  };
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
    removeClass: (name) => {
      return dispatch(removeScheduleCourse('Schedule1', name));  // Todo: Make this schedule agnostic
    }
  }
};

Schedule = connect(mapStateToProps, mapDispatchToProps)(Schedule);

export default Schedule;