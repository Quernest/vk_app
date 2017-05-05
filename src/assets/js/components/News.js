import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as utils from '../utils/features.js';

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
    let { items, groups, profiles } = this.props.news;

    items    = utils.map(items);
    groups   = utils.map(groups);
    profiles = utils.map(profiles);

    let arrGroupsNews = [];
    let arrUsersNews  = [];
    let arrAllNews    = [];
    let pageNumbers   = [];

    const { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

    utils.sortUserItems(profiles, items, arrUsersNews);
    utils.sortGroupsItems(groups, items, arrGroupsNews);

    arrAllNews = [...arrGroupsNews, ...arrUsersNews];

    utils.sortByDec(arrAllNews);

    const currentTodos = arrAllNews.slice(indexOfFirstTodo, indexOfLastTodo);

    for (let i = 1; i <= Math.ceil(arrAllNews.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          className={number === 1 && 'active' }
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    const renderTodos = currentTodos.map((item, index) => {

      const { uid, gid, attachment, photo, first_name, last_name, screen_name, name, text } = item;

      if (text && !attachment) {
        return (
          <div 
            className="news-post" 
            key={index}
          >
            <div className="news-post__author">
              { gid &&
                <div>
                  <a 
                    href={`https://vk.com/${screen_name}`}
                  >
                  <img 
                    src={photo} 
                    className="img-circle m-r-1" 
                    alt={index} 
                  />
                  </a>
                  <span>{name}</span>
                </div>
              }
              {
                uid &&
                <div>
                  <a 
                    href={`https://vk.com/id${uid}`}
                  >
                  <img 
                    src={photo} 
                    className="img-circle m-r-1" 
                    alt={index} 
                  />
                  </a>
                  <span>{first_name} {last_name}</span>
                </div>
              }
              <p 
                key={index} 
                className="news-post__text" 
                dangerouslySetInnerHTML={utils.createMarkup(text)}
              ></p>
            </div>
          </div>
        );
      }
      if (attachment) {
        const { attachment, text } = item;
        const { type } = attachment;
        return (
          <div 
            className="news-post" 
            key={index}
          >
            <div 
              className="news-post__author" 
              key={index}
            >
              { 
                gid &&
                <div>
                  <a 
                    href={`https://vk.com/${screen_name}`}
                  >
                  <img 
                    src={photo} 
                    className="img-circle m-r-1" 
                    alt={index} 
                  />
                  </a>
                  <span>{name}</span>
                </div>
              }
              {
                uid &&
                <div>
                  <a 
                    href={`https://vk.com/id${uid}`}
                  >
                  <img 
                    src={photo} 
                    className="img-circle m-r-1" 
                    alt={index} 
                  />
                  </a>
                  <span>{first_name} {last_name}</span>
                </div>
              }
            </div>
            { 
              type == 'video' && 
              <div>
                <img 
                  src={attachment.video.image_big} 
                  className="img-fluid news-post__image" 
                  alt={`video-${index}`} 
                />
                <span 
                  className="news-post__warning"
                >
                  Пост с видео (в разработке)
                </span>
                { text && 
                  <p 
                    className="news-post__text" 
                    dangerouslySetInnerHTML={utils.createMarkup(text)}
                  >
                  </p> 
                }
              </div>
            }
            {
              type == 'photo' &&
              <div>
                <img 
                  src={attachment.photo.src_big} 
                  className="img-fluid news-post__image" 
                  alt={`news-post-img-${index}`} 
                />
                { text && 
                  <p 
                    className="news-post__text" 
                    dangerouslySetInnerHTML={utils.createMarkup(text)}
                  >
                  </p> 
                }
              </div>
            }
            {
              type == 'doc' &&
              <div>
                { text && 
                  <p 
                    className="news-post__text" 
                    dangerouslySetInnerHTML={utils.createMarkup(text)}
                  >
                  </p> 
                }
                <span 
                  className="news-post__warning"
                >
                  Пост с документами (в разработке)
                </span>
              </div>
            }
            {
              type == 'link' &&
              <div>
                <span 
                  className="news-post__warning"
                >
                  Пост со ссылкой (в разработке)
                </span>
              </div>
            }
          </div>
        )
      }
    }
  );
  return (
    <div className="news">
      {arrAllNews.length > 0 && renderTodos}
      <ul id="pagination">
        {renderPageNumbers}
      </ul>
    </div> );
  }
}

News.propTypes = {
  news : PropTypes.object.isRequired
}

export default News;