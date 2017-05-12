import React, { Component } from 'react';
import * as utils from '../utils/features.js';

export default function Pagination({ todos, currentPage, todosPerPage, onClick }) {

  // Logic for displaying current todos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

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
  });

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        key={number}
        id={number}
        onClick={onClick}
      >
        {number}
      </li>
    );
  });

  return (
    <div>
        {renderTodos}
      <ul id="pagination">
        {renderPageNumbers}
      </ul>
    </div>
  );
}