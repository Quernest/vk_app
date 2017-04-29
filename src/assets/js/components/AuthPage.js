import React, { Component } from 'react';
const poster = require('../../../assets/images/poster.png');

class AuthPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="login">
        <img src={poster} alt="poster" />
      </div>
    );
  }
}

export default AuthPage;