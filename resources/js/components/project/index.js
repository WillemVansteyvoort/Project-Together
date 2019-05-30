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
import LocalizedStrings from 'localized-strings';
import en from '../lang/en.json';
import nl from '../lang/nl.json';

let strings = new LocalizedStrings({en,nl});
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
        strings.setLanguage(window.Laravel.lang);
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
                this.setState({page: strings.getString("Overview")})
                break;
            case "/" + this.state.company + "/" + this.state.project + "/project/" :
                this.setState({page: 'overview'})
                break;
            case "/" + this.state.company + "/" + this.state.project + "/project/notes" :
                this.setState({page: strings.getString("Notes")})
                break;
            case "/" + this.state.company + "/" + this.state.project + "/project/forum" :
                this.setState({page: 'Forum'})
                break;
            case "/" + this.state.company + "/" + this.state.project + "/project/tasks" :
                this.setState({page: strings.getString("Tasks")})
                break;
            case "/" + this.state.company + "/" + this.state.project + "/project/board" :
                this.setState({page: 'Board'})
                break;
            case "/" + this.state.company + "/" + this.state.project + "/project/crisiscenter" :
                this.setState({page: strings.getString("Crisis Center")})
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
                end_date: response.data.project.end_date,
                tasks: response.data.project.tasks,
                notes: response.data.project.notes,
                forum: response.data.project.forum,
                presences: response.data.project.presences,
                board: response.data.project.board,
                polls: response.data.project.polls,
                activities: response.data.project.activities,
                logs: response.data.project.logs,
                crisisCenter: response.data.project.crisiscenter,
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
                                <div  className={this.state.page === strings.getString("Overview") ? "project-header-nav--item active" : "project-header-nav--item"}>
                                    <button onClick={() => this.init()} className="no-button"><Link to={"/" + this.state.company + "/" + this.state.project + "/project"} >{strings.getString("Overview")}</Link></button>
                                </div>
                                {this.state.tasks ?
                                    <div  className={this.state.page === strings.getString("Tasks") ? "project-header-nav--item active" : "project-header-nav--item"}>
                                        <button onClick={() => this.init()} className="no-button"><Link to={"/" + this.state.company + "/" + this.state.project + "/project/tasks"}> {strings.getString("Tasks")}</Link></button>
                                    </div>
                                    : ""}
                                {this.state.activities ?
                                    <div className="project-header-nav--item">
                                        <button className="no-button"><Link to={"/" + this.state.company + "/" + this.state.project + "/project"}> Activities</Link></button>
                                    </div>
                                    : ""}
                                {this.state.notes ?
                                    <div  className={this.state.page === strings.getString("Notes") ? "project-header-nav--item active" : "project-header-nav--item"}>
                                        <button onClick={() => this.init()} className="no-button"><Link to={"/" + this.state.company + "/" + this.state.project + "/project/notes"}> {strings.getString("Notes")}</Link></button>
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
                                    <div className={this.state.page === strings.getString("Crisis Center") ? "project-header-nav--item active" : "project-header-nav--item"}>
                                        <button className="no-button" onClick={() => this.init()} ><Link to={"/" + this.state.company + "/" + this.state.project + "/project/crisiscenter"}> {strings.getString("Crisis Center")}</Link></button>
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
                        <div className="popup-content popup-welcome">
                            {this.state.welcome1 ?
                                <div>
                                    {window.Laravel.lang === "en" ?
                                        <div>
                                            <h2 className="center-text">Your first project</h2>
                                            <p>Welcome in your first project on Project-Together! Because we want to prevent you from getting stuck, we list the most important things you have to know.</p>
                                            <button className="button button-primary no-button float-right center" onClick={event => this.setState({welcome2: true, welcome1: false})}>Get started</button>
                                        </div>
                                    :
                                        <div>
                                            <h2 className="center-text">Uw eerste project</h2>
                                            <p>Welkom in uw eerste project van Project-Together! Omdat we willen vermijden dat u ergens vastloopt zullen we samen met u enkele zaken overlopen. Klik op "starten" om te beginnen.</p>
                                            <button className="button button-primary no-button float-right center" onClick={event => this.setState({welcome2: true, welcome1: false})}>Starten</button>
                                        </div>
                                    }
                                </div>
                                : ""}
                            {this.state.welcome2 ?
                                <div>
                                    {window.Laravel.lang === "en" ?
                                        <div>
                                            <h2 className="center-text">Project pages</h2>
                                            <img src="/images/welcome2.jpg" className="img2" />
                                            <p>On top of every page, you can see the navbar for the project (see picture above). The pages depend on the selected add-ons for the project. So it's possible you don't see all the pages like on the picture above.</p>
                                            <button className="button button-primary no-button float-left center" onClick={event => this.setState({welcome2: false, welcome1: true})}>Back</button>
                                            <button className="button button-primary no-button float-right center" onClick={event => this.setState({welcome2: false, welcome3: true})}>Next</button>
                                        </div>
                                        :
                                        <div>
                                            <h2 className="center-text">Project pagina's</h2>
                                            <img src="/images/welcome2.jpg" className="img2" />
                                            <p>Bovenaan elke pagina kan u de navigatie vinden van het project. De knoppen variëren naargelang de gekozen add-ons. Klik op een add-on om ernaar te navigeren. </p>
                                            <button className="button button-primary no-button float-left center" onClick={event => this.setState({welcome2: false, welcome1: true})}>Terug</button>
                                            <button className="button button-primary no-button float-right center" onClick={event => this.setState({welcome2: false, welcome3: true})}>Volgende</button>
                                        </div>
                                    }
                                </div>
                                : ""}
                            {this.state.welcome3 ?
                                <div>
                                    {window.Laravel.lang === "en" ?
                                        <div>
                                            <h2 className="center-text">Members and roles</h2>
                                            <div className="center-text">
                                            </div>
                                            <p>On the overview page, you can see all the members of the project with there roles. There are 4 types of roles:</p>
                                            <ul>
                                                <li>
                                                    <b>Guest:</b> Member has access, but can just observe</li>
                                                <li><b>Member:</b> Member has normal access: can create content</li>
                                                <li><b>Responsable:</b>Member can manage all the project content</li>
                                                <li><b>Leader:</b> Member manage the project, can change the settings</li>
                                            </ul>
                                            <button className="button button-primary no-button float-left center" onClick={event => this.setState({welcome3: false, welcome2: true})}>Back</button>
                                            <button className="button button-primary no-button float-right center" onClick={event => this.setState({welcome3: false, welcome4: true})}>Next</button>
                                        </div>
                                        :
                                        <div>
                                            <h2 className="center-text">Gebruikersrollen</h2>
                                            <div className="center-text">
                                            </div>
                                            <p>Op de overzicht pagina van elk project kan u alle gebruikers bekijken die tot het project behoren. Elke gebruiker heeft een bepaalde rol. Deze kan de volgende vier rollen zijn:</p>
                                            <ul>
                                                <li>
                                                    <b>Gast:</b> Gebruiker heeft toegang, maar kan enkel observeren</li>
                                                <li><b>Gebruiker:</b> Gebruiker heeft standaard toegang en kan content creëren</li>
                                                <li><b>Verantwoordelijke:</b> Gebruiker kan alle content in het project beheren</li>
                                                <li><b>Leider:</b> Gebruiker beheert het project, kan de instellingen van het bedrijf wijzigen</li>
                                            </ul>
                                            <p>Als u meer wenst te weten over alle rechten, gelieve onze <a href="/docs"> documentatie</a> te raadplegen.</p>
                                            <button className="button button-primary no-button float-left center" onClick={event => this.setState({welcome3: false, welcome2: true})}>Vorige</button>
                                            <button className="button button-primary no-button float-right center"onClick={event => this.setState({welcome3: false, welcome4: true})}>Volgende</button>
                                        </div>
                                    }
                                </div>
                                : ""}
                            {this.state.welcome4 ?
                                <div>
                                    {window.Laravel.lang === "en" ?
                                        <div>
                                            <h2 className="center-text">Actions</h2>
                                            <div className="center-text">
                                                <img src="/images/welcome3.JPG" className="img3"/>
                                            </div>
                                            <p>On the most pages you can create new elements by clicking plus icon at
                                                the top on your right. When you have a question you can click on the question mark.</p>
                                            <button className="button button-primary no-button float-left center"
                                                    onClick={event => this.setState({
                                                        welcome4: false,
                                                        welcome3: true
                                                    })}>Back
                                            </button>
                                            <button className="button button-primary no-button float-right center"
                                                    onClick={event => this.firstProjectIsDone()}>Done
                                            </button>
                                        </div>
                                        :
                                        <div>
                                            <h2 className="center-text">Acties</h2>
                                            <div className="center-text">
                                                <img src="/images/welcome3.JPG" className="img3"/>
                                            </div>
                                            <p>Op de meeste pagina's kan u nieuwe items aanmaken door op het plus-icoontje te klikken rechtsboven op de pagina. Als u niet weet wat u moet doen of u hebt een vraag, kan u ook altijd op het vraagteken-icoontje klikken.</p>
                                            <p>Veel succes met het organiseren van uw project!</p>
                                            <p><b>- Project-Together</b></p>
                                            <button className="button button-primary no-button float-left center"
                                                    onClick={event => this.setState({
                                                        welcome4: false,
                                                        welcome3: true
                                                    })}>Vorige
                                            </button>
                                            <button className="button button-primary no-button float-right center"
                                                    onClick={event => this.firstProjectIsDone()}>Afronden
                                            </button>
                                        </div>
                                    }
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
