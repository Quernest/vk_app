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

  let arrayUserItems   = [],
      arrayGroupsItems = [],
      arrayAllItems    = [];

  function filter(object) {
    return object.map((item, index) => item);
  }

  function sortUserItems(profiles, items) {
    for(let i = 0; i < profiles.length; i++) {
      for(let j = 0; j < items.length; j++) {
        if(items[j].source_id == profiles[i].uid) {
          arrayUserItems.push(profiles[i], items[j]);
        }
      }
    }  
  }

  function sortGroupsItems(groups, items) {
    for(let i = 0; i < groups.length; i++) {
      for(let j = 0; j < items.length; j++) {
        if(items[j].source_id + groups[i].gid === 0) {
          arrayGroupsItems.push(groups[i], items[j]);
        }
      }
    }   
  }

  sortUserItems(profiles, items);
  sortGroupsItems(groups, items);

  arrayAllItems = [...arrayGroupsItems, ...arrayUserItems];

  console.log(arrayAllItems);

  return (
    <div className="news">
      { arrayAllItems.length > 0 &&
        arrayAllItems.map((item, index) => {
          if(item.attachment) { 
            const { attachment, text } = item;
            const { type } = attachment;
            return (
              <div className="news-post" key={index}>
                { type == 'video' && 
                  <div>
                    <img src={attachment.video.image_big} className="img-fluid news-post__image" alt={`video-${index}`} />
                    <strong className="text-danger">Пост с видео (в разработке)</strong>
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
                    <strong className="text-danger">Пост с документами (в разработке)</strong>
                  </div>
                }
                {
                  type == 'link' &&
                  <div>
                    {/*{ description && <p className="news-post__text" dangerouslySetInnerHTML={utils.createMarkup(description)}></p> }
                    { image_big && <img src={image_big} className="img-fluid news-post__image" alt={`link-image-${index}`} /> }
                    { url && <a href={url}> { title } </a>}*/}
                    <strong className="text-danger">Пост со ссылкой (в разработке)</strong>
                  </div>
                }
              </div>
            );
          }
          if(item.uid || item.gid) {
            const { photo, first_name, last_name, uid, gid, screen_name, name } = item;
            return (
            <div className="news-author" key={index}>
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
            )
          }
          if(item.text) {
            const { text } = item;
            return (
              <p key={index} className="news-post__text" dangerouslySetInnerHTML={utils.createMarkup(text)}></p>
            );
          }
        })
      }
  </div>
  );
}