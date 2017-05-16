export function createMarkup(text) {
  return { __html: text };
}

export function map(object) {
  return object.map(item => item);
}

export function sortByDecreasing(arr) {
  arr.sort((a, b) => b.date - a.date);
}

export function search(arr, text) {
  return (
    arr.filter(item => {
      if (item.name) {
        return item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0;
      } else if (item.first_name) {
        return item.first_name.toLowerCase().indexOf(text.toLowerCase()) >= 0;
      } else if (item.last_name) {
        return item.last_name.toLowerCase().indexOf(text.toLowerCase()) >= 0;
      } return item;
    })
  );
}

export function sortUserItems(profiles, items, array) {
  for (let i = 0; i < profiles.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (items[j].source_id === profiles[i].uid) {
        array.push($.extend(items[j], profiles[i]));
      }
    }
  }
}

export function sortGroupsItems(groups, items, array) {
  for (let i = 0; i < groups.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (items[j].source_id + groups[i].gid === 0) {
        array.push($.extend(items[j], groups[i]));
      }
    }
  }
}

export function scrollToTop() {
  const container = $('html, body');

  container.animate({ scrollTop: 0 }, 'slow');
}

export function toggle() {
  $('#wrapper').toggleClass('toggled');
}

export function activePages(currentPage, event) {
  $(`#${currentPage}`).removeClass('active');
  $(`#${event.target.id}`).addClass('active');
}
