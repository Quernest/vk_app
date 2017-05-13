import React from 'react';
import PropTypes from 'prop-types';

export default function Friends({ currentPage, itemsPerPage, friends }) {
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
    <div className='friends'>
      {renderFriends}
    </div>
  );
}

Friends.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  friends: PropTypes.array.isRequired
};

