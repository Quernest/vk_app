import { setLStorage, getLStorage } from '../utils/localStorage';

class API {
  static get(type, params = {}, isUseStorage) {
    const url = type + '.get';

    return new Promise(function(resolve, reject) {
      if (!getLStorage(type) || !isUseStorage) {
        VK.Api.call(url, params, function(data) {
          if (data.response) {
            resolve(data.response);
          } else {
            reject(data.error);
          }
        });
      } else {
        resolve( getLStorage(type) );
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