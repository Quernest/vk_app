import React, { Component } from 'react';
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
    let container, scrollTo, breakpoint = window.innerWidth;
    if(breakpoint > 768) {
      container = $('.dashboard');
      container.animate({ scrollTop: 0 }, 750);
    } else {
      container = $('html, body'); 
      scrollTo  = $(".dashboard");
      container.animate({
        scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
      }, 750);
    }
  }

  render() {
    const { 
      items = filter(items), 
      groups = filter(groups), 
      profiles = filter(profiles) 
    } = this.props.news;

    const { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const pageNumbers = [];

    let arrGroupsNews = [],
        arrUsersNews  = [],
        arrAllNews    = [];

    function filter(object) {
      return object.map((item, index) => item);
    }

    function sortUserItems(profiles, items) {
      for(let i = 0; i < profiles.length; i++) {
        for(let j = 0; j < items.length; j++) {
          if(items[j].source_id == profiles[i].uid) {
            arrUsersNews.push($.extend(items[j], profiles[i]));
          }
        }
      }  
    }

    function sortGroupsItems(groups, items) {
      for(let i = 0; i < groups.length; i++) {
        for(let j = 0; j < items.length; j++) {
          if(items[j].source_id + groups[i].gid === 0) {
            arrGroupsNews.push($.extend(items[j], groups[i]));
          }
        }
      }   
    }

    function sortByDec(arr) {
      arr.sort((a, b) => b.date - a.date);
    }

    sortUserItems(profiles, items);
    sortGroupsItems(groups, items);

    arrAllNews = [...arrGroupsNews, ...arrUsersNews];

    sortByDec(arrAllNews);

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
    if(text && !attachment) {
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
    if(attachment) {
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
  });

  return (
    <div className="news">
      {arrAllNews.length > 0 && renderTodos}
      <ul id="pagination">
        {renderPageNumbers}
      </ul>
    </div> );
  }
}

export default News;