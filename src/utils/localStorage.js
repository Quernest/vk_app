export function get(key) {
  const item = localStorage.getItem(key);
  if (typeof item !== "undefined" && item !== null) {
    return item;
  } else return false;
};

export function getAsJSON(key) {
  const item = localStorage.getItem(key);
  if (typeof item !== "undefined" && item !== null) {
    return JSON.parse(item);
  } else return false;
}

export function set(key, response) {
  localStorage.setItem(key, response);
}

export function setAsJSON(key, response) {
  localStorage.setItem(key, JSON.stringify(response));
}

export function clear() {
  localStorage.clear();
}