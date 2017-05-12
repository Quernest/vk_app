import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as utils from '../utils/features.js';

import Pagination from './Pagination';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage : 1,
      todosPerPage : 10
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.scroll();
    this.setState({
      currentPage: Number(event.target.id)
    });
    if(this.state.currentPage >= 1) {
      $(`#${this.state.currentPage}`).removeClass("active");
      $(`#${event.target.id}`).addClass("active");
    }
  }

  scroll() {
    let container = $("html, body"); 
    container.animate({ scrollTop: 0 }, "slow"); 
  }

  render() {
    let { currentPage, todosPerPage } = this.state;
    let { items, groups, profiles } = this.props.news;

    let arrGroupsNews = [];
    let arrUsersNews  = [];
    let arrAllNews    = [];

    utils.sortUserItems(profiles, items, arrUsersNews);
    utils.sortGroupsItems(groups, items, arrGroupsNews);

    arrAllNews = [...arrGroupsNews, ...arrUsersNews];

    utils.sortByDec(arrAllNews);

    return (
        <div className="news">
          <Pagination currentPage={currentPage} todos={arrAllNews} todosPerPage={todosPerPage} onClick={this.handleClick} />
        </div> 
      );
  }
}

News.propTypes = {
  news : PropTypes.object.isRequired
}

export default News;