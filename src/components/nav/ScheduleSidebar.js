import React from 'react';
import {
  Drawer, Button, Grid, ListItemText,
  makeStyles, useTheme, CssBaseline, AppBar, Toolbar
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Schedule from "../../screens/Schedule";
import {drawerWidth} from "../../containers/DashboardContainer";

// const drawerWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '5vh 0',
    justifyContent: 'flex-end',
  }
}));

export const ScheduleSidebar = ({isOpen, open, close}) => {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{marginTop: '10vh'}}>
      <Button onClick={open} style={{ position: 'fixed', top: '15vh', right: '2vw'}}>
        Schedule
      </Button>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='right'
        open={isOpen}
        classes={{paper: classes.drawerPaper}}
      >
        <div className={classes.drawerHeader}>
          <Button onClick={close}>
            Close
          </Button>
          <Schedule style={{width: '50vw', marginTop: '15vh'}}/>
        </div>
      </Drawer>
    </div>
  );
};