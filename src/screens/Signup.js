import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {Container, Grid} from "@material-ui/core";
import SignupForm from "../components/SignupForm";
import firebase from 'firebase/app';
import 'firebase/auth';

class Signup extends Component {
  state = {
    email: '',
    pass: '',
    confPass: ''
  };

  render() {
    return (
      <Container component='main'>
        <h1 style={{textAlign: 'center'}}>Sign Up</h1>
        <Route render={({history}) => (
          <SignupForm
            state={this.state}
            handleChange={this._handleChange}
            onSubmit={(e) => this._onSubmit(e, history)}/>
        )} />
        <Grid container justify='center' direction='column' alignContent='center'>
          <h6 style={{textAlign: 'center'}}>or</h6>
          <Link to='/login'>Login</Link>
        </Grid>
      </Container>
    )
  }

  _handleChange = name => event => {
    event.preventDefault();

    this.setState({
      [name]: event.target.value
    });
  };

  _onSubmit = (event, history) => {
    event.preventDefault();
    const {pass, confPass} = this.state;

    // Match the password and confirmed password
    if (pass === confPass) {
      // Create an account with firebase
      this._createAccount(history);
    }
  };

  _createAccount = (history) => {
    const {email, pass} = this.state;

    // Firebase authentication. Only requires email and password.
    // Should look into using a google account for this
    firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then(() => {
        // Navigate away
        history.push('/questions');
        console.log('Account created!');
      })
      .catch((error) => {
        console.log('Something went wrong...', error);
      })
  }
}

export default Signup;