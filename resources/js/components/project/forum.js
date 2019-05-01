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
            repliesByTag: null,
            tags: [],
            show: false,
            show2: false,
            //new note
            created: false,
            created_timer: 0,

            //create post
            post_title: '',
            post_tags: [],
            current_tag: 'all',
            post_message: '',

            //get current post
            post: [],
            post_replies: [],
            post_user: [],
            post_get: false,
            post_open: false,

            //new reply
            reply_message: "",

            //edit reply
            reply: [],
            replyNew_message: "",


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
        this.getReply = this.getReply.bind(this);
        this.editReply = this.editReply.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.deleteReply = this.deleteReply.bind(this);
        this.repliesbyTag = this.repliesbyTag.bind(this);
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
    handleChange3 (value) {
        this.setState({
            replyNew_message: value
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
    toggleShow2(show2) {
        this.setState({show2});
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
        axios.post('/api/project/forum/replies', {
            project: window.Laravel.data.project,
        }).then(response => {
            this.setState({
                loading: false,
                replies: response.data,
                repliesByTag: response.data,
            });
            this.getTags();
        });
    }


    repliesbyTag(name) {
        if (name === "All") {
            this.setState({repliesByTag: this.state.replies})
        } else {
            let replies = this.state.replies;
            let data = [];
            for (let i = 0; i < replies.length; i++) {
                let good = false;
                for (let j = 0; j < replies[i].post.tags.length; j++) {
                    if (replies[i].post.tags[j].name === name) {
                        good = true;
                    }
                }
                if (good) {
                    data.push(replies[i]);
                }
            }

            this.setState({repliesByTag: data})
        }
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
                replies: [response.data, ...this.state.replies],
                repliesByTag:[response.data, ...this.state.replies],
            });
        });
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

    getReply(id) {
        this.setState({reply: this.state.post_replies[id], show2: true});
    }

    editReply() {
        axios.post('/api/project/forum/editReply', {
            id: this.state.reply.id,
            message: this.state.replyNew_message,
        }).then(response => {
            this.setState({show2: false,})
        });
        this.getPostById(this.state.post.id);
    }

    deleteReply(id) {
        if (confirm('Are you sure you want to delete this reply?')) {
            axios.post('/api/project/forum/deleteReply', {
                id: id,
            }).then(response => {
            });
            this.getPostById(this.state.post.id);
        }
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
                            {this.state.post_open ?
                                <div>
                                    <button className="button button-primary no-button" href="#reply"><i className="fas fa-reply"> </i>Reply to this post</button>
                                    <button className="button button-grey no-button" href="#reply" onClick={() => this.setState({post_open: false})}><i className="fas fa-chevron-left"></i>Go back</button>

                                </div>
                                :
                                <span>
                                    {!window.Laravel.data.ended ?
                                        <button className="button button-primary no-button" onClick={() => this.setState({show: true})}><i className="fas fa-plus"></i> Create thread</button>
                                        : ""}
                                </span>
                            }
                        </div>
                        <h5>Tags</h5>
                        <ul className="dashboard-forum-tags">
                            <li  onClick={event => this.repliesbyTag("All")}>All</li>
                            {this.state.tags.map((tag, i) => (
                                <li key={i} onClick={event => this.repliesbyTag(tag.name)}>{tag.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="nine columns">
                        {this.state.replies.length === 0 ? <div className="dashboard-forum-empty"> <i class="fas fa-comments"></i><h4>Nothing to find </h4></div> : ""}
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
                                                            {!window.Laravel.data.ended ?
                                                            <div className="actions">
                                                                {window.Laravel.user.id === reply.user_id ?<a onClick={e => this.getReply(i)}><i className="fas fa-pencil-alt"> </i></a> : ""}
                                                                {window.Laravel.user.id === reply.user_id ?<a onClick={e => this.deleteReply(reply.id)}><i className="fas fa-trash-alt"> </i></a> : ""}
                                                            </div>
                                                                : ""}
                                                        </div>
                                                        :
                                                        ""
                                                    }
                                                        </span>
                                            ))}
                                            <span>
                                            {!window.Laravel.data.ended ?
                                                <div id="reply" className="dashboard-forum-reply">
                                                    <SimpleMDEReact
                                                        className={""}
                                                        label="Reply to this post"
                                                        value={this.state.reply_message}
                                                        onChange={this.handleChange2}
                                                    />
                                                    <button className="button button-primary no-button"onClick={() => this.createReply()}>Reply</button>
                                                </div>
                                        : ""}
                                            </span>
                                        </div>

                                        :
                                        <div className="dashboard-forum-items">
                                            {this.state.repliesByTag.map((reply, i) => (
                                                <article>
                                                    <div className="item-head">
                                                        <img src={reply.user.avatar} className="float-left"/> <span><a href='#'>{reply.user.name} {reply.user.lastname}</a>
                                                        {reply.created ? " created " : " replied "} <Timestamp className="time" time={reply.created_at} precision={1} utc={false} autoUpdate={60}/></span>
                                                        <div className="clear"></div>
                                                    </div>
                                                    <div className="item-body">
                                                        <h5><a  onClick={() => this.getPostById( reply.post.id)}>{reply.post.title}</a></h5>
                                                        <ReactMarkdown source={reply.post.content.substring(0, 200)} />
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
        const {show2} = this.state;

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
                                        <form>
                                            <input type="text" value={this.state.current_tag} className="float-left" onChange={e => this.setState({ current_tag: e.target.value.toLowerCase()})} placeholder="Party, 2019, ..." required={true}/>
                                            <input type="submit" onClick={this.addTag} className="float-right" value="Add new tag" />
                                        </form>
                                    </div>
                                </TabPanel>
                            </Tabs>
                            <button className="button-primary button no-button" onClick={this.makePost}>Make thread</button>
                        </div>
                    </div>
                </PopPop>
                <PopPop
                    open={show2}
                    closeOnEsc={true}
                    onClose={() => this.toggleShow2(false)}
                    closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            Edit your reply
                            <button className="popup-btn--close"  onClick={() => this.toggleShow2(false)}>✕</button>
                        </div>
                        <div className="popup-content">
                            <div className="row">
                                <div className="twelve columns">
                                    <SimpleMDEReact
                                        className={""}
                                        label="Message"
                                        value={this.state.reply.content}
                                        onChange={this.handleChange3}
                                    />
                                </div>
                            </div>
                            <button className="button-primary button no-button" onClick={this.editReply}>Change reply</button>
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
