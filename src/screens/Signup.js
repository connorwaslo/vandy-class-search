import React, {Component} from 'react';
import SignupForm from "../components/SignupForm";

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
        <SignupForm
          state={this.state}
          handleChange={this._handleChange}
          onSubmit={this._onSubmit}/>
      </div>
    )
  }

  _handleChange = name => event => {
    event.preventDefault();

    this.setState({
      [name]: event.target.value
    });
  };

  _onSubmit = () => {
    const {pass, confPass} = this.state;

    if (pass === confPass) {
      console.log('Password is good')
    } else {
      console.log('Password is bad')
    }
  }
}

export default Signup;