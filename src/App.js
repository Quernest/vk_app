import React, { Component } from 'react';

// containers
import Login from './containers/Login';
import Home from './containers/Home';

// utils
import * as storage from './utils/localStorage.js';
import * as utils from './utils/features.js';

// constants
import { BREAKPOINT } from './constants/constants.js';

// core
import * as API from './core/API';
import { vk } from './config.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            countLoadFriends : vk.countLoadFriends,
            countLoadNews : vk.countLoadNews
        };
        
        this._handleOnClick = this._handleOnClick.bind(this);
        this._handleOnLogin = this._handleOnLogin.bind(this);
    }

    componentDidMount() {
        this.init();
    }

    init() {
        const { appID } = vk;
        VK.init({ apiId: appID });
        console.info("API initialisation successful");
    }

    getFriends() {
        const { countLoadFriends } = this.state;
        VK.Api.call('friends.get', { count: countLoadFriends, order: "hints", fields: 'photo_100, status' }, (data) => {
            if(data.response) {
                storage.setAsJSON("user_friends", data.response);
                this.setState({ friends: data.response });
            }
        });
    }

    getNews() {
        const { countLoadNews } = this.state;
        VK.Api.call('newsfeed.get', { count: countLoadNews, filters: "post,photo" }, (data) => {
            if(data.response) {
                storage.setAsJSON("user_news", data.response);
                this.setState({ news: data.response });
            }
        });     
    }

    getStatus(id) {
        VK.Api.call('status.get', { user_id: id }, (data) => {
            if(data.response) {
                storage.set("user_status", data.response.text);
                this.setState({ status: data.response.text });
            }
        });
    }

    getAvatar(id) {
        VK.Api.call('users.get', { user_id: id, fields: "photo_100" }, (data) => {
            if(data.response) {
                storage.set("user_avatar", data.response[0].photo_100);
                this.setState({ avatar: data.response[0].photo_100});
            }
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

        if (!status) { 
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
        const { user, sidebarToggle } = this.state;
        const { name } = e.target
        let value;
        switch(name) {
            case 'refresh': value = name;
            this.refresh();
            break;
            case 'toggle' : value = name;
            utils.sidebarToggle("wrapper");
            break;
            case 'logout' : value = name;
            this._handleOnLogin(false);
            break;
            default : value = null;
        }
    }

    _handleOnLogin(user) {
        console.log(user);
        this.checkLocalStorage(user.id);
        this.setState({ user: user });
    }

    refresh() {
        const { id } = this.state.user;
        // this.getStatus(id);
        // this.getAvatar(id);
        // this.getNews();
        // this.getFriends();

        API.getStatus(id);
        API.getAvatar(id, "photo_100");
        API.getNews(vk.countLoadNews, "post, photo");
        API.getFriends(vk.countLoadFriends, "hints", "photo_100,status");

        console.log(API.getStatus(id)); // undefined

        console.info("updated");
    }
    
    render() {
        const { user, avatar, news, friends } = this.state;
        const isLoad = user && avatar && news && friends;

        return(
            <div>
                { !isLoad && 
                    <Login onLogin={this._handleOnLogin} /> 
                }
                { isLoad &&  
                    <Home data={ this.state } onClick={this._handleOnClick} /> 
                }
            </div>
        );   
    }
};

export default App;