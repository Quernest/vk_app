class API {
  get(type, params = {}) {
    const url = type + '.get';
    return new Promise(function(resolve, reject) {
      VK.Api.call(url, params, function(data) {
        if(data.response) {
          resolve(data.response);
        } else {
          reject(data.error);
        }
      });
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
}

export default API;