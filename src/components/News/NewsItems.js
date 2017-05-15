import React from 'react';
import PropTypes from 'prop-types';

import NewsPostAuthor from './NewsPostAuthor';
import NewsPostText from './NewsPostText';
import NewsPostAttachment from './NewsPostAttachment';
import NewsPostFooter from './NewsPostFooter';

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
            text,
            likes,
            post_id
          } = item;

          if (text && !attachment) {
            const { type } = item;

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
                <NewsPostFooter
                  likes={likes}
                  type={type}
                  post_id={post_id}
                />
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
                <NewsPostFooter
                  likes={likes}
                  type={type}
                  post_id={post_id}
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
