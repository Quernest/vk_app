import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import API from '../core/API.js';
import News from './News/News';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textareaVal: '',
      filterText: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.filterUpdate = this.filterUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ textareaVal: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { textareaVal } = this.state;

    if (textareaVal) {
      API.post('wall.post', { message: textareaVal });
    }
  }

  filterUpdate(event) {
    this.setState({
      filterText: event.target.value
    });
  }

  render() {
    const { textareaVal, filterText } = this.state;
    const { data: { news, canRefresh }, onClick } = this.props;

    const refreshButton = classNames('btn btn-success m-l-1 pull-xs-right', {
      'disabled': !canRefresh
    });

    return (
      <div className='dashboard content-offcanvas'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='textarea'>
            Добавить запись на свою страницу
          </label>
          <textarea
            className='form-control'
            id='textarea'
            rows='4'
            value={textareaVal}
            onChange={this.handleChange}
          />
          <div className='form-group m-t-1'>
            <div className='w-100'>
              <input
                type='submit'
                value='Отправить'
                className='btn btn-primary'
              />
              <button
                type='button'
                className={refreshButton}
                name='refresh'
                onClick={onClick}
              >
                Обновить
              </button>
            </div>
            <input
              type='search'
              value={filterText}
              onChange={this.filterUpdate}
              className='form-control m-t-1 w-100'
              placeholder='Фильтр по названию группы'
            />
          </div>
        </form>
        <div className='row'>
          <div className='col-lg-12'>
            <News news={news} filterText={filterText} />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};
