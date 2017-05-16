import React from 'react';
import PropTypes from 'prop-types';

import NewsPostText from './NewsPostText';

export default function NewsPostAttachment({ type, attachment, text, index }) {
  return (
    <div className='news-post_attachment'>
      {
        type === 'video' &&
        <div>
          <img src={attachment.video.image_big} className='img-fluid news-post__image' alt={`video-${index}`} />
          <span className='news-post__warning'>
            Пост с видео (в разработке)
          </span>
          { text && <NewsPostText text={text} /> }
        </div>
      }
      {
        type === 'photo' &&
        <div>
          <img src={attachment.photo.src_big} className='img-fluid news-post__image' alt={`news-post-img-${index}`} />
          { text && <NewsPostText text={text} /> }
        </div>
      }
      {
        type === 'doc' &&
        <div>
          { text && <NewsPostText text={text} /> }
          <span className='news-post__warning'>
            Пост с документами (в разработке)
          </span>
        </div>
      }
      {
        type === 'link' &&
        <div>
          <span className='news-post__warning'>
            Пост со ссылкой (в разработке)
          </span>
        </div>
      }
    </div>
  );
}

NewsPostAttachment.propTypes = {
  type: PropTypes.string.isRequired,
  attachment: PropTypes.object.isRequired,
  text: PropTypes.string,
  index: PropTypes.number.isRequired
};
