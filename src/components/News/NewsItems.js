import React from 'react';
import PropTypes from 'prop-types';

import NewsPostAuthor from './NewsPostAuthor';
import NewsPostText from './NewsPostText';
import NewsPostAttachment from './NewsPostAttachment';

export default function renderNewsItems({ items, currentPage, itemsPerPage }) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      {
        currentItems.map((item, index) => {
          const {
            uid,
            gid,
            attachment,
            photo,
            first_name,
            last_name,
            screen_name,
            name,
            text
          } = item;

          if (text && !attachment) {
            return (
              <div className='news-post' key={index}>
                <NewsPostAuthor
                  gid={gid}
                  uid={uid}
                  screen_name={screen_name}
                  name={name}
                  first_name={first_name}
                  last_name={last_name}
                  photo={photo}
                  index={index}
                />
                <NewsPostText text={text} />
              </div>
            );
          }

          if (attachment) {
            const { type } = attachment;

            return (
              <div className='news-post' key={index}>
                <NewsPostAuthor
                  gid={gid}
                  uid={uid}
                  screen_name={screen_name}
                  name={name}
                  first_name={first_name}
                  last_name={last_name}
                  photo={photo}
                  index={index}
                />
                <NewsPostAttachment
                  type={type}
                  attachment={attachment}
                  text={text}
                  index={index}
                />
              </div>
            );
          }
        })
      }
    </div>
  );
}

renderNewsItems.propTypes = {
  items: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired
};
