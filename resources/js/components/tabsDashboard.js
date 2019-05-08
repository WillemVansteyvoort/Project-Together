import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
const Timestamp = require('react-timestamp');
import NotificationsToday from './notifcations/today';
import NotificationsYesterday from './notifcations/yesterday';
import NotificationsOlder from './notifcations/older';
import FileUploader from './others/fileUploader';
const ReactMarkdown = require('react-markdown');
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
        };
        //bind
        this.notificationsToday = this.notificationsToday.bind(this);
        this.notificationsYesterday = this.notificationsYesterday.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    componentWillMount() {
        this.notificationsOlder();
        this.notificationsToday();
        this.notificationsYesterday();
        this.activities();
        this.message();
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
                            {activity.type === 0 ? <span><a>{activity.user.name} {activity.user.lastname}</a> has created the project <a>{activity.project.name}</a></span> :""}
                            {activity.type === 2 ? <span>There's a new note is created in  <a>{activity.project.name}</a> by <a>{activity.user.name} {activity.user.lastname}</a></span> :""}
                            {activity.type === 3 ? <span><a>{activity.user.name} {activity.user.lastname}</a> created a new thread in <a>{activity.project.name}</a></span> :""}
                            {activity.type === 4 ? <span><a>{activity.user.name} {activity.user.lastname}</a> replied on a thread in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 5 ? <span><a>{activity.user.name} {activity.user.lastname}</a> created a new task list in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 6 ? <span><a>{activity.user.name} {activity.user.lastname}</a> created a new tak in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 7 ? <span><a>{activity.user.name} {activity.user.lastname}</a> verified a task as done in <a>{activity.project.name}</a></span> :""}
                            {activity.type === 8 ? <span><a>{activity.user.name} {activity.user.lastname}</a> reopened a task  in <a>{activity.project.name}</a></span> :""}
                            {activity.type === 9 ? <span><a>{activity.user.name} {activity.user.lastname}</a> edited a task in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 10 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted a task in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 11 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted a note in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 12 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted a thread  in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 13 ? <span><a>{activity.user.name} {activity.user.lastname}</a> edited a thread  in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 14 ? <span><a>{activity.user.name} {activity.user.lastname}</a> edited a reply in <a>{activity.project.name}</a></span> :""}
                            {activity.type === 15 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted a reply  in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 16 ? <span><a>{activity.user.name} {activity.user.lastname}</a> created a new card on the board  in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 17 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted a card from the board in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 18 ? <span><a>{activity.user.name} {activity.user.lastname}</a> edited a card from the board in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 19 ? <span><a>{activity.user.name} {activity.user.lastname}</a> created a new poll in <a>{activity.project.name}</a></span> :""}
                            {activity.type === 20 ? <span><a>{activity.user.name} {activity.user.lastname}</a> voted on a poll in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 21 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted his vote on a poll  in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 22 ? <span><a>{activity.user.name} {activity.user.lastname}</a> edited a poll in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 23 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted a poll  in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 24 ? <span><a>{activity.user.name} {activity.user.lastname}</a> created a new log in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 25 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted a log  in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 26 ? <span><a>{activity.user.name} {activity.user.lastname}</a> created a new crisis-item in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 27 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted a crisis-item  in  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 28 ? <span><a>{activity.user.name} {activity.user.lastname}</a> modified a crisis-item in <a>{activity.project.name}</a></span> :""}
                            {activity.type === 29 ? <span><a>{activity.user.name} {activity.user.lastname}</a> solved a crisis-item in <a>{activity.project.name}</a></span> :""}
                            {activity.type === 31 ? <span><a>{activity.user.name} {activity.user.lastname}</a> added {activity.content} to  <a>{activity.project.name}</a></span> :""}
                            {activity.type === 32 ? <span><a>{activity.user.name} {activity.user.lastname}</a> deleted {activity.content} in <a>{activity.project.name}</a></span> :""}
                            {activity.type === 33 ? <span><a>{activity.user.name} {activity.user.lastname}</a> modified the roll of {activity.content} in <a>{activity.project.name}</a></span> :""}
                            {activity.type === 34 ? <span><a>{activity.user.name} {activity.user.lastname}</a> edited the project <a>{activity.project.name}</a></span> :""}
                            {activity.type === 35 ? <span><a>{activity.user.name} {activity.user.lastname}</a> closed the project <a>{activity.project.name}</a></span> :""}
                            {activity.type === 36 ? <span><a>{activity.user.name} {activity.user.lastname}</a> reopened the project <a>{activity.project.name}</a></span> :""}
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
                                <h1>Welcome to Project Together!</h1>
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
                                        <table className="u-full-width">
                                            <tbody>
                                                <tr>
                                                    <td><i className="fas fa-circle dashboard-tasks--danger"> </i></td>
                                                    <td><a href="">Verslag voor vergadering maken en doorsturen</a></td>
                                                    <td id="italic">10 minutes</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fas fa-circle dashboard-tasks--normal"> </i></td>
                                                    <td><a href="">Facebook evenement aanmaken en mensen uitnodigen</a></td>
                                                    <td id="italic">not estimated</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fas fa-circle dashboard-tasks--medium"> </i></td>
                                                    <td><a href="">Contacteren Coca Cola voor sponsoring</a></td>
                                                    <td id="italic">not estimated</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fas fa-circle dashboard-tasks--normal"> </i></td>
                                                    <td><a href="">Facebook evenement aanmaken en mensen uitnodigen</a></td>
                                                    <td id="italic">Two days</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="six columns">
                                    <div className="dashboard-message">
                                        <h5>Message from the company</h5>
                                        <ReactMarkdown source={this.state.message} />
                                        {this.state.message.length > 0 ? "" : "This is a reserved place where administrators can post announcements. Administrators can change this text on the \"company\" page and then click on the button."}
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
            </div>
        );
    }
}

if (document.getElementById('tabs-dashboard')) {
    ReactDOM.render(<TabsDashboard />, document.getElementById('tabs-dashboard'));
}
