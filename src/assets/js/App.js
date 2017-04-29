import React, { Component } from 'react';
import Sidebar from './components/Sidebar.js';
import Dashboard from './components/Dashboard.js';

class App extends Component {
    constructor() {
        super();
        this.vk = {
            data : {},
            appID: 5975459,
            appPermissions: 65536
        }
        this.state = {}
    }

    componentWillMount() {
        this.init();
        this.login();
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
                this.setState({ 
                    user: user 
                });        
            }
        }
        VK.Auth.login(authInfo, vk.appPermissions);
    }
    
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <Sidebar data={this.state.user} />
                    <Dashboard />
                </div>
            </div>
        );
    }
};

export default App;