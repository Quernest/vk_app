import React, { Component } from 'react';
import { POSTER } from '../constants/constants.js';

class AuthPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="login">
        <img src={POSTER} alt="poster" className="img-fluid" />
        <button name='login' className="btn btn-primary" onClick={this.props.onClick}>Авторизация</button>
      </div>
    );
  }
}

export default AuthPage;