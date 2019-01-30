import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PieChart from 'react-minimal-pie-chart';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
const Timestamp = require('react-timestamp');
import "react-sweet-progress/lib/style.css";
import PopPop from 'react-poppop';
import SimpleMDEReact from "react-simplemde-editor";
const ReactMarkdown = require('react-markdown');
import Notification from "../notification";
let params = new URLSearchParams(location.search);
export default class ProjectForum extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            replies: [],
            tags: [],
            show: false,
            //new note
            created: false,
            created_timer: 0,

            //create post
            post_title: '',
            post_tags: [],
            current_tag: '',
            post_message: '',

            //get current post
            post: [],
            post_replies: [],
            post_user: [],
            post_get: false,
            post_open: false,

            //new reply
            reply_message: "",

        };
        this.init = this.init.bind(this);
        this.getReplies = this.getReplies.bind(this);
        this.forum = this.forum.bind(this);
        this.getTags = this.getTags.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.addTag = this.addTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.makePost = this.makePost.bind(this);
        this.getPostById = this.getPostById.bind(this);
        this.createReply = this.createReply.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    init() {
        let params = new URLSearchParams(location.search);
        if(params.get("id") > 0) {
            this.getPostById(params.get("id"));
        }
    }

    handleChange1 (value) {
        this.setState({
            post_message: value
        });
    };

    handleChange2 (value) {
        this.setState({
            reply_message: value
        });
    };
    componentWillMount() {
        this.init();
        this.getReplies();
    }

    componentDidMount() {
    }

    toggleShow(show) {
        this.setState({show});
    }

    changeCreated() {
        if(this.state.created_timer) {
            this.setState({created: false})
        }
    }
    changeCreatedTimer() {
        this.setState({created_timer: 1})
    }

    getReplies() {
        this.getTags();
            axios.post('/api/project/forum/replies', {
                project: window.Laravel.data.project,
            }).then(response => {
                this.setState({
                    loading: false,
                    replies: response.data,
                });
            });
    }

    getTags() {
        axios.post('/api/project/forum/tags', {
            project: window.Laravel.data.project,
        }).then(response => {
            this.setState({
                tags: response.data,
            });
        });
    }

    addTag(e) {
        this.setState({post_tags: [...this.state.post_tags, this.state.current_tag], current_tag: ''})
    }

    removeTag(e) {
        console.log(e);
        var array = [...this.state.post_tags]; // make a separate copy of the array
        var index = array.indexOf(e.tag);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({post_tags: array});
        }
    }

    makePost() {
        axios.post('/api/project/forum/createPost', {
            project: window.Laravel.data.project,
            post_title: this.state.post_title,
            post_message: this.state.post_message,
            post_tags: this.state.post_tags,
        }).then(response => {
            this.setState({
                post_title: '',
                post_message: '',
                show: false,
            });
        });
        this.getReplies();
        this.getTags();
    }
    getPostById(id) {
        axios.post('/api/project/forum/post', {
            id: id,
        }).then(response => {
            this.setState({
                post: response.data,
                post_get: true,
                post_user: response.data.user,
                post_replies: response.data.replies,
                post_open: true,
            });
        });
    }

    createReply() {
        axios.post('/api/project/forum/createReply', {
            post_id: this.state.post.id,
            reply_message: this.state.reply_message,
        }).then(response => {
            this.setState({
                reply_message: "",
            });
            this.getPostById(this.state.post.id);
        });
    }

    forum() {
        let params = new URLSearchParams(location.search);
            return (
                <span>
                    <div className="dashboard-forum">
                <div className="row">
                    <div className="three columns">
                        <div className="dashboard-forum-head">
                            <input type="text" placeholder="Search for threads"/>
                            {this.state.post_open ? <button className="button button-primary no-button" href="#reply">Reply to this post</button>: <button className="button button-primary no-button" onClick={() => this.setState({show: true})}>Create thread</button>}
                        </div>
                        <h5>Tags</h5>
                        <ul className="dashboard-forum-tags">
                            <li>All</li>
                            {this.state.tags.map((tag, i) => (
                                <li key={i}>{tag.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="nine columns">
                                <span>
                                    {this.state.post_open ?
                                        <div className="row dashboard-forum-title">
                                            <div className="item-head">
                                                <i className="far fa-comments"></i>  {this.state.post.title}
                                            </div>
                                            <div className="dashboard-forum-post row">
                                                <div className="three columns">
                                                    <div className="dashboard-forum-post-sidebar">
                                                        <img src={this.state.post_user.avatar} />
                                                        <h5>{this.state.post_user.name}</h5>
                                                    </div>
                                                </div>
                                                <div className="nine columns dashboard-forum-post-content">
                                                    <ReactMarkdown source={this.state.post.content} />
                                                </div>
                                            </div>
                                            {this.state.post_replies.map((reply, i) => (
                                                <span>
                                                    {!reply.created ?
                                                        <div className="dashboard-forum-post row">
                                                            <div className="three columns">
                                                                <div className="dashboard-forum-post-sidebar">
                                                                    <img src={reply.user.avatar} />
                                                                    <h5>{reply.user.name}</h5>
                                                                    </div>
                                                                </div>
                                                            <div className="nine columns dashboard-forum-post-content">
                                                                <ReactMarkdown source={reply.content} />
                                                                </div>
                                                            </div>
                                                        :
                                                        ""
                                                            }
                                                        </span>
                                            ))}
                                            <div id="reply" className="dashboard-forum-reply">
                                                <SimpleMDEReact
                                                    className={""}
                                                    label="Reply to this post"
                                                    value={this.state.reply_message}
                                                    onChange={this.handleChange2}
                                                />
                                                <button className="button button-primary no-button" onClick={this.createReply}>Reply</button>
                                            </div>
                                                </div>

                                        :
                                        <div className="dashboard-forum-items">
                                            {this.state.replies.map((reply, i) => (
                                                <article>
                                                    <div className="item-head">
                                                        <img src="http://127.0.0.1:8000/images/user.jpg" className="float-left"/> <span><a href='#'>{reply.user.name} {reply.user.lastname}</a>
                                                        {reply.created ? " created " : " replied "} <Timestamp className="time" time={reply.created_at} precision={1} utc={false} autoUpdate={60}/></span>
                                                        <div className="clear"></div>
                                                    </div>
                                                    <div className="item-body">
                                                        <h5><a  onClick={() => this.getPostById( reply.post.id)}>{reply.post.title}</a></h5>
                                                        <p>{reply.post.content.substring(0, 200)}...</p>
                                                        {reply.post.tags.map((tag, i) => (
                                                            <span className="tag tag-primary">{tag.name}</span>
                                                        ))}
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    }
                                        </span>
                                </div>
                            </div>
                    </div>
            </span>
            )
    }
    render() {
        const {show} = this.state;
        return (
            <main className="project-main">
                {this.state.loading ?
                    <div className="project-loading">
                        <div className="loader">Loading...</div>
                    </div>
                    : this.forum() }
                <PopPop
                    open={show}
                    closeOnEsc={true}
                    onClose={() => this.toggleShow(false)}
                    closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            Make a new thread
                            <button className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</button>
                        </div>
                        <div className="popup-content">
                            <Tabs
                                defaultTab="one"
                                onChange={(tabId) => { tabId}}
                            >
                                <TabList>
                                    <Tab tabFor="one" className="popup-tab">General</Tab>
                                    <Tab tabFor="two" className="popup-tab">Tags</Tab>
                                </TabList>
                                <TabPanel tabId="one">
                                    <div className="row">
                                        <div className="twelve columns">
                                            <label>Subject</label>
                                            <input type="text" value={this.state.post_title} onChange={e => this.setState({ post_title: e.target.value  })} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="twelve columns">
                                            <SimpleMDEReact
                                                className={""}
                                                label="Message"
                                                value={this.state.message}
                                                onChange={this.handleChange1}
                                            />
                                        </div>
                                    </div>
                                </TabPanel>
                                    <TabPanel tabId="two">
                                        <div className="popup-tags">
                                            <h5>Tags</h5>
                                            {this.state.post_tags.length <= 0 ? <div id="red">No tags selected</div> :
                                                <div>
                                                    {this.state.post_tags.map(tag => (
                                                        <span className="tag tag-second">{tag} <i onClick={e =>this.removeTag({tag})} className="fas fa-minus-circle"> </i></span>
                                                    ))}
                                                </div>
                                            }
                                            <form onSubmit={this.addTag} action="#">
                                                <input type="text" value={this.state.current_tag} className="float-left" onChange={e => this.setState({ current_tag: e.target.value})} placeholder="Party, 2019, ..." required={true}/>
                                                <input type="submit" className="float-right" value="Add new tag" />
                                            </form>
                                        </div>
                                </TabPanel>
                            </Tabs>
                            <button className="button-primary button no-button" onClick={this.makePost}>Make thread</button>
                        </div>
                    </div>
                </PopPop>
            </main>

        );
    }
}

if (document.getElementById('project-forum')) {
    ReactDOM.render(<ProjectForum />, document.getElementById('project-forum'));
}
