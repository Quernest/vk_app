import { getLStorage } from '../utils/localStorage';

export default class API {
  static get(type, params = {}, isUseStorage) {
    const url = `${type}.get`;

    return new Promise((resolve, reject) => {
      if (!getLStorage(type) || !isUseStorage) {
        VK.Api.call(url, params, (data) => {
          if (data.response) {
            resolve(data.response);
            return;
          }
          reject(data.error);
        });
        return;
      }
      resolve(getLStorage(type));
    });
  }

  static post(type, params = {}) {
    VK.Api.call(type, params, (data) => {
      if (data.response) {
        console.info('request sent successfully');
      } else {
        console.error(data.error);
      }
    });
  }
}
