import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import PopPop from 'react-poppop';
import ReactPasswordStrength from '@rodrigowpl/react-password-strength';
import { ProgressBar } from 'reprogressbars';
import Switch from "react-switch";
export default class PopupNewUser extends Component {


    constructor(props) {
        super(props)
        this.state = {
            groups: [],
            selectedGroups: [],
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

            //passwords
            password_new: '',
            password_retype: '',

            //field check
            email_check: true,
            email_message: '',
            firstName_check: '',
            lastName_check: '',
            password_check: '',
            passwordRetype_check: '',
            //success
            updated: false,
            updated_message: "",
            updated_message_fail: "",
            isLoading: false,

            //settings
            user_twostep: 1,
            user_security: 0,
            user_hideInformation: 0,
            user_online: 0,

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
        this.checkName = this.checkName.bind(this);
        this.checkLastName = this.checkLastName.bind(this);
        this.makeUser = this.makeUser.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.checkPasswordRetype = this.checkPasswordRetype.bind(this);
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

    checkPassword(e) {
        e.preventDefault();
        if(this.state.password_new.length <= 8) {
            this.setState({password_check: "Password must have at least 8 characters"});
        } else {
            this.setState({password_check: ""});
        }
    }

    checkPasswordRetype(e) {
        e.preventDefault();
        if(this.state.password_new === this.state.password_retype) {
            this.setState({passwordRetype_check: ""});
        } else {
            this.setState({passwordRetype_check: "Passwords do not match"});
        }
    }

    //make controllrs
    makeUser() {
        let errors = false;

        if(window.Laravel.company.users >= window.Laravel.plan.users) {
            errors = true;
            this.setState({updated_message_fail: "You have reached the limit number of members. Expand your plan or delete a member."});
        } else {
            this.setState({updated_message_fail: ""});

        }
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

        if(this.state.password_new.length <= 8) {
            this.setState({password_check: "Password must have at least 8 characters"});
            errors = true;
        } else {
            this.setState({password_check: ""});
        }
        if(this.state.password_new === this.state.password_retype) {
            this.setState({passwordRetype_check: ""});
        } else {
            errors = true;
            this.setState({passwordRetype_check: "Passwords do not match"});
        }
        if(!errors && !this.state.email_check) {
            this.setState({
                isLoading: true
            });
            axios.post('/api/user/new', {
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
                    isLoading: false,
                    updated: true,
                    updated_message: 'The member has been successfully registered and has now access to the company',
                });
            });
            this.setState({
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

                //passwords
                password_new: '',
                password_retype: '',

                //settings
                user_twostep: 1,
                user_security: 0,
                user_hideInformation: 0,
                user_online: 0,

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
            });
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
                <button onClick={() => this.toggleShow(true)} className="button-primary button no-button"><i className="fas fa-plus"> </i> New member</button>
                <PopPop
                    open={show}
                    closeOnEsc={true}
                    onClose={() => this.toggleShow(false)}
                    closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            Make a new member
                            <button className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</button>
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
                                    <Tab tabFor="four" className="popup-tab">Settings</Tab>
                                    <Tab tabFor="five" className="popup-tab popup-tab--rights">Rights</Tab>

                                </TabList>
                                {this.state.updated ?  <div className="alert alert-green center-text">{this.state.updated_message}
                                    <a className="float-right"  onClick={() => this.setState({ updated: false })}>✕</a>
                                    <div className="clear"> </div>
                                </div> : ""}
                                {this.state.updated_message_fail.length > 0 ? <div className="alert alert-red center-text">{this.state.updated_message_fail}
                                    <a className="float-right"  onClick={() => this.setState({ updated_message_fail: "" })}>✕</a>
                                    <div className="clear"> </div>
                                </div> : ""}
                                <div className={!this.state.isLoading ? "" : "hidden"}>
                                    <TabPanel tabId="one">
                                        <div className="row">
                                            <div className="six columns">
                                                <label>First name</label>
                                                <div id="red">{this.state.firstName_check}</div>
                                                <input type="text" className={this.state.firstName_check.length > 0 ? "border-red" : ""} onBlur={this.checkName} value={this.state.user_name} onChange={e => this.setState({ user_name: e.target.value })} />                                        </div>
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
                                        <h5>Password</h5>
                                        <div className="row">
                                            <div className="six columns">
                                                <label>Password</label>
                                                <div id="red">{this.state.password_check}</div>
                                                <input type="password"  className={this.state.password_check.length > 0 ? "border-red u-full-width" : "u-full-width"} value={this.state.password_new} onBlur={this.checkPassword} onChange={e => this.setState({ password_new: e.target.value })}/>
                                                <div className={this.state.password_new.length > 0 ? "display-block" : "display-none"}>
                                                    <ReactPasswordStrength
                                                        passwordValue={this.state.password_new}
                                                    />
                                                </div>
                                            </div>
                                            <div className="six columns">
                                                <label>Re-type password</label>
                                                <div id="red">{this.state.passwordRetype_check}</div>
                                                <input type="password"  className={this.state.passwordRetype_check.length > 0 ? "border-red u-full-width" : "u-full-width"} value={this.state.password_retype} onBlur={this.checkPasswordRetype} onChange={e => this.setState({ password_retype: e.target.value })} />
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel tabId="two">
                                        <div className="row">
                                            <div className="six columns">
                                                <label>Username</label>
                                                <div id="red">{this.state.email_message}</div>
                                                <input type="text" className={this.state.email_check  && this.state.email_message.length > 0 ? "border-red" : ""} onBlur={this.checkEmail} onChange={e => this.setState({ user_username: e.target.value })}/>

                                            </div>
                                            <div className="six columns">
                                                <label>Birthdate</label>
                                                <input type="text" onChange={e => this.setState({ user_date: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="six columns">
                                                <label>City</label>
                                                <input type="text" onChange={e => this.setState({ user_city: e.target.value })} />

                                            </div>
                                            <div className="six columns">
                                                <label>Phone</label>
                                                <input type="text" onChange={e => this.setState({ user_phone: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="six columns">
                                                <label>Street</label>
                                                <input type="text" onChange={e => this.setState({ user_street: e.target.value })} />

                                            </div>
                                            <div className="six columns">
                                                <label>Zipcode</label>
                                                <input type="text" onChange={e => this.setState({ user_zipcode: e.target.value })} />
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
                                    <TabPanel tabId="four">
                                        <div className="popup-settings">
                                            <h5>General</h5>
                                            <div>
                                                <input type="checkbox" id="scales" name="feature" onChange={e => this.setState({ user_twostep: !this.state.user_twostep })} checked={this.state.user_twostep} value="scales" />Activate two step authentication by this member
                                            </div>
                                            <div>
                                                <input type="checkbox" id="scales" name="feature"  onChange={e => this.setState({ user_security: !this.state.user_security })} checked={this.state.user_security} value="scales"/>Member will receive an email when someone access his account
                                            </div>
                                            <div>
                                                <input type="checkbox" id="scales" name="feature" onChange={e => this.setState({ user_hideInformation: !this.state.user_hideInformation })} checked={this.state.user_hideInformation} value="scales" />Hide the member's information on their profile
                                            </div>
                                            <div>
                                                <input type="checkbox" id="scales" name="feature" onChange={e => this.setState({ user_online: !this.state.user_online })} checked={this.state.user_online} value="scales"/>The online status of the member will be hidden
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
                            <button className="button-primary button no-button" onClick={this.makeUser}>Create member</button>
                        </div>
                        <div className={this.state.isLoading ? "popup-loading" : "hidden"}>
                            <h5>Generating member ...</h5>
                            <ProgressBar isLoading={this.state.isLoading}  cla ssName="fixed-progress-bar" height="10px" color="#5680e9" />
                        </div>
                    </div>
                </PopPop>
            </div>
        );
    }
}

if (document.getElementById('popup-newUser')) {
    ReactDOM.render(<PopupNewUser />, document.getElementById('popup-newUser'));
}
