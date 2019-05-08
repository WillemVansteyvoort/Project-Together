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
           <div>
               <h2>sss</h2>
           </div>
        );
    }
}

if (document.getElementById('company-users')) {
    ReactDOM.render(<CompanyUsers />, document.getElementById('company-users'));
}
