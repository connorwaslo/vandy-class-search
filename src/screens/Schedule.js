import React, {Component} from 'react';
import {connect} from "react-redux";
import {ReactAgenda, ReactAgendaCtrl, Modal} from 'vandy-agenda';
import 'react-agenda/build/styles.css';
import 'react-datetime/css/react-datetime.css';
import {removeScheduleCourse} from "../ducks/actions";

class Schedule extends Component {
  state = {
    selected: [],
    showModal: false
  };

  render() {
    let title = this.props.selection;
    console.log('Title:', title);
    let items = this.props.schedules[title].courses;
    console.log('Items:', items);

    return (
      <div style={this.props.style}>
        <ReactAgenda
          items={items}
          title={title}
          numberOfDays={5}
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

  _handleCellSelection = item => {
    console.log('Selection:', item);
  };
}

const mapStateToProps = state => {
  console.log('StateToProps:', state);
  return {
    schedules: state.schedules,
    selection: state.auth.selectSchedule
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