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
import Switch from "react-switch";
import PopupNewUser from '../popups/newUser';
import PopupNewGroup from '../popups/newGroup';
import PopupNewInvite from '../popups/newInvite';
import PopPop from 'react-poppop';
import {Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody,} from 'react-accessible-accordion';
import {PopupboxManager, PopupboxContainer} from 'react-popupbox';
import Notification from '../notification';

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
            show: false,

            //edit user
            showUser: false,
            selected_user: null,
            user_id: null,
            user_name: '',
            user_lastname: '',
            user_username: '',
            user_email: '',
            user_avatar: '',
            user_street: '',
            user_phone: '',
            user_website: '',
            user_biografy: '',
            user_function: '',
            user_date:  '',
            user_city: '',
            user_zipcode: '',
            user_country_id: 1,
            user_twitter: '',
            user_facebook: '',
            user_google: '',
            user_countries: [],

            user_twostep: true,
            user_security: false,
            user_hideInformation: false,
            user_online: false,

            rights_showmore: false,
            right_admin: false,
            right_createMembers: false,
            right_createGroups: false,
            right_createProject: false,
            right_companySettings: false,
            right_avatar: false,
            right_online: false,
            right_data: false,

            //field check
            email_check: true,
            email_message: '',
            firstName_check: '',
            lastName_check: '',
            password_check: '',
            passwordRetype_check: '',
            //success
            updated_message: "",
            updated_message_fail: "",

        };
        //bind

        this.getUsers = this.getUsers.bind(this);
        this.getGroups = this.getGroups.bind(this);
        this.openPopupbox = this.openPopupbox.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkName = this.checkName.bind(this);
        this.checkLastName = this.checkLastName.bind(this);
        this.deleteInvite = this.deleteInvite.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.deleteGroupUser = this.deleteGroupUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
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
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }


    //user
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


    deleteUser(event) {
        if (confirm('Are you sure you want to delete this user?')) {
            axios.post('/api/user/delete', {
                id: event,
            }).then(response => {
                this.setState({
                    users: response.data
                })
            });
        }

    }

    deleteInvite(event) {
        if (confirm('Are you sure you want to delete this invite?')) {
            axios.post('/api/invite/delete', {
                id: event,
            }).then(response => {
                this.setState({
                    invites: response.data
                })
            });
        }
    }

    //groups
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

    deleteGroupUser(group, user) {
        if (confirm('Are you sure you want to delete this user from the group?')) {
            axios.post('/api/group/user/delete', {
                group: group,
                user: user,
            }).then(response => {
                this.setState({
                })
            });
        }

    }

    toggleShow(showUser) {
        this.setState({showUser});
    }


    selectedUser(user) {
        this.setState({
            showUser: true,
            selected_user: user,
            user_name: user.name,
            user_id: user.id,
            user_lastname: user.lastname,
            user_username: user.username,
            user_email: user.email,
            user_avatar: user.avatar,
            user_street: user.street,
            user_phone: user.phone,
            user_website: user.website,
            user_biografy: user.biografy,
            user_function: user.function,
            user_date:  user.birthdate,
            user_city: user.city.name,
            user_zipcode: user.city.zipcode,
            user_country_id: user.city.country_id,
            user_country: user.city.country.name,
            user_twitter: user.twitter,
            user_facebook: user.facebook,
            user_google: user.google,

            //settings
            user_twostep: user.two_step.active,
            user_online: user.online,
            user_hideInformation: user.hide_data,

            rights_showmore: false,
            right_admin: user.admin,
            right_createMembers: user.rights.create_members,
            right_createGroups: user.rights.create_groups,
            right_createProject: user.rights.create_projects,
            right_companySettings: user.rights.company_settings,
            right_avatar: user.rights.upload_avatar,
            right_online: user.rights.change_online,
            right_data: 0,

        });
    }

    //user checks
    checkEmail(e) {
        e.preventDefault();
        if ((this.state.user_email.length < 6) || (this.state.user_email.split('').filter(x => x === '@').length !== 1) || this.state.user_email.indexOf('.') === -1) {
            this.setState({email_message: "Please enter a valid email"});
        } else {
            axios.post('/api/check/email', {
                user_email: this.state.user_email,
            }).then(response => {
                this.setState({
                    email_check: response.data.email_check,
                });

                if (this.state.email_check) {
                    this.setState({
                        email_message: "There is already a member with this e-mail",
                    });
                } else {
                    this.setState({
                        email_message: "",
                    });
                }
            });
        }
    }
    checkName(e) {
        e.preventDefault();
        if(this.state.user_name.length < 2) {
            this.setState({firstName_check: "Name must have at least 2 characters"});
        } else {
            this.setState({firstName_check: ""});
        }
    }

    checkLastName(e) {
        e.preventDefault();
        if(this.state.user_lastname.length < 4) {
            this.setState({lastName_check: "Name must have at least 4 characters"});
        } else {
            this.setState({lastName_check: ""});
        }
    }

    updateUser() {
        let errors = false;
        if ((this.state.user_email.length < 6) || (this.state.user_email.split('').filter(x => x === '@').length !== 1) || this.state.user_email.indexOf('.') === -1) {
            this.setState({email_message: "Please enter a valid email"});
            errors = true;
        } else if (!this.state.email_check) {
            this.setState({email_message: ""});
        }

        if (this.state.user_name.length < 2) {
            this.setState({firstName_check: "Name must have at least 2 characters"});
            errors = true;
        } else {
            this.setState({firstName_check: ""});
        }

        if (this.state.user_lastname.length < 4) {
            this.setState({lastName_check: "Name must have at least 4 characters"});
            errors = true;
        } else {
            this.setState({lastName_check: ""});
        }

        if (true) {
            axios.post('/api/user/edit', {
                user_id: this.state.user_id,
                user_name: this.state.user_name,
                user_lastname: this.state.user_lastname,
                user_username: this.state.user_username,
                user_email: this.state.user_email,
                user_street: this.state.user_street,
                user_phone: this.state.user_phone,
                user_website: this.state.user_website,
                user_biografy: this.state.user_biografy,
                user_function: this.state.user_function,
                user_date: this.state.user_date,
                user_city: this.state.user_city,
                user_zipcode: this.state.user_zipcode,
                user_country: this.state.user_country,
                user_country_id: this.state.user_country_id,
                user_twitter: this.state.user_twitter,
                user_facebook: this.state.user_facebook,
                user_google: this.state.user_google,
                password_new: this.state.password_new,
                selectedGroups: this.state.selectedGroups,

                //settings
                //settings
                user_twostep: this.state.user_twostep,
                user_security: this.state.user_security,
                user_hideInformation: this.state.user_hideInformation,
                user_online: this.state.user_online,

                //rights
                right_admin: this.state.right_admin,
                right_createMembers: this.state.right_createMembers,
                right_createGroups: this.state.right_createGroups,
                right_createProject: this.state.right_createProject,
                right_companySettings: this.state.right_companySettings,
                right_avatar: this.state.right_avatar,
                right_online: this.state.right_online,
                right_data: this.state.right_data,
            }).then(response => {
                this.setState({
                    updated: true,
                    showUser: false,
                    user_name: '',
                    user_lastname: '',
                    user_username: '',
                    user_email: '',
                    user_avatar: '',
                    user_street: '',
                    user_phone: '',
                    user_website: '',
                    user_biografy: '',
                    user_function: '',
                    user_date: '',
                    user_city: '',
                    user_zipcode: '',
                    user_country_id: 1,
                    user_twitter: '',
                    user_facebook: '',
                    user_google: '',

                    //passwords
                    password_new: '',
                    password_retype: '',

                    //settings
                    user_twostep: true,
                    user_security: false,
                    user_hideInformation: false,
                    user_online: false,

                    //rights
                    rights_showmore: false,
                    right_admin: false,
                    right_createMembers: false,
                    right_createGroups: false,
                    right_createProject: false,
                    right_companySettings: false,
                    right_avatar: false,
                    right_online: false,
                    right_data: false,
                });
            });

        }
    }
    render() {
        const {show} = this.state;
        const {showUser} = this.state;

        return (
            <Tabs
                defaultTab="one"
                onChange={(tabId) => { console.log(tabId) }}
            >
                <div id="success" className={this.state.created ? "" : "hidden"}>
                    <Notification  type="success" title="successfully" message="The member is succesfully updated"/>
                </div>
                <TabList>
                    <Tab tabFor="one" className="company-tab">Active members <span className="tag tag-primary">{this.state.users.length}</span> </Tab>
                    {window.Laravel.user.admin || window.Laravel.rights.create_members ? <Tab tabFor="two" className="company-tab">Invited members <span className="tag tag-primary">{this.state.invites.length}</span></Tab> : ""}
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
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                <PulseLoader ClassName="pulse-loader"
                                             sizeUnit={"px"}
                                             color={'#5680e9'}
                                             loading={this.state.isLoading}
                                />
                                {this.state.users.map((user, i) => (
                                    <tr key={i}>
                                        <td><a href={user.username + "/profile/"}>{user.name}</a> {user.id === window.Laravel.user.id ? <span className="tag tag-red">You</span> : ""}</td>
                                        <td><a href={user.username + "/profile/"}>{user.lastname}</a></td>
                                        <td>{user.email}</td>
                                        <td><Timestamp time={user.last_activity} utc={false} precision={1} /></td>
                                        <td>
                                            {(window.Laravel.user.admin && window.Laravel.user.id !== user.id && !user.admin) || (window.Laravel.user.id === window.Laravel.company.owner && window.Laravel.user.id !== user.id) ? <i className="fas fa-edit" onClick={event => this.selectedUser(user)}> </i> : ""}

                                            {(window.Laravel.user.admin && window.Laravel.user.id !== user.id && !user.admin) || (window.Laravel.user.id === window.Laravel.company.owner && window.Laravel.user.id !== user.id)? <i onClick={event => this.deleteUser(user.id)} className="fas fa-trash-alt"> </i> : ""}
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
                <TabPanel tabId="two">
                    {window.Laravel.rights.create_members ? <PopupNewInvite/> : ""}
                    <div className="overflow-auto">
                        <table className="u-full-width">
                            <ProgressBar isLoading={this.state.isLoading}  className="fixed-progress-bar"  color="black" />
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last name</th>
                                <th>Email</th>
                                <th>Invite sends on</th>
                                <th> </th>
                            </tr>
                            </thead>
                            <tbody>
                                <PulseLoader ClassName="pulse-loader"
                                             sizeUnit={"px"}
                                             color={'#5680e9'}
                                             loading={this.state.isLoading}
                                />
                                {this.state.invites.length === 0 ? <p>There are no invites found.</p> : ''}
                                {this.state.invites.map((invite, i) => (
                                    <tr key={i}>
                                        <td>{invite.name}</td>
                                        <td>{invite.lastname}</td>
                                        <td>{invite.email}</td>
                                        <td><Timestamp time={invite.created_at} precision={1} utc={false}/></td>
                                        <td>
                                            {(window.Laravel.user.admin && window.Laravel.user.id !== user.id && !user.admin) || (window.Laravel.user.id === window.Laravel.company.owner && window.Laravel.user.id !== user.id) ? <i onClick={event => this.deleteInvite(invite.id)} className="fas fa-trash-alt"> </i> : ""}
                                            <i onClick={event => this.deleteInvite(invite.id)} className="fas fa-trash-alt"> </i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
                <TabPanel tabId="three">
                    {window.Laravel.rights.create_groups ? <PopupNewGroup/> : ""}
                    <Accordion>
                        {this.state.groups.map((group, i) => (
                            <AccordionItem key={i}>
                                <AccordionItemTitle>
                                    <h5>{group.name}</h5>
                                </AccordionItemTitle>
                                <AccordionItemBody>
                                    <div className="center-text">{group.description}</div>
                                    {group.users.length > 0 ?
                                        <div className="overflow-auto">
                                            <table className="u-full-width">
                                                <ProgressBar isLoading={this.state.isLoading}  className="fixed-progress-bar"  color="black" />
                                                <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Last name</th>
                                                    <th>Email</th>
                                                    <th></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {group.users.map((user, i) => (
                                                    <tr key={i}>
                                                        <td>{user.name}  {group.user_id === user.id ? <span className="tag tag-red">Leader</span> : ""}</td>
                                                        <td>{user.lastname}</td>
                                                        <td>{user.email}</td>
                                                        <td>
                                                            {(window.Laravel.user.admin && window.Laravel.user.id !== user.id && !user.admin) || (window.Laravel.user.id === window.Laravel.company.owner && window.Laravel.user.id !== user.id)  ? <i onClick={event => this.deleteGroupUser(group.id, user.id)} className="fas fa-trash-alt float-right"> </i> : ""}
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        :
                                        <div className="center-text alert alert-red">
                                            There are no members in this group
                                        </div>
                                    }
                                </AccordionItemBody>

                            </AccordionItem>

                        ))}
                    </Accordion>
                </TabPanel>
                <PopPop
                    open={showUser}
                    closeOnEsc={true}
                    onClose={() => this.toggleShow(false)}
                    closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            Modify a member
                            <button className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</button>
                        </div>
                        {this.state.selected_user !== null ?
                            <div className="popup-content">
                                <Tabs
                                    defaultTab="one"
                                    onChange={(tabId) => { tabId}}
                                >
                                    <TabList>
                                        <Tab tabFor="one" className="popup-tab">General</Tab>
                                        <Tab tabFor="two" className="popup-tab">Advanced</Tab>
                                        <Tab tabFor="three" className="popup-tab">Settings</Tab>
                                        <Tab tabFor="four" className="popup-tab popup-tab--rights">Rights</Tab>

                                    </TabList>
                                    <TabPanel tabId="one">
                                        <div className="row">
                                            <div className="six columns">
                                                <label>First name</label>
                                                <div id="red">{this.state.firstName_check}</div>
                                                <input type="text" className={this.state.firstName_check.length > 0 ? "border-red" : ""} onBlur={this.checkName} value={this.state.selected_user.name} onChange={e => this.setState({ user_name: e.target.value })} />
                                            </div>
                                            <div className="six columns">
                                                <label>Last name</label>
                                                <div id="red">{this.state.lastName_check}</div>
                                                <input type="text" className={this.state.lastName_check.length > 0 ? "border-red" : ""} onBlur={this.checkLastName} value={this.state.user_lastname} onChange={e => this.setState({ user_lastname: e.target.value })}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="six columns">
                                                <label>E-mail</label>
                                                <div id="red">{this.state.email_message}</div>
                                                <input type="text" onBlur={this.checkEmail} className={this.state.email_message.length > 0 ? "border-red" : ""} value={this.state.user_email} onChange={e => this.setState({ user_email: e.target.value })}/>
                                            </div>
                                            <div className="six columns">
                                                <label>Function</label>
                                                <input type="text" value={this.state.user_function} onChange={e => this.setState({ user_function: e.target.value })} />
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel tabId="two">
                                        <div className="row">
                                            <div className="six columns">
                                                <label>Username</label>
                                                <input type="text" value={this.state.user_username} className={this.state.email_check  && this.state.email_message.length > 0 ? "border-red" : ""}  onChange={e => this.setState({ user_username: e.target.value })}/>

                                            </div>
                                            <div className="six columns">
                                                <label>Birthdate</label>
                                                <input type="date" value={this.state.user_date} className="u-full-width" onChange={e => this.setState({ user_date: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="six columns">
                                                <label>City</label>
                                                <input type="text" onChange={e => this.setState({ user_city: e.target.value })} value={this.state.user_city} />

                                            </div>
                                            <div className="six columns">
                                                <label>Phone</label>
                                                <input type="text" value={this.state.user_phone} onChange={e => this.setState({ user_phone: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="six columns">
                                                <label>Street</label>
                                                <input type="text" value={this.state.user_street} onChange={e => this.setState({ user_street: e.target.value })} />

                                            </div>
                                            <div className="six columns">
                                                <label>Zipcode</label>
                                                <input type="text" value={this.state.user_zipcode} onChange={e => this.setState({ user_zipcode: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="six columns">
                                                <label>Country</label>
                                                <select  onChange={e => this.setState({ user_country_id: e.target.value })}>
                                                    <option value={this.state.user_country_id} key={0}>{this.state.user_country}</option>
                                                    {this.state.user_countries.map(country => (
                                                        <option value={country.id} key={country.id}>{country.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel tabId="three">
                                        <div className="popup-settings">
                                            <h5>General</h5>
                                            <div>
                                                <input type="checkbox" id="scales" name="feature" onChange={e => this.setState({ user_twostep: !this.state.user_twostep })} checked={this.state.user_twostep} value="scales" />Activate two step authentication by this member
                                            </div>
                                            <div>
                                                <input type="checkbox" id="scales" name="feature" onChange={e => this.setState({ user_hideInformation: !this.state.user_hideInformation })} checked={this.state.user_hideInformation} value="scales" />Hide the member's information on their profile
                                            </div>
                                            <div>
                                                <input type="checkbox" id="scales" name="feature" onChange={e => this.setState({ user_online: !this.state.user_online })} checked={!this.state.user_online} value="scales"/>The online status of the member will be hidden
                                            </div>
                                            <h5>E-mail notifications</h5>
                                            <div>
                                                <input type="checkbox" id="scales" name="feature" onChange={this.checkNewsletter} checked={this.state.newsletter} value="scales" />Member will receive e-mails when he will invited to a new project
                                            </div>
                                            <div>
                                                <input type="checkbox" id="scales" name="feature" onChange={this.checkNewsletter} checked={this.state.newsletter} value="scales" />Member will receive every <input type="number"  min="1" max="30"/> days a overview of the company
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel tabId="four">
                                        <div className="popup-rights">
                                            <div>
                                                <Switch
                                                    // onChange={this.handleChange}
                                                    checked={this.state.right_admin}
                                                    className="react-switch popup-rights--switch"
                                                    onChange={e => this.setState({ right_admin: !this.state.right_admin, right_createMembers: 1,  right_createGroups: 1, right_createProject: 1, right_companySettings: 1, right_avatar: 1, right_online: 1, right_data: 1})}
                                                    id="normal-switch"
                                                /><b>This member is an administration</b>
                                            </div>
                                            <div>
                                                <Switch
                                                    // onChange={this.handleChange}
                                                    checked={this.state.right_createMembers}
                                                    className="react-switch popup-rights--switch"
                                                    onChange={e => this.setState({ right_createMembers: !this.state.right_createMembers })}
                                                    id="normal-switch"
                                                />Member can create new members and invite them
                                            </div>
                                            <div>
                                                <Switch
                                                    // onChange={this.handleChange}
                                                    checked={this.state.right_createGroups}
                                                    className="react-switch popup-rights--switch"
                                                    onChange={e => this.setState({ right_createGroups: !this.state.right_createGroups })}
                                                    id="normal-switch"
                                                />Member can create new groups
                                            </div>
                                            <div>
                                                <Switch
                                                    // onChange={this.handleChange}
                                                    checked={this.state.right_createProject}
                                                    className="react-switch popup-rights--switch"
                                                    id="normal-switch"
                                                    onChange={e => this.setState({ right_createProject: !this.state.right_createProject })}
                                                />Member can create new projects
                                            </div>
                                            <div className={this.state.rights_showmore ? "" : "hidden"}>
                                                <div>
                                                    <Switch
                                                        // onChange={this.handleChange}
                                                        checked={this.state.right_companySettings}
                                                        className="react-switch popup-rights--switch"
                                                        id="normal-switch"
                                                        onChange={e => this.setState({ right_companySettings: !this.state.right_companySettings })}
                                                    />Member can modify the company settings
                                                </div>
                                                <div>
                                                    <Switch
                                                        // onChange={this.handleChange}
                                                        checked={this.state.right_avatar}
                                                        onChange={e => this.setState({ right_avatar: !this.state.right_avatar })}
                                                        className="react-switch popup-rights--switch"
                                                        id="normal-switch"
                                                    />Member can upload an avatar
                                                </div>
                                                <div>
                                                    <Switch
                                                        // onChange={this.handleChange}
                                                        checked={this.state.right_online}
                                                        onChange={e => this.setState({ right_online: !this.state.right_online })}
                                                        className="react-switch popup-rights--switch"
                                                        id="normal-switch"
                                                    />Member can modify the online status
                                                </div>
                                                <div>
                                                    <Switch
                                                        // onChange={this.handleChange}
                                                        checked={this.state.right_data}
                                                        onChange={e => this.setState({ right_data: !this.state.right_data })}
                                                        className="react-switch popup-rights--switch"
                                                        id="normal-switch"
                                                    />Member can modify his personal data (email, first name, last name, street, ...)
                                                </div>
                                            </div>
                                            <button className="no-button popup-rights--more" href="#" onClick={e => this.setState({ rights_showmore: !this.state.rights_showmore })}>...</button>
                                        </div>
                                    </TabPanel>
                                </Tabs>
                                <button className="button-primary button no-button" onClick={this.updateUser}>Save changes</button>
                            </div>
                            : ''}
                        <div className={this.state.isLoading ? "popup-loading" : "hidden"}>
                            <h5>Generating member ...</h5>
                            <ProgressBar isLoading={this.state.isLoading}  cla ssName="fixed-progress-bar" height="10px" color="#5680e9" />
                        </div>
                    </div>
                </PopPop>
            </Tabs>
        );
    }
}

if (document.getElementById('company-users')) {
    ReactDOM.render(<CompanyUsers />, document.getElementById('company-users'));
}
