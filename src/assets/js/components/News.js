import React, { Component } from 'react';
import * as utils from '../utils/reg.js';
import * as storage from '../utils/localStorage.js'; 

export default function News() {
  const news = storage.setNews();
  // const { items, profiles, groups } = news;
  return (
    <div className="news">
      {
        news.items.map(function(element, index) {
        if(element.attachment) {
          const { photo, type } = element.attachment;
          const { text } = element;
          return (
              <div className="news-post" key={index}>
                { text && <p className="news-post__text" dangerouslySetInnerHTML={utils.createMarkup(text)}></p> }
                { type === 'photo' && <img src={photo.src_big} className="img-fluid" alt={`news-post-img${index}`} /> }
                { type === 'video' && 
                  <strong className="text-danger">Пост с видео (в разработке)</strong>
                }
              </div>
            );
          }       
        }, this)          
      }
  </div>
  );
}