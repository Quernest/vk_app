import React from 'react';
import PropTypes from 'prop-types';

export default function Pagination({ items, currentPage, itemsPerPage, onClick, type }) {
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

  if (type === 'pager') {
    const lastPage = items.length / itemsPerPage;

    return (
      <div className='pager'>
        <button
          className={currentPage === 1 ? 'btn disabled' : 'btn btn-success'}
          name='prev'
          onClick={onClick}
        >
          &larr;
        </button>
        <button
          className={currentPage >= lastPage ? 'btn disabled' : 'btn btn-success'}
          name='next'
          onClick={onClick}
        >
          &rarr;
        </button>
      </div>
    );
  }
  return (
    <ul id='pagination'>
      {renderPageNumbers}
    </ul>
  );
}

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string
};
