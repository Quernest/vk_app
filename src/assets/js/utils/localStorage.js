export function setNews() {
  const news = JSON.parse(localStorage.getItem('user news'));
  return news;
};

export function setFriends() {
  const friends = JSON.parse(localStorage.getItem('user friends'));
  return friends;
}

export function setAvatar() {
  const avatar = localStorage.getItem('user avatar');
  return avatar;
}

export function setStatus() {
  const status = localStorage.getItem('user status');
  return status;
}