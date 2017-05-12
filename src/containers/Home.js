import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header    from '../components/Header';
import Sidebar   from '../components/Sidebar';
import Dashboard from '../components/Dashboard';

export default class Home extends Component {
  render() {
    const { data, handleOnClick } = this.props;

    return (
      <div id='wrapper' className='toggled'>
        <Header handleOnClick={handleOnClick} />
        <Sidebar data={data} handleOnClick={handleOnClick} />
        <Dashboard data={data} handleOnClick={handleOnClick} />
      </div>
    );
  }
}

Home.propTypes = {
  data : PropTypes.object.isRequired,
  handleOnClick : PropTypes.func.isRequired
};
