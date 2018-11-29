import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
const Timestamp = require('react-timestamp');
import NotificationsToday from './notifcations/today';
import NotificationsYesterday from './notifcations/yesterday';
import NotificationsOlder from './notifcations/older';
export default class TabsDashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notificationsToday: [],
            notificationsYesterday: [],
            notificationsOlder: [],
            todos: [{"id":1,"user_id":1,"title":"dfgdfg","type":"d","content":"dfgdfgdfgdf","read":0,"created_at":"2018-11-06 00:00:00","updated_at":null},{"id":2,"user_id":1,"title":"dfgdfg","type":"d","content":"dfgdfgdfgdf","read":0,"created_at":"2018-11-08 00:00:00","updated_at":null},{"id":3,"user_id":1,"title":"dfgdfg","type":"d","content":"dfgdfgdfgdf","read":0,"created_at":"2018-11-09 00:00:00","updated_at":null}],
            currentPage: 1,
            todosPerPage: 4
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
        axios.get('/api/notifcations/noticationsOlder/').then((
            response
            ) =>
                this.setState({
                    notificationsOlder: response.data,
                })
        );
    }
    render() {
        const { notificationsToday, currentPage, todosPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = notificationsToday.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((notification, index) => {
            return (
                    <article key={index} className={notification.read > 0 ? "" : ""}>
                            <ul className="dashboard-notifications-item">
                                <li className="dashboard-notifications-item--time"><Timestamp time={notification.created_at} precision={1} utc={false}/></li>
                                <li className="dashboard-notifications-item--icon"><i className={notification.type}> </i></li>
                            </ul>
                            <div className="dashboard-notifications-item--content">
                                <b>{notification.title}</b>
                                <p>{notification.content}</p>
                            </div>
                            <div className="dashboard-notifications--line clear"> </div>
                        </article>
                )
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(notificationsToday.length / todosPerPage); i++) {
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
                    onChange={(tabId) => { console.log(tabId) }}
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
                                        </table>
                                    </div>
                                </div>
                                <div className="six columns">
                                    <div className="dashboard-message">
                                        <h5>Message from the company</h5>
                                        <p>
                                            Nunc posuere sollicitudin ipsum id feugiat. <a>Nunc rhoncus</a> nisl quis massa venenatis ultricies. Morbi eleifend faucibus orci ac consectetur. Etiam vitae pharetra neque. Sed pulvinar magna ut neque convallis fringilla. Aliquam ultricies quam eu eros laoreet faucibus.
                                        </p>
                                        <p>
                                            Integer a ipsum quis justo sollicitudin accumsan ac a lectus. Nulla dapibus hendrerit dui, finibus tincidunt arcu rutrum et. Donec rhoncus tincidunt eleifend. Donec quis elit libero. Donec semper quis turpis ut mollis. Nullam vitae libero quis libero placerat tristique.

                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="dashboard-news">
                                <div className="row">
                                    <div className="four columns">
                                        <div className="dashboard-news--item">
                                            <img className="dashboard-news--image"  src="images/calender.png"/>
                                            <h6 className="dashboard-news--title"><a href="">Be organized with Calender</a></h6>
                                        </div>
                                    </div>
                                    <div className="four columns">
                                        <div className="dashboard-news--item">
                                            <img className="dashboard-news--image"  src="images/note.jpg"/>
                                            <h6 className="dashboard-news--title"><a href="">New Update: make your notes</a></h6>
                                        </div>
                                    </div>
                                    <div className="four columns">
                                        <div className="dashboard-news--item">
                                            <img className="dashboard-news--image"  src="images/work.jpg"/>
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
                                    <div className="dashboard-activities-item">
                                    <span className="dashboard-activities-item--time">
                                        12u40
                                    </span>
                                        <div className="dashboard-activities-item--content">
                                            <a>Willem Vansteyvoort</a> created a new post in <a>PekesFuif 2018</a>
                                        </div>
                                    </div>
                                    <div className="dashboard-activities-item">
                                    <span className="dashboard-activities-item--time">
                                        08u30
                                    </span>
                                        <div className="dashboard-activities-item--content">
                                            <a>Johan De boer</a> has marked a task as done in <a>Pekesfuif 2018</a>
                                        </div>
                                    </div>
                                    <div className="dashboard-activities-item">
                                    <span className="dashboard-activities-item--time">
                                        4 mar.
                                    </span>
                                        <div className="dashboard-activities-item--content">
                                            The end date of <a>PekesFuiif 2018</a> has been updated to 24/02/2019
                                        </div>
                                    </div>
                                    <div className="dashboard-activities-item">
                                    <span className="dashboard-activities-item--time">
                                        12 feb.
                                    </span>
                                        <div className="dashboard-activities-item--content">
                                            <a>Willem Vansteyvoort</a> uploaded a new file in <a>Pekesfuuif 2018</a> named: "Sponsor fiches"
                                        </div>
                                    </div>
                                    <div className="dashboard-activities-item">
                                    <span className="dashboard-activities-item--time">
                                        1 jan.
                                    </span>
                                        <div className="dashboard-activities-item--content">
                                            The name of <a>Pekesfuif 2017</a> is changed to <a>Pekesfuif 2019</a>
                                        </div>
                                    </div>
                                </div>
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
