import React, {Component} from 'react';
import {connect} from "react-redux";
import {ReactAgenda, ReactAgendaCtrl, Modal} from 'vandy-agenda';
import 'react-agenda/build/styles.css';
import 'react-datetime/css/react-datetime.css';
import {removeScheduleCourse, addSchedule, removeSchedule, changeScheduleSelection} from "../ducks/actions";
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
    let title = this.props.selection;
    // Todo: Fix this so that if it's strictly true it doesn't have any courses
    let items;
    console.log('Title:', this.props.selection);
    console.log('Props.schedules[title]:', this.props.schedules);
    if (this.props.schedules[title].courses === true) {
      items = [];
    } else {
      items = this.props.schedules[title].courses;
    }

    return (
      <div style={this.props.style}>
        {/*<ScheduleSidebar style={this.props.style}/>*/}
        <ReactAgenda
          items={items}
          title={title}
          numberOfDays={5}
          allSchedules={this.props.schedules}
          createSchedule={this._createSchedule}
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
    firebase.database().ref('schedules/' + uid + '/tempnew').update({
      courses: [true]
    }).then(() => {
      console.log('Added new schedule');
      this.props.addSchedule('tempnew');
      this.props.changeSchedule('tempnew');
    })
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
    addSchedule: (title) => {
      return dispatch(addSchedule(title));
    },
    changeSchedule: (title) => {
      return dispatch(changeScheduleSelection(title));
    },
    removeClass: (name) => {
      return dispatch(removeScheduleCourse('Schedule1', name));  // Todo: Make this schedule agnostic
    }
  }
};

Schedule = connect(mapStateToProps, mapDispatchToProps)(Schedule);

export default Schedule;