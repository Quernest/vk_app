// VK API requests will be here

export function addPost(params) {
  VK.Api.call("wall.post", {
    message: params,
  }, function(data) { return data });
}