// * essentials * //
import React, { Component } from 'react';

// * containers * //
import Home from './containers/Home';

// * components * //
import Login from './components/Login';

// * utils * //
import { setLStorage, clearLStorage } from './utils/localStorage.js';
import * as utils from './utils/features.js';

// * core * //
import API from './core/API';
import { vk } from './config.js';

// * constants * //
import {
    FRIENDS,
    STATUS,
    USERS,
    NEWSFEED
} from './constants/constants.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      countLoadFriends : vk.countLoadFriends,
      countLoadNews : vk.countLoadNews,
      canRefresh: true
    };

    this._handleOnClick = this._handleOnClick.bind(this);
  }

  componentDidMount() {
    this.init();
    this.access();
  }

  init() {
    const { appID } = vk;

    VK.init({ apiId: appID });
    console.info('API initialisation successful');
  }

  login() {
    const authInfo = (response) => {
      if (response.session) {
        const { user, user: { id } } = response.session;

        if (user) {
          this.refresh(true, id);
          this.setState({ user });
        }
      }
    };
    VK.Auth.login(authInfo, vk.appPermissions);
  }

  logout() {
    VK.Auth.logout();
    clearLStorage();
    this.setState({ user: null });
  }

  access() {
    VK.Auth.getLoginStatus((response) => {
      if (response.status === 'connected' && response.session) {
        this.login();
      }
    });
  }

  _handleOnClick(e) {
    e.preventDefault();
    const { user, canRefresh } = this.state;
    const { name } = e.currentTarget;

    switch (name) {
      case 'refresh':
        if (canRefresh) {
          this.refresh(false, user.id);
        } else {
          console.warn('Wait!');
        }
        break;
      case 'toggle':
        utils.toggle();
        break;
      case 'logout':
        this.logout();
        break;
      case 'login':
        this.login();
        break;
      default:
        console.log('click ', name);
        break;
    }
  }

  refresh(isUseStorage, id) {
    this.setState({ canRefresh: false });
    Promise.all([
      API.get(STATUS, {
        user_id: id
      }, isUseStorage)
      .then(data => {
        this.setState({ status: data });
        setLStorage(STATUS, data);
      })
      .catch(error => {
        console.error(error);
      }),

      API.get(USERS, {
        user_id: id,
        fields: 'photo_100'
      }, isUseStorage)
      .then(data => {
        this.setState({ users: data });
        setLStorage(USERS, data);
      })
      .catch(error => {
        console.error(error);
      }),

      API.get(NEWSFEED, {
        count: vk.countLoadNews,
        filters: 'post,photo'
      }, isUseStorage)
      .then(data => {
        this.setState({ news: data });
        setLStorage(NEWSFEED, data);
      })
      .catch(error => {
        console.error(error);
      }),

      API.get(FRIENDS, {
        count: vk.countLoadFriends,
        order: 'hints',
        fields: 'photo_100,status'
      }, isUseStorage)
      .then(data => {
        this.setState({ friends: data });
        setLStorage(FRIENDS, data); 
      })
      .catch(error => {
        console.error(error);
      })
    ]).then(() => {
      this.setState({ canRefresh: true });
    });
  }

  render() {
    const { user, users, news, friends } = this.state;
    const isLoad = user && users && news && friends;

    return (
      <div>
        { !isLoad &&
          <Login handleOnClick={this._handleOnClick} />
        }
        { isLoad &&
          <Home handleOnClick={this._handleOnClick} data={this.state} />
        }
      </div>
    );
  }
}

export default App;
