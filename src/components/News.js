import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../utils/features.js';

import Pagination from './Pagination';
import Items from './Items';

export default class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage : 1,
      itemsPerPage : 10
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
    utils.scrollToTop();
  }

  render() {
    const { currentPage, itemsPerPage } = this.state;
    const { items, groups, profiles } = this.props.news;

    const arrGroupsNews = [];
    const arrUsersNews  = [];
    let arrAllNews      = [];

    utils.sortUserItems(profiles, items, arrUsersNews);
    utils.sortGroupsItems(groups, items, arrGroupsNews);

    arrAllNews = [...arrGroupsNews, ...arrUsersNews];

    utils.sortByDecreasing(arrAllNews);

    return (
      <div className='news'>
        <Items
          currentPage={currentPage}
          items={arrAllNews}
          itemsPerPage={itemsPerPage}
        />
        <Pagination
          currentPage={currentPage}
          items={arrAllNews}
          itemsPerPage={itemsPerPage}
          onClick={this.handleOnClick}
          type='pagination'
        />
      </div>
    );
  }
}

News.propTypes = {
  news : PropTypes.object.isRequired
};
