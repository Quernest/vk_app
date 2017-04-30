import React, { Component } from 'react';
import Sidebar from './components/Sidebar.js';
import Dashboard from './components/Dashboard.js';
import AuthPage from './components/AuthPage.js';

class App extends Component {
    constructor() {
        super();
        this.vk = {
            appID: 5975459,
            appPermissions: 65536+1024+2+8192
        }
        this.state = { isRender: false };
        this._handleOnClick = this._handleOnClick.bind(this);
    }

    componentDidMount() {
        this.init();
        this.access();
    }

    init() {
        const { appID } = this.vk;
        VK.init({ apiId: appID });
        console.info("API initialisation successful");
    }

    login() {
        const vk = this.vk;
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
        this.setState({ isRender: false });
    }

    access() {
        VK.Auth.getLoginStatus((response) => {
            if(response.status === 'connected' && response.session) {
                this.login();
            }
        })
    }

    getFriends() {
        VK.Api.call('friends.get', { count: 15, order: "hints", fields: 'photo_100, status' }, (data) => {
            localStorage.setItem("user friends", JSON.stringify(data.response));
        });
    }

    getNews(id) {
        VK.Api.call('newsfeed.get', { filters: "post,photo", count: 10 }, (data) => {
            localStorage.setItem("user news", JSON.stringify(data.response));
            console.log("news ", data.response);
        });
    }

    getStatus(id) {
        VK.Api.call('status.get', { user_id: id }, (data) => localStorage.setItem('user status', data.response.text));
    }

    getAvatar(id) {
        VK.Api.call('users.get' , { user_id: id, fields: "photo_100" }, (data) => localStorage.setItem('user avatar', data.response[0].photo_100));
    }

    addPost() {
        VK.Api.call('wall.post', { message: '123' }, (data) => console.log(data));
    }

    checkLocalStorage(id) {
        if(localStorage.getItem("user status") === null) {
            this.getStatus(id);
        }
        if(localStorage.getItem("user avatar") === null) {
            this.getAvatar(id);
        }
        if(localStorage.getItem("user news") === null || undefined) {
            this.getNews(id);
        }
        if(localStorage.getItem("user friends") === null) {
            this.getFriends();
        }
    }

    _handleOnClick(e) {
        e.preventDefault();
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
            default : value = null;
        }
    }

    refresh() {
        const { user } = this.state;
        this.getFriends();
        this.getStatus(user.id);
        this.getAvatar(user.id);
        this.getNews(user.id);
        this.setState({ refresh: true });
        console.info("updated");
    }
    
    render() {
        const { isRender, user } = this.state;
        const isLoad = isRender && user;
        return(
            <div className="container-fluid">
                { !isRender &&
                    <AuthPage onClick={this._handleOnClick} /> 
                }
                { isLoad &&
                    <div className="row">  
                        <Sidebar data={this.state} onClick={this._handleOnClick} />
                        <Dashboard data={this.state} onAddPost={this.addPost} onClick={this._handleOnClick} />
                    </div>
                }
            </div>
        );   
    }
};

export default App;