import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PieChart from 'react-minimal-pie-chart';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from "react-router-dom";
// import PopupChangeProject from '../popups/changeProject';
const Home = () => <h2>Home</h2>;
const Topics = () => <h2>Topics</h2>;
import ProjectOverview from './overview';
import ProjectNotes from './notes';
import ProjectForum from  './forum';
import PopupChangeProject from "../popups/changeProject";

export default class ProjectIndex extends Component {

    constructor(props) {
        super(props)
        this.state = {
            page: '',
            project: window.Laravel.data.project,
            company: window.Laravel.data.company,
            name: window.Laravel.data.name,
            currentPath: window.location.pathname,
            tasks: null,
            notes: null,
            forum: null,
            presences: null,
            polls: null,
            activities: null,
            logs: null,
            crisisCenter: null,
        };
        this.overview = this.overview.bind(this);
        this.notes = this.notes.bind(this);
        this.forum = this.forum.bind(this);
        this.tasks = this.tasks.bind(this);
        this.getProjectInfo();
        this.error = this.error.bind(this);
        this.init = this.init.bind(this);
    }

    componentWillMount() {
        this.init();
    }

    init() {
        let url = window.location.pathname;
        switch (url) {
            case "/" + this.state.company + "/" + this.state.project + "/project/" :
                this.setState({page: 'overview'})
                break;
            case "/" + this.state.company + "/" + this.state.project + "/project/notes" :
                this.setState({page: 'Notes'})
                break;
            case "/" + this.state.company + "/" + this.state.project + "/project/forum" :
                this.setState({page: 'Forum'})
                break;
        }
    }

    getProjectInfo() {
        axios.post('/api/project/overview/info', {
            project: window.Laravel.data.project,
        }).then(response => {
            this.setState({
                tasks: response.data.tasks,
                notes: response.data.notes,
                forum: response.data.forum,
                presences: response.data.presences,
                polls: response.data.polls,
                activities: response.data.activities,
                logs: response.data.logs,
                crisisCenter: response.data.crisiscenter,
            });
        });
    }



    overview() {
        return (
            <div>
                <ProjectOverview/>
            </div>
        )
    }

    tasks() {
        return (
            <div>
                <h1>dsfds</h1>
                <br />
                <br />
            </div>
        )
    }

    notes () {
        return (
            <div>
                <ProjectNotes/>
            </div>
        )
    }

    forum () {
        return (
            <div>
                <ProjectForum/>
            </div>
        )
    }

    error (){
                return (
                    <h4>Not found</h4>
                )
}

    render() {
        const Home = () => <h2>Home</h2>;
        const About = () => <h2> {match.params.id}</h2>;
        const Topics = () => <h2>Topics</h2>;
        return (
            <div className="project">
                <Router>
                    <div>
                        <div className="project-header">
                            <div className="project-header-title">
                                <h2>{this.state.page}</h2>
                                <h5>{this.state.name}</h5>
                            </div>
                            <div className="project-header-nav">
                                <div className="project-header-nav--item active">
                                    <button onClick={() => this.init()} className="no-button"><Link to={"/" + this.state.company + "/" + this.state.project + "/project/"} >Overview</Link></button>
                                </div>
                                {this.state.tasks ?
                                    <div className="project-header-nav--item">
                                        <button onClick={() => this.init()} className="no-button"><Link to="tasks"> Tasks</Link></button>
                                    </div>
                                    : ""}
                                {this.state.activities ?
                                    <div className="project-header-nav--item">
                                        <button className="no-button"><Link to="tasks"> Activities</Link></button>
                                    </div>
                                    : ""}
                                {this.state.notes ?
                                    <div className="project-header-nav--item">
                                        <button onClick={() => this.init()} className="no-button"><Link to="notes"> Notes</Link></button>
                                    </div>
                                    : ""}
                                {this.state.forum ?
                                    <div className="project-header-nav--item">
                                        <button onClick={() => this.init()} className="no-button"><Link to="forum"> Forum</Link></button>
                                    </div>
                                    : ""}
                                {this.state.presences ?
                                    <div className="project-header-nav--item">
                                        <button className="no-button"><Link to="tasks"> Presences</Link></button>
                                    </div>
                                    : ""}
                                {this.state.polls ?
                                    <div className="project-header-nav--item">
                                        <button className="no-button"><Link to="tasks"> Polls</Link></button>
                                    </div>
                                    : ""}
                                {this.state.logs ?
                                    <div className="project-header-nav--item">
                                        <button className="no-button"><Link to="tasks"> Logs</Link></button>
                                    </div>
                                    : ""}
                                {this.state.crisisCenter ?
                                    <div className="project-header-nav--item">
                                        <button className="no-button"><Link to="tasks"> Crisis center</Link></button>
                                    </div>
                                    : ""}
                            </div>
                            {/*{this.state.currentPath === "/" + this.state.company + "/" + this.state.project + "/project/" ?*/}
                                {/*<PopupChangeProject company={this.state.company} project={this.state.project}/>*/}
                                {/*: ""}*/}
                            {/*{this.state.currentPath === "/" + this.state.company + "/" + this.state.project + "/project" ?*/}
                                {/*<PopupChangeProject company={this.state.company} project={this.state.project}/>*/}
                                {/*: ""}*/}

                        </div>
                        <Switch>
                        <Route exact path={"/" + this.state.company + "/" + this.state.project + "/project/"} component={this.overview} />
                        <Route path={"/" + this.state.company + "/" + this.state.project + "/project/tasks"} component={this.tasks} />
                        <Route path={"/" + this.state.company + "/" + this.state.project + "/project/notes"} component={this.notes} />
                        <Route path={"/" + this.state.company + "/" + this.state.project + "/project/forum"} component={this.forum} />
                        <Route component={this.error} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

if (document.getElementById('project-index')) {
    ReactDOM.render(<ProjectIndex />, document.getElementById('project-index'));
}
