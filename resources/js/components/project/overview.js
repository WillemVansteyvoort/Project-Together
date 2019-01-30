import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PieChart from 'react-minimal-pie-chart';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
const Timestamp = require('react-timestamp');
import "react-sweet-progress/lib/style.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Switch from "react-switch";
var months = new Array(11);
months[0] = "JAN";
months[1] = "FEB";
months[2] = "MAR";
months[3] = "APR";
months[4] = "MAY";
months[5] = "JUN";
months[6] = "JUL";
months[7] = "AUG";
months[8] = "SEP";
months[9] = "OCT";
months[10] = "NOV";
months[11] = "DEC";
months[12] = "JAN";
var roles  = [
    {
        value: "member",
        label: "Member"
    },
    {
        value: "watcher",
        label: "Watcher"
    },
    {
        value: "responsable",
        label: "Responsable"
    },
    {
        value: "leader",
        label: "Leader"
    },

]
export default class ProjectOverview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            project: null,
            created: '',
            end_date: '',
            description: '',
            users: [],
            leaders: [],
            responsables: [],
            tags: [],
            loading: true,
        };

        this.getProjectInfo = this.getProjectInfo.bind(this);
        this.dates = this.dates.bind(this);
        this.overview = this.overview.bind(this);
    }

    componentWillMount() {
        this.getProjectInfo();
    }

    getProjectInfo() {
        axios.post('/api/project/overview/info', {
            project: window.Laravel.data.project,
        }).then(response => {
            this.setState({
                loading: false,
               project: response.data,
                created: response.data.created_at,
                end_date: response.data.end_date,
                description: response.data.description,
                users: response.data.users,
                tags: response.data.tags,
                leaders: this.state.users.filter(function (user) {
                    return user.pivot.role === 3;
                })
            });
            this.setState({
                leaders: this.state.users.filter(function (user) {
                    return user.pivot.role === 3;
                }),
                responsables:  this.state.users.filter(function (user) {
                    return user.pivot.role === 2;
                }),
            });
        });
    }

    dates() {
        let start_date = new Date(this.state.created);
        let end_date = new Date(this.state.end_date);
        var res = Math.abs(end_date - start_date) / 1000;
        var days = Math.floor(res / 86400);
        return (
            <div>
                <h6>Dates</h6>
                <div className="dashboard-project-info-date start float-left">
                    <h6>Starts</h6>
                    <span>{start_date.getDate()} {months[start_date.getMonth()]}</span>
                    <h6>{start_date.getFullYear()}</h6>
                </div>
                <div className="dashboard-project-info-date end float-right">
                    <h6>Ends</h6>
                    <span>{this.state.end_date == null ? "-" : months[end_date.getMonth()]}</span>
                    <h6>{this.state.end_date == null ? "" : end_date.getFullYear()}</h6>
                </div>
                <div className="float-left alert alert-black">Ends {this.state.end_date == null ? "never" : "in " + days + " days"}</div>
                <div className="clear"></div>
            </div>
        )
    }

    overview() {
        return (
            <div className="dashboard-project">
                <div className="row">
                    <div className="four columns">
                        <h5>Current tasks</h5>
                        <div className="dashboard-project-tasks">
                            <h6 className="float-left">Task List </h6>
                            <button className="button button-primary no-button float-right">New task
                            </button>
                            <div className="clear"></div>
                            <div className="dashboard-project-tasks-item">
                                <div className="dashboard-project-tasks-title float-left">
                                    Rondgaan voor sponsering
                                </div>
                                <div className="float-right">
                                    <i className="fas fa-pen"> </i>
                                    <i className="fas fa-check"> </i>
                                </div>
                                <div className="clear"></div>
                                <span className="dashboard-project-tasks-priority">High priority</span>
                                <div className="clear"></div>
                                <div className="dashboard-project-tasks-user float-left">
                                    <img src="http://127.0.0.1:8000/images/founder.jpg"/>
                                </div>
                                <div className="dashboard-project-tasks-date float-right">
                                    <span className="float-right">2 days to go</span><i
                                    className="fas fa-clock float-right"> </i>
                                </div>
                            </div>
                            <div className="dashboard-project-tasks-item">
                                <div className="dashboard-project-tasks-title float-left">
                                    Rondgaan voor sponsering
                                </div>
                                <div className="float-right">
                                    <i className="fas fa-pen"> </i>
                                    <i className="fas fa-check"> </i>
                                </div>
                                <div className="clear"></div>
                                <span className="dashboard-project-tasks-priority">Low priority</span>
                                <div className="clear"></div>
                                <div className="dashboard-project-tasks-user float-left">
                                    <img src="http://127.0.0.1:8000/images/founder.jpg"/>
                                </div>
                                <div className="dashboard-project-tasks-date float-right">
                                    <span className="float-right">2 days to go</span><i
                                    className="fas fa-clock float-right"> </i>
                                </div>
                            </div>
                        </div>
                        <h5>Project members</h5>
                        <div className="dashboard-project-members">
                            {this.state.users.map((user, i)=> (
                                <div>
                                    <div className="dashboard-project-members-item">
                                        <img src={user.avatar} className="float-left"/>
                                        <h4 className="float-left">{user.name} {user.lastname}</h4>
                                        <span className="tag tag-primary float-right">{roles[user.pivot.role].value}</span>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="eight columns">
                        <h5>Information</h5>
                        <div className="dashboard-project-info">
                            {this.dates()}
                            <h6>Description</h6>
                            <p>
                                {this.state.description}
                            </p>
                            <div className="row">
                                <div className="six columns">
                                    <h6>Leaders</h6>
                                    <div className="dashboard-project-info-responsable">
                                        {this.state.leaders.map((user, i)=> (
                                            <img src={user.avatar}/>
                                        ))}
                                    </div>
                                </div>
                                {this.state.responsables.length > 0
                                    ?
                                    <div className="six columns">
                                        <h6>Responsables</h6>
                                        <div className="dashboard-project-info-responsable">
                                            {this.state.responsables.map((user, i)=> (
                                                <img src={user.avatar}/>
                                            ))}
                                        </div>
                                    </div>: ""
                                }
                            </div>
                            {this.state.tags.length > 0 ? <h6>Tags</h6> : ""}
                            {this.state.tags.map((tag, i)=> (
                                <span className="tag tag-primary" key={i}>{tag.name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
                    <main className="project-main">
                        {this.state.loading ?
                            <div className="project-loading">
                                <div className="loader">Loading...</div>
                            </div>
                            : this.overview() }
                    </main>
        );
    }
}

if (document.getElementById('project-overview')) {
    ReactDOM.render(<ProjectOverview />, document.getElementById('project-overview'));
}
