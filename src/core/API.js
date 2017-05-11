import LStorage from '../utils/localStorage';

const LS = new LStorage;

class API {
  get(type, params = {}, isUseChache) {
    const url = type + '.get';
    const chache = this.getJSON(type);

    return new Promise(function(resolve, reject) {
      if (!LS.get(type) || !isUseChache) {
        VK.Api.call(url, params, function(data) {
          if (data.response) {
            resolve(data.response);
            // LS.set(type, data.response, true);
          } else {
            reject(data.error);
          }
        });
      } else {
        resolve(chache);
      }
    });
    
  }

  post(url, data = {}) {
    VK.Api.call(url, data, resp => this.handler(resp));
  }

  handler(data) {
    if (data.response) {
      console.info("success");
    }
  }

  getJSON(type) {
    if (type == "friends" || type == "newsfeed") {
      return LS.get(type, true);
    }
    return LS.get(type);
  }

}

export default API;