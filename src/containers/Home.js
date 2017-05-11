import React, { Component } from 'react';

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