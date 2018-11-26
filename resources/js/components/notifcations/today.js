import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
const Timestamp = require('react-timestamp');
export default class NotificationsToday extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notificationsToday: [],
            currentPage: 1,
            perPage: 4
        };
        //bind
        this.notificationsToday = this.notificationsToday.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    componentWillMount() {
        this.notificationsToday();
    }


    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
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
    render() {
        const { notificationsToday, currentPage, perPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * perPage;
        const indexOfFirstTodo = indexOfLastTodo - perPage;
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
        for (let i = 1; i <= Math.ceil(notificationsToday.length / perPage); i++) {
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
                <span className={this.state.notificationsToday.length === 0 ? "hidden" : "dashboard-notifications--day"}>TODAY</span>
                <div className={this.state.notificationsToday.length === 0 ? "hidden" : "dashboard-notifications-items"}>
                    {renderTodos}
                </div>
                {this.state.notificationsToday.length <= this.state.perPage? '':  <ul id="page-numbers">
                    {renderPageNumbers}
                </ul> }
            </div>
        );
    }
}

if (document.getElementById('notifications-today')) {
    ReactDOM.render(<NotificationsToday />, document.getElementById('notifications-today'));
}
