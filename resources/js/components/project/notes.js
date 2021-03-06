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
import Popup from 'reactjs-popup'
import LocalizedStrings from 'localized-strings';
import en from '../lang/en.json';
import nl from '../lang/nl.json';

let strings = new LocalizedStrings({en,nl})
var months = new Array(11);
months[0] = "JAN";
months[1] = "FEB";
months[2] = "MAR";
months[3] = "APR";
months[4] = "MAY";
months[5] = "JUN";
months[6] = "JUL";
months[7] = "AUG";
months[8] = "SEP";
months[9] = "OCT";
months[10] = "NOV";
months[11] = "DEC";
months[12] = "JAN";
var roles  = [
    {
        value: "member",
        label: "Member"
    },
    {
        value: "watcher",
        label: "Watcher"
    },
    {
        value: "responsable",
        label: "Responsable"
    },
    {
        value: "leader",
        label: "Leader"
    },

]
export default class ProjectNotes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            notes: [],
            show: false,


            //new note
            note_private: false,
            note_title: '',
            note_text: '',
            created: false,
            created_timer: 0,

            //errors
            error_title: '',
            error_text: '',
        };

        this.notes = this.notes.bind(this);
        this.getNotes = this.getNotes.bind(this);
        this.createNote = this.createNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    componentWillMount() {
        strings.setLanguage(window.Laravel.lang);
        this.getNotes();
    }

    componentDidMount() {
    }
    componentWillUnmount() {
    }

    getNotes() {
        axios.post('/api/project/notes/all', {
            project: window.Laravel.data.project,
        }).then(response => {
            this.setState({
                loading: false,
                notes: response.data,
            });
        });
    }

    toggleShow(show) {
        this.setState({show});
    }


    createNote() {

        let errors= false;
        if(this.state.note_title.length < 3) {
            errors = true;
            this.setState({error_title: 'The title must have at least 4 characters'})
        } else {
            this.setState({error_title: ''})
        }

        if(this.state.note_text.length <= 5) {
            errors = true;
            this.setState({error_text: 'The description must have at least 5 characters'})
        } else {
            this.setState({error_text: ''})
        }

        if(!errors) {
            axios.post('/api/project/notes/create', {
                project: window.Laravel.data.project,
                title: this.state.note_title,
                text: this.state.note_text,
                private: this.state.note_private,
            }).then(response => {
                this.setState({
                    created: true,
                    note_title: '',
                    note_text: '',
                    show: false,
                });
                this.getNotes();
            });
        }
    }

    deleteNote(id) {
        console.log(id);
        if (confirm('Are you sure you want to delete this note?')) {
            axios.post('/api/project/notes/delete', {
                id: id,
            }).then(response => {
                this.setState({
                });
                this.getNotes();
            });
        }
    }

    notes() {
        return (
            <div className="project-notes">
                <div className="project-notes-items">
                    {this.state.notes.map((note, i)=> (
                        <li key={i}>
                        <span href="#">
                            {!window.Laravel.data.ended && window.Laravel.data.role !== 0 && (note.user_id === window.Laravel.user.id || window.Laravel.data.role === 2 || window.Laravel.data.role === 3) ? <i className="fas fa-trash-alt delete" onClick={() => this.deleteNote(note.id)}> </i> : ""}
                            <h5>{note.name}</h5>
                            <p>{note.text}</p>
                            <div className="creator">
                               <h6>- {note.user.name} {note.user.lastname}</h6>
                            </div>
                        </span>
                        </li>
                    ))}
                </div>
            </div>
        )
    }
    changeCreated() {
        if(this.state.created_timer) {
            this.setState({created: false})
        }
    }
    changeCreatedTimer() {
        this.setState({created_timer: 1})
    }

    render() {
        const {show} = this.state;

        return (
            <span>
                 <div id="success" className={this.state.created ? "" : "hidden"}>
                    <Notification  type="success" title="successfully" message="The new note is successfully been created"/>
                </div>
                <Popup trigger={<button className="project-header-plus no-button no-padding ">
                    <i className="fas fa-question"> </i>
                </button>} position="top left">
                {close => (
                    <div className="popup-sidebar">
                        <h2>Notes</h2>
                        <p>With notes you can easily remember small things by creating a note on the pin board.</p>
                        <h5>Make a note</h5>
                        <p>You can create a new note by clicking on the "plus" icon at the top on the right. A popup will appear where you must enter a title and description. You also have the choice to make the note private. This means that only you can see that.</p>
                        <p className="center-text"><img src="/images/help/icons.JPG" width="150px" /></p>
                        <h5>Modify a note</h5>
                        <p>The owner of a note, the leaders or the responsables can delete notes. You can't modify a note. You have to delete the note and make a new one.</p>
                        <p className="center-text"><img src="/images/help/note.JPG" width="300px" /></p>

                        <p><b>See more on the <a href="/docs">documentation</a> page.</b></p>

                    </div>
                )}
                 </Popup>
                {!window.Laravel.data.ended && window.Laravel.data.role !== 0 ? <button className="project-header-plus no-button test" onClick={() => this.toggleShow(true)}>
                    <i className="fas fa-plus"> </i>
                </button> : ""}
                <main className="project-main">
                    {(this.state.notes.length === 0 && !this.state.loading)  ?
                        <div className="project-loading">
                            <i className="fas fa-sticky-note"> </i>
                            <h4>{strings.getString("Nothing to find")}</h4>
                        </div>
                        : ""}
                {this.state.loading ?
                    <div className="project-loading">
                        <div className="loader">Loading...</div>
                    </div>
                    : this.notes() }
            </main>
                 <PopPop
                     open={show}
                     closeOnEsc={true}
                     onClose={() => this.toggleShow(false)}
                     closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            {strings.getString("Make a new note")}
                            <button className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</button>
                        </div>
                        <div className="popup-content">
                            <div className="row">
                                <div className="twelve columns">
                                    <label>{strings.getString("Title")}</label>
                                    <div id="red">{this.state.error_title}</div>
                                    <input type="text" className={this.state.error_title.length > 0 ? "border-red" : ""} onChange={e => this.setState({ note_title: e.target.value })} value={this.state.note_title} />
                                </div>
                            </div>
                            <label>{strings.getString("Description")}</label>
                            <div id="red">{this.state.error_text}</div>
                            <textarea value={this.state.note_text} className={this.state.error_text.length > 0 ? "border-red" : ""} onChange={e => this.setState({ note_text: e.target.value })}> </textarea>
                            <div>
                                <Switch
                                    checked={this.state.note_private}
                                    onChange={e => this.setState({ note_private: !this.state.note_private})}
                                    className="react-switch popup-rights--switch"
                                    id="normal-switch"
                                 /><b>{strings.getString("Make this note private")}</b>
                            </div>
                            <button className="button-primary button no-button" onClick={this.createNote} ><i className="fas fa-plus"> </i> {strings.getString("Make note")}</button>
                        </div>
                    </div>
                </PopPop>
            </span>

        );
    }
}

if (document.getElementById('project-notes')) {
    ReactDOM.render(<ProjectNotes />, document.getElementById('project-notes'));
}
