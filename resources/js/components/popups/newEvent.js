import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import PopPop from 'react-poppop';
import Switch from "react-switch";
import Notification from '../notification';

export default class PopupNewEvent extends Component {


    constructor(props) {
        super(props)
        this.state = {
            show: false,
            users: [],
            created: false,
            created_timer: 0,
            title: '',
            description: '',
            color: 'red',
            fromDate: '',
            fromTime: '',
            untilDate: '',
            untilTime: '',
            private: 0,




        };
        //bind
        this.makeEvent = this.makeEvent.bind(this);
    }


    getUsers() {
        axios.get('/api/company/users').then((
            response
            ) =>
                this.setState({
                    users: response.data,})
        );
    }

    makeEvent() {
        axios.post('/api/calendar/new', {
            title: this.state.title,
            description: this.state.description,
            color: this.state.color,
            fromDate: this.state.fromDate,
            fromTime: this.state.fromTime,
            untilDate: this.state.untilDate,
            untilTime: this.state.untilTime,
            private: this.state.private,
        }).then(response => {
            this.setState({
                created: true
            });
        });
    }

    componentWillMount() {
        this.getUsers();
    }

    changeCreated() {
        if(this.state.created_timer) {
            this.setState({created: false})
        }
    }
    changeCreatedTimer() {
        this.setState({created_timer: 1})
    }

    componentDidMount() {
        this.interval =  setInterval(() => this.changeCreatedTimer(), 3500);
        this.interval =  setInterval(() => this.changeCreated(), 4000);
    }

    componentWillUnmount() {
        // clearInterval(this.interval);
    }



    //popup
    toggleShow(show) {
        this.setState({show});
    }

    render() {
        const {show} = this.state;
        return (
            <div>
                <div id="success" className={this.state.created ? "" : "hidden"}>
                    <Notification  type="success" title="successfully" message="The new event is successfully been created"/>
                </div>
                <button onClick={() => this.toggleShow(true)} className="button-primary button no-button"><i className="fas fa-plus"> </i> New event</button>
                <PopPop
                    open={show}
                    closeOnEsc={true}
                    onClose={() => this.toggleShow(false)}
                    closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            Make a new event
                            <button className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</button>
                        </div>
                        <div className="popup-content">
                            <div className="row">
                                <div className="twelve columns">
                                    <label>Title</label>
                                    <input type="text" value={this.state.title}  onChange={e => this.setState({ title: e.target.value })}  />
                                </div>
                            </div>
                            <label>Event description</label>
                            <textarea  onChange={e => this.setState({ description: e.target.value })} >{this.state.description}</textarea>
                            <div className="popup-event">
                                <div className="row">
                                    <div className="six columns">
                                        <label>From</label>
                                        <input onChange={e => this.setState({ fromDate: e.target.value })} type="date" />
                                        <input onChange={e => this.setState({ fromTime: e.target.value })} type="time" />
                                    </div>
                                    <div className="six columns">
                                        <label>Until</label>
                                        <input onChange={e => this.setState({ untilDate: e.target.value })} type="date" className="u-full-half" />
                                        <input onChange={e => this.setState({ untilTime: e.target.value })} type="time" className="u-full-half" />
                                    </div>
                                </div>
                            </div>
                            <button onClick={e => this.setState({ color: 'red'})} className="popup-event-colors popup-event-colors--red no-button"> </button>
                            <button onClick={e => this.setState({ color: 'blue' })} className="popup-event-colors popup-event-colors--blue no-button"> </button>
                            <button onClick={e => this.setState({ color: 'green'})} className="popup-event-colors popup-event-colors--green no-button"> </button>

                            <div>
                                <Switch
                                    // onChange={this.handleChange}
                                    checked={this.state.private}
                                    onChange={e => this.setState({ private: !this.state.private})}
                                    className="react-switch popup-rights--switch"
                                    id="normal-switch"
                                /><b>Make this event private </b>
                            </div>
                            <button className="button-primary button no-button" onClick={this.makeEvent}>Make event</button>
                        </div>
                    </div>
                </PopPop>
            </div>
        );
    }
}

if (document.getElementById('popup-newUser')) {
    ReactDOM.render(<PopupNewEvent />, document.getElementById('popup-newUser'));
}
