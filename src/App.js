import React, { Component } from 'react';

// containers
import Login from './containers/Login';
import Home from './containers/Home';

// utils
import LStorage from './utils/localStorage.js';
import * as utils from './utils/features.js';

// core
import API from './core/API';
import { vk } from './config.js';

const LS = new LStorage;
const api = new API;

class App extends Component {
    constructor() {
        super();
        this.state = {
            countLoadFriends : vk.countLoadFriends,
            countLoadNews : vk.countLoadNews,
            canRefresh: true
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
                LS.set("friends", data.response, true);
                this.setState({ friends: data.response });
            }
        });
    }

    getNews() {
        const { countLoadNews } = this.state;
        VK.Api.call('newsfeed.get', { count: countLoadNews, filters: "post,photo" }, (data) => {
            if(data.response) {
                LS.set("newsfeed", data.response, true);
                this.setState({ news: data.response });
            }
        });     
    }

    getStatus(id) {
        VK.Api.call('status.get', { user_id: id }, (data) => {
            if(data.response) {
                LS.set("status", data.response.text);
                this.setState({ status: data.response.text });
            }
        });
    }

    getAvatar(id) {
        VK.Api.call('users.get', { user_id: id, fields: "photo_100" }, (data) => {
            if(data.response) {
                LS.set("users", data.response[0].photo_100);
                this.setState({ avatar: data.response[0].photo_100});
            }
        });   
    }

    checkLocalStorage(id) {
        const avatar  = LS.get("users");
        const status  = LS.get("status");
        const friends = LS.get("friends", true);
        const news    = LS.get("newsfeed", true);

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
        const { user, sidebarToggle, canRefresh } = this.state;
        const { name } = e.target
        let value;
        switch(name) {
            case 'refresh': value = name;
            canRefresh && this.refresh();
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
        this.checkLocalStorage(user.id);
        this.setState({ user: user });
    }

    refresh() {
        const { id } = this.state.user;

        const status = api.get("status", { user_id: id }, false);
        const avatar = api.get("users",  { user_id: id, fields: "photo_100" }, false);
        const newsfeed = api.get("newsfeed", { count: vk.countLoadNews, fields: "post, photo" }, false);
        const friends = api.get("friends", { count: vk.countLoadFriends, order: "hints", fields: "photo_100, status" }, false);

        this.setState({ canRefresh: false });

        Promise.all([status, avatar, newsfeed, friends])
        .then(value => {
            this.setState({ canRefresh: true });
            console.info("updated ", value);
        })
        .catch(value => {
            this.setState({ canRefresh: true });
            console.error("error ", value);
        });
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