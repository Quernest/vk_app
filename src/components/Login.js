import React from 'react';
import PropTypes from 'prop-types';

import { POSTER } from '../constants/constants.js';

export default function Login({ handleOnClick }) {
  return (
    <div id='login'>
      <img src={POSTER} alt='poster' className='img-fluid' />
      <button name='login' className='btn btn-primary' onClick={handleOnClick}>
        Авторизоваться
      </button>
    </div>
  );
}

Login.propTypes = {
  handleOnClick: PropTypes.func.isRequired
};
