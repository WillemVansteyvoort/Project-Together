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
import Notification from "../notification";
import Board from 'react-trello-for-timeline'
export default class ProjectTasks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            show: false,
            users: [],

            //new card


        };

    }

    getUsers() {
        axios.get('/api/company/users').then((
            response
            ) =>
                this.setState({
                    users: response.data,})
        );
    }



    componentWillMount() {
    }

    componentDidMount() {
    }


    toggleShow(show) {
        this.setState({show});
    }


    render() {

        return (
            <span>
                <button className="project-header-plus no-button test" onClick={() => this.toggleShow(true)}>
                    <i className="fas fa-plus"> </i>
                </button>
                <main className="project-main">
                    <div className="project-tasks">
                        <div className="row">
                            <div className="twelve columns">
                                <h5>All tasks</h5>
                            </div>
                    </div>
                    </div>
                </main>
            </span>
        );
    }
}

if (document.getElementById('project-tasks')) {
    ReactDOM.render(<ProjectTasks />, document.getElementById('project-tasks'));
}
