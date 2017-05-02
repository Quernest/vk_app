import React, { Component } from 'react';
import * as utils from '../utils/features.js';
import * as storage from '../utils/localStorage.js'; 

export default function News(props) {

  const news = storage.setNews();
  
  const { 
    items = filter(items), 
    groups = filter(groups), 
    profiles = filter(profiles) 
  } = news;

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
    arr.sort(function(a, b) {return b.date - a.date });
  }

  sortUserItems(profiles, items);
  sortGroupsItems(groups, items);

  arrAllNews = [...arrGroupsNews, ...arrUsersNews];

  sortByDec(arrAllNews);

  return (
    <div className="news">
      { arrAllNews.length > 0 && 
        arrAllNews.map((item, index) => {
          const { uid, gid, attachment, photo, first_name, last_name, screen_name, name, text } = item;
          if(attachment) {
            const { attachment, text } = item;
            const { type } = attachment;
            return (
              <div className="news-post" key={index}>
                <div className="news-post__author" key={index}>
                  { gid &&
                    <div>
                      <a href={`https://vk.com/${screen_name}`}><img src={photo} className="img-circle m-r-1" alt={index} /></a>
                      <span>{name}</span>
                    </div>
                  }
                  {
                    uid &&
                    <div>
                      <a href={`https://vk.com/id${uid}`}><img src={photo} className="img-circle m-r-1" alt={index} /></a>
                      <span>{first_name} {last_name}</span>
                    </div>
                  }
                </div>
                { type == 'video' && 
                  <div>
                    <img src={attachment.video.image_big} className="img-fluid news-post__image" alt={`video-${index}`} />
                    <span className="news-post__warning">Пост с видео (в разработке)</span>
                    { text && <p className="news-post__text" dangerouslySetInnerHTML={utils.createMarkup(text)}></p> }
                  </div>
                }
                {
                  type == 'photo' &&
                  <div>
                    <img src={attachment.photo.src_big} className="img-fluid news-post__image" alt={`news-post-img-${index}`} />
                    { text && <p className="news-post__text" dangerouslySetInnerHTML={utils.createMarkup(text)}></p> }
                  </div>
                }
                {
                  type == 'doc' &&
                  <div>
                    { text && <p className="news-post__text" dangerouslySetInnerHTML={utils.createMarkup(text)}></p> }
                    <span className="news-post__warning">Пост с документами (в разработке)</span>
                  </div>
                }
                {
                  type == 'link' &&
                  <div>
                    <span className="news-post__warning">Пост со ссылкой (в разработке)</span>
                  </div>
                }
              </div>
            )
          }
          if(text && !attachment) {
            return (
              <div className="news-post" key={index}>
                <div className="news-post__author">
                  { gid &&
                    <div>
                      <a href={`https://vk.com/${screen_name}`}><img src={photo} className="img-circle m-r-1" alt={index} /></a>
                      <span>{name}</span>
                    </div>
                  }
                  {
                    uid &&
                    <div>
                      <a href={`https://vk.com/id${uid}`}><img src={photo} className="img-circle m-r-1" alt={index} /></a>
                      <span>{first_name} {last_name}</span>
                    </div>
                  }
                  <p key={index} className="news-post__text" dangerouslySetInnerHTML={utils.createMarkup(text)}></p>
                </div>
              </div>
            );
          }
        })
      }
  </div>
  );
}