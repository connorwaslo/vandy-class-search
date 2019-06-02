import React from 'react';
import {Container, TextField, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

// Form css styles
const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  input: {
    margin: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(1)
  }
}));

function SignupForm(props) {
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <h2>Sign up</h2>
      <form className={classes.form} onSubmit={props.onSubmit}>
        <TextField
          label='Vanderbilt Email'
          className={classes.input}
          required
          fullWidth
          value={props.state.email}
          onChange={props.handleChange('email')}/>

        <TextField
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