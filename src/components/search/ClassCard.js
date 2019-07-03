import React from 'react';
import {connect} from "react-redux";
import {setClassTaken, removeClassTaken} from "../../ducks/actions";
import {Card, Grid, FormControlLabel, Checkbox} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

let ClassCard = (props) => (
  <Card
    style={{marginTop: '2vh'}}>
    <CardContent>
      <Grid container>
        <Grid item xs={6}>
        <Typography>
          <b>{props.code} - {props.name}</b>
        </Typography>
        <Typography>
          {props.major}
        </Typography>
        <Typography>
          Credits: {props.credits}
        </Typography>
        <Typography>
          {props.axle.join(',') !== '' ?
          'AXLE Requirements fulfilled: ' + props.axle.join() : null}
        </Typography>
        <Typography>
          Pre-reqs: {props.prereqs}
        </Typography>
        <Typography>
          Co-reqs: {props.coreqs}
        </Typography>
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}}>
          <FormControlLabel control={
            <Checkbox
              checked={props.takenCourses.includes(props.code)}
              onChange={() => {if (props.takenCourses.includes(props.code)) {
                props.removeClassTaken(props.code)
              } else {
                props.setClassTaken(props.code)
              }
              }}
              color='primary'/>
          } label='Already Taken'/>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const mapStateToProps = state => {
  return {
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
    }
  };
};

ClassCard = connect(mapStateToProps, mapDispatchToProps)(ClassCard);

export default ClassCard;