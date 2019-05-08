import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import { Wizard, Steps, Step } from 'react-albus';
import ReactPasswordStrength from '@rodrigowpl/react-password-strength'
import { ProgressBar } from 'reprogressbars';

export default class SignupForm extends Component {

    constructor(props) {
        super(props)
        this.state = {

            name: '',
            lastname: '',
            email: '',
            password: '',

            name_message: '',
            lastname_message: '',
            email_message: '',
            password_message: '',
            company_message: '',
            user_function_message: '',

            company_type: 1,
            company_name: '',
            company_industry: 1,
            user_function: '',


            //checken
            name_errors: false,
            lastname_errors: false,
            email_errors: false,
            password_errors: false,
            company_errors: false,
            user_function_errors: false,

            //check atributen
            emailCheck: true,
            companyCheck: true,
            message: '',
            button: false,
            button3: false,
            button4: true,
            passwordManager: false,


            industries: [],
            isLoading: true,
            created: false,
            //checkboxes
            newsletter: 0,
            hide_data: 0,
            safety: 0,
            documentation: 0,
            termsOfService: 0,
            privacyPolicy: 0,
            user_avatar: '/images/user.jpg',

        };
        //bind

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateCompanyName = this.validateCompanyName.bind(this);
        this.makeUser = this.makeUser.bind(this);
        this.buttonStep1 = this.buttonStep1.bind(this);
        this.checkName = this.checkName.bind(this);
        this.checkLastName = this.checkLastName.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.allIndustries = this.allIndustries.bind(this);
        this.buttonStep3 = this.buttonStep3.bind(this);
        this.checkFunction = this.checkFunction.bind(this);
        this.checkCompany = this.checkCompany.bind(this);
        this.buttonStep4 = this.buttonStep4.bind(this);
        this.checkNewsletter = this.checkNewsletter.bind(this);
        this.checkSafety = this.checkSafety.bind(this);
        this.checkHideData = this.checkHideData.bind(this);
        this.checkDocumentation = this.checkDocumentation.bind(this);
        this.checkTerms = this.checkTerms.bind(this);
        this.checkPrivacy = this.checkPrivacy.bind(this);
    }


    handleSubmit(e) {
        //stop herladen van pagina
        e.preventDefault();
        //this.postData();
        axios.post('/api/register/check', {
            email: this.state.email,
            company_name: this.state.company_name
        }).then(response => {
            this.setState({
                emailCheck: response.data.emailCheck,
                companyCheck: response.data.companyCheck,
                // emailCheck: response.data.email,
                // companyCheck: response.data.company_name
            });
        });
    }


    //step 1
    buttonStep1() {
        if(this.state.name_errors || this.state.lastname_errors || this.state.email_errors || this.state.name.length <= 2 || this.state.lastname.length <= 2 || this.state.email.length <= 6 || this.state.password.length <= 8) {
            this.setState({button: true});
        } else  {
            this.setState({button: false});
        }
    }

    checkName(e) {
        e.preventDefault();
        if(this.state.name.length <= 2) {
            this.setState({name_errors: true});
            this.setState({name_message: "Name must have at least 2 characters"});
        } else {
            this.setState({name_errors: false});
            this.setState({name_message: ""});
        }
    }

    checkLastName(e) {
        e.preventDefault();
        if(this.state.lastname.length <= 4) {
            this.setState({lastname_errors: true});
            this.setState({lastname_message: "Name must have at least 4 characters"});
        } else {
            this.setState({lastname_errors: false});
            this.setState({lastname_message: ""});
        }
    }

