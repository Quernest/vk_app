import React, { Component } from "react";
import * as storage from '../utils/localStorage.js';

const Sidebar = ({ data, data: { user }, onClick}) => {
  let status  = storage.setStatus(), 
      friends = storage.setFriends(), 
      avatar  = storage.setAvatar();

  let friendsCount = friends.length;

  if(friends.length >= 10) {
    friends.length = 10;
  }

  return (
    <div className="col-sm-5 col-md-5 col-lg-4 col-xl-3 sidebar">
        
      <div className="profile m-t-2 m-b-1">
        <h4>{`${user.first_name} ${user.last_name}`}</h4>
        <div className="profile__status">
          <p>{status}</p>
        </div>
        <a href={`https://vk.com/id${user.id}`} className="profile__avatar">
          <img src={avatar} className="img-circle" alt="img" />
        </a>
        <div className="profile__info m-t-1">
          <button className="btn btn-sm btn-success m-t-1 m-b-1" type="button">
            Мои друзья: <strong>{friendsCount}</strong> 
          </button>
          <button className="btn btn-sm btn-danger" type="button" onClick={onClick} name="logout">Выйти</button>
        </div>
      </div>
      <div className="friends">
          {
            friends.map((item, index) => {
            return ( <div className="friends-item row" key={index}>
                <div className="col-lg-4 m-t-2 m-b-2">
                    <a href={`https://vk.com/id${item.uid}`} className="friends-item__avatar">
                      <img src={item.photo_100} className="img-circle img-fluid" alt="img" />
                    </a> 
                  </div>
                  <div className="col-lg-8 m-t-2 m-b-2 text-xl-left">
                    <h5>{`${item.first_name} ${item.last_name}`}</h5>
                    <p>{item.status}</p>
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