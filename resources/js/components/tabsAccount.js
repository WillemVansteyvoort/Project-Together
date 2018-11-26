import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
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


            profile: false,

            //overig
            countries: [],


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

            //password tab
            password_old: '',
            password_new: '',
            password_checkNew: '',
            password_errors: false,
            password_message: '',
            password_compare: true,

        };
        //bind
        this.getCountries = this.getCountries.bind(this);
        this.verifyAccount = this.verifyAccount.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
        this.changetwoStep = this.changetwoStep.bind(this);
        this.twoStepActive = this.twoStepActive.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    componentWillMount() {
        this.getCountries();
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

    verifyAccount(e) {

        let error = false;
        if ((this.state.user_email.length < 6) || (this.state.user_email.split('').filter(x => x === '@').length !== 1) || this.state.user_email.indexOf('.') === -1) {
            this.setState({email_message: "Please enter a valid email"});
            this.setState({errors_email: true});
            error = true;
        }
        if(this.state.user_name.length <= 2) {
            this.setState({name_message: "Please enter a valid name"});
            this.setState({errors_name: true});
            error = true;
        }

        if(this.state.user_lastname.length <= 4) {
            this.setState({lastname_message: "Please enter a valid name"});
            this.setState({errors_lastname: true});
            error = true;
        }

        if(!error) {
            this.setState({errors_email: false, errors_name: false, errors_lastname: false, lastname_message: '', email_message: '', name_message: ''});
            this.updateAccount();
        }


    }

    updateAccount(e) {
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
                        this.setState({password_errors: false, password_message: 'Your password is succesfully updated'});
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
                    <span className={(this.state.two_step_email) ? "float-right tag tag-green" : "hidden"}>Active</span>
                    <span className={(this.state.two_step_email) ? "hidden" : "float-right tag tag-red"}  href="#">Inactive</span>
                    <div className="clear"></div>
                </div>
                <div>
                    <p className="float-left"><i className="fas fa-phone"></i>{window.Laravel.user.phone}</p>
                    <span className={(this.state.two_step_phone) ? "float-right tag tag-green" : "hidden"}>Active</span>
                    <span className={(this.state.two_step_phone) ? "hidden" : "float-right tag tag-red"}  href="#">Inactive</span>
                </div>
            </div>
        )
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
                                       <Tab tabFor="vertical-tab-six"  className="account-tab"><i className="fas fa-tags"> </i>My sessions</Tab>
                                       <h5>Website content</h5>
                                       <Tab tabFor="vertical-tab-one" className="account-tab"><i className="fas fa-signal"> </i> My statistics</Tab>
                                       <Tab tabFor="vertical-tab-seven"  className="account-tab"><i className="fas fa-download"> </i>Download your data</Tab>
                                   </TabList>
                               </div>
                           </div>
                           <div className="nine columns">
                               <div className="account-content">
                                   <TabPanel tabId="vertical-tab-one">
                                       <h4 id="success">Change your profile</h4>
                                       <form>
                                           <div id="success" className={this.state.profile ? "alert alert-green" : "hidden"}>Your account was succesfully been updated</div>
                                       <div className="row">
                                           <div className="six columns">
                                               <label for="">First name</label>
                                               <div id="red">{this.state.name_message}</div>
                                               <input type="text"   className={this.state.errors_name ? "border-red" : ""}  value={this.state.user_name}  className={this.state.errors_name ? "border-red" : ""}  onChange={e => this.setState({ user_name: e.target.value })} required />
                                               <label htmlFor="">E-mail</label>
                                               <div id="red">{this.state.email_message}</div>
                                               <input type="text"  className={this.state.errors_email ? "border-red" : ""}  value={this.state.user_email}   onChange={e => this.setState({user_email : e.target.value })}  />
                                               <label htmlFor="">City</label>
                                               <input type="text" value={this.state.user_city}   onChange={e => this.setState({ user_city: e.target.value })}  />
                                               <label htmlFor="">Street</label>
                                               <input type="text" value={this.state.user_street}   onChange={e => this.setState({ user_street: e.target.value })}  />
                                               <label htmlFor="">Function</label>
                                               <input type="text" value={this.state.user_function}   onChange={e => this.setState({ user_function: e.target.value })} required />
                                           </div>
                                           <div className="six columns">
                                               <label htmlFor="">Last name</label>
                                               <div id="red">{this.state.lastname_message}</div>
                                               <input type="text" className={this.state.errors_lastname ? "border-red" : ""} value={this.state.user_lastname}   onChange={e => this.setState({ user_lastname: e.target.value })}  />
                                               <label htmlFor="">Birthdate</label>
                                               <input type="date" value={this.state.user_date}   onChange={e => this.setState({ user_date: e.target.value })}  />
                                               <label htmlFor="">Phone</label>
                                               <input type="text" value={this.state.user_phone}   onChange={e => this.setState({ user_phone: e.target.value })}  />
                                               <label htmlFor="">Zipcode</label>
                                               <input type="text" value={this.state.user_zipcode}   onChange={e => this.setState({ user_zipcode: e.target.value })}  />
                                               <label htmlFor="">Country</label>
                                               <select  onChange={e => this.setState({ user_country_id: e.target.value })}>
                                                   <option value={this.state.user_country_id} selected="selected">{window.Laravel.user.country}</option>
                                                   {this.state.countries.map(country => (
                                                       <option value={country.id} key={country.id}>{country.name}</option>
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
                                           <a onClick={this.verifyAccount} href="#success" class="button button-primary">Update account</a>
                                       </form>
                                   </TabPanel>
                                   <TabPanel tabId="vertical-tab-two">
                                       <p>Tab 2 content</p>
                                   </TabPanel>
                                   <TabPanel tabId="vertical-tab-three">
                                       <p>Tab 3 content</p>
                                   </TabPanel>
                                   <TabPanel tabId="vertical-tab-four">
                                       <div className="account-twofactor">
                                           <h4>Two step authentication</h4>
                                           <p>Enable two step authentication to protect your account. You can choose to authenticate by email or by receiving a text message. Text message is only available for a paid plan. </p>
                                           <a className={(this.state.two_step) ? "button button-red" : "hidden"} href="#" onClick={this.changetwoStep}>Disable</a>
                                           <a className={(this.state.two_step) ? "hidden" : "button button-green"} onClick={this.changetwoStep} href="#">Enable</a>
                                           {this.state.two_step ? this.twoStepActive() : ""}
                                       </div>
                                   </TabPanel>
                                   <TabPanel tabId="vertical-tab-five">
                                       <h4>Change your password</h4>
                                       <div className="account-password">
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
                                       <p>Tab 6 content</p>
                                   </TabPanel>
                                   <TabPanel tabId="vertical-tab-seven">
                                       <p>Tab 7 content</p>
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
