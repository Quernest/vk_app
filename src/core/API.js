// VK API requests will be here
import React, { Component } from 'react';
import localStorage from '../utils/localStorage';

// export default class API extends Component {

//   constructor(id) {
//     super();
//     this.state = {};
//   }

//   handler(data) {
//     if (data.response) {
//       console.log(data.response);
//     }
//   }

//   addPost(message) {
//     VK.Api.call("wall.post", {
//       message,
//     }, data => data);
//   }

//   getFriends(count, order, fields) {
//     VK.Api.call('friends.get', {
//       count,
//       order,
//       fields
//     }, data => this.handler(data));
//   }

//   getNews(count, filters) {
//     VK.Api.call("newsfeed.get", {
//       count,
//       filters
//     }, data => this.handler(data))
//   }

//   getStatus(user_id) {
//     VK.Api.call("status.get", {
//       user_id
//     }, data => this.handler(data))
//   }

//   getAvatar(user_id, fields) {
//     VK.Api.call("users.get", {
//       user_id,
//       fields
//     }, data => this.handler(data))
//   }

// }


function handler(data) {
  if(data.response) {
    console.log(data.response);
    return data.response;
  }
}

export function addPost(message) {
  VK.Api.call("wall.post", {
    message,
  }, data => handler(data));
}

export function getFriends(count, order, fields) {
  VK.Api.call('friends.get', {
    count,
    order,
    fields
  }, data => handler(data));
}

export function getNews(count, filters) {
  VK.Api.call("newsfeed.get", {
    count,
    filters
  }, data => handler(data))
}

export function getStatus(user_id) {
  VK.Api.call("status.get", {
    user_id
  }, data => handler(data))
}

export function getAvatar(user_id, fields) {
  VK.Api.call("users.get", {
    user_id,
    fields
  }, data => handler(data))
}