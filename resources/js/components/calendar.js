import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import PopupNewEvent from './popups/newEvent';
var moment = require('moment');
moment().format();
var d = new Date();
console.log(d);
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

export default class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            days: [],
            currentMonth: d.getMonth(),
            currentYear: d.getFullYear(),

            //events
            todayAll: [],
            todayPrivate: [],
        };
        //bind
        this.init = this.init.bind(this);
        this.daysInMonth = this.daysInMonth.bind(this);
        this.previousMonth = this.previousMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.getToday = this.getToday.bind(this);
    }


    //receive data
    getToday() {
        axios.get('/api/calendar/today').then((
            response
            ) =>
                this.setState({
                    todayAll: response.data.all,
                    todayPrivate: [this.state.todayAll, ...response.data.private],
                })
        );
        this.init();
    }
    componentWillMount() {
        this.getToday();
    }
    componentDidMount() {
        this.interval =  setInterval(() => this.init(), 1000);
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
        console.log(lengthOther);
        var lastMonth =  new Date(this.state.currentYear, (this.state.currentMonth), 0).getDate();
        for (var x = 1; x < lengthOther; x++) {
            var day2 = {
                id: lastMonth - (lengthOther-x) + 1,
                day: '',
                month: '',
                year: '',
                events: [this.state.todayAll],
            }

            dagen[x] = day2;
        }
        //alle dagen
        var length=  new Date(this.state.currentYear, (this.state.currentMonth+1), 0).getDate();
        for (var i = 0; i < length; i++) {
            var date = new Date(this.state.currentYear, this.state.currentMonth, i+1);
            var events = [];
            axios.get('/api/calendar/today').then((
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
                    events: [this.state.todayAll],
                }
                dagen[i+lengthOther] = day;
            } else if((i+1 < 10)) {
                var day = {
                    id: "0"+(i+1),
                    day: weekday[date.getDay()],
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    events: [this.state.todayAll],
                }
                dagen[i+lengthOther] = day;
            } else if(((date.getMonth()) < 10)) {
                var day = {
                    id: (i+1),
                    day: weekday[date.getDay()],
                    year: date.getFullYear(),
                    month: "0"+(date.getMonth()+1),
                    events: [this.state.todayAll],
                }
            } else
                var day = {
                    id: (i+1),
                    day: weekday[date.getDay()],
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    events: [this.state.todayAll],
                }
                dagen[i+lengthOther] = day;
        }
        console.log(this.state.days);
        this.setState({days: [dagen]})

    }


    previousMonth() {
        if(this.state.currentMonth === 0) {
            this.setState({currentMonth: 11, currentYear: this.state.currentYear-1});
        } else {
            this.setState({currentMonth: (this.state.currentMonth-1)});
        }
        this.init();
    }
    nextMonth() {
        if(this.state.currentMonth === 11) {
            this.setState({currentMonth: 0, currentYear: this.state.currentYear+1});
            this.init();
        } else {
            this.setState({currentMonth: this.state.currentMonth+1});
            this.init();
        }
    }
    render() {
        return (
            <div className="row">
                <div className="ten columns">
                    <div className="calendar">
                        <div className="calendar-head">
                            <div className="row">
                                <div className="four columns">
                                    <div className="calendar-left">
                                        <a  onClick={this.previousMonth} className="fas fa-arrow-left"> </a>
                                    </div>
                                </div>
                                <div className="four columns">
                                    <h5 className="calendar-title">{months[this.state.currentMonth]} <span className="calendar-year">{this.state.currentYear}</span></h5>
                                </div>
                                <div className="four columns">
                                    <div className="calendar-right">
                                        <a onClick={this.nextMonth} className="fas fa-arrow-right"> </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="calendar-body">
                            <div className="row">
                                {this.state.days[0].map(dag => (
                                    <div className="day-column columns calendar-day">
                                        <span>{dag.day}</span>
                                        <span className={d.getDate() === dag.id && d.getMonth() === dag.month ? "gray calendar-current" : "gray"}>{dag.id}</span>
                                        {this.state.todayAll.map(event => (
                                            <div>
                                                {event.from === dag.year + "-" + (dag.month) + "-" + dag.id && event.color === "green" ?
                                                    <div className="calendar-event calendar-event-green">
                                                        {event.title}
                                                    </div>
                                                    : ""}
                                                {event.from === dag.year + "-" + (dag.month) + "-" + dag.id && event.color === "red" ?
                                                    <div className="calendar-event calendar-event-red">
                                                        {event.title}
                                                    </div>
                                                    : ""}
                                                {event.from === dag.year + "-" + (dag.month) + "-" + dag.id && event.color === "blue" ?
                                                    <div className="calendar-event calendar-event-blue">
                                                        {event.title}
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
                        <PopupNewEvent/>
                        <article className="calendar-overview">
                            <h5 className="calendar-overview--title">Today</h5>
                            {this.state.todayAll.map(event => (
                                <div className="calendar-overview--item">
                                    <p><span id="bold">{event.from_hour}- {event.until_hour}: </span> {event.title}</p>
                                </div>
                            ))}
                            {this.state.todayPrivate.map(event => (
                                <div className="calendar-overview--item">
                                    <p><span id="bold">{event.from_hour}- {event.until_hour}: </span> {event.title}</p>
                                </div>
                            ))}
                        </article>
                        <article className="calendar-overview">
                            <h5 className="calendar-overview--title">Tomorrow</h5>
                            <div className="calendar-overview--item">
                                <p><span id="bold">12u - 16u: </span> Vergadering met allen</p>
                            </div>
                            <div className="calendar-overview--item">
                                <p><span id="bold">12u - 16u: </span> Vergadering met allen</p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>

        );
    }
}

if (document.getElementById('calendar-full')) {
    ReactDOM.render(<Calendar />, document.getElementById('calendar-full'));
}
