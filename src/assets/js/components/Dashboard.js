import React, { Component } from 'react';
import News from './News.js';
import * as utils from '../utils/reg.js';
import * as storage from '../utils/localStorage.js';
import { REFRESH_ICON } from '../constants/constants.js';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="col-sm-7 col-md-7 col-lg-8 col-xl-9 dashboard">
        <div className="wall m-t-1">
          <button type="button" className="btn btn-primary m-r-1" onClick={this.props.onAddPost}>Добавить пост</button>
          <button type="button" className="btn btn-primary m-r-1" name="refresh" onClick={this.props.onClick}>Обновить</button>
          {/*<img src={REFRESH_ICON} alt="refresh" name="refresh" className="img-fluid" onClick={this.props.onClick} />*/}
          <hr/>
            <div className="row">
              <div className="col-lg-12">
                <News />
                <nav aria-label="...">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex="-1">Previous</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" name="pageNext" onClick={this.props.onClick}>Next</a>
                    </li>
                  </ul>
                </nav>
              </div>
           </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;