import React from 'react';
import PropTypes from 'prop-types';

import Numbers from './Numbers';

export default function Pagination({ items, itemsPerPage, onClick }) {
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
  onClick: PropTypes.func.isRequired
};
