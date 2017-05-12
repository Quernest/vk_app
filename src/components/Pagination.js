import React from 'react';
import PropTypes from 'prop-types';

export default function Pagination({ items, itemsPerPage, onClick }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        key={number}
        id={number}
        onClick={onClick}
      >
        {number}
      </li>
    );
  });

  return (
    <ul id='pagination'>
      {renderPageNumbers}
    </ul>
  );
}

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};
