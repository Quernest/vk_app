import React from 'react';
import PropTypes from 'prop-types';

export default function Header({ handleOnClick }) {
  return (
    <header>
      <div id='toggle' onClick={handleOnClick} name='toggle'>
        <div className='one' />
        <div className='two' />
        <div className='three' />
      </div>
    </header>
  );
}

Header.propTypes = {
  handleOnClick: PropTypes.func.isRequired
};

