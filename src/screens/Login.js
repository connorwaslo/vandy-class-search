import React, {Component} from 'react';
import {connect} from "react-redux";
import {loginEmail, setTriedLoading} from "../ducks/actions";
import {Route, Link, withRouter} from 'react-router-dom';
import LoginForm from "../components/forms/LoginForm";
import firebase from 'firebase/app';
import 'firebase/auth';
import {Grid} from "@material-ui/core";

class Login extends Component {
  state = {
    email: '',
    pass: '',
    errorMsg: null
  };

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <Grid container justify='center' direction='column' alignContent='center'>
        <h1 style={{textAlign: 'center'}}>Login</h1>
        <Route render={({history}) => (
          <LoginForm
            state={this.state}
            handleChange={this._handleChange}
            onSubmit={(e) => this._onSubmit(e, history)}/>
        )} />
        {this.state.errorMsg ? <p style={{color: 'red', textAlign: 'center'}}>{this.state.errorMsg}</p> : null}

        <Link style={{textAlign: 'center', marginTop: '5vh'}} to='/'>Sign Up</Link>
      </Grid>
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
    const {email, pass} = this.state;

    // Login
    return firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(() => {
        // Dispatch action to redux store
        this.props.login(email, true);
        // Code from Loading.js Line 25 on needs to happen here as well
        this.props.setTriedLoading(false);

        history.push('/dashboard');
      })
      .catch((error) => {
        console.log('Error signing in:', error);
        this.setState({
          errorMsg: error.message
        });
      })
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email) => {
      dispatch(loginEmail(email));
    },
    setTriedLoading: (value) => {
      dispatch(setTriedLoading(value));
    }
  }
};

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default withRouter(Login);