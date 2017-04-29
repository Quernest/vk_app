import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="col-sm-7 col-md-7 col-lg-8 col-xl-9 dashboard">
        <div className="wall m-t-1">
          <button type="button" className="btn btn-primary" onClick={this.props.actions}>Добавить пост</button>
          <hr/>
          <div className="wall-post">
            <div className="row">
              <div className="col-sm-8">

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;