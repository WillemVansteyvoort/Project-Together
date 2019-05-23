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
import Select from 'react-select';
import {ProgressBar} from "reprogressbars";

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
        value: "watcher",
        label: "Watcher"
    },
    {
        value: "member",
        label: "Member"
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
export default class ProjectOverview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            project: null,
            show: false,
            created: '',
            end_date: '',
            description: '',
            users: [],
            companyUsers: [],
            groups: [],
            leaders: [],
            responsables: [],
            tags: [],
            loading: true,


            //project info
            //data
            project_memberOptions: [],
            project_title: "",
            project_description: "",
            project_end_date: "",
            project_tasks: true,
            project_notes: true,
            project_forum: false,
            project_presences: false,
            project_board: false,
            project_polls: false,
            project_activities: true,
            project_logs: false,
            project_crisisCenter: false,
            project_private: false,
            project_tags: [],
            current_tag: '',
            memberOptions: [],
            allGroups: [],
            selectedGroups: [],
            selectedGroupsId: [],
            group: '',
            groupId: 0,
            //errors
            error_name: false,
            error_title: "",
            error_date: "",
            error_description: "",
            error_own: false,
            error_own_timer: 0,
            error_new: '',

            //edit a single user
            showUser: false,
            user_id: 0,
            user_name: '',
            user_role: 0,
            user_avatar: '',

            //add a single user
            showAdd: false,
            add_userId: 0,
            add_roleId: 0,
            add_avatar: '/images/user.jpg',

            //widgets
            tasks: [],
            crisisItems: [],
            replies: [],
        };

        this.getProjectInfo = this.getProjectInfo.bind(this);
        this.dates = this.dates.bind(this);
        this.overview = this.overview.bind(this);
        this.addTag = this.addTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.editProject = this.editProject.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.close = this.close.bind(this);
        this.getCompanyUsers = this.getCompanyUsers.bind(this);
        this.addUser = this.addUser.bind(this);
        this.checkName = this.checkName.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.getReplies = this.getReplies.bind(this);
        this.getCrisisItems = this.getCrisisItems.bind(this);
        this.taskAsDone = this.taskAsDone.bind(this);
    }

    componentWillMount() {
        this.getCompanyUsers();
        this.getProjectInfo();
        this.getTasks();
        this.getCrisisItems();
        this.getReplies();
    }

    toggleShowUser(showUser) {
        this.setState({showUser});
    }

    toggleShowAdd(showAdd) {
        this.setState({showAdd});
    }

    toggleShow(show) {
        this.setState({show});
    }

    close() {
        if(confirm("Are you sure you want to close this project?")) {
            axios.post('/api/project/close', {
                project: window.Laravel.data.project,
            }).then(response => {
                window.location.reload();
            });
        }
    }

    getCompanyUsers() {
        axios.get('/api/company/users').then((
            response
            ) => {
                this.setState({companyUsers: response.data,})
            }
        );
    }

    getProjectInfo() {
        axios.post('/api/project/overview/info', {
            project: window.Laravel.data.project,
        }).then(response => {
            this.setState({
                loading: false,
               project: response.data.project,
                created: response.data.project.created_at,
                end_date: response.data.project.end_date,
                description: response.data.project.description,
                users: response.data.project.users,
                tags: response.data.project.tags,
                leaders: this.state.users.filter(function (user) {
                    return user.pivot.role === 3;
                }),
                project_title: response.data.project.name,
                project_description: response.data.project.description,
                project_end_date:response.data.project.end_date,
                project_tasks: response.data.project.tasks,
                project_notes: response.data.project.notes,
                project_forum: response.data.project.forum,
                project_presences: response.data.project.presences,
                project_board: response.data.project.board,
                project_polls: response.data.project.polls,
                project_activities: response.data.project.activities,
                project_logs: response.data.project.logs,
                project_crisisCenter: response.data.project.crisiscenter,
                project_private: response.data.project.public,
                companyUsers: response.data.companyUsers
            });

            if(response.data.end_date === null) {
                this.setState({project_end_date: ''})
            }
            let tags = response.data.project.tags;
            let newTags = [];
            for (let i = 0; i < tags.length; i++) {
                let name = tags[i].name;
                newTags.push(name);
            }

            let companyUsers = this.state.companyUsers;
            let projectUsers = response.data.project.users;
            let newCompanyUsers = [];
            for (let i  = 0; i < companyUsers.length; i++) {
                let exists = false;
                for (let j  = 0; j < projectUsers.length; j++) {
                        if(companyUsers[i].id === projectUsers[j].id) {
                            exists = true;
                    }
                }

                if(!exists) {
                   newCompanyUsers[newCompanyUsers.length+1] = companyUsers[i];
                }
            }
             this.setState({
                 companyUsers: newCompanyUsers,
                 project_tags: newTags,
                 leaders:  this.state.users.filter(function (user) {
                     return user.pivot.role === 3;
                 }),
                 responsables:  this.state.users.filter(function (user) {
                    return user.pivot.role === 2;
                }),
            });
        });
    }


    getTasks() {
        axios.post('/api/project/overview/tasks/get', {
            project: window.Laravel.data.project,
        }).then(response => {
            this.setState({
                tasks: response.data,
            });
        });
    }
    getCrisisItems() {
            axios.post('/api/project/crisiscenter/widget', {
                project: window.Laravel.data.project,
            }).then(response => {
                this.setState({
                    crisisItems: response.data,
                });
            });

    }

    getReplies() {
            axios.post('/api/project/forum/replies', {
                project: window.Laravel.data.project,
            }).then(response => {
                this.setState({
                    replies: response.data,
                });
            });

    }

    taskAsDone(taskId, i) {
        if(confirm("You sure you want to mark this task as done?")) {
            axios.post('/api/project/tasks/done', {
                project: window.Laravel.data.project,
                task_id: taskId
            }).then(response => {
                let tasks = this.state.tasks;
                tasks.splice(i, 1);
                this.setState({
                    tasks: tasks
                });
            });
        }
    }
    //tags
    addTag(e) {
        this.setState({project_tags: [...this.state.project_tags, this.state.current_tag], current_tag: ''})
    }

    removeTag(e) {
        var array = [...this.state.project_tags]; // make a separate copy of the array
        var index = array.indexOf(e.tag);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({project_tags: array});
        }
    }

    editProject() {
        if(this.state.project_title.length < 4) {
            this.setState({error_title: "The project title must have 4 characters minimum"});
        } else {
            this.setState({error_title: ""});
        }

        if(this.state.error_name) {
            this.setState({error_title: "This name is already in use"});

        }
        if(this.state.project_description.length < 10) {
            this.setState({error_description: "The description must have 10 characters minimum"});
        } else {
            this.setState({error_description: ""});
        }

        let CurrentDate = new Date();
        let givenDate = new Date(this.state.project_end_date);
        let dateError = false;
        if(this.state.project_end_date !== null && givenDate < CurrentDate){
            this.setState({error_date: "Given date is not greater than the current date."});
            dateError = true;
        } else {
            this.setState({error_date: ""});
            dateError = false;
        }
        if(this.state.project_title.length >= 4 && this.state.project_description.length >= 10 && !this.state.error_name && !dateError) {
            this.setState({
                isLoading: true,
            });
            axios.post('/api/project/edit', {
                project: window.Laravel.data.project,
                project_title: this.state.project_title,
                project_description: this.state.project_description,
                project_end_date: this.state.project_end_date,
                project_tasks: this.state.project_tasks,
                project_notes: this.state.project_notes,
                project_forum: this.state.project_forum,
                project_presences: this.state.project_presences,
                project_board: this.state.project_board,
                project_polls: this.state.project_polls,
                project_activities: this.state.project_activities,
                project_logs: this.state.project_logs,
                project_crisisCenter: this.state.project_crisisCenter,
                project_private: this.state.project_private,
                project_tags: this.state.project_tags,
            }).then(response => {
                this.getProjectInfo();
                    window.location.reload();
                this.setState({show: false})
            });
        }
    }

    checkName() {
        axios.post('/api/project/check/name', {
            name: this.state.project_title,
            project: window.Laravel.data.project,
        }).then(response => {
            if(response.data) {
                this.setState({error_title: "This name is already in use", error_name: true});
            } else {
                this.setState({error_title: "", error_name: false});

            }
        });
    }

    deleteUser(id) {
        if(confirm("Are you sure you want to delete this member? All his data will remain.")) {
            axios.post('/api/project/overview/user/delete', {
                project: window.Laravel.data.project,
                user: id,
            }).then(response => {
                this.setState({show: false})
                this.getProjectInfo();
            });
        }
    }

    editUser() {
        axios.post('/api/project/overview/user/edit', {
            project: window.Laravel.data.project,
            user: this.state.user_id,
            user_role: this.state.user_role,
        }).then(response => {
            this.setState({showUser: false})
            this.getProjectInfo();
        });
    }

    addUser() {
        if(this.state.add_userId > 0) {
            this.setState({error_new: ''})
            axios.post('/api/project/user/new', {
                project: window.Laravel.data.project,
                user_id: this.state.add_userId,
                role_id: this.state.add_roleId,
            }).then(response => {
                this.setState({showAdd: false})
                this.getProjectInfo();
            });
        } else {
            this.setState({error_new: 'Please select a member from the list'})
        }
    }

    handleRoll(selectedOption) {
        this.setState({selectedRoll: selectedOption})
    }

    dates() {
        let start_date = new Date(this.state.created);
        let end_date = new Date(this.state.end_date);
        var res = Math.abs(end_date - start_date) / 1000;
        var days = Math.floor(res / 86400);
        return (
            <div>
                <h6>Dates</h6>
                <div className="dashboard-project-info-date start float-left">
                    <h6>Starts</h6>
                    <span>{start_date.getDate()} {months[start_date.getMonth()]}</span>
                    <h6>{start_date.getFullYear()}</h6>
                </div>
                <div className="dashboard-project-info-date end float-right">
                    <h6>Ends</h6>
                    <span>{this.state.end_date == null ? "-" : end_date.getDate() + " " + months[end_date.getMonth()]}</span>
                    <h6>{this.state.end_date == null ? "" : end_date.getFullYear()}</h6>
                </div>
                <div className="float-left alert alert-black">Ends {this.state.end_date == null ? "never" : "in " + days + " days"}</div>
                <div className="clear"></div>
            </div>
        )
    }

    overview() {
        return (
            <div className="dashboard-project">
                <div className="row">
                    <div className="four columns">
                        <h5>Current tasks</h5>
                        <div className="dashboard-project-tasks">
                            <h6 className="float-left">Task List </h6>
                            <div className="clear"></div>
                            {this.state.tasks.length === 0 ? <div className="alert alert-green center-text">You have no tasks for the moment</div> : ""}
                            {this.state.tasks.map((task, i)=> (
                                <div className="dashboard-project-tasks-item" key={i}>
                                    <div className="dashboard-project-tasks-title float-left">
                                        {task.title}
                                    </div>
                                    <div className="float-right">
                                        <i className="fas fa-check" onClick={event => this.taskAsDone(task.id, i)}> </i>
                                    </div>
                                    <div className="clear"></div>
                                    {task.user_id === 0 ? <span className="dashboard-project-tasks-priority">Anyone</span> :  <div className="dashboard-project-tasks-user float-left">
                                        <img src={task.user.avatar}/>
                                    </div>}
                                    <div className="dashboard-project-tasks-item-date float-right">
                                        {task.end_date === null ? <span><span className="float-right">No deadline</span><i className="fas fa-clock float-right"> </i></span> : <span><span className="float-right"><Timestamp className="time" time={task.end_date} precision={1} utc={false} autoUpdate={60}/></span><i className="fas fa-clock float-right"> </i></span>}
                                    </div>
                                </div>
                                ))}
                        </div>
                    <h5>Project members {!window.Laravel.data.ended && (window.Laravel.data.role === 3 || window.Laravel.data.role === 2) ?<button className="no-button button button-primary new-user" onClick={e => this.setState({showAdd: true})}><i className="fas fa-user-plus"> </i></button>: ""}</h5>
                        <div className="dashboard-project-members">
                            {this.state.users.map((user, i)=> (
                                <div key={i}>
                                    <div className="dashboard-project-members-item">
                                        <img src={user.avatar} className="float-left"/>
                                        <h4 className="float-left">{user.name} {user.lastname}</h4>
                                        <span className="tag tag-primary float-right">{roles[user.pivot.role].value} </span>
                                        <div className="clear"></div>
                                        {window.Laravel.user.id !== user.id && !window.Laravel.data.ended && (window.Laravel.data.role === 3 || window.Laravel.data.role === 2) ? <span className="dashboard-project-members-actions">
                                            <i className="fas fa-trash-alt" onClick={event => this.deleteUser(user.id)}> </i>
                                            <i className="fas fa-user-edit" onClick={event => this.setState({showUser: true, user_id: user.id, user_name: user.name + user.lastname, user_role: user.pivot.role, user_avatar: user.avatar})}> </i>
                                        </span> : ""}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="eight columns">
                        <h5>Information</h5>
                        <div className="dashboard-project-info">
                            {this.dates()}
                            <h6>Description</h6>
                            <p>
                                {this.state.description}
                            </p>
                            <div className="row">
                                <div className="six columns">
                                    <h6>Leaders</h6>
                                    <div className="dashboard-project-info-responsable">
                                        {this.state.leaders.map((user, i)=> (
                                            <img key={i} src={user.avatar}/>
                                        ))}
                                    </div>
                                </div>
                                {this.state.responsables.length > 0
                                    ?
                                    <div className="six columns">
                                        <h6>Responsables</h6>
                                        <div className="dashboard-project-info-responsable">
                                            {this.state.responsables.map((user, i)=> (
                                                <img key={i} src={user.avatar}/>
                                            ))}
                                        </div>
                                    </div>: ""
                                }
                            </div>
                            {this.state.tags.length > 0 ? <h6>Tags</h6> : ""}
                            {this.state.tags.map((tag, i)=> (
                                <span className="tag tag-primary" key={i}>{tag.name}</span>
                            ))}
                        </div>
                        <div className="row">
                            {this.state.project_crisisCenter ?
                            <div className="six columns">
                                <h5>Crisis center</h5>
                                <div className="dashboard-project-crisiscenter">
                                    <div className="row">
                                        <div className="four columns">
                                            {this.state.crisisItems[0]} <i className="fas fa-exclamation-triangle green"></i>
                                        </div>
                                        <div className="four columns">
                                            {this.state.crisisItems[1]} <i className="fas fa-exclamation-triangle yellow"></i>
                                        </div>
                                        <div className="four columns">
                                            {this.state.crisisItems[2]} <i className="fas fa-exclamation-triangle red"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                : ""}
                            <div className="six columns">
                                {this.state.project_forum ?
                                    <span>
                                        <h5>Forum activity</h5>
                                        <div className="dashboard-project-forum">
                                            {this.state.replies.length === 0 ? <div className="alert alert-blue center-text">No activity to show</div> : ""}
                                                {this.state.replies.map((reply, i)=> (
                                                    <div key={i}>
                                                        {reply.created ? <span>New post created named: <a>{reply.post.title}</a></span> : <span>New reply on <a>{reply.post.title}</a></span>}
                                                    </div>
                                                    ))}
                                        </div>
                                    </span>

                                    : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {show} = this.state;
        const {showUser} = this.state;
        const {showAdd} = this.state;
        return (
            <span>
                {!window.Laravel.data.ended && (window.Laravel.data.role === 3)  ? <button className="project-header-plus no-button test" onClick={() => this.toggleShow(true)}><i className="fas fa-cog"> </i></button> : ""}

                <main className="project-main">
                        {this.state.loading ?
                            <div className="project-loading">
                                <div className="loader">Loading...</div>
                            </div>
                            : this.overview() }
                    </main>

                 <PopPop
                     open={show}
                     closeOnEsc={true}
                     onClose={() => this.toggleShow(false)}
                     closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            Modify project
                            <a className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</a>
                        </div>
                        <div className="popup-content">
                            <Tabs
                                defaultTab="one"
                                onChange={(tabId) => { tabId}}
                            >
                                <TabList>
                                    <Tab tabFor="one" className="popup-tab">General</Tab>
                                    <Tab tabFor="three" className="popup-tab">Add-ons</Tab>
                                    <Tab tabFor="five" className="popup-tab popup-tab--rights">Advanced</Tab>
                                </TabList>
                                <div>
                                    <TabPanel tabId="one">
                                        <div className="row">
                                            <div className="twelve columns">
                                                <label>Project name</label>
                                                <div id="red">{this.state.error_title}</div>
                                                <input type="text" className={this.state.error_title.length > 0 ? "border-red u-full-width" : "u-full-width"} value={this.state.project_title} onChange={e => this.setState({ project_title: e.target.value })} onBlur={this.checkName} />
                                            </div>
                                        </div>
                                          <div className="row">
                                            <div className="twelve columns">
                                                <label>Project description</label>
                                                <div id="red">{this.state.error_description}</div>
                                                <textarea value={this.state.project_description} className={this.state.error_description.length > 0 ? "border-red u-full-width" : "u-full-width"} onChange={e => this.setState({ project_description: e.target.value  })}> </textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="twelve columns">
                                                <label>End date</label>
                                                <div id="red">{this.state.error_date}</div>
                                                <input type="date" value={this.state.project_end_date} onChange={e => this.setState({ project_end_date: e.target.value  })} className={this.state.error_date.length > 0 ? "border-red u-full-width" : "u-full-width"}/>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel tabId="two">

                                    </TabPanel>
                                    <TabPanel tabId="three">
                                        <div className="popup-addons">
                                            <div className="row">
                                                <div className="three columns">
                                                    <h5><i className="fas fa-tasks"> </i>Tasks</h5>
                                                    <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={!!this.state.project_tasks}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ project_tasks: !this.state.project_tasks })}
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fas fa-sticky-note"></i> Notes</h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={!!this.state.project_notes}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ project_notes: !this.state.project_notes })}
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fas fa-comments"></i> Forum</h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={!!this.state.project_forum}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ project_forum: !this.state.project_forum })}
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fas fa-calendar-check"></i> Board </h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={!!this.state.project_board}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ project_board: !this.state.project_board })}
                                                        />
                                                     </div>
                                                </div>
                                            </div>
                                            <div className="line line-small"></div>
                                            <div className="row">
                                                <div className="three columns">
                                                    <h5><i className="fas fa-poll"> </i>Polls</h5>
                                                    <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={!!this.state.project_polls}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ project_polls: !this.state.project_polls })}
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fas fa-calendar-day"> </i> Activities</h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={!!this.state.project_activities}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fab fa-centercode"> </i> Crisis center</h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={!!this.state.project_crisisCenter}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ project_crisisCenter: !this.state.project_crisisCenter })}
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fas fa-sign-in-alt"> </i> Logs </h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={!!this.state.project_logs}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ project_logs: !this.state.project_logs })}
                                                        />
                                                     </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clear"></div>
                                    </TabPanel>
                                    <TabPanel tabId="five">
                                        <h5>Other settings</h5>
                                        <div>
                                            <input type="checkbox" id="scales" name="feature" value="scales" onChange={e => this.setState({ project_private: !this.state.project_private})} checked={this.state.project_private} />
                                            Make this project public: this means that everyone can see the forum, tasks and so on
                                            </div>
                                        <h5>Actions</h5>
                                        <button className="no-button button button-red close" onClick={this.close}>Close project</button>
                                        <div className="popup-tags">
                                            <h5>Tags</h5>
                                            {this.state.project_tags.length <= 0 ? <div id="red">No tags selected</div> :
                                                <div>
                                                    {this.state.project_tags.map((tag, i) => (
                                                        <span key={i} className="tag tag-second">{tag} <i onClick={e =>this.removeTag({tag})} className="fas fa-minus-circle"> </i></span>
                                                    ))}
                                                </div>
                                            }
                                            <form>
                                                <input type="text" value={this.state.current_tag} className="float-left" onChange={e => this.setState({ current_tag: e.target.value})} placeholder="Party, 2019, ..." required={true}/>
                                                <input type="submit" onClick={this.addTag} className="float-right" value="Add new tag" />
                                            </form>
                                        </div>
                                    </TabPanel>
                                </div>
                            </Tabs>
                            <button className="button-primary button no-button" onClick={this.editProject}>Edit project</button>
                        </div>
                    </div>
                </PopPop>

                <PopPop
                    open={showUser}
                    closeOnEsc={true}
                    onClose={() => this.toggleShowUser(false)}
                    closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            Change {this.state.user_name}
                            <button className="popup-btn--close"  onClick={() => this.toggleShowUser(false)}>✕</button>
                        </div>
                        <div className="popup-content">
                            <div className="row">
                                <div className="six columns">
                                    <img src={this.state.user_avatar} />
                                </div>
                                 <div className="six columns">
                                    <h5>Current role</h5>
                                     <span className="tag tag-primary">{roles[this.state.user_role].value}</span>
                                     <h5>Change members role</h5>
                                      <select onChange={(event) => this.setState({user_role: event.target.value})}>
                                          <option value="0">Watcher</option>
                                          <option value="1">Member</option>
                                          <option value="2">Responsable</option>
                                          <option value="3">Leader</option>
                                      </select>
                                </div>
                                <button className="button-primary button no-button float-right" onClick={this.editUser}>Change role</button>
                            </div>
                        </div>
                    </div>
                </PopPop>

                 <PopPop
                     open={showAdd}
                     closeOnEsc={true}
                     onClose={() => this.toggleShowAdd(false)}
                     closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            New member
                            <button className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</button>
                        </div>
                        <div className="popup-content">
                            <div className="row">
                                <div className="six columns">
                                    <img src={this.state.add_avatar} />
                                </div>
                                 <div className="six columns">
                                     <h5>Company member</h5>
                                     <div id="red">{this.state.error_new} </div>
                                     <select onChange={(event) => this.setState({add_userId: event.target.value})}>
                                         <option> </option>

                                        {this.state.companyUsers.map((user, i) => (
                                            <option value={user.id} key={i}>{user.name} {user.lastname}</option>
                                        ))}
                                      </select>
                                     <h5>Member role</h5>
                                      <select onChange={(event) => this.setState({add_roleId: event.target.value})}>
                                          <option value="0">Watcher</option>
                                          <option value="1">Member</option>
                                          <option value="2">Responsable</option>
                                          <option value="3">Leader</option>
                                      </select>
                                </div>
                                <button className="button-primary button no-button float-right" onClick={this.addUser}>Add member</button>
                            </div>
                        </div>
                    </div>
                </PopPop>
            </span>

        );
    }
}

if (document.getElementById('project-overview')) {
    ReactDOM.render(<ProjectOverview />, document.getElementById('project-overview'));
}
