import React from 'react';
import clsx from 'clsx';
import {Container, makeStyles} from "@material-ui/core";
import Navbar from "../components/nav/Navbar";
import FilterSection from "../components/search/FilterSection";
import SearchResults from "../components/search/SearchResults";
import {ScheduleSidebar} from "../components/nav/ScheduleSidebar";
import {PAGE_SIZE} from "../screens/Dashboard";

export const drawerWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    overflowX: 'hidden'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }
}));

function DashboardContainer({validCourses, page, submitSearch, renderChangePage}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  let _handleScheduleOpen = () => {setOpen(true)};

  let _handleScheduleClose = () => {setOpen(false)};

  return (
    <div className={classes.root}>
      <Navbar isOpen={open} close={_handleScheduleClose}/>

      <div className={clsx(classes.content, {
        [classes.contentShift]: open
      })}>
        <Container maxWidth='50vw'>
          <FilterSection onSubmit={submitSearch} open={open}/>
          <Container maxWidth='md'>
            <SearchResults validCourses={validCourses} page={page} pageSize={PAGE_SIZE} />
          </Container>
          {renderChangePage(page)}
        </Container>
      </div>
      <ScheduleSidebar
        isOpen={open}
        open={_handleScheduleOpen}
        close={_handleScheduleClose}/>
    </div>
  );
}

export default DashboardContainer;