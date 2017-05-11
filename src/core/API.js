import { setItem, getItem } from '../utils/localStorage';

const getJSON = (type) => {
  if(type == "friends" || type == "newsfeed") {
    return getItem(type, true);
  }
  return getItem(type);
}

class API {
  static get(type, params = {}, isUseStorage) {
    const url = type + '.get';
    const storage = getJSON(type);

    return new Promise(function(resolve, reject) {
      if (!getItem(type) || !isUseStorage) {
        VK.Api.call(url, params, function(data) {
          if (data.response) {
            resolve(data.response);
          } else {
            reject(data.error);
          }
        });
      } else {
        resolve(storage);
      }
    }); 
  }

  static post(type, params = {}) {
    const url = type + '.post';
    
    VK.Api.call(url, params, function(data) {
      if (data.response) {
        console.info("message sent successfully")
      } else {
        console.error(data.error);
      }
    });
  }
}

export default API;