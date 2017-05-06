import React, { Component } from "react";
import PropTypes from 'prop-types';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage : 1,
      todosPerPage : 5
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { friends } = this.props.data;
    const { name } = event.target;

    let { currentPage, todosPerPage } = this.state;
    let lastPage = friends.length / todosPerPage;
    
    if(name == "next" && currentPage < lastPage) {
      this.setState({
        currentPage: currentPage += 1
      });
    } else if (currentPage > 1) {
      this.setState({
        currentPage: currentPage -= 1
      });
    }
  }

  render() {
    const { data, data: { user, status, friends, avatar }, onClick } = this.props;
    const { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = friends.slice(indexOfFirstTodo, indexOfLastTodo);

    let lastPage = friends.length / todosPerPage;

    const renderFriends = currentTodos.map((item, index) => {
      const { photo_100, first_name, last_name, uid, status } = item;
      return ( 
          <div className="friends-item row" key={index}>
            <div className="col-lg-4 m-t-2 m-b-2">
              <a href={`https://vk.com/id${uid}`} className="friends-item__avatar">
                <img src={photo_100} className="img-circle img-fluid" alt="img" />
              </a> 
            </div>
            <div className="col-lg-8 m-t-2 m-b-2 text-lg-left">
              <h4>{`${first_name} ${last_name}`}</h4>
              <p>{status}</p>
            </div>
          </div>
        )
    });

    return (
      <div className="sidebar">
        <a 
          href="#" 
          className="btn-close" 
          id="menu-toggle" 
          name="toggle" 
          onClick={onClick}
          >
            &times;
        </a>
        <div className="profile m-t-2 m-b-1">
          <h3>{`${user.first_name} ${user.last_name}`}</h3>
          <div className="profile__status">
            <p>{status}</p>
          </div>
          <a href={`https://vk.com/id${user.id}`} className="profile__avatar">
            <img src={avatar} className="img-circle" alt="img" />
          </a>
          <div className="row profile__info m-t-1">
            <div className="col-md-6">
              <button className="btn btn-success m-t-1 m-b-1" type="button">
                Мои друзья: {friends.length}
              </button>
            </div>
            <div className="col-md-6">
              <button className="btn btn-danger m-t-1 m-b-1" type="button" onClick={onClick} name="logout">Выйти</button>
            </div>
          </div>
        </div>
        <div className="pager">
          <button name="previous" onClick={this.handleClick} className={currentPage === 1 ? "btn disabled" : "btn btn-success"}>&larr;</button>
          <button name="next" onClick={this.handleClick} className={currentPage > lastPage ? "btn disabled" : "btn btn-success"}>&rarr;</button>
        </div>
        <div className="friends">
          { renderFriends }
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  data : PropTypes.object.isRequired,
  onClick : PropTypes.func.isRequired
}

export default Sidebar;