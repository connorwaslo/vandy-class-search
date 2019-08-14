import React from 'react';
import {connect} from "react-redux";
import {setClassTaken, removeClassTaken, addScheduleCourse} from "../../ducks/actions";
import {Card, Grid, FormControlLabel, Checkbox, Button, makeStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

class ClassCard extends React.Component {
  render() {
    const {code, name, major, axle, prereqs, coreqs, takenCourses} = this.props;
    const credits = this._getCredits();
    const classes = useStyles;

    return (
      <Card
        style={{marginTop: '2vh'}}>
        <CardContent>
          <Grid container>
            <Grid item xs={6}>
              <Typography>
                <b>{code} - {name}</b>
              </Typography>
              <Typography>
                {major}
              </Typography>
              <Typography>
                Credits: {credits}
              </Typography>
              <Typography>
                {axle.join(',') !== '' ?
                  'AXLE Requirements fulfilled: ' + axle.join() : null}
              </Typography>
              <Typography>
                Pre-reqs: {prereqs}
              </Typography>
              <Typography>
                Co-reqs: {coreqs}
              </Typography>
            </Grid>
            <Grid item xs={6} style={{textAlign: 'right'}}>
              <FormControlLabel control={
                <Checkbox
                  checked={takenCourses.includes(code)}
                  onChange={this._handleChange}
                  color='primary'/>
              } label='Already Taken'/>
              <Button variant='outlined' color='primary' className={classes.button}
                      onClick={this._addClassToSchedule}>
                Add to Schedule
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }

  _handleChange = () => {
    const {takenCourses, code} = this.props;

    if (takenCourses.includes(code)) {
      this._dbUpdateClassTaken(code, false);
    } else {
      this._dbUpdateClassTaken(code, true);
    }
  };

  _dbUpdateClassTaken = (code, add) => {
    const uid = firebase.auth().currentUser.uid;

    // Add Class
    if (add) {
      firebase.database().ref('coursesTaken/' + uid).update({
        [code]: true
      });
      this.props.setClassTaken(code);
    } else {  // Remove class
      console.log('Trying to delete', code);
      this.props.removeClassTaken(code);
      firebase.database().ref('coursesTaken/' + uid + '/' + code).remove();
    }
  };

  _getCredits = () => {
    const credits = this.props.credits;

    // Placeholder for
    if (typeof(credits) === typeof('')) {
      return credits;
    }

    // Format to be: 1, 2, 3, or 4
    let credStr = '';
    for (let i = 0; i < credits.length; i++) {
      if (i === credits.length - 2) {
        credStr += credits[i] + ' or ';
      } else if (i === credits.length - 1) {
        credStr += credits[i];
      } else {
        credStr += credits[i] + ', ';
      }
    }

    return credStr;
  };

  _addClassToSchedule = () => {
    console.log('Code:', this.props.code, 'Name:', this.props.name);
    const course = this.props.code + ' ' + this.props.name;
    this.props.addClassToSchedule(this.props.schedSelection, course);
  };
}

const mapStateToProps = state => {
  return {
    schedSelection: state.auth.selectSchedule,
    takenCourses: state.courses.takenCourses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setClassTaken: (code) => {
      dispatch(setClassTaken(code));
    },
    removeClassTaken: (code) => {
      dispatch(removeClassTaken(code));
    },
    addClassToSchedule: (schedule, course) => {
      dispatch(addScheduleCourse(schedule, course));
    }
  };
};

ClassCard = connect(mapStateToProps, mapDispatchToProps)(ClassCard);

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

export default ClassCard;