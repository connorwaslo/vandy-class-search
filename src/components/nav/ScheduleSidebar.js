import React from 'react';
import {
  Drawer, Button, makeStyles
} from "@material-ui/core";
import Schedule from "../../screens/Schedule";
// import {drawerWidth} from "../../containers/DashboardContainer";

let drawerWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2;

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

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      drawerWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2;
    })
  }, []);

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