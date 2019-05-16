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
import ProjectOverview from './overview';
import ProjectNotes from './notes';
import ProjectForum from  './forum';
import ProjectBoard from './board';
import ProjectTasks from './tasks';
import ProjectCrisisCenter from './crisisCenter';
import ProjectLogs from './logs';
import ProjectPolls from './polls';
import PopPop from 'react-poppop';
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
            end_date: '',
            tasks: null,
            notes: null,
            forum: null,
            presences: null,
            polls: null,
            board: null,
            activities: null,
            logs: null,
            crisisCenter: null,

            //welcome
            welcome: window.Laravel.user.firstProject,
            welcomeOpen: false,
            welcome1: false,
            welcome2: false,
            welcome3: false,
            welcome4: false,
        };
        this.overview = this.overview.bind(this);
        this.notes = this.notes.bind(this);
        this.forum = this.forum.bind(this);
        this.board = this.board.bind(this);
        this.getProjectInfo();
        this.error = this.error.bind(this);
        this.init = this.init.bind(this);
        this.firstProjectIsDone = this.firstProjectIsDone.bind(this);
    }

    componentWillMount() {
        this.init();
        this.welcome();
    }

    welcome () {
        if(!this.state.welcome) {
            this.setState({welcome1: true, welcomeOpen: true})
        }
    }

    firstProjectIsDone() {
        this.setState({
            welcome: false,
            welcomeOpen: false,
            welcome1: false,
            welcome2: false,
            welcome3: false
        });
        axios.post('/api/user/firstProject', {
        }).then(response => {
        });
    }

    init() {
        let url = window.location.pathname;
        switch (url) {
            case "/" + this.state.company + "/" + this.state.project + "/project" :
                this.setState({page: 'overview'})
                break;
            case "/" + this.state.company + "/" + this.state.project + "/project/" :
                this.setState({page: 'overview'})
                break;
            case "/" + this.state.company + "/" + this.state.project + "/project/notes" :
                this.setState({page: 'Notes'})
                break;
            case "/" + this.state.company + "/" + this.state.project + "/project/forum" :
                this.setState({page: 'Forum'})
                break;
            case "/" + this.state.company + "/" + this.state.project + "/project/tasks" :
                this.setState({page: 'Tasks'})
                break;
            case "/" + this.state.company + "/" + this.state.project + "/project/board" :
                this.setState({page: 'Board'})
                break;
            case "/" + this.state.company + "/" + this.state.project + "/project/crisiscenter" :
                this.setState({page: 'CrisisCenter'})
                break;
            case "/" + this.state.company + "/" + this.state.project + "/project/logs" :
                this.setState({page: 'Logs'})
                break;
            case "/" + this.state.company + "/" + this.state.project + "/project/polls" :
                this.setState({page: 'Polls'})
                break;
        }
    }

    getProjectInfo() {
        axios.post('/api/project/overview/info', {
            project: window.Laravel.data.project,
        }).then(response => {
            this.setState({
                end_date: response.data.end_date,
                tasks: response.data.tasks,
                notes: response.data.notes,
                forum: response.data.forum,
                presences: response.data.presences,
                board: response.data.board,
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

    board() {
        return (
            <div>
                <ProjectBoard/>
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

    tasks() {
        return (
            <div>
            <ProjectTasks/>
            </div>
        )
    }

    crisisCenter() {
        return (
            <div>
                <ProjectCrisisCenter/>
            </div>
        )
    }

    polls() {
        return (
            <div>
                <ProjectPolls/>
            </div>
        )
    }
    logs() {
        return (
            <div>
                <ProjectLogs/>
            </div>
        )
    }
    error (){
                return (
                        <div>
                            <ProjectOverview/>
                        </div>
                    )

}

    render() {
        const {welcomeOpen} = this.state;
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
                                <div  className={this.state.page === "overview" ? "project-header-nav--item active" : "project-header-nav--item"}>
                                    <button onClick={() => this.init()} className="no-button"><Link to={"/" + this.state.company + "/" + this.state.project + "/project"} >Overview</Link></button>
                                </div>
                                {this.state.tasks ?
                                    <div  className={this.state.page === "Tasks" ? "project-header-nav--item active" : "project-header-nav--item"}>
                                        <button onClick={() => this.init()} className="no-button"><Link to={"/" + this.state.company + "/" + this.state.project + "/project/tasks"}> Tasks</Link></button>
                                    </div>
                                    : ""}
                                {this.state.activities ?
                                    <div className="project-header-nav--item">
                                        <button className="no-button"><Link to={"/" + this.state.company + "/" + this.state.project + "/project"}> Activities</Link></button>
                                    </div>
                                    : ""}
                                {this.state.notes ?
                                    <div  className={this.state.page === "Notes" ? "project-header-nav--item active" : "project-header-nav--item"}>
                                        <button onClick={() => this.init()} className="no-button"><Link to={"/" + this.state.company + "/" + this.state.project + "/project/notes"}> Notes</Link></button>
                                    </div>
                                    : ""}
                                {this.state.forum ?
                                    <div  className={this.state.page === "Forum" ? "project-header-nav--item active" : "project-header-nav--item"}>
                                        <button onClick={() => this.init()} className="no-button"><Link to={"/" + this.state.company + "/" + this.state.project + "/project/forum"}> Forum</Link></button>
                                    </div>
                                    : ""}
                                {this.state.board ?
                                    <div  className={this.state.page === "Board" ? "project-header-nav--item active" : "project-header-nav--item"}>
                                        <button onClick={() => this.init()} className="no-button"><Link to={"/" + this.state.company + "/" + this.state.project + "/project/board"}> Board</Link></button>
                                    </div>
                                    : ""}
                                {this.state.polls ?
                                    <div  className={this.state.page === "Polls" ? "project-header-nav--item active" : "project-header-nav--item"}>
                                        <button onClick={() => this.init()} className="no-button"><Link to={"/" + this.state.company + "/" + this.state.project + "/project/polls"}> Polls</Link></button>
                                    </div>
                                    : ""}
                                {this.state.logs ?
                                    <div  className={this.state.page === "Logs" ? "project-header-nav--item active" : "project-header-nav--item"}>
                                        <button onClick={() => this.init()} className="no-button"><Link to={"/" + this.state.company + "/" + this.state.project + "/project/logs"}> Logs</Link></button>
                                    </div>
                                    : ""}
                                {this.state.crisisCenter ?
                                    <div className={this.state.page === "CrisisCenter" ? "project-header-nav--item active" : "project-header-nav--item"}>
                                        <button className="no-button"><Link to={"/" + this.state.company + "/" + this.state.project + "/project/crisiscenter"}> Crisis center</Link></button>
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
                            <Route exact path={"/" + this.state.company + "/" + this.state.project + "/project"} component={this.overview} />
                            <Route path={"/" + this.state.company + "/" + this.state.project + "/project/tasks"} component={this.tasks} />
                            <Route path={"/" + this.state.company + "/" + this.state.project + "/project/board"} component={this.board} />
                            <Route path={"/" + this.state.company + "/" + this.state.project + "/project/notes"} component={this.notes} />
                            <Route path={"/" + this.state.company + "/" + this.state.project + "/project/forum"} component={this.forum} />
                            <Route path={"/" + this.state.company + "/" + this.state.project + "/project/crisiscenter"} component={this.crisisCenter} />
                            <Route path={"/" + this.state.company + "/" + this.state.project + "/project/logs"} component={this.logs} />
                            <Route path={"/" + this.state.company + "/" + this.state.project + "/project/polls"} component={this.polls} />
                            <Route component={this.error} />
                        </Switch>
                    </div>
                </Router>
                <PopPop
                    open={welcomeOpen}
                    closeOnEsc={true}
                    onClose={() => this.toggleShowEdit(false)}
                    closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            Welcome
                        </div>
                        <button className="popup-btn--close">✕</button>
                        <div className="popup-content popup-welcome">
                            {this.state.welcome1 ?
                                <div>
                                    <h2 className="center-text">Your first project</h2>
                                    <p>Welcome in your first project on Project-Together! Because we want to prevent you from getting stuck, we list the most important things you have to know.</p>
                                    <button className="button button-primary no-button float-right center" onClick={event => this.setState({welcome2: true, welcome1: false})}>Get started</button>
                                </div>
                                : ""}
                            {this.state.welcome2 ?
                                <div>
                                    <h2 className="center-text">Project pages</h2>
                                    <img src="/images/welcome2.jpg" className="img2" />
                                    <p>On top of every page, you can see the navbar for the project (see picture above). The pages depend on the selected add-ons for the project. So it's possible you don't see all the pages like on the picture above.</p>
                                    <button className="button button-primary no-button float-left center" onClick={event => this.setState({welcome2: false, welcome1: true})}>Back</button>
                                    <button className="button button-primary no-button float-right center" onClick={event => this.setState({welcome2: false, welcome3: true})}>Next</button>
                                </div>
                                : ""}
                            {this.state.welcome3 ?
                                <div>
                                    <h2 className="center-text">Members and roles</h2>
                                    <div className="center-text">
                                    </div>
                                    <p>On the overview page, you can see all the members of the project with there roles. There are 4 types of roles:</p>
                                    <ul>
                                        <li>
                                            <b>Watcher:</b> Member has access, but can just observe</li>
                                        <li><b>Member:</b> Normal access</li>
                                        <li><b>Responsable:</b> Has admin access (can modify content, ...)</li>
                                        <li><b>Leader:</b> Has admin access and can change the project settings</li>
                                    </ul>
                                    <button className="button button-primary no-button float-left center" onClick={event => this.setState({welcome3: false, welcome2: true})}>Back</button>
                                    <button className="button button-primary no-button float-right center"onClick={event => this.setState({welcome3: false, welcome4: true})}>Next</button>
                                </div>
                                : ""}
                            {this.state.welcome4 ?
                                <div>
                                    <h2 className="center-text">Actions</h2>
                                    <div className="center-text">
                                        <img src="/images/welcome3.JPG" className="img3" />
                                    </div>
                                    <p>With most pages you can create new elements by clicking on the cross at the top right of each page. This is not always, but with most it is.</p>
                                    <button className="button button-primary no-button float-left center" onClick={event => this.setState({welcome4: false, welcome3: true})}>Back</button>
                                    <button className="button button-primary no-button float-right center" onClick={event => this.firstProjectIsDone()}>Done</button>
                                </div>
                                : ""}
                        </div>
                    </div>
                </PopPop>
            </div>
        );
    }
}

if (document.getElementById('project-index')) {
    ReactDOM.render(<ProjectIndex />, document.getElementById('project-index'));
}
