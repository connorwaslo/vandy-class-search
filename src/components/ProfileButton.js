import React from "react";
import {Button, Menu, MenuItem} from "@material-ui/core";

const ProfileButton = (props) => (
  <div
    style={{position: 'absolute', right: '5vw'}}>
    <Button aria-controls='simple-menu' aria-haspopup='true' onClick={props.handleClick}>
      connor.r.waslo@vanderbilt.edu
    </Button>
    <Menu
      id='simple-menu'
      anchorEl={props.anchorEl}
      keepMounted
      open={Boolean(props.anchorEl)}
      onClose={props.handleClose}
    >
      <MenuItem onClick={() => props.nav('/profile')}>Profile</MenuItem>
      <MenuItem onClick={props.handleClose}>Log Out</MenuItem>
    </Menu>
  </div>
);

export default ProfileButton;