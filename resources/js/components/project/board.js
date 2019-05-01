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
var test = "test";
export default class ProjectBoard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            show: false,
            tasks: [],
            columns: [],
            users: [],

            //new card
            card_name: '',
            card_description: '',
            card_color: '',
            card_user: 0,
            card_expected: '',

            //edit card
            selected_card: [],
            show_edit: false,
            editCard_name: '',
            editCard_description: '',
            editCard_color: '',
            editCard_user: 0,
            editCard_expected: '',
        };

        this.createCard = this.createCard.bind(this);
        this.editCard = this.editCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.openItem = this.openItem.bind(this);
    }

    getItems() {
        axios.post('/api/project/board/items', {
            project: window.Laravel.data.project,
        }).then(response => {
            this.setState({
                tasks: response.data,
                selected_card: response.data[0]
            });
        });
    }
    getUsers() {
        axios.get('/api/company/users').then((
            response
            ) =>
                this.setState({
                    users: response.data,})
        );
    }

    createCard() {
        this.setState({show: false,})
        axios.post('/api/project/board/createItem', {
            project: window.Laravel.data.project,
            card_name: this.state.card_name,
            card_description: this.state.card_description,
            card_color: this.state.card_color,
            card_user: this.state.card_user,
            card_expected: this.state.card_expected,
        }).then(response => {
            this.setState({
                card_name: '',
                show: false,
                card_description: '',
                card_color: '',
                card_user: '',
                tasks: [response.data,...this.state.tasks],
                card_expected: '',
            });
        });
    }

    editCard() {
        this.setState({show_edit: false,})
        axios.post('/api/project/board/editItem', {
            project: window.Laravel.data.project,
            editCard_id: this.state.selected_card.id,
            editCard_name: this.state.editCard_name,
            editCard_description: this.state.editCard_description,
            editCard_color: this.state.editCard_color,
            editCard_user: this.state.editCard_user,
            editCard_expected: this.state.editCard_expected,
        }).then(response => {
            this.getItems();
            this.setState({
                card_name: '',
                card_description: '',
                card_color: '',
                card_user: '',
                card_expected: '',
            });
        });
    }

    deleteCard() {
        if (confirm('Are you sure you want to delete this card?')) {
            this.setState({show_edit: false,})
            axios.post('/api/project/board/deleteItem', {
                id: this.state.selected_card.id,
            }).then(response => {
                this.getItems();
            });
        }
    }

    getColumns() {
        axios.post('/api/project/board/columns', {
            project: window.Laravel.data.project,
        }).then(response => {
            this.setState({
                columns: response.data,
                loading: false,
            });


        });
    }

    componentWillMount() {
        this.getItems();
        this.getColumns();
        this.getUsers();
    }

    componentDidMount() {
    }


    toggleShow(show) {
        this.setState({show});
    }

    toggleShowEdit(show_edit) {
        this.setState({show_edit});
    }

    onDragOver(ev) {
        ev.preventDefault();
    }

    onDragStart(ev, id) {
        ev.dataTransfer.setData("id", id);
    }

    openItem(t) {
        if(!window.Laravel.data.ended) {
            this.setState({selected_card: t, show_edit: true, editCard_name: t.name, editCard_description: t.description, editCard_expected: t.duration, editCard_color: t.color, editCard_user: t.user_id})
        }
    }
    onDrop (ev, cat) {
        console.log(id);
        let id = ev.dataTransfer.getData("id");
        let currentTask = null;
        let tasks = this.state.tasks.filter((task) => {
            if (task.id == id) {
                task.column.name = cat;
                currentTask = task;
            }
            return task;
        });
        this.setState({
            ...this.state,
            tasks
        });

        axios.post('/api/project/board/changeColumn', {
            id: currentTask.id,
            project: window.Laravel.data.project,
            column: currentTask.column.name,
        }).then(response => {
            this.setState({

            });


        });

    }


    render() {
        const {show} = this.state;
        const {show_edit} = this.state;


        if(!this.state.loading) {
            var tasks = {
            }

            for(let i = 0; i < this.state.columns.length; i++) {
                tasks[this.state.columns[i]] = [];
            }

            this.state.tasks.forEach ((t) => {
                tasks[t.column.name].push(
                    <div
                        key={t.id}
                        className="project-board-item"
                        onDragStart = {(e) => this.onDragStart(e, t.id)}
                        onClick= {(e) => this.openItem(t)}
                        draggable >
                        <div className={t.color === "red" ? "project-board-item-content border-" + t.color : "project-board-item-content border-grey"}>
                            <h6 className="title"> {t.name}</h6>
                            {t.description}
                            <span className="project-board-item-content--duration">{t.duration}</span>
                            {t.user_id !== 0 ?  <p><img src={t.user.avatar} /></p> : ""}
                        </div>
                    </div>
                );
            });
        }

        return (
            <span>
                {!window.Laravel.data.ended ?  <button className="project-header-plus no-button test" onClick={() => this.toggleShow(true)}>
                        <i className="fas fa-plus"> </i>
                    </button> : ""}
                <main className="project-board">
                    {this.state.loading ?
                        <div className="project-loading">
                            <div className="loader">Loading...</div>
                        </div>
                        :
                        <div className="row">
                            {this.state.columns.map((column, i) => (
                                <div className="three columns">
                                    <h5> {column} <span className="tag tag-primary">{tasks[column].length}</span></h5>
                                    <div
                                        className="project-board-row"
                                        onDragOver={(e)=>this.onDragOver(e)}
                                        onDrop={(e)=>{this.onDrop(e, column)}}
                                    >
                                        {tasks[column]}
                                    </div>
                                </div>
                            ))}
                            <div className="three columns">
                                {Object.keys(tasks).length === 4 ?
                                    ""
                                    :
                                    <div className="project-board-column">
                                        <i className="fas fa-plus button-primary button"> </i>
                                        <h5>Add new column</h5>
                                    </div>
                                }
                            </div>
                        </div>
                    }
            </main>
                <PopPop
                    open={show}
                    closeOnEsc={true}
                    onClose={() => this.toggleShow(false)}
                    closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            Make a new card {test}
                        </div>
                            <button className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</button>
                        <div className="popup-content">
                             <div className="row">
                                <div className="twelve columns">
                                    <label>Name of the card</label>
                                    <input type="text" onChange={e => this.setState({ card_name: e.target.value })} value={this.state.card_name}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="twelve columns">
                                    <label>Description of the card</label>
                                    <textarea onChange={e => this.setState({ card_description: e.target.value })} value={this.state.card_description}> </textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="six columns">
                                     <label>Expected Time</label>
                                    <input type="text" onChange={e => this.setState({ card_expected: e.target.value })} value={this.state.card_expected}/>
                                </div>
                                <div className="six columns">
                                    <label>Card for</label>
                                        <select  onChange={e => this.setState({ card_user: e.target.value })} >
                                            <option onChange={e => this.setState({ card_user: 0})}  value="0">Everyone</option>
                                            {this.state.users.map(user => (
                                                <option onChange={e => this.setState({ card_user: user.id })} key={user.id} value={user.id}>{user.name}</option>
                                            ))}
                                        </select>
                                </div>
                            </div>
                             <div className="row">
                                <div className="twelve columns">
                                    <label>Choose card color</label>
                                    <button onClick={e => this.setState({ card_color: 'grey'})} className="popup-event-colors popup-event-colors--grey no-button"> </button>
                                    <button onClick={e => this.setState({ card_color: 'red'})} className="popup-event-colors popup-event-colors--red no-button"> </button>
                                    <button onClick={e => this.setState({ card_color: 'blue' })} className="popup-event-colors popup-event-colors--blue no-button"> </button>
                                    <button onClick={e => this.setState({ card_color: 'green'})} className="popup-event-colors popup-event-colors--green no-button"> </button>
                                </div>
                             </div>
                            <button className="button-primary button no-button" onClick={this.createCard}>Make card</button>
                        </div>
                    </div>
                </PopPop>

                <PopPop
                    open={show_edit}
                    closeOnEsc={true}
                    onClose={() => this.toggleShowEdit(false)}
                    closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            Edit this card
                        </div>
                            <button className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</button>
                            <div className="popup-content">
                                <div className="row">
                                    <div className="twelve columns">
                                        <label>Name of the card</label>
                                        <input type="text" onChange={e => this.setState({ editCard_name: e.target.value })} value={this.state.editCard_name} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="twelve columns">
                                        <label>Description of the card</label>
                                        <textarea onChange={e => this.setState({ editCard_description: e.target.value })} value={this.state.editCard_description}> </textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="six columns">
                                        <label>Expected Time</label>
                                        <input type="text" onChange={e => this.setState({ editCard_expected: e.target.value })} value={this.state.editCard_expected}/>
                                    </div>
                                    <div className="six columns">
                                        <label>Card for</label>
                                        <select  onChange={e => this.setState({ editCard_user: e.target.value })} >
                                            <option onChange={e => this.setState({ editCard_user: 0})}  value="0">Everyone</option>
                                            {this.state.users.map(user => (
                                                <option onChange={e => this.setState({ editCard_user: user.id })} key={user.id} value={user.id}>{user.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="twelve columns">
                                        <label>Choose card color</label>
                                        <button onClick={e => this.setState({ editCard_color: 'grey'})} className="popup-event-colors popup-event-colors--grey no-button"> </button>
                                        <button onClick={e => this.setState({ editCard_color: 'red'})} className="popup-event-colors popup-event-colors--red no-button"> </button>
                                        <button onClick={e => this.setState({ editCard_color: 'blue' })} className="popup-event-colors popup-event-colors--blue no-button"> </button>
                                        <button onClick={e => this.setState({ editCard_color: 'green'})} className="popup-event-colors popup-event-colors--green no-button"> </button>
                                    </div>
                                </div>
                                <button className="button-primary button no-button" onClick={this.editCard}>Edit card</button>
                                <button className="button-red button no-button" onClick={this.deleteCard}>Delete</button>
                            </div>
                    </div>
                </PopPop>
            </span>
        );
    }
}

if (document.getElementById('project-board')) {
    ReactDOM.render(<ProjectTasks />, document.getElementById('project-board'));
}
