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
const ReactMarkdown = require('react-markdown');
var test = "test";
export default class ProjectPolls extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            show: false,
            polls: [],

            //new vote
            title: '',
            content: '',
            multiple: false,
            change: true,
            options: [],
            currentOption: '',
        };

        this.vote = this.vote.bind(this);
        this.deleteVote = this.deleteVote.bind(this);
        this.createPoll = this.createPoll.bind(this);
        this.addOption = this.addOption.bind(this);
        this.removeOption = this.removeOption.bind(this);
    }

    getPolls() {
        axios.post('/api/project/polls/items', {
            project: window.Laravel.data.project,
        }).then(response => {
            let polls = response.data;

            for(let i in polls) {
                let voted = false;
                let votedOption = -1;
                let vote_id = 0;
                for(let j in polls[i].votes) {
                    if(polls[i].votes[j].user_id === window.Laravel.user.id && !polls[i].multiple) {
                       voted = true;
                       votedOption = polls[i].votes[j].poll_option_id;
                        vote_id = polls[i].votes[j].id;
                    }
                }
                if(voted) {
                    polls[i].voted = 1;
                    polls[i].vote_id = vote_id;
                    polls[i].votedOption = votedOption;
                } else {
                    polls[i].voted = 0;
                }
            }

            this.setState({
                polls: polls
            });
        });
    }

    vote(poll_id, vote_id, i) {
        axios.post('/api/project/polls/vote', {
            poll_id: poll_id,
            vote_id: vote_id,
        }).then(response => {
            this.getPolls();
        });
    }

    deleteVote(vote_id) {
        axios.post('/api/project/polls/delete', {
            vote_id: vote_id,
        }).then(response => {
            this.getPolls();
        });
    }

    createPoll() {
        axios.post('/api/project/polls/create', {
            project: window.Laravel.data.project,
            title: this.state.title,
            desc: this.state.content,
            multiple: this.state.multiple,
            change: this.state.change,
            options: this.state.options,
        }).then(response => {
            this.getPolls();
        });
    }

    addOption(e) {
        this.setState({options: [...this.state.options, this.state.currentOption], currentOption: ''})
    }

    removeOption(e) {
        console.log(e)
        var array = [...this.state.options]; // make a separate copy of the array
        var index = array.indexOf(e);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({options: array});
        }
    }

    componentWillMount() {
        this.getPolls();
    }

    componentDidMount() {
    }


    toggleShow(show) {
        this.setState({show});
    }

    render() {
        const {show} = this.state;
        return (
            <span>
                <button className="project-header-plus no-button test" onClick={() => this.toggleShow(true)}>
                    <i className="fas fa-plus"> </i>
                </button>
                <main className="project-main">
                    <div className="project-polls">
                        <div className="row">
                            {this.state.polls.map((poll, i) => (
                                <article className="project-polls-item" key={i}>
                                    <div className="project-polls-head">
                                        {poll.title}
                                        <span className="votes">Total votes: {this.state.polls[i].votes.length}</span>
                                    </div>
                                    <div className="project-polls-body">
                                        {poll.voted
                                            ?
                                            <div>
                                                {this.state.polls[i].options.map((option, j) => (
                                                    <div className="option" key={j}>
                                                        {option.content}
                                                        {option.id === poll.votedOption ? "*" : ""}
                                                        <Progress
                                                            percent={Math.round(option.votes.length/poll.votes.length * 100)}
                                                            theme={
                                                                {
                                                                    active: {
                                                                        symbol: '',
                                                                        trailColor: 'white',
                                                                        color: '#5680e9'
                                                                },
                                                                    success: {
                                                                        symbol: '',
                                                                        trailColor: 'white',
                                                                        color: '#5680e9'
                                                                    }
                                                                }
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                                {poll.change ?
                                                    <button className="button no-button button-primary"
                                                            onClick={event => this.deleteVote(poll.vote_id)}><i
                                                        className="fas fa-edit"> </i> Change vote</button>
                                                    :
                                                    ""
                                                }
                                                    </div>
                                        :
                                            <div>
                                                {this.state.polls[i].options.map((option, k) => (
                                                    <div className="option" key={k} onClick={event => this.vote(poll.id, option.id, i)}>{option.content}</div>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                </article>
                            ))}
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
                            Make a new poll
                            <button className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</button>
                        </div>
                        <div className="popup-content">
                            <div className="row">
                                <div className="twelve columns">
                                    <label>Title</label>
                                    <input type="text" onChange={e => this.setState({ title: e.target.value })} value={this.state.title} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="twelve columns">
                                    <label>Description of poll</label>
                                    <textarea onChange={event => this.setState({content: event.target.value})} value={this.state.content}> </textarea>
                                </div>
                            </div>
                            <label>Options</label>
                            <div className="popup-groups popup-poll">
                                {this.state.options.length <= 0 ? <div className="alert alert-red">They are still no options</div> : ""}
                                {this.state.options.map((option, g) => (
                                    <li className="groups-dark" key={g}>{option} <i onClick={e => this.removeOption(option)} className="fas fa-minus-circle float-right"> </i></li>
                                ))}
                            </div>
                            <form action="#" onSubmit={this.addOption}>
                                <input type="text" value={this.state.currentOption} className="float-left" onChange={e => this.setState({ currentOption: e.target.value})} required={true}/>
                                </form>
                            <div className="row">
                                <div className="six columns">
                                     <Switch
                                         checked={this.state.multiple}
                                         onChange={e => this.setState({ multiple: !this.state.multiple})}
                                         className="react-switch popup-rights--switch"
                                         id="normal-switch"
                                     /><b>Multiple voting</b>
                                </div>
                                <div className="six columns">
                                     <Switch
                                         checked={this.state.change}
                                         onChange={e => this.setState({ note_private: !this.state.change})}
                                         className="react-switch popup-rights--switch"
                                         id="normal-switch"
                                     /><b>Change vote(ds)</b>
                                </div>
                            </div>
                            <button className="button-primary button no-button" onClick={this.createPoll}>Make poll</button>
                        </div>
                    </div>
                </PopPop>
            </span>
        );
    }
}

if (document.getElementById('project-polls')) {
    ReactDOM.render(<ProjectPolls />, document.getElementById('project-polls'));
}
