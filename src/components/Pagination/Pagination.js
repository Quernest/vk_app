import React from 'react';
import PropTypes from 'prop-types';

import Numbers from './Numbers';

export default function Pagination({ items, currentPage, itemsPerPage, onClick }) {
  return (
    <Numbers
      items={items}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      onClick={onClick}
    />
  );
}

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};
