import React, { Component } from 'react';

import Sidebar from './components/Sidebar.js';
import Dashboard from './components/Dashboard.js';
import AuthPage from './components/AuthPage.js';

import * as storage from './utils/localStorage.js';
import { vk } from './config.js';

class App extends Component {
    constructor() {
        super();
        this.state = { 
            isRender: false,
            countLoadFriends : vk.countLoadFriends,
            countLoadNews : vk.countLoadNews
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
        console.info("API initialisation successful");
    }

    login() {
        const authInfo = (response) => {
            if(response.session) {
                const { user, user : { id } } = response.session;
                if (user) {
                    this.checkLocalStorage(id);
                    this.setState({ user: user, isRender: true });
                }
            }
        }
        VK.Auth.login(authInfo, vk.appPermissions);
    }

    logout() {
        VK.Auth.logout();
        storage.clear();
        this.setState({ isRender: false });
    }

    access() {
        VK.Auth.getLoginStatus((response) => {
            if(response.status == 'connected' && response.session) {
                this.login();
            }
        })
    }

    getFriends() {
        const { countLoadFriends } = this.state;
        VK.Api.call('friends.get', { count: countLoadFriends, order: "hints", fields: 'photo_100, status' }, (data) => {
            storage.setAsJSON("user_friends", data.response);
            this.setState({ friends: data.response });
        });
    }

    getNews() {
        const { countLoadNews } = this.state;
        VK.Api.call('newsfeed.get', { count: countLoadNews, filters: "post,photo" }, (data) => {
            storage.setAsJSON("user_news", data.response);
            this.setState({ news: data.response });
        });     
    }

    getStatus(id) {
        VK.Api.call('status.get', { user_id: id }, (data) => {
            storage.set("user_status", data.response.text);
            this.setState({ status: data.response.text });
        });
    }

    getAvatar(id) {
        VK.Api.call('users.get', { user_id: id, fields: "photo_100" }, (data) => {
            storage.set("user_avatar", data.response[0].photo_100);
            this.setState({ avatar: data.response[0].photo_100 });
        });   
    }

    checkLocalStorage(id) {
        const avatar  = storage.get("user_avatar");
        const status  = storage.get("user_status");

        const friends = storage.getAsJSON("user_friends");
        const news    = storage.getAsJSON("user_news");

        if (!avatar) {
            this.getAvatar(id);
        } else {
            this.setState({ avatar: avatar });
        }

        if (!status) { // need fix
            this.getStatus(id);
        } else {
            this.setState({ status: status });
        }
        
        if (!friends) {
            this.getFriends();
        } else {
            this.setState({ friends: friends });
        }

        if (!news) {
            this.getNews();
        } else {
            this.setState({ news: news });
        }
    }

    _handleOnClick(e) {
        const { user } = this.state;
        const target = e.target;
        const name = target.name;
        let value;
        switch(name) {
            case 'refresh': value = name;
            this.refresh();
            break;
            case 'login': value = name;
            this.login();
            break;
            case 'logout': value = name;
            this.logout();
            break;
            case 'pageNext': value = name;
            break;
            case 'pagePrev' : value = name;
            break;
            default : value = null;
        }
    }

    refresh() {
        const { user: { id } } = this.state;
        this.getStatus(id);
        this.getAvatar(id);
        this.getNews();
        this.getFriends();
        console.info("updated");
    }
    
    render() {
        const { isRender, user, avatar, news, friends } = this.state;
        const isLoad = isRender && user && avatar && news && friends;

        return(
            <div id="wrapper">
                { !isLoad &&
                  <AuthPage onClick={this._handleOnClick} /> 
                }
                { isLoad &&
                  <div className="container-fluid">
                      <div className="row">  
                          <Sidebar   data={this.state} onClick={this._handleOnClick} />
                          <Dashboard data={ news } onClick={this._handleOnClick} />
                      </div>
                  </div>
                }
            </div>
        );   
    }
};

export default App;