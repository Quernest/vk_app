import React, { Component } from "react";

const Sidebar = ({ data, data: { user, status, friends, avatar }, onClick}) => {
  
  let friendsCount = friends.length;
  
  if(friends.length >= 10) friends.length = 10;

  return (
    <div className="col-md-4 col-lg-3 sidebar">
  
      <div className="profile m-t-2 m-b-1">
        <h4>{`${user.first_name} ${user.last_name}`}</h4>
        <div className="profile__status">
          <p>{status}</p>
        </div>
        <a href={`https://vk.com/id${user.id}`} className="profile__avatar">
          <img src={avatar} className="img-circle" alt="img" />
        </a>
        <div className="row profile__info m-t-1">
          <div className="col-sm-6 text-sm-left">
            <button className="btn btn-success m-t-1 m-b-1" type="button">
              Мои друзья: <strong>{friendsCount}</strong> 
            </button>
          </div>
          <div className="col-sm-6 text-sm-right">
            <button className="btn btn-danger m-t-1 m-b-1" type="button" onClick={onClick} name="logout">Выйти</button>
          </div>
        </div>
      </div>
      <div className="friends">
          { friends.length > 0 &&
            friends.map((item, index) => {
            const { photo_100, first_name, last_name, uid, status } = item;
            return ( <div className="friends-item row" key={index}>
                <div className="col-lg-4 m-t-2 m-b-2">
                    <a href={`https://vk.com/id${uid}`} className="friends-item__avatar">
                      <img src={photo_100} className="img-circle img-fluid" alt="img" />
                    </a> 
                  </div>
                  <div className="col-lg-8 m-t-2 m-b-2 text-lg-left">
                    <h5>{`${first_name} ${last_name}`}</h5>
                    <p>{status}</p>
                  </div>
                </div>
              )
          })
        }
      </div>
    </div>
  );
}

export default Sidebar;