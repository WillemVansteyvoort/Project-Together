import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import PopPop from 'react-poppop';
const Timestamp = require('react-timestamp');
import 'react-notifications/lib/notifications.css';
import Notification from './notification';
import FileUploader from './others/fileUploader';
export default class TabsAccount extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //user info
            user_name: window.Laravel.user.name,
            user_lastname: window.Laravel.user.lastname,
            user_username: window.Laravel.user.username,
            user_email: window.Laravel.user.email,
            user_avatar: window.Laravel.user.avatar,
            user_street: window.Laravel.user.street,
            user_phone: window.Laravel.user.phone,
            user_website: window.Laravel.user.website,
            user_biografy: window.Laravel.user.biografy,
            user_function: window.Laravel.user.function,
            user_date:  window.Laravel.user.date,
            user_city: window.Laravel.user.city,
            user_zipcode: window.Laravel.user.zipcode,
            user_country_id: window.Laravel.user.country_id,
            user_twitter: window.Laravel.user.twitter,
            user_facebook: window.Laravel.user.facebook,
            user_google: window.Laravel.user.google,
            user_online: window.Laravel.user.online,
            user_data: window.Laravel.user.hide_data,
            user_notifications: window.Laravel.user.user_notifications,
            logs: [],
            //notifications
            profile: false,
            profile_timer: 0,
            settings: false,
            settings_timer: 0,
            password: false,
            password_timer: 0,
            //mail
            mail_invites: window.Laravel.user.invites,
            mail_sessions: window.Laravel.user.sessions,
            mail_notifications: window.Laravel.user.notifications,
            mail_overview: window.Laravel.user.overview,
            //overig
            countries: [],

            //avatar
            image: ' ',
            uploaded: false,
            message: '',
            //rights
            right_avatar: window.Laravel.user.upload_avatar,

            //verifies
            errors_email: false,
            errors_name: false,
            errors_lastname: false,

            //messages
            email_message: '',
            name_message: '',
            lastname_message: '',

            //two step authentication
            two_step: window.Laravel.user.two_step,
            two_step_email: window.Laravel.two_step.email,
            two_step_phone: window.Laravel.two_step.phone,
            two_step_code: "",
            two_step_popup: false,
            two_step_send: false,
            two_step_message: "",
            two_step_correct: 0,
            two_step_enable_phone: window.Laravel.two_step.enable_phone,

            //password tab
            password_old: '',
            password_new: '',
            password_checkNew: '',
            password_errors: false,
            password_message: '',
            password_compare: true,


            //stats
            userProjects: '',
            totalProjects: '',
            totalNotifications: '',
            totalActivities: '',
            memberSince: '',
            totalEvents: '',

        };
        //bind
        this.getCountries = this.getCountries.bind(this);
        this.verifyAccount = this.verifyAccount.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
        this.changetwoStep = this.changetwoStep.bind(this);
        this.twoStepActive = this.twoStepActive.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.sendVerify = this.sendVerify.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.verify = this.verify.bind(this);
        this.updatePhone = this.updatePhone.bind(this);
        this.updateOverview = this.updateOverview.bind(this);
        this.updateSettings = this.updateSettings.bind(this);
        this.changeProfile = this.changeProfile.bind(this);
        this.changeProfileTimer = this.changeProfileTimer.bind(this);
        this.changeSettings = this.changeSettings.bind(this);
        this.changeSettingsTimer = this.changeSettingsTimer.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePasswordTimer = this.changePasswordTimer.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.getStats = this.getStats.bind(this);
    }


    componentWillMount() {
        this.getCountries();
        this.getLogs();
        this.getStats();
    }

    componentDidMount() {
        this.interval =  setInterval(() => this.changeProfileTimer(), 3500);
        this.interval2 =  setInterval(() => this.changeProfile(), 4000);
        this.interval3 =  setInterval(() => this.changeSettingsTimer(), 3500);
        this.interval4 =  setInterval(() => this.changeSettings(), 4000);
        this.interval5 =  setInterval(() => this.changePasswordTimer(), 3500);
        this.interval6 =  setInterval(() => this.changePassword(), 4000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    //checks
    checkEmail(e) {
        e.preventDefault();
        this.setState({ user_email: e.target.value });
        if ((this.state.user_email.length < 6) || (this.state.user_email.split('').filter(x => x === '@').length !== 1) || this.state.user_email.indexOf('.') === -1) {
            this.setState({email_message: "Please enter a valid email"});
            this.setState({errors_email: true});
        } else {
            this.setState({errors_email: false});
            this.setState({email_message: ""});
        }
    }

    //notifcaties
    changeProfile() {
        if(this.state.profile_timer > 0) {
            this.setState({profile: false, profile_timer: 0})
        }
    }
    changeProfileTimer() {
        if(this.state.profile) {
            this.setState({profile_timer: true})
        }
    }
    changeSettings() {
        if(this.state.settings_timer > 0) {
            this.setState({settings: false})
        }
    }
    changeSettingsTimer() {
        if(this.state.settings) {
            this.setState({settings_timer: true})
        }
    }
    changePassword() {
        if(this.state.password_timer > 0) {
            this.setState({password: false, password_timer: 0})
        }
    }
    changePasswordTimer() {
        if(this.state.password) {
            this.setState({password_timer: true})
        }

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

    getStats() {
        axios.get('/api/account/stats').then((
            response
            ) => {
          this.setState({
              userProjects: response.data.userProjects,
              totalProjects: response.data.totalProjects,
              totalNotifications: response.data.totalNotifications,
              totalActivities: response.data.totalActivities,
              memberSince: response.data.memberSince,
              totalEvents: response.data.totalEvents,
          })

        }
        );
    }

    verifyAccount(e) {
        e.preventDefault();
        let errorEmail = false;
        axios.post('/api/account/checkEmail', {
            user_email: this.state.user_email,
        }).then(response => {
           if(response.data === "yes") {
               errorEmail = true;
               this.setState({email_message: "This email already exists in the company"});
               this.setState({errors_email: true});
           }
        });

        if ((this.state.user_email.length < 6) || (this.state.user_email.split('').filter(x => x === '@').length !== 1) || this.state.user_email.indexOf('.') === -1) {
            this.setState({email_message: "Please enter a valid email"});
            this.setState({errors_email: true});
            errorEmail = true;
        }

        let errorFirstName = false;
        if(this.state.user_name.length <= 2) {
            this.setState({name_message: "Please enter a valid name"});
            this.setState({errors_name: true});
            errorFirstName = true;
        }

        let errorSecondName = false;
        if(this.state.user_lastname.length <= 4) {
            this.setState({lastname_message: "Please enter a valid name"});
            this.setState({errors_lastname: true});
            errorSecondName = true;
        }

        if(!errorEmail && !errorFirstName && !errorSecondName) {
            this.setState({errors_email: false, errors_name: false, errors_lastname: false, lastname_message: '', email_message: '', name_message: ''});
            this.updateAccount(e);

        }


    }

    updateAccount(e) {
        e.preventDefault();
            axios.post('/api/account/update/profile', {
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
            }).then(response => {
                this.setState({
                    profile: true
                });
            });

    }

    //two step authentication
    changetwoStep(e) {
        if(this.state.two_step) {
            this.setState({
                two_step: 0
            });
        } else {
            this.setState({
                two_step: 1
            });
        }
        axios.post('/api/twostep/change', {
         two_step: this.state.two_step
        }).then(response => {
        });
    }


    //password
    updatePassword(e) {
        if(this.state.password_new.length < 8 || this.state.password_checkNew.length < 8) {
            this.setState({password_errors: true, password_message: 'The new password must have 8 characters minimum'});
        } else {
            this.setState({password_errors: false, password_message: 'The new password must have 8 characters minimum'});
            if(this.state.password_new === this.state.password_checkNew) {
                this.setState({password_errors: false, password_message: ''});
                axios.post('/api/account/password/change', {
                    password_old: this.state.password_old,
                    password_new: this.state.password_new,
                    password_checkNew: this.state.password_checkNew,
                }).then(response => {
                    this.setState({password_compare: response.data.password_compare});
                    if(!this.state.password_compare)  {
                        this.setState({password_errors: true, password_message: 'The old password does not match'});
                    } else {
                        this.setState({password: true});
                    }
                });


            } else {
                this.setState({password_errors: true, password_message: 'The entered passwords do not match'});
            }
        }
    }

    twoStepActive() {
        return (
            <div className="account-twofactor--items">
                <h5>Your methods</h5>
                <div className="account-twofactor--item">
                    <p className="float-left"><i className="fas fa-envelope-open"></i>{window.Laravel.user.email}</p>
                    <button className={(this.state.two_step_email) ? "float-right button button-green no-button" : "hidden"}>Active</button>
                    <button className={(this.state.two_step_email) ? "hidden" : "float-right button button-red no-button"}  href="#">Inactive</button>
                    <div className="clear"></div>
                </div>
                <div>
                    <p className="float-left"><i className="fas fa-phone"></i>{window.Laravel.user.phone}</p>
                    <button  onClick={() => this.setState({ two_step_popup: !this.state.two_step_popup})}  className={(this.state.two_step_phone) ? "float-right button button-green no-button" : "hidden"}>Active</button>
                    <button onClick={() => this.setState({ two_step_popup: !this.state.two_step_popup})} className={(this.state.two_step_phone) ? "hidden" : "float-right button button-red no-button"}  href="#">Inactive</button>
                </div>
                <PopPop
                    open={this.state.two_step_popup}
                    closeOnEsc={true}
                    onClose={() => this.setState({ two_step_popup: !this.state.two_step_popup})}
                    closeOnOverlay={true}>
                    <div className="popup popup-message">
                        <div className="popup-titleBar">
                            Enable phone
                           <button className="popup-btn--close"  onClick={() =>  this.setState({ two_step_popup: !this.state.two_step_popup})}>✕</button>
                        </div>
                        <div className="popup-content">
                            {this.state.two_step_correct && this.state.two_step_message.length > 0 ? <div className="alert alert-green">{this.state.two_step_message}</div> : ""}
                            {!this.state.two_step_correct && this.state.two_step_message.length > 0 ? <div className="alert alert-green">{this.state.two_step_message}</div> : ""}
                            <p>It's possible to receive your two step authenticaton verification code via your phone. Before you can use that, you have to verify your phone-number.</p>
                            <div className={this.state.two_step_enable_phone ? "hidden"  : " "}>
                                {this.state.two_step_send ? <div><label>Verification code</label> <input type="text" onChange={e => this.setState({ two_step_code: e.target.value })}   /> <button type="submit" className="button button-primary no-button" onClick={this.verify}>Verify phone</button></div>: <button className="button button-primary no-button"  onClick={this.sendVerify}>Send verification code</button>}
                            </div>
                            <div className={!this.state.two_step_enable_phone ? "hidden"  : " "}>
                                <button  onClick={this.updatePhone} className={(this.state.two_step_phone) ? "button button-green no-button" : "hidden"}>Active</button>
                                <button  onClick={this.updatePhone} className={(this.state.two_step_phone) ? "hidden" : "button button-red no-button"}  href="#">Inactive</button>
                            </div>
                        </div>
                    </div>
                </PopPop>
            </div>
        )
    }

    updatePhone(e) {
        axios.post('/api/twostep/updatePhone', {
        }).then(response => {
            this.setState({
                two_step_phone: !this.state.two_step_phone,
            });
        });
    }

    sendVerify(e) {
        this.setState({ two_step_send: !this.state.two_step_send});
        axios.post('/api/twostep/sendVerify', {
        }).then(response => {
            this.setState({
            });
        });

    }
    verify(e) {
        axios.post('/api/twostep/verify', {
            two_step_code: this.state.two_step_code
        }).then(response => {
            this.setState({
                two_step_correct: response.data.two_step_correct,
            });

            if(this.state.two_step_correct) {
                this.setState({
                    two_step_send: false,
                    two_step_message: "The code is correct. You can now use your phone. ",
                    two_step_phone: 1,
                    two_step_enable_phone: 1,
                });
            } else {
                this.setState({
                    two_step_message: "The code is incorrect. Please try again. ",
                });
            }
        });
    }

    //settings
    updateOverview(e) {
        if(e  < 0) {
            this.setState({mail_overview: 1})
        } else if(e > 30) {
            this.setState({mail_overview: 30})
        } else {
            this.setState({mail_overview: e})
        }
    }

    updateSettings(e) {
        axios.post('/api/account/settings/change', {
            mail_invites: this.state.mail_invites,
            mail_sessions: this.state.mail_sessions,
            mail_notifications: this.state.mail_notifications,
            mail_overview: this.state.mail_overview,
            online: this.state.user_online,
            hide_data: this.state.user_data,
            notifications: this.state.user_notifications,
        }).then(response => {
            this.setState({
                settings: true
            });
        });
    }

    //avatar
    onFormSubmit(e){
        e.preventDefault()
        this.fileUpload(this.state.image);
    }
    onChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
    }
    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                image: e.target.result
            })
        };
        reader.readAsDataURL(file);
    }
    fileUpload(image){
        const url = '/api/account/avatar/change';
        const formData = {file: this.state.image}

        axios.post('/api/account/avatar/change', formData).then(response => {
            console.log(response.data)
            if(response.data.uploaded) {
                this.setState({uploaded: true, message: response.data.message, image : '', user_avatar: response.data.avatar})
            } else {
                this.setState({uploaded: false, message: response.data.message})

            }
        });
    }

    getLogs() {
        axios.get('/api//user/logs').then(response => {
            this.setState({logs: response.data})
        });
    }

    toggleShow(show) {
        this.setState({show});
    }

    render() {
        return (
                   <Tabs defaultTab="vertical-tab-one" vertical>
                       <div className="row">
                           <div className="three columns">
                               <div className="account-menu">
                                   <TabList>
                                       <h5>Your settings</h5>
                                       <Tab tabFor="vertical-tab-one" className="account-tab"><i className="fas fa-user"> </i> Adjust your profile</Tab>
                                       <Tab tabFor="vertical-tab-two"  className="account-tab"><i className="fas fa-cog"> </i>Change your settings</Tab>
                                       <Tab tabFor="vertical-tab-three"  className="account-tab"><i className="fas fa-camera"> </i>Upload avatar</Tab>
                                       <h5>Account security</h5>
                                       <Tab tabFor="vertical-tab-four" className="account-tab"><i className="fas fa-user"> </i> Two step authentication</Tab>
                                       <Tab tabFor="vertical-tab-five"  className="account-tab"><i className="fas fa-life-ring"> </i>Change password</Tab>
                                       <Tab tabFor="vertical-tab-six"  className="account-tab"><i className="fas fa-tags"></i>My sessions</Tab>

                                       <h5>Website content</h5>
                                       <Tab tabFor="vertical-tab-seven" className="account-tab"><i className="fas fa-signal"> </i> My statistics</Tab>
                                       <Tab tabFor="vertical-tab-eight"  className="account-tab"><i className="fas fa-download"> </i>Download your data</Tab>
                                   </TabList>
                               </div>
                           </div>
                           <div className="nine columns">
                               <div className="account-content">
                                   <TabPanel tabId="vertical-tab-one">
                                       <h4 id="success">Change your profile</h4>
                                       <form onSubmit={event => this.verifyAccount(event)}>
                                           <div id="success" className={this.state.profile ? "" : "hidden"}>
                                               <Notification  type="success" title="successfully" message="Your account was successfully been changed"/>
                                           </div>
                                           <div className="row">
                                           <div className="six columns">
                                               <label for="">First name</label>
                                               <div id="red">{this.state.name_message}</div>
                                               <input type="text"   className={this.state.errors_name ? "border-red" : ""}  disabled={!window.Laravel.rights.right_data}  value={this.state.user_name}  className={this.state.errors_name ? "border-red" : ""}  onChange={e => this.setState({ user_name: e.target.value })}  />
                                               <label htmlFor="">E-mail</label>
                                               <div id="red">{this.state.email_message}</div>
                                               <input type="text"  className={this.state.errors_email ? "border-red" : ""} disabled={!window.Laravel.rights.right_data}   disabled={!window.Laravel.user.admin} value={this.state.user_email}   onChange={e => this.setState({user_email: e.target.value})}  />
                                               <label htmlFor="">City</label>
                                               <input type="text" value={this.state.user_city}   disabled={!window.Laravel.rights.right_data}  onChange={e => this.setState({ user_city: e.target.value })}  />
                                               <label htmlFor="">Street</label>
                                               <input type="text" value={this.state.user_street}  disabled={!window.Laravel.rights.right_data}  onChange={e => this.setState({ user_street: e.target.value })}  />
                                               <label htmlFor="">Function</label>
                                               <input type="text" value={this.state.user_function}   disabled={!window.Laravel.rights.right_data}  onChange={e => this.setState({ user_function: e.target.value })} required />
                                           </div>
                                           <div className="six columns">
                                               <label htmlFor="">Last name</label>
                                               <div id="red">{this.state.lastname_message}</div>
                                               <input type="text" className={this.state.errors_lastname ? "border-red" : ""} disabled={!window.Laravel.rights.right_data}  value={this.state.user_lastname}   onChange={e => this.setState({ user_lastname: e.target.value })}  />
                                               <label htmlFor="">Birthdate</label>
                                               <input type="date" value={this.state.user_date}   disabled={!window.Laravel.rights.right_data}  onChange={e => this.setState({ user_date: e.target.value })}  />
                                               <label htmlFor="">Phone</label>
                                               <input type="text" value={this.state.user_phone}  disabled={!window.Laravel.rights.right_data}  onChange={e => this.setState({ user_phone: e.target.value })}  />
                                               <label htmlFor="">Zipcode</label>
                                               <input type="text" value={this.state.user_zipcode}   disabled={!window.Laravel.rights.right_data}  onChange={e => this.setState({ user_zipcode: e.target.value })}  />
                                               <label htmlFor="">Country</label>
                                               <select disabled={!window.Laravel.rights.right_data}   onChange={e => this.setState({ user_country_id: e.target.value })}>
                                                   <option value={this.state.user_country_id} selected="selected">{window.Laravel.user.country}</option>
                                                   {this.state.countries.map((country,i) => (
                                                       <option   value={country.id} key={i} >{country.name}</option>
                                                   ))}
                                               </select>

                                           </div>
                                       </div>
                                       <h5>Social Links</h5>
                                       <div className="account-socialmedia">
                                           <div className="account-socialmedia--item">
                                               <i className="fab fa-twitter float-left"> </i>
                                               <input type="text"  className="float-left  account-socialmedia--input" placeholder="@Project-Together" onChange={e => this.setState({ user_twitter: e.target.value })} value={this.state.user_twitter}/>
                                               <div className="clear"></div>
                                           </div>
                                           <div className="account-socialmedia--item">
                                               <i className="fab fa-facebook float-left"> </i>
                                               <input type="text"  className="float-left  account-socialmedia--input" placeholder="Project-Together" onChange={e => this.setState({ user_facebook: e.target.value })} value={this.state.user_facebook} />
                                               <div className="clear"></div>
                                           </div>
                                           <div className="account-socialmedia--item">
                                               <i className="fab fa-google float-left"> </i>
                                               <input type="text"  className="float-left  account-socialmedia--input"   placeholder="Project-Together" onChange={e => this.setState({ user_google: e.target.value })} value={this.state.user_google} />
                                               <div className="clear"></div>
                                           </div>
                                           <div className="account-socialmedia--item">
                                               <i className="fas fa-globe-asia float-left"> </i>
                                               <input type="text"  className="float-left  account-socialmedia--input"   placeholder="https://www.project-together.com"  value={this.state.user_website}   onChange={e => this.setState({ user_website: e.target.value })}  />
                                               <div className="clear"></div>
                                           </div>
                                       </div>
                                       <h5>Biografy</h5>
                                       <textarea placeholder="Hello I am ..." onChange={e => this.setState({ user_biografy: e.target.value })}>{this.state.user_biografy}</textarea>
                                           <button  className="button button-primary no-button">Update account</button>
                                       </form>
                                   </TabPanel>
                                   <TabPanel tabId="vertical-tab-two">
                                       <div className="account-settings">
                                           <div id="success" className={this.state.settings ? "" : "hidden"}>
                                               <Notification  type="success" title="successfully" message="Your settings were succesfully been changed"/>
                                           </div>
                                           <div className="row">
                                               <div className="six columns">
                                                   <h4>Account settings</h4>
                                                   <h5>General settings</h5>
                                                   {window.Laravel.rights.change_online ? <div><input type="checkbox" checked={!this.state.user_online} onChange={e => this.setState({ user_online: !this.state.user_online })}/> Hide my online status when I am active on the entire website</div> : ""}
                                                   <div>
                                                       <input type="checkbox" checked={this.state.user_data}  onChange={e => this.setState({ user_data: !this.state.user_data })}/> Hide sensitive data on my profile (e-mail, phone, address)
                                                       </div>
                                                   <div>
                                                       <input type="checkbox" checked={this.state.user_notifications} onChange={e => this.setState({ user_notifications: !this.state.user_notifications})}/> Receive notifications
                                                   </div>
                                                   <h5>E-mail notifications</h5>
                                                   <div>
                                                       <input type="checkbox" checked={this.state.mail_invites} onChange={e => this.setState({ mail_invites: !this.state.mail_invites })}/> Get an email when I am invited to a new project
                                                   </div>
                                                   <div>
                                                       <input type="checkbox" checked={this.state.mail_notifications} onChange={e => this.setState({ mail_notifications: !this.state.mail_notifications })}/> Get an email when I receive a new notification
                                                   </div>
                                                   <div>
                                                       <input type="checkbox" checked={this.state.mail_sessions} onChange={e => this.setState({ mail_sessions: !this.state.mail_sessions })} /> Receive an e-mail when a new session is started
                                                   </div>
                                                   <div>
                                                       <input type="checkbox" /> Receive every <input type="number"  value={this.state.mail_overview} onChange={e => this.updateOverview(e.target.value)} min="1" max="30" /> days an overview of the company
                                                   </div>
                                                   <a onClick={this.updateSettings} href="#success" className="button button-primary">Update settings</a>
                                               </div>
                                               <div className="six columns">
                                                   <div className="account-settings-info">
                                                       <div className="center-text">
                                                           <i className="fas fa-info-circle"></i>
                                                       </div>
                                                       <ul>
                                                           <li>- When you hide your "online status", other members can't see if your active for the moment</li>
                                                           <li>- Your sensitive data are: e-mail, phone, street, city and zipcode</li>
                                                           <li>- An overview e-mail is an e-mail with all the current ongoing actions in the company like: events, new messages and so on </li>
                                                           <li>- You will always receive the overview e-mail on 00u00 local time</li>
                                                       </ul>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   </TabPanel>
                                   <TabPanel tabId="vertical-tab-three">
                                       <div className="account-avatar">
                                           <h4>Change avatar</h4>
                                           <div className="account-avatar-box">
                                               <div className="row">
                                                   <div className="six columns">
                                                       <img src={this.state.user_avatar} />
                                                   </div>
                                                   <div className="six columns">
                                                       {this.state.right_avatar ?
                                                           <div className="account-avatar-upload">
                                                               {this.state.uploaded && this.state.message.length > 0 ? <div className="alert alert-green">{this.state.message}</div> : ''}
                                                               {!this.state.uploaded && this.state.message.length > 0 ? <div className="alert alert-red">{this.state.message}</div> : ''}
                                                               <form onSubmit={this.onFormSubmit}>
                                                                   <input type="file"  onChange={this.onChange} />
                                                                   <button type="submit" className="button button-primary no-button">Change avatar</button>
                                                               </form>
                                                           </div>
                                                           :
                                                           <div className="alert alert-red center-text">You have no rights to change your avatar.</div> }
                                                           <div className="account-avatar-info">
                                                           <li>- Your avatar will be accessible to everyone across the website</li>
                                                           <li>- Choose an avatar that fits to the standards of your company</li>
                                                           <li>- Your avatar must be an image: jpeg or png file</li>
                                                           </div>
                                                           </div>
                                               </div>
                                           </div>
                                       </div>
                                   </TabPanel>
                                   <TabPanel tabId="vertical-tab-four">
                                       <div className="account-twofactor">
                                           <h4>Two step authentication</h4>
                                           <p>Enable two step authentication to protect your account. You can choose to authenticate by email or by receiving a text message. Text message is only available for a paid plan. </p>
                                           <button className={(this.state.two_step) ? "button button-red no-button" : "hidden"} href="#" onClick={this.changetwoStep}>Disable</button>
                                           <button className={(this.state.two_step) ? "hidden" : "button button-green no-button"} onClick={this.changetwoStep} href="#">Enable</button>
                                           {this.state.two_step ? this.twoStepActive() : ""}
                                       </div>
                                   </TabPanel>
                                   <TabPanel tabId="vertical-tab-five">
                                       <h4>Change your password</h4>
                                       <div className="account-password">
                                           <div id="success" className={this.state.password ? "" : "hidden"}>
                                               <Notification  type="success" title="successfully" message="Your password is succesfully been updated"/>
                                           </div>
                                           <div className="row">
                                               <div className="eight columns">
                                                   <div className="account-password--change">
                                                       <div id="success" className={!this.state.password_errors && this.state.password_message.length > 0 ? "alert alert-green" : "hidden"}>{this.state.password_message}</div>
                                                       <div id="success" className={this.state.password_errors ? "alert alert-red" : "hidden"}>{this.state.password_message}</div>
                                                       <form>
                                                           <label>Old password</label>
                                                           <input type="password" className="u-full-width"  onChange={e => this.setState({ password_old: e.target.value })} />
                                                           <label>New password</label>
                                                           <input type="password" className="u-full-width"  onChange={e => this.setState({ password_new: e.target.value })}/>
                                                           <label>Re-type new password</label>
                                                           <input type="password" className="u-full-width" onChange={e => this.setState({password_checkNew: e.target.value })} />
                                                           <a href="#success" onClick={this.updatePassword} className="button button-primary">Update password</a>
                                                       </form>
                                                   </div>
                                               </div>
                                               <div className="four columns">
                                                   <div className="account-password--info">
                                                       <div className="center-text">
                                                           <i className="fas fa-shield-alt"> </i>
                                                       </div>
                                                       <ul>
                                                           <li>- Choose a password that no one will easily guess</li>
                                                           <li>- Create a sentence as the basis for your password</li>
                                                           <li>- Use at least one letter, number and special character in your password</li>
                                                           <li>- Do not share passwords</li>
                                                           <li>- Generate similar but distinct passwords for separate accounts</li>
                                                           <li>- Remember to update and vary passwords</li>
                                                           <li>- Select a password management program</li>
                                                       </ul>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>

                                   </TabPanel>
                                   <TabPanel tabId="vertical-tab-six">
                                       <div className="account-sessions">
                                           <h4>My sessions</h4>
                                           <div className="account-sessions-all">
                                               <table className="u-full-width">
                                                   <thead>
                                                   <tr>
                                                       <th>User agent</th>
                                                       <th>Login at</th>
                                                       <th>Logout at</th>
                                                   </tr>
                                                   </thead>
                                                   <tbody>
                                                   {this.state.logs.map((log,i) => (
                                                       <tr>
                                                           <td>{log.user_agent}</td>
                                                           <td><Timestamp time={log.login_at} precision={2} utc={false} autoUpdate={60}   /></td>
                                                           <td><Timestamp time={log.logout_at} precision={2} utc={false} autoUpdate={60}   /></td>
                                                       </tr>
                                                   ))}
                                                   </tbody>
                                               </table>
                                           </div>
                                       </div>
                                   </TabPanel>
                                   <TabPanel tabId="vertical-tab-seven">
                                       <div className="account-stats">
                                           <h4>My statistics</h4>
                                           <h5>Your projects of company total</h5>
                                           <Progress
                                               percent={this.state.userProjects/this.state.totalProjects * 100}
                                               theme={
                                                   {
                                                       active: {
                                                           symbol: this.state.userProjects + " of the " + this.state.totalProjects,
                                                           trailColor: 'white',
                                                           color: '#5680e9'
                                                       },
                                                       success: {
                                                           symbol: 'All projects',
                                                           trailColor: 'lime',
                                                           color: '#5680e9'
                                                       }
                                                   }
                                               }
                                           />
                                           <h5>Other stats</h5>
                                           <p>
                                               You're a member since <b><Timestamp time={this.state.memberSince.date} precision={2} utc={false} autoUpdate={60}   /></b>. From that moment you have <b>{this.state.totalNotifications}</b> notifications and <b>{this.state.totalActivities}</b> activities in total. You have also created <b>{this.state.totalEvents}</b> events.
                                           </p>
                                       </div>
                                   </TabPanel>
                               </div>
                           </div>
                       </div>
                   </Tabs>
        );
    }
}

if (document.getElementById('tabs2-account')) {
    ReactDOM.render(<TabsAccount />, document.getElementById('tabs2-account'));
}
