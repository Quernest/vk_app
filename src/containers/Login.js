import React, { Component } from 'react';
import PropTypes from 'prop-types';

import storage from '../utils/localStorage';
import { POSTER } from '../constants/constants.js';
import { vk } from '../config.js';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this._handleOnClick = this._handleOnClick.bind(this);
  }

  componentDidMount() {
    this.access();
  }

  login() {
    const authInfo = (response) => {
        if (response.session) {
            const { user, user: { id } } = response.session;
            if (user) {
                this.props.onLogin(user);
            }
        }
    }
    VK.Auth.login(authInfo, vk.appPermissions);
  }

  logout() {
      VK.Auth.logout();
      storage.clear();
      this.props.onLogin(false);
  }

  access() {
      VK.Auth.getLoginStatus((response) => {
          if (response.status == 'connected' && response.session) {
              this.login();
          }
      })
  }

  _handleOnClick(e) {
    this.login();
  }

  render() {
    return (
      <div id="login">
        <img 
          src={ POSTER } 
          alt="poster" 
          className="img-fluid" 
        />
        <button 
          name='login' 
          className="btn btn-primary" 
          onClick={ this._handleOnClick }
        >
          Авторизоваться
        </button>
      </div>  
    );
  }
}