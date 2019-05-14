import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
const Timestamp = require('react-timestamp');
import PopPop from 'react-poppop';
import NotificationsToday from './notifcations/today';
import NotificationsYesterday from './notifcations/yesterday';
import NotificationsOlder from './notifcations/older';
import FileUploader from './others/fileUploader';
const ReactMarkdown = require('react-markdown');
import LocalizedStrings from 'localized-strings';
import en from './lang/en.json';
import nl from './lang/nl.json';

let strings = new LocalizedStrings({en,nl});


export default class TabsDashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notificationsToday: [],
            notificationsYesterday: [],
            notificationsOlder: [],
            activities: [],
            todos: [{"id":1,"user_id":1,"title":"dfgdfg","type":"d","content":"dfgdfgdfgdf","read":0,"created_at":"2018-11-06 00:00:00","updated_at":null},{"id":2,"user_id":1,"title":"dfgdfg","type":"d","content":"dfgdfgdfgdf","read":0,"created_at":"2018-11-08 00:00:00","updated_at":null},{"id":3,"user_id":1,"title":"dfgdfg","type":"d","content":"dfgdfgdfgdf","read":0,"created_at":"2018-11-09 00:00:00","updated_at":null}],
            currentPage: 1,
            todosPerPage: 6,
            perPage: 7,
            message: '',
            tasks: [],


            //welcome
            welcome: window.Laravel.user.welcome,
            welcomeOpen: false,
            welcome1: false,
            welcome2: false,
            welcome3: false
        };
        //bind
        this.notificationsToday = this.notificationsToday.bind(this);
        this.notificationsYesterday = this.notificationsYesterday.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.welcome = this.welcome.bind(this);
        this.welcomeIsDone = this.welcomeIsDone.bind(this);
    }


    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    componentWillMount() {
        this.welcome();
        this.notificationsOlder();
        this.notificationsToday();
        this.notificationsYesterday();
        this.activities();
        this.message();
        this.tasks();
    }

    welcome () {
        strings.setLanguage(window.Laravel.lang);
        if(!this.state.welcome) {
            this.setState({welcome1: true, welcomeOpen: true})
        }
    }

    welcomeIsDone() {
        this.setState({
            welcome: false,
            welcomeOpen: false,
            welcome1: false,
            welcome2: false,
            welcome3: false
        });
        axios.post('/api/user/welcome', {
        }).then(response => {
        });
    }

    activities() {
        axios.get('/api/activities/all').then((
            response
            ) =>
                this.setState({
                    activities: response.data,
                })
        );
    }

    notificationsToday() {
        axios.get('/api/notifcations/today').then((
            response
            ) =>
                this.setState({
                    notificationsToday: response.data,
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


    tasks() {
        axios.get('/api/project/overview/tasks/widget').then((
            response
            ) =>
                this.setState({
                    tasks: response.data,
                })
        );
    }

    notificationsYesterday() {
        axios.get('/api/notifcations/yesterday/').then((
            response
            ) =>
                this.setState({
                    notificationsYesterday: response.data,
                })
        );
    }
    notificationsOlder() {
        // axios.get('/api/notifcations/noticationsOlder/').then((
        //     response
        //     ) =>
        //         this.setState({
        //             notificationsOlder: response.data,
        //         })
        // );
    }
    render() {
        const { activities, currentPage, todosPerPage } = this.state;
        const {welcomeOpen} = this.state;
        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = activities.slice(indexOfFirstTodo, indexOfLastTodo);

            const renderActivities = currentTodos.map((activity, i) => {
                return (
                    <div key={i} className="dashboard-activities-item">
                    <span className="dashboard-activities-item--time">
                       <Timestamp time={activity.created_at} precision={1}  utc={false}/>
                    </span>
                        <div className="dashboard-activities-item--content">
                            {activity.type === 0 ? <span><a>{activity.user.name} {activity.user.lastname}</a> has created the project <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 2 ? <span>There's a new note is created in  <a>{activity.project.name}</a> by <a href={'./' + activity.project.url + '/project'}>{activity.user.name} {activity.user.lastname}</a></span> :""}
                            {activity.type === 3 ? <span><a>{activity.user.name} {activity.user.lastname}</a> created a new thread in <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 4 ? <span><a>{activity.user.name} {activity.user.lastname}</a> replied on a thread in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 5 ? <span><a>{activity.user.name} {activity.user.lastname}</a> created a new task list in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 6 ? <span><a>{activity.user.name} {activity.user.lastname}</a> created a new tak in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 7 ? <span><a>{activity.user.name} {activity.user.lastname}</a> verified a task as done in <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 8 ? <span><a>{activity.user.name} {activity.user.lastname}</a> reopened a task  in <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 9 ? <span><a>{activity.user.name} {activity.user.lastname}</a> edited a task in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 10 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted a task in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 11 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted a note in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 12 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted a thread  in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 13 ? <span><a>{activity.user.name} {activity.user.lastname}</a> edited a thread  in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 14 ? <span><a>{activity.user.name} {activity.user.lastname}</a> edited a reply in <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 15 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted a reply  in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 16 ? <span><a>{activity.user.name} {activity.user.lastname}</a> created a new card on the board  in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 17 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted a card from the board in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 18 ? <span><a>{activity.user.name} {activity.user.lastname}</a> edited a card from the board in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 19 ? <span><a>{activity.user.name} {activity.user.lastname}</a> created a new poll in <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 20 ? <span><a>{activity.user.name} {activity.user.lastname}</a> voted on a poll in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 21 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted his vote on a poll  in  <a >{activity.project.name}</a></span> :""}
                            {activity.type === 22 ? <span><a>{activity.user.name} {activity.user.lastname}</a> edited a poll in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 23 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted a poll  in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 24 ? <span><a>{activity.user.name} {activity.user.lastname}</a> created a new log in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 25 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted a log  in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 26 ? <span><a>{activity.user.name} {activity.user.lastname}</a> created a new crisis-item in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 27 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted a crisis-item  in  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 28 ? <span><a>{activity.user.name} {activity.user.lastname}</a> modified a crisis-item in <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 29 ? <span><a>{activity.user.name} {activity.user.lastname}</a> solved a crisis-item in <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 31 ? <span><a>{activity.user.name} {activity.user.lastname}</a> added {activity.content} to  <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 32 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted {activity.content} in <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 33 ? <span><a>{activity.user.name} {activity.user.lastname}</a> modified the roll of {activity.content} in <a>{activity.project.name}</a></span> :""}
                            {activity.type === 34 ? <span><a>{activity.user.name} {activity.user.lastname}</a> edited the project <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 35 ? <span><a>{activity.user.name} {activity.user.lastname}</a> closed the project <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                            {activity.type === 36 ? <span><a>{activity.user.name} {activity.user.lastname}</a> reopened the project <a href={'./' + activity.project.url + '/project'}>{activity.project.name}</a></span> :""}
                        </div>
                    </div>
                )
            });


        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(activities.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <div className="pagination"  key={number} id={number} onClick={this.handleClick}>
                    {number}
                </div>
            );
        });
            return (
            <div>
                <Tabs
                    defaultTab="one"
                >
                    <TabList>
                        <div className="row">
                            <div className="dashboard-tabs">
                                <div className="row">
                                    <div className="four columns">
                                        <Tab className="dashboard-tab" tabFor="one">Overview</Tab>

                                    </div>
                                    <div className="four columns">
                                        <Tab className="dashboard-tab" tabFor="two">Notifications</Tab>

                                    </div>
                                    <div className="four columns">
                                        <Tab className="dashboard-tab" tabFor="three">Activities</Tab>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabList>
                    <TabPanel tabId="one">
                        <div className="dashboard-tab--content">
                            <div className="dashboard-welcome">
                                <h1>{strings.getString("Welcome to Project Together")}</h1>
                                <div className="dashboard-welcome--content">
                                    <p>
                                        It seems that you are new at Project Together. Thanks for chosen for us! Now you're company is setup, you can start to invite your staff members to work together with you. After that you can create your first project.
                                        If you need help check out our documentation.
                                    </p>
                                    <a href="" className="button button-second"><i className="fas fa-plus"> </i> Create your first project</a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="six columns">
                                    <div className="dashboard-tasks">
                                        <h5>Your tasks</h5>
                                        {this.state.tasks.length === 0 ? <div className="alert alert-blue center-text">You have no tasks for the moment</div> : ""}
                                        <table className="u-full-width">
                                            <tbody>
                                            {this.state.tasks.map((task, i) => (
                                                <tr key={i}>
                                                    <td><i className="fas fa-circle dashboard-tasks--danger"> </i></td>
                                                    <td><a href={'./' + task.project.url + '/project/tasks'}>{task.title} in <b>{task.project.name}</b> {task.user_id === 0 ? "(Anyone)" : "(Personal)" }</a></td>
                                                    <td id="italic">{task.end_date === null ? "No end date" : <Timestamp time={task.end_date} precision={2} utc={false} autoUpdate={60}   />}</td>
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="six columns">
                                    <div className="dashboard-message">
                                        <h5>Message from the company</h5>
                                        <ReactMarkdown source={this.state.message} />
                                        {this.state.message.length > 0 ? "" : "This is a reserved place where administrators can post announcements. Administrators can change this text on the \"company\" page and then click on the button"}
                                    </div>
                                </div>
                            </div>
                            <div className="dashboard-news">
                                <div className="row">
                                    <div className="four columns">
                                        <div className="dashboard-news--item">
                                            <img className="dashboard-news--image"  src="/images/calender.png"/>
                                            <h6 className="dashboard-news--title"><a href="">Be organized with Calender</a></h6>
                                        </div>
                                    </div>
                                    <div className="four columns">
                                        <div className="dashboard-news--item">
                                            <img className="dashboard-news--image"  src="/images/note.jpg"/>
                                            <h6 className="dashboard-news--title"><a href="">New Update: make your notes</a></h6>
                                        </div>
                                    </div>
                                    <div className="four columns">
                                        <div className="dashboard-news--item">
                                            <img className="dashboard-news--image"  src="/images/work.jpg"/>
                                            <h6 className="dashboard-news--title"><a href="">Project Together version: 1.0</a></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel tabId="two">
                        <div className="dashboard-tab--content">
                            <div className="dashboard-notifications">
                                <div className={this.state.notificationsYesterday.length >= 0 && this.state.notificationsToday.length  >= 0 && this.state.notificationsOlder.length  >= 0 ? "hidden" : "dashboard-empty"}>
                                    <h2>No notifcations found </h2>
                                    <i className="fas fa-bell dropbtn"></i>
                                </div>
                                <div>
                                    <NotificationsToday/>
                                </div>
                                <div>
                                   <NotificationsYesterday/>
                                </div>
                               <div>
                                   <NotificationsOlder/>
                               </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel tabId="three">
                        <div className="dashboard-tab--content">
                            <div className="dashboard-activities">
                                <h4>All activities</h4>
                                <div className="dashboard-activities-line">
                                    {renderActivities}
                                </div>
                                {renderPageNumbers}
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
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
                                    <h2 className="center-text">Welcome <b>{window.Laravel.user.name}!</b></h2>
                                    <p>First, we want to thank you for choosing Project-Together. We will do everything to keep you satisfied. But before you can start, we will first go over a few things so that everything is clear to you.</p>
                                    <button className="button button-primary no-button float-right center" onClick={event => this.setState({welcome2: true, welcome1: false})}>Get started</button>
                                </div>
                                : ""}
                            {this.state.welcome2 ?
                                <div>
                                    <h2 className="center-text">Company login</h2>
                                    <img src="../images/welcome1.jpg" className="img1" />
                                    <p>Every company has a personal area where all his members can login. This means that you can't login at the homepage of Project-Together. You can <a href="login">login here.</a> We send you also an email where you can find the specific address to login.</p>
                                    <button className="button button-primary no-button float-left center" onClick={event => this.setState({welcome2: false, welcome1: true})}>Back</button>
                                    <button className="button button-primary no-button float-right center" onClick={event => this.setState({welcome2: false, welcome3: true})}>Next</button>
                                </div>
                                : ""}
                            {this.state.welcome3 ?
                                <div>
                                    <h2 className="center-text">Dashboard</h2>
                                    <div className="center-text">
                                        <i className="fas fa-tachometer-alt"> </i>
                                    </div>
                                    <p>You are currently on your dashboard. This is the central location of your account. Here you can quickly see which tasks you have to do, upcoming events, message from the company, your notifications and activities.</p>
                                    <button className="button button-primary no-button float-left center" onClick={event => this.setState({welcome3: false, welcome2: true})}>Back</button>
                                    <button className="button button-primary no-button float-right center" onClick={event => this.welcomeIsDone()}>Done</button>
                                </div>
                                : ""}
                        </div>
                    </div>
                </PopPop>
            </div>
        );
    }
}

if (document.getElementById('tabs-dashboard')) {
    ReactDOM.render(<TabsDashboard />, document.getElementById('tabs-dashboard'));
}
