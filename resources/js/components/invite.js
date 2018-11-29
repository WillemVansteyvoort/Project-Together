import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import { Wizard, Steps, Step } from 'react-albus';
import ReactPasswordStrength from '@rodrigowpl/react-password-strength'
import { ProgressBar } from 'reprogressbars';
import {Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody,} from 'react-accessible-accordion';
export default class InviteForm extends Component {

    constructor(props) {
        super(props)
        this.state = {

            created: false,

            password: '',
            password_retype: '',
            privacyPolicy: false,
            termsOfService: false,
            twostep: false,
            security: false,
            hide_data: false,
            online: false,
            invite_id: window.Laravel.invite.id,

            //errors
            password_errors: false,
            password_message: '',
            password_errors2: false,
            password_message2: '',
            termsOfService_message: '',
            privacyPolicy_message: '',

        };
        this.checkPassword = this.checkPassword.bind(this);
        this.checkPasswordRetype = this.checkPasswordRetype.bind(this);
        this.makeUser = this.makeUser.bind(this);

    }
    checkPassword(e) {
        e.preventDefault();
        if(this.state.password.length <= 8) {
            this.setState({password_message: "Password must have at least 8 characters"});
            this.setState({password_errors: true});
        } else {
            this.setState({password_errors: false});
            this.setState({password_message: ""});
        }
    }

    checkPasswordRetype(e) {
        e.preventDefault();
        if(this.state.password === this.state.password_retype) {
            this.setState({password_errors2: false});
            this.setState({password_message2: ""});
        } else if(!this.state.password_errors){
            this.setState({password_message2: "Passwords do not match"});
            this.setState({password_errors2: true});
        }

    }


    makeUser() {
        let errors = false;

        if(this.state.password.length <= 8) {
            errors = true;
            this.setState({password_message: "Password must have at least 8 characters"});
            this.setState({password_errors: true});
        } else {
            this.setState({password_errors: false});
            this.setState({password_message: ""});
        }

        if(this.state.password === this.state.password_retype) {
            this.setState({password_errors2: false});
            this.setState({password_message2: ""});
        } else if(!this.state.password_errors){
            errors = true;
            this.setState({password_message2: "Passwords do not match"});
            this.setState({password_errors2: true});
        }

        if(!this.state.privacyPolicy) {
            errors = true;
            this.setState({privacyPolicy_message: "You have to accept the Privacy Policy"});
        } else {
            this.setState({privacyPolicy_message: ""});
        }
        if(!this.state.termsOfService) {
            errors = true;
            this.setState({termsOfService_message: "You have to accept the Terms Of Service"});
        } else {
            this.setState({termsOfService_message: ""});
        }
        if(!errors) {
            axios.post('/invite/verify', {
                password: this.state.password,
                twostep: this.state.twostep,
                security: this.state.security,
                hide_data: this.state.hide_data,
                online: this.state.online,
                invite_id: this.state.invite_id,
            }).then(response => {
                this.setState({
                    created: true
                });
            });
        }

    }

    render() {
        return (
            <div>
                {this.state.created ? <meta http-equiv="refresh" content="0;URL=/company" /> : ""}
                <div className="invite-new-form">
                    <label>Password</label>
                    <div id="red">{this.state.password_message}</div>
                    <input type="password" className={this.state.password_errors || this.state.password_errors2 ? "border-red" : ""} placeholder="*********" onBlur={this.checkPassword} onChange={e => this.setState({ password: e.target.value})} />
                    <label>Re-type password</label>
                    <div id="red">{this.state.password_message2}</div>
                    <input type="password" className={this.state.password_errors2 ? "border-red" : ""} placeholder="*********" onChange={e => this.setState({ password_retype: e.target.value})} onBlur={this.checkPasswordRetype} />
                    <Accordion>
                        <AccordionItem>
                            <AccordionItemTitle>
                                <h5><i className="fas fa-cog"> </i> Settings</h5>
                            </AccordionItemTitle>
                                <AccordionItemBody>
                                   <div>
                                       <input type="checkbox" value={this.state.twostep} onChange={e => this.setState({ twostep: !this.state.twostep})}/> Enable two step authentication
                                   </div>
                                    <div>
                                        <input type="checkbox"  value={this.state.security} onChange={e => this.setState({ security: !this.state.security})} /> Receive an email when new session is started
                                    </div>
                                    <div>
                                        <input type="checkbox"  value={this.state.hide_data} onChange={e => this.setState({ hide_data: !this.state.hide_data})} /> Hide all information on your profile
                                    </div>
                                    {window.Laravel.invite.change_online ? <div><input type="checkbox"  value={this.state.online} onChange={e => this.setState({ online: !this.state.online})} /> Hide the "online status of your account</div> : ""}
                                </AccordionItemBody>
                        </AccordionItem>
                    </Accordion>
                    <div>
                        <div id="red">{this.state.termsOfService_message}</div>
                        <input type="checkbox"  value={this.state.termsOfService} onChange={e => this.setState({ termsOfService: !this.state.termsOfService})} /> I have read and I accept the <a>Terms Of Service</a>
                    </div>
                    <div>
                      <div id="red">{this.state.privacyPolicy_message}</div>
                             <input type="checkbox"  value={this.state.privacyPolicy} onChange={e => this.setState({ privacyPolicy: !this.state.privacyPolicy})}/> I have read and I accept the <a>Privacy Policy</a>
                    </div>
                    <input type="submit" className="button button-primary"  onClick={this.makeUser} value="Join Bazandpoort" />
                    <div className="clear"></div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('invite-form')) {
    ReactDOM.render(<InviteForm />, document.getElementById('invite-form'));
}
