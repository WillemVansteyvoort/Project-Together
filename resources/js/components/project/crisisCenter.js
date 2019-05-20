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
import {Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle} from "react-accessible-accordion";
import {ProgressBar} from "reprogressbars";
import Popup from 'reactjs-popup'
export default class ProjectCrisisCenter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            progress_items: [],
            solved_items: [],
            show: false,

            //new item
            item_title: '',
            item_description: '',
            item_priority: 0,

            error_title: '',

            //edit title
            edit_item: null,
            edit_id: 0,
            edit_title: 'ok',
            edit_description: '',
            edit_priority: 0,
            showEdit: false,

            //errors
            error_name: '',
            error_editName: '',
        };

        this.crisisCenter = this.crisisCenter.bind(this);
        this.createItem = this.createItem.bind(this);
        this.setSolved = this.setSolved.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.setProgress = this.setProgress.bind(this);
        this.editItem = this.editItem.bind(this);
    }

    componentWillMount() {
        this.getItems();
    }

    componentDidMount() {

    }


    toggleShow(show) {
        this.setState({show});
    }

    toggleEdit(showEdit) {
        this.setState({showEdit});
    }

    getItems() {
        axios.post('/api/project/crisiscenter/items', {
            project: window.Laravel.data.project,
        }).then(response => {
            this.setState({
                loading: false,
                progress_items: response.data.progress,
                solved_items: response.data.solved,
            });
        });
    }

    createItem() {

        let errors= false;
        if(this.state.item_title.length < 5) {
            errors = true;
            this.setState({error_name: 'The title must have at least 5 characters'})
        } else {
            this.setState({error_name: ''})
        }

        if(!errors) {
            axios.post('/api/project/crisiscenter/create', {
                project: window.Laravel.data.project,
                item_title: this.state.item_title,
                item_description: this.state.item_description,
                item_priority: this.state.item_priority,

            }).then(response => {
                this.setState({
                    item_title: '',
                    item_description: '',
                    item_priority: 0,
                    solved_items: response.data.solved,
                    progress_items: response.data.progress,
                    show: false,
                });
            });
        }
    }

    setSolved(item) {
        if(!window.Laravel.data.ended && window.Laravel.data.role !== 0 && (item.user_id === window.Laravel.user.id || window.Laravel.data.role === 2 || window.Laravel.data.role === 3 )) {
            axios.post('/api/project/crisiscenter/solved', {
                id: item.id,
                project: window.Laravel.data.project,
            }).then(response => {
                this.setState({
                    solved_items: response.data.solved,
                    progress_items: response.data.progress,
                });
            });
        }
    }

    setProgress(id, item) {
        if(!window.Laravel.data.ended && window.Laravel.data.role !== 0 && (item.user_id === window.Laravel.user.id || window.Laravel.data.role === 2 || window.Laravel.data.role === 3 )) {
            if(confirm("Are you sure you want to reopen this item?")) {
                axios.post('/api/project/crisiscenter/progress', {
                    id: id,
                    project: window.Laravel.data.project,
                }).then(response => {
                    this.setState({
                        solved_items: response.data.solved,
                        progress_items: response.data.progress,
                    });
                });
            }
        }
    }

    deleteItem(id) {
        if(confirm("Are you sure you want to delete this item?")) {
            axios.post('/api/project/crisiscenter/delete', {
                id: id,
                project: window.Laravel.data.project,
            }).then(response => {
                this.setState({
                    solved_items: response.data.solved,
                    progress_items: response.data.progress,
                });
            });
        }
    }

    editItem() {
        if(this.state.edit_title.length >= 5) {
            this.setState({error_editName: ""});
            axios.post('/api/project/crisiscenter/edit', {
                project: window.Laravel.data.project,
                id: this.state.edit_item.id,
                item_title: this.state.edit_title,
                item_description: this.state.edit_description,
                item_priority: this.state.edit_priority,
                $        }).then(response => {
                this.setState({
                    solved_items: response.data.solved,
                    progress_items: response.data.progress,
                    showEdit: false,
                });
            });
        } else {
            this.setState({error_editName: "The title must have at least 5 characters"})
        }


    }

    crisisCenter() {
        return (
            <div>
                <h5>Crisis items</h5>
                {this.state.progress_items.length === 0 && !this.state.loading ? <div className="alert-green alert center-text">Nothing to solve for the moment</div>: ""}
                    {this.state.progress_items.map((item, i)=> (
                        <div key={i} className="item">
                            <Accordion>

                                    <AccordionItem>
                                        <AccordionItemTitle>
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td className="title"><b>{item.name}</b></td>
                                                    <td className="time"><Timestamp className="time" time={item.created_at} precision={1} utc={false} autoUpdate={60}/></td>
                                                    <td>
                                                        {item.priority === 0 ? <span><i className="fas fa-circle p1"> </i> Low Priority</span>  : ""}
                                                        {item.priority === 1 ? <span><i className="fas fa-circle p2"> </i> Medium Priority</span>  : ""}
                                                        {item.priority === 2 ? <span><i className="fas fa-circle p3"> </i> High Priority</span>  : ""}

                                                    </td>
                                                    <td className="float-right"><button onClick={event => this.setSolved(item)} className="button button-primary no-button">In progress</button></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </AccordionItemTitle>
                                        <AccordionItemBody>
                                            <div className="row">
                                                <div className="six columns">
                                                    <h5>Description</h5>
                                                    {item.description}
                                                </div>
                                                <div className="six columns">
                                                    <h5>Creator</h5>
                                                    <a href={"/" +  window.Laravel.company.url + "/" + item.user.username + "/profile/"}>{item.user.name} {item.user.lastname}</a>
                                                </div>
                                            </div>
                                            {!window.Laravel.data.ended && item.user_id === window.Laravel.user.id || window.Laravel.data.role !== 0 || window.Laravel.data.role !== 1  ?
                                                <div className="float-right">

                                                <i className="fas fa-edit" onClick={e => this.setState({edit_item: item, edit_description: item.description, edit_title: item.name, edit_priority: item.priority, edit_id: item.id, showEdit: true})}> </i>
                                                <i className="fas fa-trash-alt" onClick={event => this.deleteItem(item.id)}> </i>
                                            </div>
                                                : ""}
                                            <div className="clear"> </div>
                                        </AccordionItemBody>
                                    </AccordionItem>
                            </Accordion>
                            </div>
                    ))}
                {this.state.solved_items.length > 0 ? <h5>Solved items</h5> : ""}
                {this.state.solved_items.map((item, i)=> (
                    <div key={i} className="item">
                        <Accordion>

                            <AccordionItem>
                                <AccordionItemTitle>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td className="title"><b>{item.name}</b></td>
                                            <td className="time"><Timestamp className="time" time={item.solvedTime} precision={1} utc={false} autoUpdate={60}/></td>
                                            <td>
                                                {item.priority === 0 ? <span><i className="fas fa-circle p1"> </i> Low Priority</span>  : ""}
                                                {item.priority === 1 ? <span><i className="fas fa-circle p2"> </i> Medium Priority</span>  : ""}
                                                {item.priority === 2 ? <span><i className="fas fa-circle p3"> </i> High Priority</span>  : ""}

                                            </td>
                                            <td className="float-right"><button onClick={event => this.setProgress(item.id, item)} className="button button-primary no-button">Solved</button></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </AccordionItemTitle>
                                <AccordionItemBody>
                                    <div className="row">
                                        <div className="six columns">
                                            <h5>Description</h5>
                                            {item.description}
                                        </div>
                                        <div className="six columns">
                                            <h5>Solved by</h5>
                                            <a href={"/" +  window.Laravel.company.url + "/" + item.user.username + "/profile/"}>{item.user.name} {item.user.lastname}</a>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="six columns">
                                            <h5>Created</h5>
                                            <Timestamp className="time" time={item.created_at} precision={1} utc={false} autoUpdate={60}/>
                                        </div>
                                        <div className="six columns">
                                            <h5>Solved</h5>
                                            <Timestamp className="time" time={item.solvedTime} precision={1} utc={false} autoUpdate={60}/>
                                        </div>
                                    </div>
                                    <div className="float-right">
                                        {!window.Laravel.data.ended && window.Laravel.data.role !== 0 && (item.user_id === window.Laravel.user.id || window.Laravel.data.role === 2 || window.Laravel.data.role === 3) ?
                                            <span>
                                        <i className="fas fa-edit" onClick={e => this.setState({edit_item: item, edit_description: item.description, edit_title: item.name, edit_priority: item.priority, edit_id: item.id, showEdit: true})}> </i>
                                        <i className="fas fa-trash-alt" onClick={event => this.deleteItem(item.id)}> </i>
                                            </span>
                                            : ""}
                                    </div>
                                    <div className="clear"> </div>
                                </AccordionItemBody>
                            </AccordionItem>
                        </Accordion>
                    </div>
                ))}
            </div>
        )
    }


    render() {
        const {show} = this.state;
        const {showEdit} = this.state;
        return (
            <span>
                <Popup trigger={<button className="project-header-plus no-button no-padding ">
                    <i className="fas fa-question"> </i>
                </button>} position="top left">
                {close => (
                    <div className="popup-sidebar">
                        <h2>Crisis center</h2>
                        <p>The crisis center is meant for important faults or bugs that have to be solved immediately.</p>
                        <h5>Make a crisis item</h5>
                        <p>You can create a new item by clicking on the "plus" icon at the top on the right. A popup will appear where you must enter the title, description and the priority of the item.
                        </p>
                        <p className="center-text"><img src="/images/help/icons.JPG" width="150px" /></p>
                        <h5>Item as solved</h5>
                        <p>If you want to designate a crisis item as "resolved", click the "in progress" button on the far right. The item will now be moved to the solved items. Only the creator, the leaders and the responsables can solve an item.</p>
                        <p className="center-text"><img src="/images/help/crisisItem.JPG"  /></p>
                        <h5>Modify an item</h5>
                        <p>The owner of a item, the leaders or the responsables can modify items. Click on the item you want to modify. When you clicked the popup will collaps. On the bottom at he right you find the "pencil" icon where you can modify the crisis item.</p>
                        <h5>Delete an item</h5>
                        <p>The owner of a item, the leaders or the responsables can delete items. Click on the item you want to modify. When you clicked the popup will collaps. On the bottom at he right you find the "trash" icon where you can delete the crisis item.</p>
                        <p><b>See more on the <a href="/docs">documentation</a> page.</b></p>
                    </div>
                )}
                 </Popup>
                {!window.Laravel.data.ended && window.Laravel.data.role !== 0   ?
                 <button className="project-header-plus no-button test" onClick={() => this.toggleShow(true)}>
                    <i className="fas fa-plus"> </i>
                </button>
                    : ""}
                <main className="project-main">
                <div className="project-crisiscenter">
                    <div className="row">
                        <div className="four columns">
                            <div className="project-crisiscenter-left">
                                <h5><i className="fas fa-question"></i> What's crisis center?</h5>
                                <div className="info">
                                    The crisis center is meant for important faults or bugs that have to be solved immediately.

                                </div>
                                <h5><i className="fas fa-exclamation"></i> Priorities</h5>
                                <div className="info">
                                    There are three types of priorities: low, medium and high.
                                    <div className="priority">
                                        <span className="tag tag-green">Low</span>
                                        <span className="tag tag-yellow">Medium</span>
                                        <span className="tag tag-red">High</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="eight columns">
                            <div className="project-crisiscenter-right">

                                {this.state.loading ?
                                    <div className="project-loading">
                                        <div className="loader">Loading...</div>
                                    </div>
                                    : "" }
                                {((this.state.progress_items.length === 0 && this.state.solved_items.length === 0) && !this.state.loading)  ?
                                    <div className="project-loading">
                                        <i className="fab fa-centercode"> </i>
                                        <h4>Nothing to worry!</h4>
                                    </div>
                                    : this.crisisCenter()}
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
                            Make a new item
                            <button className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</button>
                        </div>
                        <div className="popup-content">
                            <div className="row">
                                <div className="six columns">
                                    <label>Title</label>
                                    <div id="red">{this.state.error_name}</div>
                                    <input type="text" onChange={e => this.setState({ item_title: e.target.value })} value={this.state.item_title} />
                                </div>
                                <div className="six columns">
                                    <label>Priority</label>
                                    <select onChange={event => this.setState({item_priority: event.target.value})}>
                                        <option value="0">Low</option>
                                        <option value="1">Medium</option>
                                        <option value="2">High</option>
                                    </select>
                                </div>
                            </div>
                            <label>Description</label>
                            <textarea onChange={event => this.setState({item_description: event.target.value})}></textarea>
                            <div>
                            </div>
                            <button className="button-primary button no-button" onClick={this.createItem}>Make item</button>
                        </div>
                    </div>
                </PopPop>

                <PopPop
                    open={showEdit}
                    closeOnEsc={true}
                    onClose={() => this.toggleEdit(false)}
                    closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            Edit an item
                            <button className="popup-btn--close"  onClick={() => this.toggleEdit(false)}>✕</button>
                        </div>
                        <div className="popup-content">
                            <div className="row">
                                <div className="six columns">
                                    <label>Title</label>
                                    <div id="red">{this.state.error_editName}</div>
                                    <input type="text" onChange={e => this.setState({ edit_title: e.target.value })} value={this.state.edit_title} />
                                </div>
                                <div className="six columns">
                                    <label>Priority</label>
                                    <select onChange={event => this.setState({edit_priority: event.target.value})}>
                                        <option value="0">Low</option>
                                        <option value="1">Medium</option>
                                        <option value="2">High</option>
                                    </select>
                                </div>
                            </div>
                            <label>Description</label>
                            <textarea onChange={event => this.setState({edit_priority: event.target.value})} value={this.state.edit_description}> </textarea>
                            <div>
                            </div>
                            <button className="button-primary button no-button" onClick={this.editItem}>Edit item</button>
                        </div>
                    </div>
                </PopPop>
            </span>
        );
    }
}

if (document.getElementById('project-crisis')) {
    ReactDOM.render(<ProjectCrisisCenter />, document.getElementById('project-crisis'));
}
