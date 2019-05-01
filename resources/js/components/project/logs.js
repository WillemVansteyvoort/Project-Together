import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PieChart from 'react-minimal-pie-chart';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
const Timestamp = require('react-timestamp');
import "react-sweet-progress/lib/style.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PopPop from 'react-poppop';
import Switch from "react-switch";
import SimpleMDEReact from "react-simplemde-editor";
import Notification from "../notification";
import Board from 'react-trello-for-timeline'
const ReactMarkdown = require('react-markdown');
var test = "test";
export default class ProjectLogs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            show: false,
            users: [],
            logs: [],
            logsByUser: null,
            currentUser: null,

            //create
            text: '',
        };

        this.logsByUser = this.logsByUser.bind(this);
        this.createLog = this.createLog.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);

    }


    logsByUser(id) {
        this.setState({currentUser: id})
        let logs = this.state.logs;
        let data = logs.filter(function (log) {
            return log.user_id === id
        });
        this.setState({logsByUser: data})
    }

    getUsers() {
        axios.post('/api/projects/users', {
            project: window.Laravel.data.project,
        }).then(response => {
            this.setState({
              users: response.data
            });
        });
    }

    getLogs() {
        axios.post('/api/project/logs/items', {
            project: window.Laravel.data.project,
        }).then(response => {
            this.setState({
                logs: response.data,
                logsByUser: response.data,
            });
        });
    }

    createLog() {
        axios.post('/api/project/logs/create', {
            project: window.Laravel.data.project,
            text: this.state.text,
        }).then(response => {
            this.setState({
                logs: [response.data, ...this.state.logs],
                currentUser: null,
                show: false,
            });
        });
    }

    componentWillMount() {
        this.getUsers();
        this.getLogs();
    }

    componentDidMount() {
    }


    toggleShow(show) {
        this.setState({show});
    }

    handleChange1 (value) {
        this.setState({
            text: value
        });
    };
    render() {
        const {show} = this.state;
        return (
            <span>
               {!window.Laravel.data.ended ? <button className="project-header-plus no-button test" onClick={() => this.toggleShow(true)}>
                   <i className="fas fa-plus"> </i>
               </button> : ""}
                <main className="project-main">
                    <div className="project-logs">
                        <div className="row">
                            <div className="three columns">
                                <div className="project-logs-users">
                                     {this.state.users.map((user, i)=> (
                                         <div>
                                             <img src={user.avatar} onClick={event => this.logsByUser(user.id)}/>
                                         </div>
                                     ))}
                                </div>
                            </div>
                            <div className="nine columns">
                                <div className="project-logs-content">
                                    {this.state.currentUser === null ?
                                        <div className="project-loading">
                                            <i className="fas fa-sign-in-alt"> </i>
                                            <h4>Choose a member on the right</h4>
                                        </div>
                                        :
                                        <div>
                                            {this.state.logsByUser.length === 0 ?
                                                <div className="project-loading">
                                                    <h4>No logs found</h4>
                                                </div>
                                                : ""}
                                            {this.state.logsByUser.map((log, i)=> (
                                                <article key={i}>
                                                    <div className="item">
                                                    {log.content}
                                                    </div>
                                                    <div className="item-bottom">
                                                        <Timestamp className="time" time={log.created_at} precision={1} utc={false} autoUpdate={60}/>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                 <PopPop
                     open={show}
                     closeOnEsc={true}
                     onClose={() => this.toggleShow(false)}
                     closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            Make a new log
                            <button className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</button>
                        </div>
                        <div className="popup-content">
                            <div className="row">
                                <div className="twelve columns">
                                    <SimpleMDEReact
                                        className={""}
                                        label=""
                                        value={this.state.text}
                                        onChange={this.handleChange1}
                                    />
                                </div>
                            </div>
                            <button className="button-primary button no-button" onClick={this.createLog}>Make log</button>
                        </div>
                    </div>
                </PopPop>
            </span>
        );
    }
}

if (document.getElementById('project-logs')) {
    ReactDOM.render(<ProjectLogs />, document.getElementById('project-logs'));
}
