export function get(key) {
  const item = localStorage.getItem(key);
  if(typeof item !== "undefined" && item !== null) {
    return true;
  } else return false;
};