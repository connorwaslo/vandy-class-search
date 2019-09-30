import React, {Component} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '60vw'
  }
}));

// Todo: This should include all the details: description, sections offered, etc.
export default function ClassModal({open, handleClose, courseData}) {
  const classes = useStyles();

  const {code, name, major, credits, axle, prereqs, coreqs, takenCourses} = courseData;

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {/* Todo: Add a course taken button and add to schedule button*/}
          <div className={classes.paper}>
            <h1 id='transition-modal-title'>{code} - {name}</h1>
            <h2 id='transition-modal-description'>{major}</h2>
            <p id='transition-modal-description'>Credits: {credits}</p>
            <p id='transition-modal-description'>AXLE: {axle}</p>
            <p id='transition-modal-description'>Pre-Reqs: {prereqs}</p>
            <p id='transition-modal-description'>Co-Reqs: {coreqs}</p>
            <h3 id='transition-modal-description'>Sections:</h3>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}