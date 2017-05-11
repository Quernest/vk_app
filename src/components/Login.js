import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { POSTER } from '../constants/constants.js';

const Login = ({ onClick }) => {
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
        onClick={ onClick }
      >
        Авторизоваться
      </button>
    </div>  
  );
}

Login.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Login;