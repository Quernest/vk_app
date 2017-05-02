import React, { Component } from 'react';
import { POSTER } from '../constants/constants.js';

const AuthPage = ({ onClick }) => {
  return (
    <div id="login">
      <img src={ POSTER } alt="poster" className="img-fluid" />
      <button name='login' className="btn btn-primary" onClick={ onClick }>Авторизация</button>
    </div>
  );
}

export default AuthPage;