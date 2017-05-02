import React, { Component } from 'react';
import Sidebar from './components/Sidebar.js';
import Dashboard from './components/Dashboard.js';
import AuthPage from './components/AuthPage.js';
import { vk } from './config.js';
import * as storage from './utils/localStorage.js';

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

    componentWillUnmount() {
        localStorage.clear();
    }

    init() {
        const { appID } = vk;
        VK.init({ apiId: appID });
        console.info("API initialisation successful");
    }

    login() {
        const authInfo = (response) => {
            if(response.session) {
                const { user } = response.session;
                if(user) {
                    this.checkLocalStorage(user.id);
                };
                this.setState({ user: user, isRender: true });
            }
        }
        VK.Auth.login(authInfo, vk.appPermissions);
    }

    logout() {
        VK.Auth.logout();
        localStorage.clear();
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
        VK.Api.call('friends.get', { order: "hints", fields: 'photo_100, status' }, (data) => {
            localStorage.setItem("user friends", JSON.stringify(data.response));
            this.checkLocalStorage();
        });
    }

    getNews(id) {
        const { countLoadNews } = this.state;
        VK.Api.call('newsfeed.get', { count: countLoadNews, filters: "post,photo" }, (data) => {
            localStorage.setItem("user news", JSON.stringify(data.response));
            this.checkLocalStorage();
        });     
    }

    getStatus(id) {
        VK.Api.call('status.get', { user_id: id }, (data) => {
            localStorage.setItem('user status', data.response.text);
            this.checkLocalStorage();
        });
    }

    getAvatar(id) {
        VK.Api.call('users.get' , { user_id: id, fields: "photo_100" }, (data) => {
            localStorage.setItem('user avatar', data.response[0].photo_100);
            this.checkLocalStorage();
        });   
    }

    checkLocalStorage(id) {
        const avatar  = storage.setAvatar(),
              news    = storage.setNews(),
              friends = storage.setFriends(),
              status  = storage.setStatus();

        if(avatar === null) {
            this.getAvatar(id);
        } else this.setState({ avatar: avatar });

        if(news === null) {
            this.getNews(id);
        } else this.setState({ news: news });

        if(status === null) {
            this.getStatus(id);
        } else this.setState({ status: status });

        if(friends === null) {
            this.getFriends();
        } else this.setState({ friends: friends });
    }

    _handleOnClick(e) {
        const { user, preloadCount } = this.state;
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
            console.log('next!');
            break;
            case 'pagePrev' : value = name;
            console.log('prev!');
            break;
            default : value = null;
        }
    }

    refresh() {
        const { user: { id }, preloadCount } = this.state;
        this.getStatus(id);
        this.getAvatar(id);
        this.getNews(id);
        this.getFriends();
        console.info("updated");
    }
    
    render() {
        const { isRender, user } = this.state;
        const isLoad = isRender && user;
        return(
            <div id="wrapper">
                { !isRender &&
                  <AuthPage onClick={this._handleOnClick} /> 
                }
                { isLoad &&
                  <div className="container-fluid">
                      <div className="row">  
                          <Sidebar   data={this.state} onClick={this._handleOnClick} />
                          <Dashboard data={this.state} onClick={this._handleOnClick} />
                      </div>
                  </div>
                }
            </div>
        );   
    }
};

export default App;