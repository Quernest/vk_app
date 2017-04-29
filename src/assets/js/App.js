import React, { Component } from 'react';
import Sidebar from './components/Sidebar.js';
import Dashboard from './components/Dashboard.js';
import AuthPage from './components/AuthPage.js';

class App extends Component {
    constructor() {
        super();
        this.vk = {
            appID: 5975459,
            appPermissions: 65536+1024+2
        }
        this.state = {
            isRender : false
        };
    }

    componentDidMount() {
        this.init();
        this.login();
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
                this.setState({ user: user, isRender: true });
                VK.Api.call('status.get', { user_id: user.id }, (data) => this.setState({ status: data.response.text }));
                VK.Api.call('users.get' , { user_id: user.id, fields: "photo_100" }, (data) => this.setState({ avatar: data.response[0].photo_100}));
                VK.Api.call('wall.get', { owner_id: user.id }, (data) => this.setState({ wall: data.response }));   
            }
        }
        VK.Auth.login(authInfo, vk.appPermissions);
        this.getFriends();
    }

    logout() {
        VK.Auth.logout();
        alert("Вы вышли.");
        this.setState({ isRender: false });
    }

    access() {
        VK.Auth.getLoginStatus((response) => {
            if(response.session) {
                console.log(response.session);
            }
        })
    }

    getFriends() {
        VK.Api.call('friends.get', { count: 10, order: "hints", fields: 'photo_100, status' }, (data) => {
            this.setState({ friends: data.response });
        });
    }

    addPost() {
        VK.Api.call('wall.post', { message: '123' }, (data) => console.log(data));
    }
    
    render() {
        const {isRender, user, avatar, friends, status, wall} = this.state;
        const isLoad = isRender && avatar && friends && status && wall;
        if(!isLoad) 
            return <AuthPage />
        else {
            return(
                <div className="container-fluid">
                    { isLoad &&
                        <div className="row">  
                            <Sidebar data={this.state} onLogout={this.logout} />
                            <Dashboard onAddPost={this.addPost} wall={wall} />
                        </div>
                    }
                </div>
            );   
        }
    }
};

export default App;