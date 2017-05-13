import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

import Profile from './Profile';
import Friends from './Friends';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: 10
    };

    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    const { data: { friends } } = this.props;
    let { itemsPerPage } = this.state;

    if (friends.length !== 0 && (friends.length / itemsPerPage) > 1) {
      this.setState({ itemsPerPage: itemsPerPage += 5 });
    }
  }

  render() {
    const { data: { user, users, status: { text }, friends } } = this.props;
    const { itemsPerPage } = this.state;

    return (
      <div className='sidebar sidebar-noscrollbar sidebar-offcanvas'>
        <Profile
          user={user}
          users={users}
          status={text}
          friends={friends}
        />
        <InfiniteScroll
          pageStart={0}
          hasMore={true}
          loadMore={this.loadMore}
          useWindow={false}
        >
          <Friends
            itemsPerPage={itemsPerPage}
            friends={friends}
          />
        </InfiniteScroll>
      </div>
    );
  }
}

Sidebar.propTypes = {
  data: PropTypes.object.isRequired,
  handleOnClick: PropTypes.func.isRequired
};
