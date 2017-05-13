import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Profile from './Sidebar/Profile';
import Friends from './Sidebar/Friends';
import Pagination from './Pagination';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage : 1,
      itemsPerPage : 5
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { friends } = this.props.data;
    const { name } = event.target;
    const { itemsPerPage } = this.state;
    const lastPage = friends.length / itemsPerPage;

    let { currentPage } = this.state;

    if (name === 'next' && currentPage < lastPage) {
      this.setState({
        currentPage: currentPage += 1
      });
    } else if (currentPage > 1) {
      this.setState({
        currentPage: currentPage -= 1
      });
    }
  }

  render() {
    const { data: { user, users, status: { text }, friends }, handleOnClick } = this.props;
    const { currentPage, itemsPerPage } = this.state;

    return (
      <div className='sidebar'>
        <Profile
          user={user}
          users={users}
          status={text}
          friends={friends}
          handleOnClick={handleOnClick}
        />
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          items={friends}
          onClick={this.handleClick}
          type='arrows'
        />
        <Friends
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          friends={friends}
        />
      </div>
    );
  }
}

Sidebar.propTypes = {
  data: PropTypes.object.isRequired,
  handleOnClick: PropTypes.func.isRequired
};
