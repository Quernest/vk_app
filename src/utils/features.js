export function createMarkup(text) {
  return {__html: text}
}

export function map(object) {
  return object.map((item, index) => item);
}

export function sortByDec(arr) {
  arr.sort((a, b) => b.date - a.date);
}

export function sortUserItems(profiles, items, array) {
  for(let i = 0; i < profiles.length; i++) {
    for(let j = 0; j < items.length; j++) {
      if(items[j].source_id == profiles[i].uid) {
        array.push($.extend(items[j], profiles[i]));
      }
    }
  }  
}

export function sortGroupsItems(groups, items, array) {
  for(let i = 0; i < groups.length; i++) {
    for(let j = 0; j < items.length; j++) {
      if(items[j].source_id + groups[i].gid === 0) {
        array.push($.extend(items[j], groups[i]));
      }
    }
  }   
}

export function sidebarToggle(tag) {
  const wrapper = $(`#${tag}`);
  wrapper.toggleClass("toggled");
}