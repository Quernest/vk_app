// VK API requests will be here

export function addPost(text) {
  VK.Api.call("wall.post", {
    message: text,
  }, function(data) { return data });
}
