import React, { Component } from 'react';

// components
import Sidebar   from '../components/Sidebar';
import Dashboard from '../components/Dashboard';

class Home extends Component {
  render() {
    return (
      <div id="wrapper" className="toggled">
          <Sidebar data={ this.props.data }/>
          <Dashboard data={ this.props.data } />
      </div>
    );
  }
}

export default Home;