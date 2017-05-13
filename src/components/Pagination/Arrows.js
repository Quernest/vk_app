import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Arrows({ currentPage, items, itemsPerPage, onClick }) {
  const lastPage = items.length / itemsPerPage;

  const prevButton = classNames('btn', {
    'disabled': currentPage === 1,
    'btn-success': currentPage !== 1
  });

  const nextButton = classNames('btn', {
    'disabled': currentPage >= lastPage,
    'btn-success': currentPage < lastPage
  });

  return (
    <div className='pager'>
      <button
        className={prevButton}
        name='prev'
        onClick={onClick}
      >
        &larr;
      </button>
      <button
        className={nextButton}
        name='next'
        onClick={onClick}
      >
        &rarr;
      </button>
    </div>
  );
}

Arrows.propTypes = {
  currentPage: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};
