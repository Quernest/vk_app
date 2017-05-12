import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = friends.slice(indexOfFirstItem, indexOfLastItem);

    const renderFriends = currentItems.map((item, index) => {
      const { photo_100, first_name, last_name, uid, status } = item;

      return (
        <div className='friends-item row' key={index}>
          <div className='col-md-4 m-t-2 m-b-2'>
            <a href={`https://vk.com/id${uid}`} className='friends-item__avatar'>
              <img src={photo_100} className='img-circle img-fluid' alt='img' />
            </a> 
          </div>
          <div className='col-md-8 m-t-2 m-b-2 text-md-left'>
            <h4>{`${first_name} ${last_name}`}</h4>
            <p>{status}</p>
          </div>
        </div>
      );
    });

    return (
      <div className='sidebar'>
        <div className='profile m-t-1 m-b-1'>
          <h3>{`${user.first_name} ${user.last_name}`}</h3>
          <div className='profile__status'>
            <p>{text}</p>
          </div>
          <a href={`https://vk.com/id${user.id}`} className='profile__avatar'>
            <img src={users[0].photo_100} className='img-circle' alt='img' />
          </a>
          <div className='row profile__info m-t-1'>
            <div className='col-md-6'>
              <button className='btn btn-success m-t-1 m-b-1' type='button'>
                Мои друзья: {friends.length}
              </button>
            </div>
            <div className='col-md-6'>
              <button
                className='btn btn-danger m-t-1 m-b-1'
                type='button'
                onClick={handleOnClick}
                name='logout'
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          items={friends}
          onClick={this.handleClick}
          type='pager'
        />
        <div className='friends'>
          { renderFriends }
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  data: PropTypes.object.isRequired,
  handleOnClick: PropTypes.func.isRequired
};
