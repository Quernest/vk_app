import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../../utils/features.js';

import Pagination from '../Pagination/Pagination';
import NewsItems from './NewsItems';

export default class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage : 1,
      itemsPerPage : 10
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filterText) {
      this.setState({ currentPage: 1 });
    }
  }

  handleOnClick(event) {
    const { currentPage } = this.state;

    this.setState({
      currentPage: Number(event.target.id)
    });

    utils.activePages(currentPage, event);
    utils.scrollToTop();
  }

  render() {
    const { currentPage, itemsPerPage } = this.state;
    const { items, groups, profiles } = this.props.news;
    const { filterText } = this.props;

    const arrGroupsNews = [];
    const arrUsersNews  = [];

    utils.sortUserItems(profiles, items, arrUsersNews);
    utils.sortGroupsItems(groups, items, arrGroupsNews);

    const arrAllNews = utils.search([...arrGroupsNews, ...arrUsersNews], filterText);

    utils.sortByDecreasing(arrAllNews);

    return (
      <div className='news'>
        <NewsItems
          currentPage={currentPage}
          items={arrAllNews}
          itemsPerPage={itemsPerPage}
        />
        <Pagination
          items={arrAllNews}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onClick={this.handleOnClick}
        />
      </div>
    );
  }
}

News.propTypes = {
  news: PropTypes.object.isRequired,
  filterText: PropTypes.string
};
