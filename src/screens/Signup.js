import React, {Component} from 'react';
import {Route} from 'react-router-dom';
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
      <div>
        <h1>Make the most of your time at Vandy</h1>
        <Route render={({history}) => (
          <SignupForm
            state={this.state}
            handleChange={this._handleChange}
            onSubmit={(e) => this._onSubmit(e, history)}/>
        )} />
      </div>
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