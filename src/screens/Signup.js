import React, {Component} from 'react';
import {connect} from "react-redux";
import {loginEmail} from "../ducks/actions";
import {Route, Link, withRouter} from 'react-router-dom';
import {Container, Grid} from "@material-ui/core";
import SignupForm from "../components/forms/SignupForm";
import {initSchedules} from "../utils/FirebaseUtils";
import firebase from 'firebase/app';
import 'firebase/auth';

class Signup extends Component {
  state = {
    email: '',
    pass: '',
    confPass: '',
    errors: [],
    loading: false
  };

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.history.push('/dashboard');
    }
  }

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
          {this.state.loading ? <h5 style={{textAlign: 'center'}}>Loading...</h5> : null}
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

    // Reset errors so that old errors don't persist
    this.setState({
      errors: [],
      loading: true
    });

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
        // Set email in store
        this.props.login(email, true);

        const uid = firebase.auth().currentUser.uid;
        console.log('New uid:', uid);
        initSchedules(uid);

        // Navigate away
        this.setState({loading: false});  // Needed?
        history.push('/dashboard');
      })
      .catch((error) => {
        console.log('Error creating account:', error);

        // End loading gif
        this.setState({loading: false});

        let temp = this.state.errors;
        switch (error.code) {
          case 'auth/invalid-email':
            temp.push('email');
            this.setState({email: temp});
            break;
          case 'auth/weak-password':
            temp.push('pass');
            this.setState({errors: temp});
            break;
          case 'auth/email-already-in-use':
            temp.push('reuse-email');
            this.setState({errors: temp});
            break;
          default:
            console.log('We didn\'t account for this...');
        }
      })
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  }
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email) => {
      dispatch(loginEmail(email));
    }
  }
};

Signup = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default withRouter(Signup);