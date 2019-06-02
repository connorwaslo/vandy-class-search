import React from 'react';
import {Container, TextField, Button} from "@material-ui/core";
import formStyles from '../styles/FormStyles';

function LoginForm(props) {
  const classes = formStyles();

  return (
    <Container component='main' maxWidth='xs'>
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
  );
}

export default LoginForm;