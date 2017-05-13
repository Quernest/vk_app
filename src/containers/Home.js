import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Header    from '../components/Header';
import Sidebar   from '../components/Sidebar/Sidebar';
import Dashboard from '../components/Dashboard';

export default class Home extends Component {
  render() {
    const { data, onClick, data: { windowWidth } } = this.props;

    return (
      <div id='wrapper' className={classNames({ 'toggled': windowWidth < 768 })}>
        <Header onClick={onClick} />
        <Sidebar data={data} onClick={onClick} />
        <Dashboard data={data} onClick={onClick} />
      </div>
    );
  }
}

Home.propTypes = {
  data : PropTypes.object.isRequired,
  onClick : PropTypes.func.isRequired
};
