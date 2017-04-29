import React, { Component } from "react";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this._handlerOnClick = this._handlerOnClick.bind(this);
  }
  _handlerOnClick(e) {
    this.props.onLogout();
  }
  render() {
    const { data } = this.props;
    return (
      <div className="col-sm-5 col-md-5 col-lg-4 col-xl-3 sidebar">
        <div className="profile m-t-2 m-b-1">
          <h4>{`${data.user.first_name} ${data.user.last_name}`}</h4>
          <div className="profile__status">
           <p>{data.status}</p>
          </div>
          <a href={`https://vk.com/id${data.user.id}`}>
            <img src={data.avatar} className="img-circle profile__avatar" alt="img" />
          </a>
          <div className="profile__info m-t-1">
            <span>Друзей: <strong>{data.friends.length}</strong></span>
            <button type="button" className="btn btn-success" onClick={this._handlerOnClick}>Выйти</button>
          </div>
        </div>

        <div className="friends">
            {data.friends.map((item, index) => {
              return <div className="friends-item row" key={index}>
                  <div className="col-lg-4 m-t-2 m-b-2">
                    <a href={`https://vk.com/id${item.uid}`}>
                      <img src={item.photo_100} className="img-circle friends-item__avatar img-fluid" alt="img" />
                    </a> 
                  </div>
                  <div className="col-lg-8 m-t-2 m-b-2 text-sm-center text-xl-left">
                    <h5>{`${item.first_name} ${item.last_name}`}</h5>
                    <p>{item.status}</p>
                  </div>
              </div>
              })
            }
        </div>
      </div>
    );
  }
}

export default Sidebar;