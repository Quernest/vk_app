import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="col-sm-8 col-md-8 col-lg-9 col-xl-10 dashboard">
        <div className="wall m-t-1">
          <button type="button" className="btn btn-primary">Добавить пост</button>
          <hr/>
          <div className="wall-post">
            <div className="row">
              <div className="col-sm-8">
                <img src="//placehold.it/768x400" alt="fish" className="img-fluid"/>
                <img src="//placehold.it/768x400" alt="fish" className="img-fluid"/>
                <img src="//placehold.it/768x400" alt="fish" className="img-fluid"/>
                <img src="//placehold.it/768x400" alt="fish" className="img-fluid"/>
                <img src="//placehold.it/768x400" alt="fish" className="img-fluid"/>
                <img src="//placehold.it/768x400" alt="fish" className="img-fluid"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;