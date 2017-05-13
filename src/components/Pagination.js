import React from 'react';
import PropTypes from 'prop-types';

import Numbers from './Pagination/Numbers';
import Arrows from './Pagination/Arrows';

export default function Pagination({ items, currentPage, itemsPerPage, onClick, type }) {
  if (type === 'arrows') {
    return (
      <Arrows
        currentPage={currentPage}
        items={items}
        itemsPerPage={itemsPerPage}
        onClick={onClick}
      />
    );
  }
  return (
    <Numbers
      items={items}
      itemsPerPage={itemsPerPage}
      onClick={onClick}
    />
  );
}

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string
};
