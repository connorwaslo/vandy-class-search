import React, {useState} from 'react';
import {Container, TextField, Button} from "@material-ui/core";
import formStyles from "../../styles/FormStyles";

function SignupForm(props) {
  const classes = formStyles();

  let errorText = () => {
    return props.state.errors.map(error => {
      if (error === 'email') {
        return <p style={{color: 'red', textAlign: 'center'}}>Email is invalid</p>
      }
      else if (error === 'pass') {
        return <p style={{color: 'red', textAlign: 'center'}}>Password must be at least 6 characters long</p>
      }
      else if (error === 'reuse-email') {
        return <p style={{color: 'red', textAlign: 'center'}}>An account with this email already exists</p>
      }
    })
  };

  return (
    <Container component='main' maxWidth='xs'>
      <form className={classes.form} onSubmit={props.onSubmit}>
        <TextField
          error={props.state.errors.includes('email')}
          label='Vanderbilt Email'
          className={classes.input}
          required
          fullWidth
          value={props.state.email}
          onChange={props.handleChange('email')}/>

        <TextField
          error={props.state.errors.includes('pass')}
          label='Password'
          className={classes.input}
          required
          fullWidth
          type='password'
          value={props.state.pass}
          onChange={props.handleChange('pass')}/>

        <TextField
          label='Confirm Password'
          id='standard-error'
          className={classes.input}
          error={!(props.state.pass === props.state.confPass || props.state.confPass === '')}
          required
          fullWidth
          type='password'
          value={props.state.confPass}
          onChange={props.handleChange('confPass')}/>

        {errorText()}

        <Button
          type='submit'
          className={classes.submit}
          fullWidth
          variant='contained'
          color='primary'>
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default SignupForm;