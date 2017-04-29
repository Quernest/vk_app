import React, { Component } from "react";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
  }
  render() {
    const user = this.props.data;
    return (
      <div className="col-sm-4 col-md-4 col-lg-3 col-xl-2 sidebar">
        <div className="profile d-flex text-sm-center m-t-2 m-b-1">
          <h4>{this.props.data === undefined ? "Loading..." : `${user.first_name} ${user.last_name}`}</h4>
          <p>your status</p>
          <a href="#">
            <img src="//placehold.it/150x150" className="img-circle" alt="img" />
          </a>
        </div>
        <div className="friends">
          <div className="row">
            <div className="col-sm-5 m-t-1 m-b-1">
              <a href="#">
                <img src="//placehold.it/125x125" className="img-circle friends__avatar" alt="img" />
              </a>
            </div>
            <div className="col-sm-7 m-t-1 m-b-1">
              <h5>Name</h5>
              <p>friend status</p>
            </div>
            <div className="col-sm-5 m-t-1 m-b-1">
              <a href="#">
                <img src="//placehold.it/125x125" className="img-circle friends__avatar" alt="img" />
              </a>
            </div>
            <div className="col-sm-7 m-t-1 m-b-1">
              <h5>Name</h5>
              <p>friend status</p>
            </div>
            <div className="col-sm-5 m-t-1 m-b-1">
              <a href="#">
                <img src="//placehold.it/125x125" className="img-circle friends__avatar" alt="img" />
              </a>
            </div>
            <div className="col-sm-7 m-t-1 m-b-1">
              <h5>Name</h5>
              <p>friend status</p>
            </div>
            <div className="col-sm-5 m-t-1 m-b-1">
              <a href="#">
                <img src="//placehold.it/125x125" className="img-circle friends__avatar" alt="img" />
              </a>
            </div>
            <div className="col-sm-7 m-t-1 m-b-1">
              <h5>Name</h5>
              <p>friend status</p>
            </div>
            <div className="col-sm-5 m-t-1 m-b-1">
              <a href="#">
                <img src="//placehold.it/125x125" className="img-circle friends__avatar" alt="img" />
              </a>
            </div>
            <div className="col-sm-7 m-t-1 m-b-1">
              <h5>Name</h5>
              <p>friend status</p>
            </div>
            <div className="col-sm-5 m-t-1 m-b-1">
              <a href="#">
                <img src="//placehold.it/125x125" className="img-circle friends__avatar" alt="img" />
              </a>
            </div>
            <div className="col-sm-7 m-t-1 m-b-1">
              <h5>Name</h5>
              <p>friend status</p>
            </div>
            <div className="col-sm-5 m-t-1 m-b-1">
              <a href="#">
                <img src="//placehold.it/125x125" className="img-circle friends__avatar" alt="img" />
              </a>
            </div>
            <div className="col-sm-7 m-t-1 m-b-1">
              <h5>Name</h5>
              <p>friend status</p>
            </div>
            <div className="col-sm-5 m-t-1 m-b-1">
              <a href="#">
                <img src="//placehold.it/125x125" className="img-circle friends__avatar" alt="img" />
              </a>
            </div>
            <div className="col-sm-7 m-t-1 m-b-1">
              <h5>Name</h5>
              <p>friend status</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;