import React from 'react';
import PropTypes from 'prop-types';

export default function Profile({ user, users, status, friends }) {
  return (
    <div className='profile m-b-1'>
      <h3>{`${user.first_name} ${user.last_name}`}</h3>
      <div className='profile__status'>
        <p>{status}</p>
      </div>
      <a href={`https://vk.com/id${user.id}`} className='profile__avatar'>
        <img src={users[0].photo_100} className='img-circle' alt='img' />
      </a>
      <div className='profile__info m-t-1 text-xs-left'>
        <strong>Мои друзья: {friends.length}</strong>
      </div>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  status: PropTypes.string,
  friends: PropTypes.array.isRequired
};
