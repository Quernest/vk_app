import React, { Component } from 'react';
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
    this.addPost();
  }

  addPost() {
    const { textareaVal } = this.state;
    if(textareaVal) {
      VK.Api.call('wall.post', { message: this.state.textareaVal }, (data) => console.log(data));
    }
  }

  render() {
    const { textareaVal } = this.state;
    const { news } = this.props.data;
    return(
      <div className="col-md-8 col-lg-9 dashboard p-t-1">
          <form onSubmit={this.handleSubmit}>
              <label htmlFor="textarea">
                Добавить запись на свою страницу
              </label>
              <textarea className="form-control" id="textarea" rows="4" value={textareaVal} onChange={this.handleChange} />
              <input type="submit" value="Отправить" className="btn btn-primary m-t-1"/>
              <button type="button" className="btn btn-refresh btn-success m-t-1 m-l-1" name="refresh" onClick={this.props.onClick}>Обновить</button>
          </form>
            <div className="row">
              <div className="col-lg-12">
                <News news={ news } />
                <nav aria-label="...">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" name="pagePrev" tabIndex="-1">Предыдущая</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" name="pageNext" onClick={this.props.onClick}>Следующая</a>
                    </li>
                  </ul>
                </nav>
            </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;