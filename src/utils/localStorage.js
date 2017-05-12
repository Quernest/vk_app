// * LocalStorage API * //

function getLStorage(key) {
  const item = localStorage[key];

  if (!item) {
    return false;
  }
  return JSON.parse(item);
}

function setLStorage(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

function clearLStorage() {
  localStorage.clear();
}

export {
  getLStorage,
  setLStorage,
  clearLStorage
};


