import React from 'react';
import PropTypes from 'prop-types';

export default function NewsPostAuthor({ gid, uid, screen_name, name, first_name, last_name, photo, index }) {
  return (
    <div className='news-post__author'>
      { gid &&
        <div>
          <a href={`https://vk.com/${screen_name}`}>
            <img src={photo} className='img-circle m-r-1' alt={index} />
          </a>
          <span>{name}</span>
        </div>
      }
      {
        uid &&
        <div>
          <a href={`https://vk.com/id${uid}`}>
            <img src={photo} className='img-circle m-r-1' alt={index} />
          </a>
          <span>{first_name} {last_name}</span>
        </div>
      }
    </div>
  );
}

NewsPostAuthor.propTypes = {
  gid: PropTypes.number,
  uid: PropTypes.number,
  screen_name: PropTypes.string,
  name: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  photo: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};
