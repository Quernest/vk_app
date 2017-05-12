import React from 'react';
import PropTypes from 'prop-types';

export default function Header({ handleOnClick }) {
  return (
    <header>
      <span>&times;</span>
    </header>
  );
}

Header.propTypes = {
  handleOnClick: PropTypes.func.isRequired
};

