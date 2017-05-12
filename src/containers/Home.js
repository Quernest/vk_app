import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import Sidebar   from '../components/Sidebar';
import Dashboard from '../components/Dashboard';

export default class Home extends Component {
  render() {
    const { data, onClick } = this.props;
    return (
      <div id="wrapper" className="toggled">
          <Sidebar data={ data } onClick={ onClick } />
          <Dashboard data={ data } onClick={ onClick } />
      </div>
    );
  }
}

Home.propTypes = {
  data : PropTypes.object.isRequired,
  onClick : PropTypes.func.isRequired
}