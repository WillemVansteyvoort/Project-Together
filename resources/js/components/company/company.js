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
import PopupNewUser from '../popups/newUser';
import PopupNewGroup from '../popups/newGroup';
import PopupNewInvite from '../popups/newInvite';
import {Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody,} from 'react-accessible-accordion';
import {PopupboxManager, PopupboxContainer} from 'react-popupbox';
export default class CompanyUsers extends Component {


    constructor(props) {
        super(props)
        this.state = {
            users : [],
            invites: [],
            groups: [],
            selectedGroups: [],
            test: 'ghgh',
            isLoading: true,
            show: false
        };
        //bind

        this.getUsers = this.getUsers.bind(this);
        this.getInvites = this.getInvites.bind(this);
        this.getGroups = this.getGroups.bind(this);
        this.openPopupbox = this.openPopupbox.bind(this);
    }



    addGroup(e) {
        e.preventDefault();
        this.setState({
            selectedGroups: [...e.target.value]
        })
        // e.target.value
    }

    openPopupbox(e) {

    }
    openPopupbox2() {

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
        this.setState({
            selectedGroups: this.state.groups,
        });
    }


    toggleShow(show) {
        this.setState({show});
    }

    render() {
        const {show} = this.state;
        return (
            <Tabs
                defaultTab="one"
                onChange={(tabId) => { console.log(tabId) }}
            >
                <TabList>
                    <Tab tabFor="one" className="company-tab">Active members <span className="tag tag-primary">{this.state.users.length}</span> </Tab>
                    <Tab tabFor="two" className="company-tab">Invited members <span className="tag tag-primary">{this.state.invites.length}</span></Tab>
                    <Tab tabFor="three" className="company-tab">Groups</Tab>

                </TabList>
                <TabPanel tabId="one">
                    {window.Laravel.rights.create_members ? <PopupNewUser/> : ""}
                    <div className="overflow-auto">
                        <table className="u-full-width">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last name</th>
                                <th>E-mail</th>
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
                                    <td>{user.name} {user.id === window.Laravel.user.id ? <span className="tag tag-red">You</span> : ""}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td><Timestamp time={user.last_activity} utc={false} precision={1} /></td>
                                </tr>

                            ))}
                        </table>
                    </div>
                </TabPanel>
                <TabPanel tabId="two">
                    <PopupNewInvite/>
                    <div className="overflow-auto">
                        <table className="u-full-width">
                            <ProgressBar isLoading={this.state.isLoading}  className="fixed-progress-bar"  color="black" />
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last name</th>
                                <th>Email</th>
                                <th>Invite sends on</th>
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
                                    <td>{invite.lastname}</td>
                                    <td>{invite.email}</td>
                                    <td><Timestamp time={invite.created_at} precision={1} /></td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </TabPanel>
                <TabPanel tabId="three">
                    <PopupNewGroup/>
                    <Accordion>
                    {this.state.groups.map(group => (
                            <AccordionItem>
                                <AccordionItemTitle>
                                    <h5>{group.name}</h5>
                                </AccordionItemTitle>
                                <AccordionItemBody>
                                    {group.users.length > 0 ?
                                        <div className="overflow-auto">
                                            <table className="u-full-width">
                                                <ProgressBar isLoading={this.state.isLoading}  className="fixed-progress-bar"  color="black" />
                                                <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Last name</th>
                                                    <th>Email</th>
                                                </tr>
                                                </thead>
                                                {group.users.map(user => (
                                                    <tr>
                                                        <td>{user.name}  {group.user_id === user.id ? <span className="tag tag-red">Leader</span> : ""}</td>
                                                        <td>{user.lastname}</td>
                                                        <td>{user.email}</td>
                                                    </tr>
                                                ))}
                                            </table>
                                        </div>
                                        :
                                        <div className="center-text">
                                            There are no members in this group
                                        </div>
                                    }
                                </AccordionItemBody>

                            </AccordionItem>

                    ))}
                    </Accordion>
                </TabPanel>
            </Tabs>
        );
    }
}

if (document.getElementById('company-users')) {
    ReactDOM.render(<CompanyUsers />, document.getElementById('company-users'));
}
