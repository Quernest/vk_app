import React, { Component } from 'react';
import Sidebar from './components/Sidebar.js';
import Dashboard from './components/Dashboard.js';

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
        this.getFriends();
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
                const user = response.session.user;
                if(user) {
                    this.setState({ isRender : true });
                    this.setState({ user : user });
                }
                VK.Api.call('status.get', { user_id: user.id }, (data) => this.setState({ status: data.response.text }));
                VK.Api.call('users.get' , { user_id: user.id, fields: "photo_100" }, (data) => this.setState({ avatar: data.response[0].photo_100}));   
            }
        }
        VK.Auth.login(authInfo, vk.appPermissions);
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
        const data = this.state;
        return(
            <div className="container-fluid">
                { data.isRender && data.user && data.avatar && data.friends && data.status &&
                    <div className="row">  
                        <Sidebar data={data} />
                        <Dashboard actions={this.addPost} />
                    </div>
                }
            </div>
        );
    }
};

export default App;