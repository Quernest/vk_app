// * LocalStorage API * //

export default class LStorage {

  get(key, getAsJson) {
    const item = localStorage[key];
    if (typeof item !== "undefined" && item !== null) {
      if(getAsJson) {
        return JSON.parse(item);
      } else {
        return item;
      }
    } else return false;
  }

  set(key, item, saveAsJson) {
    if(saveAsJson) {
      localStorage.setItem(key, JSON.stringify(item));
    } else {
      localStorage.setItem(key, item);
    }
  }

  clear() {
    localStorage.clear();
  }

}