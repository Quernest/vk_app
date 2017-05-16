import React from 'react';
import PropTypes from 'prop-types';

import { POSTER } from '../constants/constants.js';

export default function Login({ onClick }) {
  return (
    <div id='login'>
      <img src={POSTER} alt='poster' className='img-fluid' />
      <button name='login' className='btn btn-lg btn-outline-primary' onClick={onClick}>
        Авторизоваться
      </button>
    </div>
  );
}

Login.propTypes = {
  onClick: PropTypes.func.isRequired
};
