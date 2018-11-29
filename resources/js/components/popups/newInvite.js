import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import PopPop from 'react-poppop';
import ReactPasswordStrength from '@rodrigowpl/react-password-strength';
import { ProgressBar } from 'reprogressbars';
import Switch from "react-switch";
export default class PopupNewInvite extends Component {


    constructor(props) {
        super(props)
        this.state = {
            groups: [],
            allGroups: [],
            selectedGroups: [],
            selectedGroupsId: [],
            group: '',
            groupId: 0,
            show: false,
            countries: [],

            //users credentials
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

            //field check
            email_check: true,
            email_message: '',
            emailInvite_check: true,
            emailInvite_message: '',

            firstName_check: '',
            lastName_check: '',
            //success
            updated: false,
            updated_message: "",
            isLoading: false,

          //invites
            invite_endData: false,
            endData: '',
            invite_messagePopup: false,
            invite_costumMessage: false,
            costumMessage: '',

            //rights
            rights_showmore: false,
            right_admin: 0,
            right_createMembers: 0,
            right_createGroups: 0,
            right_createProject: 0,
            right_companySettings: 0,
            right_avatar: 0,
            right_online: 0,
            right_data: 0,

        };
        //bind

        this.getGroups = this.getGroups.bind(this);
        this.addGroup = this.addGroup.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
        this.getCountries = this.getCountries.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.makeInvite = this.makeInvite.bind(this);
        this.checkName = this.checkName.bind(this);
        this.checkLastName = this.checkLastName.bind(this);
    }


    removeGroup() {
        this.setState(selectedGroups => {
            const test = selectedGroups.filter(selectedGroups === "Administrator");
            return { test };
        });
    }

    addGroup(e) {
        e.preventDefault();


        const index = this.state.groups.findIndex(value => value.name === this.state.group);

        this.state.groups.splice(index, 1);

        this.setState({
            selectedGroups: [...this.state.selectedGroups, this.state.group]
        })


    }


    componentWillMount() {
        this.getGroups();
        this.getCountries();

    }

    componentDidMount() {
        // this.interval =  setInterval(() => this.getUsers(), 30000);
    }

    componentWillUnmount() {
        // clearInterval(this.interval);
    }

    //get information
    getGroups() {
        axios.get('/api/company/groups').then((
            response
            ) =>
                this.setState({
                    groups: response.data,
                    allGroups: response.data
                })
        );
        this.setState({
            isLoading: false,
        });
    }
    getCountries() {
        axios.get('/api/countries').then((
            response
            ) =>
                this.setState({
                    countries: response.data
                })
        );
    }

    //check information
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

