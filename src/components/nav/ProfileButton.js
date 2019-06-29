import React from "react";
import {Button, Menu, MenuItem} from "@material-ui/core";
import {connect} from "react-redux";

let ProfileButton = (props) => (
  <div
    style={{position: 'absolute', right: '5vw'}}>
    <Button aria-controls='simple-menu' aria-haspopup='true' onClick={props.handleClick}>
      {props.email}
    </Button>
    <Menu
      id='simple-menu'
      anchorEl={props.anchorEl}
      keepMounted
      open={Boolean(props.anchorEl)}
      onClose={props.handleClose}
    >
      <MenuItem onClick={() => props.nav('/profile')}>Profile</MenuItem>
      <MenuItem onClick={props.logout}>Log Out</MenuItem>
    </Menu>
  </div>
);

const mapStateToProps = state => {
  console.log('Profile Button state:', state);
  return {
    email: state.auth.email
  }
};

ProfileButton = connect(mapStateToProps, null)(ProfileButton);

export default ProfileButton;