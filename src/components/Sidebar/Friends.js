import React from 'react';
import PropTypes from 'prop-types';

export default function Friends({ itemsPerPage, friends }) {
  const indexOfLastItem = itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = friends.slice(indexOfFirstItem, indexOfLastItem);

  const renderFriends = currentItems.map((item, index) => {
    const { photo_100, first_name, last_name, uid, status } = item;

    return (
      <div className='friends-item row' key={index}>
        <div className='col-xs-4 m-t-1 m-b-1'>
          <a href={`https://vk.com/id${uid}`} className='friends-item__avatar'>
            <img src={photo_100} className='img-circle img-fluid' alt='img' />
          </a>
        </div>
        <div className='col-xs-8 m-t-1 m-b-1'>
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
  itemsPerPage: PropTypes.number.isRequired,
  friends: PropTypes.array.isRequired
};

