import React from 'react';
import {
  Drawer, Button, List, ListItemText,
  makeStyles, useTheme, CssBaseline, AppBar, Toolbar
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Schedule from "../../screens/Schedule";

// const drawerWidth = '50';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: '50vw',  //`calc(100% - ${drawerWidth}vw)`,
    marginLeft: '50vw',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: '50vw',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '50vw',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -'50vw',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }
}));

export const ScheduleSidebar = ({title, style}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  let _handleDrawerOpen = () => {setOpen(true)};
  let _handleDrawClose = () => {setOpen(false)};

  return (
    <div className={classes.root} style={style}>
      <Button onClick={_handleDrawerOpen} style={{ position: 'fixed', top: '16vh', right: '2vw'}}>
        Menu
      </Button>
      <Typography variant='h6' noWrap>
        Title
      </Typography>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='right'
        open={open}
        classes={{paper: classes.drawerPaper}}
      >
        <div className={classes.drawerHeader}>
          <Button onClick={_handleDrawClose} style={{position: 'absolute', left: '2vw', top: '2vh'}}>
            Close
          </Button>
          <Schedule style={{width: '50vw', marginTop: '15vh'}}/>
        </div>
      </Drawer>
    </div>
  );
};