import React from 'react';
import clsx from 'clsx';
import {
  Drawer, Button, List, ListItemText,
  makeStyles, useTheme, CssBaseline, AppBar, Toolbar
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 240;

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
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
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
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
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
    marginLeft: -drawerWidth,
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
      <CssBaseline/>
      <AppBar position='fixed'
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open
              })}
      >
        <Toolbar>
          <Button onClick={_handleDrawerOpen}>
            Menu
          </Button>
          <Typography variant='h6' noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{paper: classes.drawerPaper}}
      >
        <div className={classes.drawerHeader}>
          <Button onClick={_handleDrawClose}>
            Clooooooooooooose
          </Button>
        </div>
      </Drawer>
    </div>
  );
};