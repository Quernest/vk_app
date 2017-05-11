import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as API from '../core/API.js';
import News from './News.js';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textareaVal : ''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ textareaVal: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { textareaVal } = this.state;
    if (textareaVal) {
      API.addPost(textareaVal);
    }
  }

  render() {
    const { textareaVal } = this.state;
    const { data: { news, canRefresh }, onClick } = this.props; 
    return(
      <div className="dashboard" id="page-content-wrapper">
          <button 
            className="btn m-b-1" 
            id="menu-toggle" 
            name="toggle" 
            onClick={onClick}
          >
            &#9776;
          </button>
          <form 
            onSubmit={this.handleSubmit}>
              <label 
                htmlFor="textarea">
                Добавить запись на свою страницу
              </label>
              <textarea 
                className="form-control" 
                id="textarea" 
                rows="4" 
                value={textareaVal} 
                onChange={this.handleChange} 
              />
              <input 
                type="submit" 
                value="Отправить" 
                className="btn btn-primary m-t-1"
              />
              <button 
                type="button" 
                className={canRefresh ? "btn btn-refresh btn-success m-t-1 m-l-1" : "btn btn-refresh btn-success m-t-1 m-l-1 disabled"} 
                name="refresh" 
                onClick={onClick}
              >
                Обновить
              </button>
          </form>
            <div className="row">
              <div className="col-lg-12">
                <News news={ news } />
              </div>
            </div>
        </div>
    );
  }
}

Dashboard.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Dashboard;