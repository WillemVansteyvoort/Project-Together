import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PieChart from 'react-minimal-pie-chart';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import PopPop from 'react-poppop';
import Switch from "react-switch";
import SimpleMDEReact from "react-simplemde-editor";
import PopupNewInvite from "./company";
import LocalizedStrings from 'localized-strings';
import en from '../lang/en.json';
import nl from '../lang/nl.json';

let strings = new LocalizedStrings({en,nl});
export default class CompanyStats extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            tasksDone: 0,
            tasksBuzzy: 0,
            show: false,

            //settings
            message: '',
            logo: '',

        };
        this.handleChange = this.handleChange.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked });
    }

    handleChange2(value) {
        this.setState({ message: value });
    }

    stats() {
        axios.get('/api/company/stats').then((
            response
            ) =>
                this.setState({
                    tasksDone: response.data.doneTasks,
                    tasksBuzzy: response.data.buzzyTasks,
                    logo: response.data.logo,
                })
        );
    }

    message() {
        axios.get('/api/company/message').then((
            response
            ) =>
                this.setState({
                    message: response.data,
                })
        );
    }

    toggleShow(show) {
        this.setState({show});
    }

    componentWillMount() {
        strings.setLanguage(window.Laravel.lang);
        this.stats();
        this.message();
    }

    saveSettings() {
        axios.post('/api/company/settings/save', {
           message: this.state.message
        }).then(response => {
            this.setState({show: false})
        });
    }

    render() {
        const {show} = this.state;
        return (
            <div className="company-sidebar">
                <h5>{strings.getString("Total members")}</h5>
                <Progress
                    percent={window.Laravel.company.users/window.Laravel.plan.users * 100}
                    theme={
                        {
                            active: {
                                symbol: window.Laravel.company.users + '/' + window.Laravel.plan.users,
                                trailColor: 'white',
                                color: '#5680e9'
                            },
                            success: {
                                symbol: 'MAX',
                                trailColor: 'lime',
                                color: '#E54243'
                            }
                        }
                    }
                />
                <h5>{strings.getString("Total projects")}</h5>
                <Progress
                    percent={window.Laravel.company.projects/window.Laravel.plan.projects * 100}
                    theme={
                        {
                            active: {
                                symbol: window.Laravel.company.projects + '/' + window.Laravel.plan.projects,
                                trailColor: 'white',
                                color: '#5680e9'
                            },
                            success: {
                                symbol: 'MAX',
                                trailColor: 'red',
                                color: 'red'
                            }
                        }
                    }
                />
                {this.state.tasksDone > 0 || this.state.tasksBuzzy ?
                    <span>
                        <h5>{strings.getString("Tasks")}</h5>
                        <div className="company-chart">
                            <div className="row">
                                <div className="six columns">
                                    <PieChart
                                        data={[
                                            { title: 'One', value: this.state.tasksDone, color: '#5680e9' },
                                            { title: 'Two', value: this.state.tasksBuzzy, color: '#5ab9ea' },
                                        ]}
                                    />
                                </div>
                                <div className="six columns">
                                    <div className="company-chart--content">
                                        <span className="company-square company-square--primary">{strings.getString("Done tasks")}</span>
                                        <span className="company-square company-square--second">{strings.getString("Open tasks")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
                    : ""}
                {window.Laravel.user.admin ?                 <button className="button button-primary company-sidebar-settings" onClick={event => this.setState({show: true})}><i className="fas fa-cog"></i>{strings.getString("Company settings")}</button>

                    : ""}
                    {/*<div>*/}
                        {/*{this.state.logo.length > 0 ? <img src={"/logos/" + this.state.logo} width="100%" /> : ""}*/}
                    {/*</div>*/}
                <PopPop
                    open={show}
                    closeOnEsc={true}
                    onClose={() => this.toggleShow(false)}
                    closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            {strings.getString("Company settings")}
                            <button className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</button>
                        </div>
                        <div className="popup-content">
                            <div className="row">
                                <SimpleMDEReact
                                    className={"editor"}
                                    label={strings.getString("Message from the company")}
                                    value={this.state.message}
                                    onChange={this.handleChange2}
                                />
                            </div>
                            <button className="no-button button-primary button" onClick={this.saveSettings}><i
                                className="fas fa-save"></i> {strings.getString("Save settings")}</button>
                        </div>
                    </div>
                </PopPop>
            </div>
        );
    }
}

if (document.getElementById('company-stats')) {
    ReactDOM.render(<CompanyStats />, document.getElementById('company-stats'));
}
