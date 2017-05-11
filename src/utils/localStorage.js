// * LocalStorage API * //

const getItem = (key, getAsJson) => {
  let item = localStorage[key];
  if(!item) {
    return;
  }
  if(getAsJson) {
    return JSON.parse(item);
  }
  return item;
}

const setItem = (key, item, saveAsJson) => {
  let data = item;
  if(saveAsJson) {
    data = JSON.stringify(item);
  }
  localStorage.setItem(key, data);
}

const clear = () => {
  localStorage.clear();
}

export {
  getItem,
  setItem,
  clear
}

