import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import PopupNewEvent from './popups/newEvent';
import PopPup from "./project/notes";
const Timestamp = require('react-timestamp');
var moment = require('moment');
moment().format();
var d = new Date();
import Switch from "react-switch";
import PopPop from 'react-poppop';
var weekday = new Array(7);
var currentMonth = d.getMonth()+1;
weekday[0] =  "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thur";
weekday[5] = "Fri";
weekday[6] = "Sat";
var months = new Array(11);
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";
months[12] = "January";

var months2 = new Array(11);
months[0] = "Jan";
months[1] = "Feb";
months[2] = "Mar";
months[3] = "Apr";
months[4] = "May";
months[5] = "Jun";
months[6] = "Jul";
months[7] = "Aug";
months[8] = "Sep";
months[9] = "Oct";
months[10] = "Nov";
months[11] = "Dec";
months[12] = "Jan";
import LocalizedStrings from 'localized-strings';
import en from './lang/en.json';
import nl from './lang/nl.json';

let strings = new LocalizedStrings({en,nl});
export default class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,

            days: [],
            allEvents: [],
            currentMonth: d.getMonth(),
            currentYear: d.getFullYear(),

            eventsDay: [],
            //events
            todayAll: [],
            tomorrowAll:  [],

            //selected event
            selected_event: null,

            //new event
            showNew: false,
            users: [],
            created: false,
            created_timer: false,
            title: '',
            description: '',
            color: 'red',
            fromDate: '',
            fromTime: '',
            untilDate: '',
            untilTime: '',
            private: false,

            //errors
            error_start: '',
            error_end: '',
        };
        //bind
        this.init = this.init.bind(this);
        this.daysInMonth = this.daysInMonth.bind(this);
        this.previousMonth = this.previousMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.getToday = this.getToday.bind(this);
        this.getDay = this.getDay.bind(this);
        this.makeEvent = this.makeEvent.bind(this);
    }


    //receive data

    getAll() {
        axios.get('/api/calendar/receive').then((
            response
            ) => {
                this.setState({allEvents: response.data.all, selected_event: response.data.all[0]});
            }
        );
    }
    getToday() {
        axios.get('/api/calendar/today').then((
            response
            ) =>
                this.setState({
                    todayAll: response.data.all,
                })
        );
        this.init();
    }

    getTomorrow() {
        axios.get('/api/calendar/tomorrow').then((
            response
            ) =>
                this.setState({
                    tomorrowAll: response.data.all,
                })
        );
    }

    getDay(date) {
        this.setState({show: true})
        axios.post('/api/calendar/day', {
            from: date
        }).then(response => {
            this.setState({
                showNew: false,
                eventsDay: response.data,
            });
        });
    }

    makeEvent(e) {
        e.preventDefault();
        let errorStart = false;
        if(new Date(this.state.fromDate) < new Date()) {
            errorStart = true;
            this.setState({error_start: 'Date must be greater than yesterday'})
        } else {
            errorStart = false;
            this.setState({error_start: ''})
        }

        let errorEnd = false;
        if(this.state.untilDate !== null && new Date(this.state.untilDate) < new Date()) {
            this.setState({error_end: 'Date must be greater than yesterday'})
            errorEnd = true;
        } else if(this.state.untilDate !== null && new Date(this.state.untilDate) === new Date(this.state.fromDate)) {
            this.setState({error_end: "Date can't be the same as the start date"})
            errorEnd = true;
        } else {
            errorEnd = false;
            this.setState({error_end: ""})
        }

        if(!errorStart && !errorEnd) {
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
                    showNew: false,
                    allEvents: response.data.all,
                    selected_event: response.data.all[0]
                });
                this.init();
            });
        }

    }

    componentWillMount() {
        strings.setLanguage(window.Laravel.lang);
        this.getAll();
        this.getToday();
        this.getTomorrow();
        this.init();
    }
    componentDidMount() {
        // this.interval =  setInterval(() => this.init(), 000);
    }


    componentWillUnmount() {
        clearInterval(this.interval);
    }

    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    init() {
        var dagen = [];
        //zien welke dag is en dagen ervoor vervormen
        var firstDay = new Date(this.state.currentYear, this.state.currentMonth, 1);
        var lengthOther =  firstDay.getDay();
        var lastMonth =  new Date(this.state.currentYear, (this.state.currentMonth), 0).getDate();
        for (var x = 1; x < lengthOther; x++) {
            var day2 = {
                id: lastMonth - (lengthOther-x) + 1,
                day: '',
                month: '',
                year: '',
                events: [this.state.allEvents],
            }

            dagen[x] = day2;
        }
        //alle dagen
        var length=  new Date(this.state.currentYear, (this.state.currentMonth+1), 0).getDate();
        for (var i = 0; i < length; i++) {
            var date = new Date(this.state.currentYear, this.state.currentMonth, i+1);
            var events = [];
            axios.get('/api/calendar/receive').then((
                response
                ) => {
                events = response.data.all
                }
            );
            if(i+1 < 10 && ((date.getMonth()) < 10)) {
                var day = {
                    id: "0"+(i+1),
                    day: weekday[date.getDay()],
                    year: date.getFullYear(),
                    month: "0"+(date.getMonth()+1),
                    events: [this.state.allEvents],
                }
                dagen[i+lengthOther] = day;
            } else if((i+1 < 10)) {
                var day = {
                    id: "0"+(i+1),
                    day: weekday[date.getDay()],
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    events: [this.state.allEvents],
                }
                dagen[i+lengthOther] = day;
            } else if(((date.getMonth()) < 10)) {
                var day = {
                    id: (i+1),
                    day: weekday[date.getDay()],
                    year: date.getFullYear(),
                    month: "0"+(date.getMonth()+1),
                    events: [this.state.allEvents],
                }
            } else
                var day = {
                    id: (i+1),
                    day: weekday[date.getDay()],
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    events: [this.state.allEvents],
                }
                dagen[i+lengthOther] = day;
        }
        this.setState({days: [dagen]})

    }

    previousMonth() {
        var dagen = [];
        let year = this.state.currentYear;
        let month = this.state.currentMonth;
        //zien welke dag is en dagen ervoor vervormen
        if(this.state.currentMonth === 11) {
            this.setState({currentMonth: 0, currentYear: this.state.currentYear-1});
            year = this.state.currentYear-1;
            month = 0;
        } else {
            this.setState({currentMonth: this.state.currentMonth-1});
            month = this.state.currentMonth-1;
        }


        var firstDay = new Date(year, month, 1);
        var lengthOther =  firstDay.getDay();
        var lastMonth =  new Date(year, (month), 0).getDate();
        for (var x = 1; x < lengthOther; x++) {
            var day2 = {
                id: lastMonth - (lengthOther-x) + 1,
                day: '',
                month: '',
                year: '',
                events: [this.state.allEvents],
            }

            dagen[x] = day2;
        }
        //alle dagen
        var length=  new Date(year, (month+1), 0).getDate();
        for (var i = 0; i < length; i++) {
            var date = new Date(year, month, i+1);
            var events = [];
            axios.get('/api/calendar/receive').then((
                response
                ) => {
                    events = response.data.all
                }
            );
            if(i+1 < 10 && ((date.getMonth()) < 10)) {
                var day = {
                    id: "0"+(i+1),
                    day: weekday[date.getDay()],
                    year: date.getFullYear(),
                    month: "0"+(date.getMonth()+1),
                    events: [this.state.allEvents],
                }
                dagen[i+lengthOther] = day;
            } else if((i+1 < 10)) {
                var day = {
                    id: "0"+(i+1),
                    day: weekday[date.getDay()],
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    events: [this.state.allEvents],
                }
                dagen[i+lengthOther] = day;
            } else if(((date.getMonth()) < 10)) {
                var day = {
                    id: (i+1),
                    day: weekday[date.getDay()],
                    year: date.getFullYear(),
                    month: "0"+(date.getMonth()+1),
                    events: [this.state.allEvents],
                }
            } else
                var day = {
                    id: (i+1),
                    day: weekday[date.getDay()],
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    events: [this.state.allEvents],
                }
            dagen[i+lengthOther] = day;
        }
        this.setState({days: [dagen]})
    }

    nextMonth() {

        var dagen = [];
        let year = this.state.currentYear;
        let month = this.state.currentMonth;
        //zien welke dag is en dagen ervoor vervormen
        if(this.state.currentMonth === 11) {
            this.setState({currentMonth: 0, currentYear: this.state.currentYear+1});
            year = this.state.currentYear+1;
        } else {
            this.setState({currentMonth: this.state.currentMonth+1});
            month = this.state.currentMonth+1;
        }

        var firstDay = new Date(year, month, 1);
        var lengthOther =  firstDay.getDay();
        var lastMonth =  new Date(year, (month+1), 0).getDate();
        for (var x = 1; x < lengthOther; x++) {
            var day2 = {
                id: lastMonth - (lengthOther-x) + 1,
                day: '',
                month: '',
                year: '',
                events: [this.state.allEvents],
            }

            dagen[x] = day2;
        }
        //alle dagen
        var length=  new Date(year, (month+1), 0).getDate();
        for (var i = 0; i < length; i++) {
            var date = new Date(year, month, i+1);
            var events = [];
            axios.get('/api/calendar/receive').then((
                response
                ) => {
                    events = response.data.all
                }
            );
            if(i+1 < 10 && ((date.getMonth()) < 10)) {
                var day = {
                    id: "0"+(i+1),
                    day: weekday[date.getDay()],
                    year: date.getFullYear(),
                    month: "0"+(date.getMonth()+1),
                    events: [this.state.allEvents],
                }
                dagen[i+lengthOther] = day;
            } else if((i+1 < 10)) {
                var day = {
                    id: "0"+(i+1),
                    day: weekday[date.getDay()],
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    events: [this.state.allEvents],
                }
                dagen[i+lengthOther] = day;
            } else if(((date.getMonth()) < 10)) {
                var day = {
                    id: (i+1),
                    day: weekday[date.getDay()],
                    year: date.getFullYear(),
                    month: "0"+(date.getMonth()+1),
                    events: [this.state.allEvents],
                }
            } else
                var day = {
                    id: (i+1),
                    day: weekday[date.getDay()],
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    events: [this.state.allEvents],
                }
            dagen[i+lengthOther] = day;
        }
        this.setState({days: [dagen]})
    }

    toggleShow(show) {
        this.setState({show});
    }
    toggleShowNew(showNew) {
        this.setState({showNew});
    }
    render() {
        const {show} = this.state;
        const {showNew} = this.state;
        let {selected_event} = this.state;
        return (
            <div className="row">
                <div className="ten columns">
                    <div className="calendar">
                        <div className="calendar-head">
                            <div className="row">
                                <div className="four columns">
                                    <div className="calendar-left">
                                        <a  onClick={ e =>this.previousMonth()} className="fas fa-arrow-left"> </a>
                                    </div>
                                </div>
                                <div className="four columns">
                                    <h5 className="calendar-title">{months[this.state.currentMonth]} <span className="calendar-year">{this.state.currentYear}</span></h5>
                                </div>
                                <div className="four columns">
                                    <div className="calendar-right">
                                        <a onClick={e => this.nextMonth()} className="fas fa-arrow-right"> </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="calendar-body">
                            <div className="row">
                                {this.state.days[0].map((dag, i) => (
                                    <div key={i} className="day-column columns calendar-day">
                                        <span>{dag.day}</span>
                                        <span className={d.getDate() === dag.id && d.getMonth() === dag.month ? "gray calendar-current" : "gray"}>{dag.id}</span>
                                        {this.state.allEvents.map((event, i) => (
                                            <div key={i}  onClick={e => this.getDay(event.from)}>
                                                {/*{console.log(new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()))}*/}
                                                {/*{console.log(new Date(new Date(event.from).getFullYear(), new Date(event.from).getMonth(), new Date(event.from).getDate()))}*/}
                                                {((event.from === dag.year + "-" + (dag.month) + "-" + dag.id) || (event.until !== null && event.until === dag.year + "-" + (dag.month) + "-" + dag.id ))&& event.color === "green"  ?
                                                    <div  className="calendar-event calendar-event-green">
                                                        {event.until !== null && (event.from === dag.year + "-" + (dag.month) + "-" + dag.id) ? <span><b>Start</b> -  {event.title}</span> : ""}
                                                        {event.until !== null && (event.until === dag.year + "-" + (dag.month) + "-" + dag.id) ? <span><b>{strings.getString("End")}</b> -  {event.title}</span> : ""}
                                                        {event.until === null  ?  event.title : ""}
                                                    </div>
                                                    : ""}
                                                {((event.from === dag.year + "-" + (dag.month) + "-" + dag.id) || (event.until !== null && event.until === dag.year + "-" + (dag.month) + "-" + dag.id ))&& event.color === "red"?
                                                    <div  className="calendar-event calendar-event-red">
                                                        {event.until !== null && (event.from === dag.year + "-" + (dag.month) + "-" + dag.id) ? <span><b>Start</b> -  {event.title}</span> : ""}
                                                        {event.until !== null && (event.until === dag.year + "-" + (dag.month) + "-" + dag.id) ? <span><b>{strings.getString("End")}</b>  -  {event.title}</span>  : ""}
                                                        {event.until === null  ?  event.title : ""}
                                                    </div>
                                                    : ""}
                                                {((event.from === dag.year + "-" + (dag.month) + "-" + dag.id) || (event.until !== null && event.until === dag.year + "-" + (dag.month) + "-" + dag.id ))&& event.color === "blue" ?
                                                    <div  className="calendar-event calendar-event-blue">
                                                        {event.until !== null && (event.from === dag.year + "-" + (dag.month) + "-" + dag.id) ? <span><b>Start</b> -  {event.title}</span> : ""}
                                                        {event.until !== null && (event.until === dag.year + "-" + (dag.month) + "-" + dag.id) ? <span><b>{strings.getString("End")}</b>  -  {event.title}</span>  : ""}
                                                        {event.until === null  ?  event.title : ""}

                                                    </div>
                                                    : ""}
                                            </div>

                                        ))}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
                <div className="two columns no-margin">
                    <div className="calendar-sidebar">
                        <button onClick={() => this.toggleShowNew(true)} className="button-primary button no-button"><i className="fas fa-plus"> </i> {strings.getString('Add event')}</button>
                        <article className="calendar-overview">
                            <h5 className="calendar-overview--title">{strings.getString('Today')}</h5>
                            {this.state.todayAll.map((event, i) => (
                                <div key={i} className="calendar-overview--item">
                                    <p><span id="bold">{event.from_hour}- {event.until_hour}: </span> {event.title}</p>
                                </div>
                            ))}
                        </article>
                        <article className="calendar-overview">
                            <h5 className="calendar-overview--title">{strings.getString('Tommorrow')}</h5>
                            {this.state.tomorrowAll.map((te, i) => (
                                <div key={i} className="calendar-overview--item">
                                    <p><span id="bold">{te.from_hour}- {event.until_hour}: </span> {te.title}</p>
                                </div>
                            ))}
                        </article>
                    </div>
                </div>
                <PopPop
                    open={show}
                    closeOnEsc={true}
                    onClose={() => this.toggleShow(false)}
                    closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            Event
                            <button className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</button>
                        </div>
                        <div className="popup-content">
                            {this.state.eventsDay.map((event, i) => (
                                <div className="row popup-events no-margin">
                                    <div className="four columns no-margin">
                                        <div className="popup-events-date">
                                           <h4 className="day"> {new Date(event.from).getDate()} </h4>
                                            <h5 className="month">{months[new Date(event.from).getMonth()]}</h5>
                                            <b>{strings.getString('Ends')} </b>
                                            {event.until != null ? <Timestamp time={new Date(event.until)} precision={2} utc={false} autoUpdate={60}   /> : " Today"}
                                        </div>
                                    </div>
                                    <div className="eight columns no-margin">
                                        <div className="popup-events-content">
                                            <div className="title">{event.title}</div>
                                        <p>{event.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </PopPop>
                <PopPop
                    open={showNew}
                    closeOnEsc={true}
                    onClose={() => this.toggleShowNew(false)}
                    closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            {strings.getString('Make a new event')}
                            <button className="popup-btn--close"  onClick={() => this.toggleShowNew(false)}>✕</button>
                        </div>
                        <div className="popup-content">
                            <form onSubmit={event => this.makeEvent(event)}>
                                <div className="row">
                                    <div className="twelve columns">
                                        <label>{strings.getString('Title')}</label>
                                        <input type="text" value={this.state.title}  required="true" onChange={e => this.setState({ title: e.target.value })}  />
                                    </div>
                                </div>
                                <label>{strings.getString('Description')}</label>
                                <textarea  onChange={e => this.setState({ description: e.target.value })}  required="true">{this.state.description}</textarea>
                                <div className="popup-event">
                                    <div className="row">
                                        <div className="six columns">
                                            <label>{strings.getString('From')}</label>
                                            <div id="red">{this.state.error_start}</div>
                                            <input onChange={e => this.setState({ fromDate: e.target.value })} type="date"  required="true" />
                                            <input onChange={e => this.setState({ fromTime: e.target.value })} type="time" />
                                        </div>
                                        <div className="six columns">
                                            <label>{strings.getString('Until')}</label>
                                            <div id="red">{this.state.error_end}</div>
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
                                    /><b>{strings.getString('Make this event private')} </b>
                                </div>
                                <button className="button-primary button no-button" type="submit"><i
                                    className="fas fa-plus"></i> {strings.getString('Add event')}</button>
                            </form>
                        </div>
                    </div>
                </PopPop>
            </div>

        );
    }
}

if (document.getElementById('calendar-full')) {
    ReactDOM.render(<Calendar />, document.getElementById('calendar-full'));
}
