import React from 'react';
import PropTypes from 'prop-types';

export default function Header({ onClick }) {
  return (
    <header>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-8'>
            <button
              onClick={onClick}
              name='toggle'
              className='btn-toggle'
            >
              <div className='one'/>
              <div className='two'/>
              <div className='three'/>
            </button>
          </div>
          <div className='col-xs-4'>
            <button
              className='btn btn-outline-danger pull-xs-right'
              type='button'
              onClick={onClick}
              name='logout'
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired
};

