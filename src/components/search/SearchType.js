import React from 'react';
import {FormControl, MenuItem} from '@material-ui/core';
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const SearchType = (props) => (
  <FormControl className={useStyles().formControl}>
    <Select
      value={props.values}
      onChange={props.handleChange}
      displayEmpty
      name='searchType'
      className={useStyles().selectEmpty}>

      <MenuItem value='generalSearch'>
        <em>General Search</em>
      </MenuItem>
      <MenuItem value='major'>
        <em>Major</em>
      </MenuItem>
      <MenuItem value='minor'>
        <em>Minor</em>
      </MenuItem>
      <MenuItem value='classCode'>
        <em>Class Code</em>
      </MenuItem>
      <MenuItem value='axle'>
        <em>AXLE Fulfillment</em>
      </MenuItem>
      <MenuItem value='prereq'>
        <em>Pre-Requisite</em>
      </MenuItem>
    </Select>
    <FormHelperText>Search Type</FormHelperText>
  </FormControl>
);

export default SearchType;