                if(this.state.email_check) {
                    this.setState({
                        email_message: "There is already a member with this e-mail",
                    });
                } else {
                    this.setState({
                        email_message: "",
                    });
                }
            });

            axios.post('/api/invite/email', {
                user_email: this.state.user_email,
            }).then(response => {
                this.setState({
                    emailInvite_check: response.data.email_check,
                });

                if(this.state.emailInvite_check) {
                    this.setState({
                        emailInvite_message: "Attention, an invitation has already been sent to this e-mail",
                    });
                } else {
                    this.setState({
                        emailInvite_message: "",
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
    //make controllrs
    makeInvite() {
        let errors = false;

        if ((this.state.user_email.length < 6) || (this.state.user_email.split('').filter(x => x === '@').length !== 1) || this.state.user_email.indexOf('.') === -1) {
            this.setState({email_message: "Please enter a valid email"});
            errors = true;
        } else if(!this.state.email_check){
            this.setState({email_message: ""});
        }

        if(this.state.user_name.length < 2) {
            this.setState({firstName_check: "Name must have at least 2 characters"});
            errors = true;
        } else {
            this.setState({firstName_check: ""});
        }

        if(this.state.user_lastname.length < 4) {
            this.setState({lastName_check: "Name must have at least 4 characters"});
            errors = true;
        } else {
            this.setState({lastName_check: ""});
        }

        if(!errors) {
            this.setState({
                isLoading: true
            });
            axios.post('/api/invite/new', {
                endData: this.state.endData,
                costumMessage: this.state.costumMessage,
                user_name: this.state.user_name,
                user_lastname: this.state.user_lastname,
                user_username: this.state.user_username,
                user_email: this.state.user_email,
                user_street:  this.state.user_street,
                user_phone:  this.state.user_phone,
                user_website: this.state.user_website,
                user_biografy: this.state.user_biografy,
                user_function: this.state.user_function,
                user_date:  this.state.user_date,
                user_city: this.state.user_city,
                user_zipcode: this.state.user_zipcode,
                user_country: this.state.user_country,
                user_country_id: this.state.user_country_id,
                user_twitter: this.state.user_twitter,
                user_facebook: this.state.user_facebook,
                user_google: this.state.user_google,
                password_new: this.state.password_new,
                selectedGroups: this.state.selectedGroups,

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
                    isLoading: false,
                    updated: true,
                    updated_message: 'The invitation has been sent successfully',
                    selectedGroups: [],
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
                    endData: '',
                    costumMessage: '',
                    invite_costumMessage: false,
                    invite_endData: false,
                    rights_showmore: false,
                    right_admin: 0,
                    right_createMembers: 0,
                    right_createGroups: 0,
                    right_createProject: 0,
                    right_companySettings: 0,
                    right_avatar: 0,
                    right_online: 0,
                    right_data: 0,
                });
            });
            this.getGroups;
        }

    }



    //popup
    toggleShow(show) {
        this.setState({show});
    }

    render() {
        const {show} = this.state;
        return (
            <div>
                <button onClick={() => this.toggleShow(true)} className="button-primary button no-button"><i className="fas fa-plus"> </i> New invite</button>
                <PopPop
                    open={show}
                    closeOnEsc={true}
                    onClose={() => this.toggleShow(false)}
                    closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            Make a new invite
                            <a className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</a>
                        </div>
                        <div className="popup-content">
                            <Tabs
                                defaultTab="one"
                                onChange={(tabId) => { tabId}}
                            >
                                <TabList>
                                    <Tab tabFor="one" className="popup-tab">General</Tab>
                                    <Tab tabFor="two" className="popup-tab">Advanced</Tab>
                                    <Tab tabFor="three" className="popup-tab">Groups</Tab>
                                    <Tab tabFor="five" className="popup-tab popup-tab--rights">Rights</Tab>
                                </TabList>
                                <div className={this.state.updated ? "alert alert-green center-text" : "hidden"}>{this.state.updated_message}
                                <a className="float-right"  onClick={() => this.setState({ updated: false })}>✕</a>
                                    <div className="clear"> </div>
                                </div>
                                <div className={!this.state.isLoading ? "" : "hidden"}>
                                    <TabPanel tabId="one">
                                        <h5>Member information</h5>
                                        <div className="row">
                                            <div className="six columns">
                                                <label>First name</label>
                                                <div id="red">{this.state.firstName_check}</div>
                                                <input type="text" onBlur={this.checkName} className={this.state.firstName_check.length > 0 ? "border-red" : ""} value={this.state.user_name} onChange={e => this.setState({ user_name: e.target.value })} />
                                            </div>
                                            <div className="six columns">
                                                <label>Last name</label>
                                                <div id="red">{this.state.lastName_check}</div>
                                                <input type="text" className={this.state.lastName_check.length > 0 ? "border-red" : ""} onBlur={this.checkLastName} value={this.state.user_lastname} onChange={e => this.setState({ user_lastname: e.target.value })}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="twelve columns">
                                                <label>E-mail</label>
                                                <div id="red">{this.state.email_message} {this.state.emailInvite_message}</div>
                                                <input type="text" value={this.state.user_email} className={this.state.email_check  && this.state.email_message.length > 0 ? "border-red" : ""} onBlur={this.checkEmail}   onChange={e => this.setState({ user_email: e.target.value })}/>
                                            </div>
                                        </div>
                                        <h5>Invite settings</h5>
                                        <Switch
                                            // onChange={this.handleChange}
                                            checked={this.state.invite_endData}
                                            className="react-switch popup-rights--switch"
                                            onChange={e => this.setState({ invite_endData: !this.state.invite_endData })}
                                            id="normal-switch"
                                        />
                                        {this.state.invite_endData ? <span>Select a end date: <input type="datetime-local" onChange={e => this.setState({ endData: e.target.value })} /></span> : "invite is unlimited and hasn't have a end date"}
                                        <div>
                                            <Switch
                                                // onChange={this.handleChange}
                                                checked={this.state.invite_costumMessage}
                                                className="react-switch popup-rights--switch"
                                                onChange={e => this.setState({ invite_costumMessage: !this.state.invite_costumMessage, invite_messagePopup: true })}
                                                id="normal-switch"
                                            />
                                            {this.state.invite_costumMessage ? "Send a costum message to the invited member" : "Send the standard message to the invited member"}

                                        </div>
                                    </TabPanel>
                                    <TabPanel tabId="two">
                                        <div className="row">
                                            <div className="six columns">
                                                <label>Username</label>
                                                <div id="red">{this.state.email_message}</div>
                                                <input type="text" value={this.state.user_username} onChange={e => this.setState({ user_username: e.target.value })}/>

                                            </div>
                                            <div className="six columns">
                                                <label>Birthdate</label>
                                                <input type="date" className="u-full-width" value={this.state.user_date} onChange={e => this.setState({ user_date: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="six columns">
                                                <label>City</label>
                                                <input type="text" value={this.state.user_city} onChange={e => this.setState({ user_city: e.target.value })} />

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
                                                    {this.state.countries.map(country => (
                                                        <option value={country.id} key={country.id}>{country.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="six columns">
                                                <label>Function</label>
                                                <input type="text" value={this.state.user_function} onChange={e => this.setState({ user_function: e.target.value })} />
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel tabId="three">
                                        <div className="popup-groups">
                                            <h5>Groups</h5>
                                            {this.state.selectedGroups.length <= 0 ? <div id="red">No groups selected</div> : ""}
                                            {this.state.selectedGroups.map(selectGroup => (
                                                <li className="groups-dark">{selectGroup}</li>
                                            ))}
                                        </div>
                                        <div className="popup-addGroup">
                                            <form onSubmit={this.addGroup}>
                                                <select required={true} className="popup-addGroup--input"  onClick={e => this.setState({ group: e.target.value })}>
                                                    <option key="0"> </option>
                                                    {this.state.groups.map(group => (
                                                        <option   key={group.id} value={group.name}>{group.name}</option>
                                                    ))}
                                                </select>
                                                <input type="submit" value="Add group" />
                                            </form>
                                        </div>
                                    </TabPanel>
                                    <TabPanel tabId="five">
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
                                </div>
                            </Tabs>
                            <button className="button-primary button no-button" onClick={this.makeInvite}>Create invite</button>
                        </div>
                        <div className={this.state.isLoading ? "popup-loading" : "hidden"}>
                            <h5>Generating invitation ...</h5>
                            <ProgressBar isLoading={this.state.isLoading}  cla ssName="fixed-progress-bar" height="10px" color="#5680e9" />
                        </div>
                    </div>
                    <PopPop
                        open={this.state.invite_messagePopup}
                        closeOnEsc={true}
                        onClose={() => this.setState({ invite_messagePopup: !this.state.invite_messagePopup, invite_costumMessage: false })}
                        closeOnOverlay={true}>
                        <div className="popup popup-message">
                            <div className="popup-titleBar">
                                Costum welcome message
                                <button className="popup-btn--close"  onClick={() => this.setState({ invite_messagePopup: !this.state.invite_messagePopup })}>✕</button>
                            </div>
                            <div className="popup-content">
                                <label>Message</label>
                                <textarea onChange={e => this.setState({ costumMessage: e.target.value})}></textarea>
                                <button className="float-left button button-red no-button"  onClick={() => this.setState({ invite_messagePopup: false, invite_costumMessage: false })}>Cancel</button>
                                <button className="float-right button button-primary no-button" onClick={() => this.setState({ invite_messagePopup: false })}>Save</button>

                            </div>
                        </div>
                    </PopPop>
                </PopPop>
            </div>
        );
    }
}

if (document.getElementById('popup-newInvite')) {
    ReactDOM.render(<PopupNewInvite />, document.getElementById('popup-newInvite'));
}
