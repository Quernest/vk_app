import React, { Component } from 'react';
import PropTypes from 'prop-types';

import API from '../../core/API';
import classNames from 'classnames';

export default class NewsPostFooter extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    // const { type, post_id } = this.props;
    // API.post('likes.add', { type, item_id: post_id });
  }

  render() {
    const { count, can_like } = this.props.likes;

    const likeClass = classNames('fa likes-heart', {
      'fa-heart-o': can_like === 1, // 1 if true
      'fa-heart': can_like === 0 // 0 if false
    });

    return (
      <div className='news-post__footer'>
        <div className='likes'>
          <i className={likeClass} aria-hidden='true' />
          <span className='likes-count'>{count}</span>
        </div>
      </div>
    );
  }
}

NewsPostFooter.propTypes = {
  likes: PropTypes.object.isRequired
};

