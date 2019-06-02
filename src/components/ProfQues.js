import React from 'react';
import {Grid, FormControl, RadioGroup} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const ProfQues = (props) => (
  <Grid container justify='center' direction='column' alignContent='center'>
    <h1 style={{textAlign: 'center'}}>{props.question}</h1>
    <FormControl component='fieldset'>
      <RadioGroup
        name='year'
        value={props.value}
        onChange={props.handleChange}
      >
        <FormControlLabel value='First Year' control={<Radio/>} label='First Year'/>
        <FormControlLabel value='Sophomore' control={<Radio/>} label='Sophomore'/>
        <FormControlLabel value='Junior' control={<Radio/>} label='Junior'/>
        <FormControlLabel value='Senior' control={<Radio/>} label='Senior'/>
      </RadioGroup>
    </FormControl>
  </Grid>
);

export default ProfQues;