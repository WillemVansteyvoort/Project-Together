import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { css } from 'react-emotion';
import { ProgressBar } from 'reprogressbars';
const Timestamp = require('react-timestamp');
import ClipLoader from 'react-spinners/ClipLoader';
import PulseLoader from 'react-spinners/PulseLoader';
import {PopupboxManager, PopupboxContainer} from 'react-popupbox';
export default class CompanyUsers extends Component {


    constructor(props) {
        super(props)
        this.state = {
            users : [],
            invites: [],
            groups: [],
            isLoading: true,
        };
        //bind

        this.getUsers = this.getUsers.bind(this);
        this.getInvites = this.getInvites.bind(this);
        this.getGroups = this.getGroups.bind(this);
    }

    openPopupbox() {
        let content =(
            <div>
            <Tabs
                defaultTab="one"
                onChange={(tabId) => { console.log(tabId) }}
            >
                <TabList>
                    <Tab tabFor="one" className="popup-tab">General</Tab>
                    <Tab tabFor="two" className="popup-tab">Groups</Tab>
                    <Tab tabFor="three" className="popup-tab">Settings</Tab>
                </TabList>
                <TabPanel tabId="one">
                    <div className="row">
                        <div className="six columns">
                            <label>Name</label>
                            <input type="text" />

                        </div>
                        <div className="six columns">
                            <label>Email</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="six columns">
                            <label>Username</label>
                            <input type="text" />

                        </div>
                        <div className="six columns">
                            <label>Phone</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="six columns">
                            <label>City</label>
                            <input type="text" />

                        </div>
                        <div className="six columns">
                            <label>Function</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="six columns">
                            <label>Street</label>
                            <input type="text" />

                        </div>
                        <div className="six columns">
                            <label>Country</label>
                            <select>
                                <option>Belgium</option>
                                <option>France</option>
                            </select>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel tabId="two">

                </TabPanel>
                <TabPanel tabId="three">
                    <p>Tab 3 content</p>
                </TabPanel>
            </Tabs>
                <div className="float-left">
                    <a className="button-primary button float-left">Make user</a>
                </div>
            </div>
        )
        PopupboxManager.open({
            content,
            config: {
                titleBar: {
                    enable: true,
                    text: 'Send a invite'
                },
                fadeIn: true,
                fadeInSpeed: 500
            }
        })
    }
    openPopupbox2() {
        const content =(
            <div>test</div>
        )
        PopupboxManager.open({
            content,
            config: {
                titleBar: {
                    enable: true,
                    text: 'Meow!'
                },
                fadeIn: true,
                fadeInSpeed: 500
            }
        })
    }
    componentWillMount() {
        this.getUsers();
        this.getInvites();
        this.getGroups();
    }

    componentDidMount() {
        this.interval =  setInterval(() => this.getUsers(), 30000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    getUsers() {
        axios.get('/api/company/users').then((
            response
            ) =>
                this.setState({
                    users: response.data,
                    isLoading: false,
                })
        );
    }

    getInvites() {
        axios.get('/api/company/invites').then((
            response
            ) =>
                this.setState({
                    invites: response.data,
                })
        );

        return (
            <div>
                {this.state.users.map(user => (
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>Admin</td>
                        <td><Timestamp time={user.last_activity} precision={3} /></td>
                    </tr>

                ))}
            </div>
        )
    }

    getGroups() {
        axios.get('/api/company/groups').then((
            response
            ) =>
                this.setState({
                    groups: response.data,
                })
        );
    }



    render() {
        return (
            <Tabs
                defaultTab="one"
                onChange={(tabId) => { console.log(tabId) }}
            >
                <TabList>
                    <Tab tabFor="one" className="company-tab">Active users <span className="tag tag-primary">{this.state.users.length}</span> </Tab>
                    <Tab tabFor="two" className="company-tab">Invited users <span className="tag tag-primary">{this.state.invites.length}</span></Tab>
                    <Tab tabFor="three" className="company-tab">Groups</Tab>

                </TabList>
                <TabPanel tabId="one">
                    <PopupboxContainer />
                    <div onClick={this.openPopupbox} className="button-primary button"><i className="fas fa-plus"> </i> New user</div>

                    <table className="u-full-width">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Group</th>
                            <th>Last activity</th>
                        </tr>
                        </thead>
                        <PulseLoader ClassName="pulse-loader"
                            sizeUnit={"px"}
                            color={'#5680e9'}
                            loading={this.state.isLoading}
                        />
                        {this.state.users.map(user => (
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>Admin</td>
                                <td><Timestamp time={user.last_activity} precision={3} /></td>
                            </tr>

                        ))}
                    </table>
                </TabPanel>
                <TabPanel tabId="two">
                    <div onClick={this.openPopupbox} className="button-primary button"><i className="fas fa-plus"> </i> Send a new invite</div>
                    <table className="u-full-width">
                        <ProgressBar isLoading={this.state.isLoading}  className="fixed-progress-bar"  color="black" />
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Group</th>
                            <th>Last activity</th>
                        </tr>
                        </thead>
                        <PulseLoader ClassName="pulse-loader"
                                     sizeUnit={"px"}
                                     color={'#5680e9'}
                                     loading={this.state.isLoading}
                        />
                        {this.state.invites.length === 0 ? <p>There are no invites found.</p> : ''}
                        {this.state.invites.map(invite => (
                            <tr>
                                <td>{invite.name}</td>
                                <td>{invite.email}</td>
                                <td>Admin</td>
                                <td></td>
                            </tr>

                        ))}
                    </table>
                </TabPanel>
                <TabPanel tabId="three">
                </TabPanel>
            </Tabs>
        );
    }
}

if (document.getElementById('company-users')) {
    ReactDOM.render(<CompanyUsers />, document.getElementById('company-users'));
}
