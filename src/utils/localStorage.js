// * LocalStorage API * //

const getLStorage = (key) => {
  let item = localStorage[key];
  if(!item) {
    return;
  }
  return JSON.parse(item);
}

const setLStorage = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
}

const clearLStorage = () => {
  localStorage.clear();
}

export {
  getLStorage,
  setLStorage,
  clearLStorage
}