    checkEmail(e) {
        e.preventDefault();
        if ((this.state.email.length < 6) || (this.state.email.split('').filter(x => x === '@').length !== 1) || this.state.email.indexOf('.') === -1) {
            this.setState({email_message: "Please enter a valid email"});
            this.setState({email_errors: true});
        } else {
            this.setState({email_errors: false});
            this.setState({email_message: ""});
        }
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


    //step 3
    buttonStep3() {
        if((this.state.user_function_errors) || (!this.state.companyCheck) || (this.state.company_errors) || (this.state.user_function.length <= 3) || (this.state.company_name <= 5)) {
            this.setState({button3: true});
        } else  {
            this.setState({button3: false});
        }
    }

    checkCompany(e) {
        e.preventDefault();
        if(this.state.company_name.length <= 5) {
            this.setState({company_message: "Name must have at least 5 characters"});
            this.setState({company_errors: true});
        } else {
            this.setState({company_errors: false});
            this.setState({company_message: ""});
        }
    }

    checkFunction(e) {
        e.preventDefault();

        if(this.state.user_function.length <= 3) {
            this.setState({user_function_message: "Function can't be empty"});
            this.setState({user_function_errors: true});
        } else {
            this.setState({user_function_errors: false});
            this.setState({user_function_message: ""});
        }

    }

    //step 4
    buttonStep4() {
        if((this.state.termsOfService === 1) && (this.state.privacyPolicy === 1)) {
            this.setState({button4: false});
        } else  {
            this.setState({button4: true});
        }
    }

    checkNewsletter(e) {
        e.preventDefault();
        if(this.state.newsletter === 0) {
            this.setState({newsletter: 1});
        } else {
            this.setState({newsletter: 0});
        }
    }

    checkHideData(e) {
        e.preventDefault();
        if(this.state.hide_data === 0) {
            this.setState({hide_data: 1});
        } else {
            this.setState({hide_data: 0});
        }
    }

    checkSafety(e) {
        e.preventDefault();
        if(this.state.safety === 0) {
            this.setState({safety: 1});
        } else {
            this.setState({safety: 0});
        }
    }

    checkDocumentation(e) {
        e.preventDefault();
        if(this.state.documentation === 0) {
            this.setState({documentation: 1});
        } else {
            this.setState({documentation: 0});
        }
    }

    checkPrivacy(e) {
        e.preventDefault();
        if(this.state.privacyPolicy === 0) {
            this.setState({privacyPolicy: 1});
        } else {
            this.setState({privacyPolicy: 0});
        }
    }

    checkTerms(e) {
        e.preventDefault();
        if(this.state.termsOfService === 0) {
            this.setState({termsOfService: 1});
        } else {
            this.setState({termsOfService: 0});
        }
    }

    componentWillMount() {
        this.buttonStep1();
        this.buttonStep3();
        this.buttonStep4();
        this.allIndustries();
    }

    componentDidMount() {
        this.interval =  setInterval(() => this.buttonStep1(), 1000);
        this.interval2 =  setInterval(() => this.buttonStep3(), 1000);
        this.interval3 = setInterval(() => this.buttonStep4(), 1000);

    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearInterval(this.interval2)
        clearInterval(this.interval3);
    }


    validateEmail(e) {
        if (!this.state.emailCheck) {
            return "This email is already in use";
        }
    }


    validateCompanyName() {
        if (!this.state.companyCheck) {
            return "This company is already existed";
        }
    }


    makeUser(e) {

        if(!this.state.created) {
            this.setState({
                created: true,
            });
            axios.post('/api/user/create', {
                name: this.state.name,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
                company_type: this.state.company_type,
                company_name: this.state.company_name,
                company_industry: this.state.company_industry,
                function: this.state.user_function,
                termsOfService: this.state.termsOfService,
                privacyPolicy: this.state.privacyPolicy,
                newsletter: this.state.newsletter,
                hide_data: this.state.hide_data,
                safety: this.state.safety,
                documentation: this.state.documentation,
                provider: '',
                provider_id: '',
                user_avatar: 'https://project-together.com/images/user.jpg',
            }).then(response => {
                this.setState({
                    isLoading: false,
                    created: true,
                });
            });
        }

    }

    allIndustries() {
        axios.get('/api/industries').then((
            response
            ) =>
                this.setState({
                    industries: response.data
                })
        );
    }

    render() {
        return (
            <div>
                <Wizard>
                    <Steps>
                        <Step
                            id="step 1"
                            render={({ next }) => (
                                <div>
                                    <h4 className="register-right--title">Sign Up to Work-Together</h4>
                                    <p>
                                        Get now all your projects organized with Work-Together. Sign Up now with Social
                                        Media or make a
                                        manual acount. We will see you inside!
                                    </p>
                                    <label>First name *</label>
                                    <div id="red">{this.state.name_message}</div>
                                    <input className={this.state.name_errors ? "border-red" : ""} type="text" value={this.state.name} name="name" onBlur={this.checkName} onChange={e => this.setState({ name: e.target.value })} placeholder="Project-Together" required/>
                                    <label>Last name *</label>
                                    <div id="red">{this.state.lastname_message}</div>
                                    <input className={this.state.lastname_errors ? "border-red" : ""} type="text" value={this.state.lastname} name="name" onBlur={this.checkLastName} onChange={e => this.setState({ lastname: e.target.value })} placeholder="Project-Together" required/>
                                    <label>E-mail *</label>
                                    <div onBlur={this.handleSubmit}>
                                        <div id="red">{this.validateEmail()}</div>
                                        <div id="red">{this.state.email_message}</div>
                                        <input type="text" value={this.state.email} className={!this.state.emailCheck || this.state.email_errors ? "border-red" : ""}  onBlur={this.checkEmail} name="email" placeholder="jochem@project-Together.com" id="email" onChange={e => this.setState({ email: e.target.value })} required />
                                    </div>
                                    <label>Password *</label>
                                    <div id="red">{this.state.password_message}</div>
                                    <input className={this.state.password_errors  ? "border-red" : ""} value={this.state.password} type="password"  placeholder="********" required onBlur={this.checkPassword} onChange={e => this.setState({ password: e.target.value, passwordManager: true })} />
                                    <div className={this.state.passwordManager ? "view" : "passwordChecker"}>
                                        <ReactPasswordStrength
                                            passwordValue={this.state.password}
                                        />
                                    </div>
                                    <div className="register-right--buttons">
                                        <div className={this.state.errors ? "hidden" : ""} >
                                            <button disabled={this.state.button} className="button button-primary register-button" onClick={next}>Next</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                        <Step
                            id="step 2"
                            render={({ next, previous }) => (
                                <div>
                                    <h4 className="register-right--title"><span className="register-step">Step 2/5</span>Time
                                        for the next one ...</h4>
                                    <p>Now we have all we need for your personal account, we want to now if you're a company
                                        or another group. Select also your plan for your account, you can change it later if
                                        you want.</p>
                                    <label>Company Industry</label>
                                    <select  onChange={e => this.setState({ company_industry: e.target.value })}>
                                        {this.state.industries.map(industry => (
                                            <option value={industry.id}>{industry.name}</option>
                                        ))}
                                    </select>
                                    <label>Company plan</label>
                                    <select onChange={e => this.setState({ company_type: e.target.value })}>
                                        <option value="1">Standard (free)</option>
                                        <option  value="2">Pro (free)</option>
                                    </select>
                                    <div className="register-right--buttons">
                                        <button  className="button button-primary register-button" onClick={previous}>Previous</button>
                                        <button  className="button button-primary register-button" onClick={next}>Next</button>
                                    </div>
                                </div>
                            )}
                        />
                        <Step
                            id="step 3"
                            render={({ previous, next }) => (
                                <div>
                                    <h4 className="register-right--title">
                                        <div className="register-step">Step 3/4</div>
                                        You're doing well!
                                    </h4>
                                    <p>We see that you're a <b>company.</b> Before we can finish the setup of you're
                                        account, we have to know the name of the company and his industry.
                                    </p>
                                    <label>Company name</label>
                                    <div onBlur={this.handleSubmit}>
                                        <div id="red">{this.validateCompanyName()}</div>
                                        <div id="red">{this.state.company_message}</div>
                                        <input  value={this.state.company_name} className={!this.state.companyCheck || this.state.company_errors ? "border-red" : ""} type="text" onBlur={this.checkCompany} placeholder="Project-Together" onChange={e => this.setState({ company_name: e.target.value })}/>
                                    </div>

                                    <label>Describe your function</label>
                                    <div id="red">{this.state.user_function_message}</div>
                                    <input value={this.state.user_function} className={this.state.user_function_errors  ? "border-red" : ""} type="text"   onBlur={this.checkFunction} onChange={e => this.setState({ user_function: e.target.value })} placeholder="Owner" />
                                    <div className="register-right--buttons">
                                        <button  className="button button-primary register-button" onClick={previous}>Previous</button>
                                        <button disabled={this.state.button3} className="button button-primary register-button" onClick={next}>Next</button>
                                    </div>
                                </div>
                            )}
                        />
                        <Step
                            id="step 4"
                            render={({ previous, next }) => (
                                <div>
                                    <h4 className="register-right--title">
                                        <div className="register-step">Step 4/4</div>
                                        Choose your settings
                                    </h4>
                                    <h5>Personal</h5>
                                    <div>
                                        <input type="checkbox" id="scales" name="feature" onChange={this.checkNewsletter} checked={this.state.newsletter} value="scales"/>I want to receive a newsletter about new functions and news
                                    </div>
                                    <div>
                                        <input type="checkbox" id="scales" name="feature" onChange={this.checkHideData} checked={this.state.hide_data} value="scales"/> I want to hidden my personal data (e-mail, phone)
                                        from my personal profile
                                    </div>
                                    <div>
                                        <input type="checkbox" id="scales" name="feature" onChange={this.checkSafety} checked={this.state.safety} value="scales"/> I want to get an email when someone login on my
                                        account
                                    </div>
                                    <div>
                                        <input type="checkbox" id="scales" name="feature" onChange={this.checkDocumentation} checked={this.state.documentation} value="scales"/> I want to receive the documentation PDF by e-mail
                                    </div>
                                    <h5>Terms of Services (Required)</h5>
                                    <div>
                                        <input  type="checkbox" onClick={this.checkTerms} id="scales" checked={this.state.termsOfService}  name="feature" value="scales"/> I have read and I accept the <a href="">Terms Of
                                        Service.</a>
                                    </div>
                                    <h5>Privacy Policy (Required)</h5>
                                    <div>
                                        <input type="checkbox" id="scales" name="feature" onChange={this.checkPrivacy} checked={this.state.privacyPolicy} value="scales"/> I have read and I accept the <a>Privacy Policy.</a>
                                    </div>
                                    <div className="register-right--buttons">
                                        <button  className="button button-primary register-button" onClick={previous}>Previous</button>
                                        <button disabled={this.state.button4}  onClick={next} className="button button-primary register-button">Sign Up</button>
                                    </div>
                                </div>
                            )}
                        />
                        <Step
                            id="step 5"
                            render={({ previous }) => (
                                <div>
                                    <h4 className="register-right--title">
                                        Setting up your company ...
                                    </h4>
                                    <p>
                                        We are setting your company up. This will not take long.
                                    </p>
                                    <ProgressBar isLoading={this.state.isLoading}  className="fixed-progress-bar" height="10px" color="#5680e9" />
                                    {this.state.isLoading  ? this.makeUser() : ""}
                                    {!this.state.isLoading  ? <h6>Succesfully, we will now redirect you.</h6> : ""}
                                    {!this.state.isLoading  ? <div><meta http-equiv="Refresh" content="0;URL=welcome/" /></div> : ""}
                                </div>
                            )}
                        />
                    </Steps>
                </Wizard>
            </div>
        );
    }
}

if (document.getElementById('signup-form')) {
    ReactDOM.render(<SignupForm />, document.getElementById('signup-form'));
}
