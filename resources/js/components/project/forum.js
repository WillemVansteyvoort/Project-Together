import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PieChart from 'react-minimal-pie-chart';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
const Timestamp = require('react-timestamp');
import "react-sweet-progress/lib/style.css";
import PopPop from 'react-poppop';
import Popup from 'reactjs-popup'
import SimpleMDEReact from "react-simplemde-editor";
import LocalizedStrings from 'localized-strings';
import en from '../lang/en.json';
import nl from '../lang/nl.json';

let strings = new LocalizedStrings({en,nl})
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
            show3: false,
            //new note
            created: false,
            created_timer: 0,

            //create post
            post_title: '',
            post_tags: [],
            current_tag: 'all',
            post_message: '',

            //get current reply
            post: [],
            post_replies: [],
            post_user: [],
            post_get: false,
            post_open: false,

            //get current post
            first: [],
            first_title: '',
            first_content: '',
            first_get: false,
            first_open: false,

            //new reply
            reply_message: "",

            //edit reply
            reply: [],
            replyNew_message: "",

            //errors
            error_content: "",
            error_title: "",
            error_firstContent: "",
            error_firsrTitle: "",
            error_replyContent: "",
            error_newContent: "",

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
        this.getPost = this.getPost.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.editFirst = this.editFirst.bind(this);
        this.deleteFirst = this.deleteFirst.bind(this);
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

    handleChange4 (value) {
        this.setState({
            first_content: value
        });
    };


    componentWillMount() {
        strings.setLanguage(window.Laravel.lang);
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

    toggleShow3(show3) {
        this.setState({show3});
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
        var array = [...this.state.post_tags]; // make a separate copy of the array
        var index = array.indexOf(e.tag);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({post_tags: array});
        }
    }

    makePost() {

        if(this.state.post_message.length < 40) {
            this.setState({error_content: "The description must have at least 40 characters"})
        } else {
            this.setState({error_content: " "})

        }

        if(this.state.post_title.length < 4) {
            this.setState({error_title: "The subject must have at least 4 characters"})
        } else {
            this.setState({error_title: " "})
        }

        if(this.state.post_message.length >= 40 && this.state.post_title.length >= 4 ) {
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

        if(this.state.reply_message.length < 10) {
            this.setState({error_newContent: "The reply must have at least 10 characters"})
        } else {
            this.setState({error_newContent: " "})

        }

        if(this.state.reply_message.length >= 10) {
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
    }

    getReply(id) {
        this.setState({reply: this.state.post_replies[id], show2: true});
    }

    getPost(id) {
        this.setState({first_content: this.state.post.content, first_title: this.state.post.title, show3: true});
    }

    editReply() {
        if(this.state.replyNew_message.length < 10) {
            this.setState({error_replyContent: "The reply must have at least 10 characters"})
        } else {
            this.setState({error_replyContent: " "})

        }

        if(this.state.replyNew_message.length >= 10) {
            axios.post('/api/project/forum/editReply', {
                id: this.state.reply.id,
                message: this.state.replyNew_message,
            }).then(response => {
                this.setState({show2: false,})
            });
            this.getPostById(this.state.post.id);
        }

    }

    editFirst() {
        if(this.state.first_content.length < 40) {
            this.setState({error_firstContent: "The description must have at least 40 characters"})
        } else {
            this.setState({error_firstContent: " "})

        }

        if(this.state.first_title.length < 4) {
            this.setState({error_firstTitle: "The subject must have at least 4 characters"})
        } else {
            this.setState({error_firstTitle: " "})
        }

        if(this.state.first_content.length >= 40 &&this.state.first_title.length >= 4) {
            axios.post('/api/project/forum/editFirst', {
                id: this.state.post.id,
                title: this.state.first_title,
                message: this.state.first_content,
            }).then(response => {
                let post = this.state.post;
                post.content = this.state.first_content;
                post.title = this.state.first_title;
                this.setState({show3: false, post: post})
            });
            this.getPostById(this.state.post.id);
        }

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

    deleteFirst() {
            if (confirm('Are you sure you want to delete this thread?')) {
                axios.post('/api/project/forum/deleteFirst', {
                    id:this.state.post.id,
                }).then(response => {
                    this.getReplies();
                    this.setState({post_open: false})
                });
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
                                    {!window.Laravel.data.ended &&  window.Laravel.data.role !== 0  ?
                                        <button className="button button-primary no-button" href="#reply"><i className="fas fa-comment-dots"></i> {strings.getString("Reply to this thread")}</button>
                                        : ""}
                                    <button className="button button-grey no-button" href="#reply" onClick={() => this.setState({post_open: false})}><i className="fas fa-chevron-left"></i>{strings.getString("Go back")}</button>

                                </div>
                                :
                                <span>
                                     {!window.Laravel.data.ended &&  window.Laravel.data.role !== 0  ?
                                        <button className="button button-primary no-button" onClick={() => this.setState({show: true})}><i className="fas fa-plus"></i> {strings.getString("Create thread")}</button>
                                        : ""}
                                </span>
                            }
                        </div>
                        <h5>Tags</h5>
                        <ul className="dashboard-forum-tags">
                            <li  onClick={event => this.repliesbyTag("All")}>{strings.getString("All")}</li>
                            {this.state.tags.map((tag, i) => (
                                <li key={i} onClick={event => this.repliesbyTag(tag.name)}>{tag.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="nine columns">
                        {this.state.replies.length === 0 ? <div className="dashboard-forum-empty"> <i className="fas fa-comments"></i><h4>{strings.getString("Nothing to find")} </h4></div> : ""}
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
                                                {!window.Laravel.data.ended &&  window.Laravel.data.role !== 0  ?
                                                    <div className="actions">
                                                        {window.Laravel.user.id === this.state.post.user_id  || (window.Laravel.data.role === 2 || window.Laravel.data.role === 3)  ?
                                                            <span>
                                                                <a onClick={e => this.getPost()}><i className="fas fa-pencil-alt"> </i></a>
                                                                <a onClick={e => this.deleteFirst()}><i className="fas fa-trash-alt"> </i></a>
                                                            </span>
                                                            : ""}
                                                    </div>
                                                    : ""}
                                            </div>
                                            {this.state.post_replies.map((reply, i) => (
                                                <span key={i}>
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
                                                            {!window.Laravel.data.ended &&  window.Laravel.data.role !== 0?
                                                            <div className="actions">
                                                                {window.Laravel.user.id === reply.user_id  || window.Laravel.data.role === 2 || window.Laravel.data.role === 3 ?<a onClick={e => this.getReply(i)}><i className="fas fa-pencil-alt"> </i></a> : ""}
                                                                {window.Laravel.user.id === reply.user_id  || window.Laravel.data.role === 2 || window.Laravel.data.role === 3 ?<a onClick={e => this.deleteReply(reply.id)}><i className="fas fa-trash-alt"> </i></a> : ""}
                                                            </div>
                                                                : ""}
                                                        </div>
                                                        :
                                                        ""
                                                    }
                                                        </span>
                                            ))}
                                            <span>
                                             {!window.Laravel.data.ended &&  window.Laravel.data.role !== 0  ?
                                                <div id="reply" className="dashboard-forum-reply">
                                                    <div id="red">{this.state.error_newContent}</div>
                                                    <SimpleMDEReact
                                                        className={""}
                                                        label={strings.getString("Reply to this thread")}
                                                        value={this.state.reply_message}
                                                        onChange={this.handleChange2}
                                                    />
                                                    <button className="button button-primary no-button" onClick={() => this.createReply()}>
                                                        <i className="fas fa-comment-dots"></i> {strings.getString('Reply')}</button>
                                                </div>
                                        : ""}
                                            </span>
                                        </div>

                                        :
                                        <div className="dashboard-forum-items">
                                            {this.state.repliesByTag.map((reply, i) => (
                                                <article key={i}>
                                                    <div className="item-head">
                                                        <img src={reply.user.avatar} className="float-left"/> <span><a href='#'>{reply.user.name} {reply.user.lastname}</a>
                                                        {reply.created ? strings.getString('created') : strings.getString("replied")} <Timestamp className="time" time={reply.created_at} precision={1} utc={false} autoUpdate={60}/></span>
                                                        <div className="clear"></div>
                                                    </div>
                                                    <div className="item-body">
                                                        <h5><a href="#" onClick={() => this.getPostById( reply.post.id)}>{reply.post.title}</a></h5>
                                                        {reply.content === null ? <ReactMarkdown source={reply.post.content.substring(0, 200) + "..."} /> : <ReactMarkdown source={reply.content.substring(0, 200) + "..."} />}
                                                        {reply.post.tags.map((tag, i) => (
                                                            <span className="tag tag-primary" key={i}>{tag.name}</span>
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
        const {show3} = this.state;

        return (
            <span>
                <Popup trigger={<button className="project-header-plus no-button no-padding ">
                    <i className="fas fa-question"> </i>
                </button>} position="top left">
                {close => (
                    <div className="popup-sidebar">
                        <h2>Forum</h2>
                        <p>With the add-on forum, you can discuss with your project partners.</p>
                        <h5>what's a forum?</h5>
                        <p>"Public medium (such as a newspaper column) or place used for debates in which anyone can participate. In Roman times it meant a public place at the center of a market or town where open discussions on judicial, political, and other issues were held."</p>
                        <h5>Make a thread</h5>
                        <p>A thread is the start post for a debate. The thread contains contains the point of the discussion. You can make a thread by clicking on the button "create thread"  on the left.</p>
                        <p className="center-text"><img src="/images/help/forumThread.JPG" width="250px" /></p>
                        <p>A popup with two tabs will appear: general and tags. On the "general" tab you have to fill in a title and the content of the message. On the "tags" tab you can add tags to the thread.</p>
                        <h5>Sort based on tags</h5>
                        <p className="center-text"><img src="/images/help/forumTags.JPG" width="250px" /></p>
                        <p>If you want, you can sort the results based on the tags of the threads. All what you have to do is to click on the prefered tag on the left. The results will now be showed on the right.</p>
                        <h5>Reply on a thread</h5>
                        <p>When opening a thread (by clicking on the title), you can reply to it. You can click on the button "Reply to this thread" or scroll down to the end of the page.</p>
                        <h5>Modify a reply/thread</h5>
                        <p>The owner of a reply or owner of the thread, the leaders or the responsables can modify and delete replies. Go to the reply or thread you want to modify or delete. If you want to modify, click on the "pencil" icon on the right. If you want to delete, click on the "trash" icon on the right.</p>
                        <p className="center-text"><img src="/images/help/forumModify.JPG" width="100px" /></p>
                        <p><b>See more on the <a href="/docs">documentation</a> page.</b></p>
                    </div>
                )}
                 </Popup>
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
                                {strings.getString('Make a new thread')}
                                <button className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</button>
                            </div>
                            <div className="popup-content">
                                    <Tabs
                                        defaultTab="one"
                                        onChange={(tabId) => { tabId}}
                                    >
                                        <TabList>
                                            <Tab tabFor="one" className="popup-tab">{strings.getString('General')}</Tab>
                                            <Tab tabFor="two" className="popup-tab">Tags</Tab>
                                        </TabList>
                                        <TabPanel tabId="one">
                                            <div className="row">
                                                <div className="twelve columns">
                                                    <label>{strings.getString('Subject')}</label>
                                                    <div id="red">{this.state.error_title}</div>
                                                    <input type="text" value={this.state.post_title} onChange={e => this.setState({ post_title: e.target.value  })} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="twelve columns">
                                                    <div id="red">{this.state.error_content}</div>
                                                    <SimpleMDEReact
                                                        className={""}
                                                        label={strings.getString('Message')}
                                                        value={this.state.message}
                                                        onChange={this.handleChange1}
                                                    />
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel tabId="two">
                                            <div className="popup-tags">
                                                <h5>Tags</h5>
                                                {this.state.post_tags.length <= 0 ? <div id="red">{strings.getString('No tags selected')}</div> :
                                                    <div>
                                                        {this.state.post_tags.map((tag, i) => (
                                                            <span className="tag tag-second" key={i}>{tag} <i onClick={e =>this.removeTag({tag})} className="fas fa-minus-circle"> </i></span>
                                                        ))}
                                                    </div>
                                                }
                                                <form>
                                                    <input type="text" value={this.state.current_tag} className="float-left" onChange={e => this.setState({ current_tag: e.target.value.toLowerCase()})} placeholder="Party, 2019, ..." required={true}/>
                                                    <input type="submit" onClick={this.addTag} className="float-right" value={strings.getString('Add new tag')} />
                                                </form>
                                            </div>
                                        </TabPanel>
                                    </Tabs>
                                    <button className="button-primary button no-button" onClick={this.makePost}><i
                                        className="fas fa-plus"> </i> {strings.getString('Make thread')}</button>
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
                                {strings.getString('Edit your reply')}
                                <button className="popup-btn--close"  onClick={() => this.toggleShow2(false)}>✕</button>
                            </div>
                            <div className="popup-content">
                                <div className="row">
                                    <div className="twelve columns">
                                        <div id="red">{this.state.error_replyContent}</div>
                                        <SimpleMDEReact
                                            className={""}
                                            label={strings.getString('Message')}
                                            value={this.state.reply.content}
                                            onChange={this.handleChange3}
                                        />
                                    </div>
                                </div>
                                <button className="button-primary button no-button" onClick={this.editReply}><i
                                    className="fas fa-edit"></i> {strings.getString('Change reply')}</button>
                            </div>
                        </div>
                    </PopPop>
                    <PopPop
                        open={show3}
                        closeOnEsc={true}
                        onClose={() => this.toggleShow3(false)}
                        closeOnOverlay={true}>
                        <div className="popup">
                            <div className="popup-titleBar">
                                {strings.getString('Edit your Thread')}
                                <button className="popup-btn--close"  onClick={() => this.toggleShow3(false)}>✕</button>
                            </div>
                            <div className="popup-content">
                                <label>{strings.getString('Subject')}</label>
                                <div id="red">{this.state.error_firstTitle}</div>
                                <input type="text" value={this.state.first_title}  onChange={event => this.setState({first_title: event.target.value})}/>
                                <div className="row">
                                    <div className="twelve columns">
                                        <div id="red">{this.state.error_firstContent}</div>
                                        <SimpleMDEReact
                                            className={""}
                                            label={strings.getString('Message')}
                                            value={this.state.first_content}
                                            onChange={this.handleChange4}
                                        />
                                    </div>
                                </div>
                                <button className="button-primary button no-button" onClick={this.editFirst}><i
                                    className="fas fa-edit"></i> {strings.getString('Change thread')}</button>
                            </div>
                        </div>
                    </PopPop>
                </main>
            </span>

        );
    }
}

if (document.getElementById('project-forum')) {
    ReactDOM.render(<ProjectForum />, document.getElementById('project-forum'));
}
