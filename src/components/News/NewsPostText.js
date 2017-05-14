import React from 'react';
import PropTypes from 'prop-types';

import * as utils from '../../utils/features.js';

export default function NewsPostText({ text }) {
  return (
    <p
      className='news-post__text'
      dangerouslySetInnerHTML={utils.createMarkup(text)}
    />
  );
}

NewsPostText.propTypes = {
  text: PropTypes.string
};
