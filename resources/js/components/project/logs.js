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
import Popup from 'reactjs-popup'
import LocalizedStrings from 'localized-strings';
import en from '../lang/en.json';
import nl from '../lang/nl.json';

let strings = new LocalizedStrings({en,nl})
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

            //errors
            error_content: '',
        };

        this.logsByUser = this.logsByUser.bind(this);
        this.createLog = this.createLog.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.deleteLog = this.deleteLog.bind(this);
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

        if(this.state.text.length >= 5) {
            this.setState({error_content: ""})
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
        } else {
            this.setState({error_content: "The content must have at least 5 characters"})
        }

    }

    deleteLog(id, i) {
        axios.post('/api/project/logs/delete', {
            log_id: id
        }).then(response => {
            let test = this.state.logs;
            test.splice(i, 1);
            console.log(test)
            this.setState({
                logsByUser: test
            });
        });
    }

    componentWillMount() {
        strings.setLanguage(window.Laravel.lang);
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
                 <Popup trigger={<button className="project-header-plus no-button no-padding ">
                     <i className="fas fa-question"> </i>
                 </button>} position="top left">
                {close => (
                    <div className="popup-sidebar">
                        <h2>Logs</h2>
                        <p>The Add-on logs ensures that project users can keep a log of the things that they have done.</p>
                        <h5>Make a log</h5>
                        <p>You can create a new log by clicking on the "plus" icon at the top on the right. A popup will appear where you must enter the content of a log.</p>
                        <p className="center-text"><img src="/images/help/icons.JPG" width="150px" /></p>
                        <h5>See logs</h5>
                        <p>To see logs of a project member, click on his avatar on the left. On the right the logs of the user will apears.</p>
                        <h5>Delete logs</h5>
                        <p>Only the owner of a log, the leaders or the responsables can delete a log. At the bottom of a log you will see the "trash" icon. By clicking on this icon, the log will be deleted.</p>
                    </div>
                )}
                 </Popup>
                {!window.Laravel.data.ended &&  window.Laravel.data.role !== 0  ? <button className="project-header-plus no-button test" onClick={() => this.toggleShow(true)}>
                   <i className="fas fa-plus"> </i>
               </button> : ""}
                <main className="project-main">
                    <div className="project-logs">
                        <div className="row">
                            <div className="three columns">
                                <div className="project-logs-users">
                                     {this.state.users.map((user, i)=> (
                                         <div>
                                             <div className="img__wrap">
                                                 <img  onClick={event => this.logsByUser(user.id)} className="img_img" src={user.avatar} alt="dsfdsf"/>
                                                 <div className="img__description_layer ">
                                                     <span className="img__description">{user.name} {user.lastname}</span>
                                                 </div>
                                             </div>
                                         </div>
                                     ))}
                                </div>
                            </div>
                            <div className="nine columns">
                                <div className="project-logs-content">
                                    {this.state.currentUser === null ?
                                        <div className="project-loading">
                                            <i className="fas fa-sign-in-alt"> </i>
                                            <h4>{strings.getString("Choose a member on the right")}</h4>
                                        </div>
                                        :
                                        <div>
                                            {this.state.logsByUser.length === 0 ?
                                                <div className="project-loading">
                                                    <h4>{strings.getString("This user have no logs")}</h4>
                                                </div>
                                                : ""}
                                            {this.state.logsByUser.map((log, i)=> (
                                                <article key={i}>
                                                    <div className="item">
                                                        <ReactMarkdown source={log.content} />
                                                    </div>
                                                    <div className="item-bottom">
                                                        <Timestamp className="time" time={log.created_at} precision={1} utc={false} autoUpdate={60}/>
                                                        <div className="float-right">
                                                            {/*<a ><i*/}
                                                            {/*className="fas fa-pencil-alt"> </i></a>*/}
                                                            {!window.Laravel.data.ended && window.Laravel.data.role !== 0 && (log.user_id === window.Laravel.user.id || window.Laravel.data.role === 2 || window.Laravel.data.role === 3) ?
                                                            <a onClick={event => this.deleteLog(log.id, i)}><i
                                                            className="fas fa-trash-alt" > </i></a>
                                                                : ""}

                                                                </div>
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
                            {strings.getString("Make a new log")}
                            <button className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</button>
                        </div>
                        <div className="popup-content">
                            <div className="row">
                                <div className="twelve columns">
                                    <div id="red">{this.state.error_content}</div>
                                    <SimpleMDEReact
                                        className={""}
                                        label=""
                                        value={this.state.text}
                                        onChange={this.handleChange1}
                                    />
                                </div>
                            </div>
                            <button className="button-primary button no-button" onClick={this.createLog}><i className="fas fa-plus"> </i> {strings.getString("Make log")}</button>
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
