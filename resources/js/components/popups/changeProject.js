import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import PopPop from 'react-poppop';
import ReactPasswordStrength from '@rodrigowpl/react-password-strength';
import { ProgressBar } from 'reprogressbars';
import Switch from "react-switch";
import Select from 'react-select';
import Notification from '../notification';
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


export default class PopupChangeProject extends Component {


    constructor(props) {
        super(props)
        this.state = {

            project: props.project,
            company: props.company,
            name: '',
            description: "",

            groups: [],
            users: [],
            memberOptions: [],
            allGroups: [],
            selectedGroups: [],
            selectedGroupsId: [],
            group: '',
            groupId: 0,
            show: false,
            countries: [],
            selectedUser: null,
            selectedRoll: null,
            selectedMembers: [],
            tags: [],
            current_tag: '',
            delete_tag: '',
            //success
            updated: false,
            updated_message: "",
            isLoading: false,
            test: null,

            //data
            title: "",
            end_date: "",
            tasks: 1,
            notes: 1,
            forum: 1,
            presences: 0,
            polls: 0,
            activities: 1,
            logs: 0,
            crisisCenter: 0,
            private: 0,

            //errors
            error_title: "",
            error_date: "",
            error_description: "",
            error_own: false,
            error_own_timer: 0,


        };
        //bind

        this.getGroups = this.getGroups.bind(this);
        this.addGroup = this.addGroup.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.handleMember = this.handleMember.bind(this);
        this.handleRoll = this.handleRoll.bind(this);
        this.addItem = this.addItem.bind(this);
        this.addTag = this.addTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.createProject = this.createProject.bind(this);
        this.changeOwn = this.changeOwn.bind(this);
        this.changeOwnTimer = this.changeOwnTimer.bind(this);

        this.getProjectInfo = this.getProjectInfo.bind(this);
    }

    getProjectInfo() {
        axios.post('/api/project/overview/info', {
            project: window.Laravel.data.project,
        }).then(response => {
            this.setState({
               name: response.data.name,
                description: response.data.description,
                end_date: response.data.end_date,
                tasks: response.data.tasks,
                notes: response.data.notes,
                forum: response.data.forum,
                presences: response.data.presences,
                polls: response.data.polls,
                activities: response.data.activities,
                logs: response.data.logs,
                crisisCenter: response.data.crisiscenter,
                private: response.data.public,
            });
        });
    }
    removeGroup() {
        this.setState(test => {this.state.memberOptions.filter(key => [key].value == 1);
        });
    }

    addGroup(e) {
        e.preventDefault();

        const index = this.state.groups.findIndex(value => value.name === this.state.group);

        this.state.groups.splice(index, 1);

        this.setState({
            selectedGroups: [...this.state.selectedGroups, this.state.group]
        })
    }
    changeOwn() {
        if(this.state.error_own_timer > 0) {
            this.setState({error_own: false, error_own_timer: 0})
        }
    }
    changeOwnTimer() {
        if(this.state.error_own) {
            this.setState({error_own_timer: true})
        }
    }

    removeItem(item) {
        var array = [...this.state.selectedMembers]; // make a separate copy of the array
        var index = this.state.selectedMembers.map(function(e) { return e.name; }).indexOf(item.selected.name);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({selectedMembers: array});
        }
        if(item.selected.type === 'user') {
            var newItem = {
                type: 'user',
                id: this.state.memberOptions.id,
                avatar: item.selected.avatar,
                unique: item.selected.unique,
                value: item.selected.id,
                label: item.selected.name,
            }
            this.setState({memberOptions: [...this.state.memberOptions, newItem]})
        } else {
            var newItem = {
                type: 'group',
                id: this.state.memberOptions.id,
                avatar: '',
                unique: item.selected.unique,
                value: item.selected.id,
                label: item.selected.name,
            }
            this.setState({memberOptions: [...this.state.memberOptions, newItem]})
        }
        if(item.selected.unique === window.Laravel.user.id) {
            this.setState({error_own: true});
        }
    }

    addItem(e) {
        e.preventDefault();
        var array = [...this.state.memberOptions]; // make a separate copy of the array
        var index = this.state.memberOptions.map(function(e) { return e.value; }).indexOf(this.state.selectedUser.value);
        array.splice(index, 1);
        this.setState({memberOptions: array});
        var item = {
            id: this.state.selectedUser.id,
            unique: this.state.selectedUser.unique,
            name: this.state.selectedUser.label,
            avatar: this.state.selectedUser.avatar,
            type: this.state.selectedUser.type,
            roll: this.state.selectedRoll.label,
        }
        this.setState(
            {
                selectedMembers: [...this.state.selectedMembers, item],
                selectedUser: null,
                selectedRoll: null,
            }
        )
    }

    createProject() {

        var errors = false;
        if(this.state.title.length < 4) {
            this.setState({error_title: "The project title must have 4 characters minimum"});
            errors = true;
        } else {
            this.setState({error_title: ""});
            errors = false;
        }
        if(this.state.description.length < 10) {
            this.setState({error_description: "The description must have 10 characters minimum"});
            errors = true;
        } else {
            this.setState({error_description: ""});
            errors = false;
        }

        let CurrentDate = new Date();
        let givenDate = new Date(this.state.end_date);
        if(givenDate < CurrentDate){
            this.setState({error_date: "Given date is not greater than the current date."});
            errors = true;
        } else {
            this.setState({error_date: ""});
        }
        if(!errors) {
            this.setState({
                isLoading: true,
            });

            axios.post('/api/project/new', {
                title: this.state.title,
                description: this.state.description,
                end_date: this.state.end_date,
                tasks: this.state.tasks,
                notes: this.state.notes,
                forum: this.state.forum,
                presences: this.state.presences,
                polls: this.state.polls,
                activities: this.state.activities,
                logs: this.state.logs,
                crisisCenter: this.state.crisisCenter,
                private: this.state.private,
                selectedMembers: this.state.selectedMembers,
                tags: this.state.tags
            }).then(response => {
                this.setState({
                    isLoading: false,
                    title: "",
                    description: "",
                    end_date: "",
                    tasks: true,
                    notes: true,
                    forum: true,
                    presences: false,
                    polls: false,
                    activities: true,
                    logs: false,
                    crisisCenter: false,
                    private: false,
                    selectedMembers: [],
                });
            });
            this.getUsers();
        }
    }

    componentWillMount() {
        this.getGroups();
        this.getProjectInfo();
        this.getUsers();
        this.removeGroup();

    }

    componentDidMount() {
        this.interval =  setInterval(() => this.changeOwnTimer(), 3500);
        this.interval =  setInterval(() => this.changeOwn(), 4000);

    }

    componentWillUnmount() {
        // clearInterval(this.interval);
    }

    //get information
    getGroups() {
        axios.get('/api/company/groups').then((
            response
            ) => {
                this.setState({
                    groups: response.data,
                    allGroups: response.data
                })
            }
        );
        this.setState({
            isLoading: false,
        });
    }

    getUsers() {
        axios.get('/api/company/users').then((
            response
            ) => {
                this.setState({
                    users: response.data,})
                var users = this.state.users;
                var groups = this.state.allGroups;
                var newOptions = [];
                for (var i = 0; i < users.length; i++) {
                    var newItem = {
                        type: 'user',
                        id: i,
                        avatar: users[i].avatar,
                        value: users[i].id,
                        unique: users[i].id,
                        label: users[i].name + " " + users[i].lastname,
                    }
                    newOptions[i] = newItem;
                }
                for (var i = 0; i < groups.length; i++) {
                    var newItem = {
                        type: 'group',
                        id: (i+this.state.users.length),
                        value: groups[i].id,
                        avatar: '',
                        unique: groups[i].id,
                        label: groups[i].name,
                    }
                    newOptions[i+this.state.users.length] = newItem;
                }
                this.setState({memberOptions: newOptions});


                var array = [...this.state.memberOptions];
                var index = this.state.memberOptions.map(function(e) { return e.label; }).indexOf(window.Laravel.user.name + " " + window.Laravel.user.lastname);
                array.splice(index, 1);
                this.setState({memberOptions: array});
                var item = {
                    id: 0,
                    unique: window.Laravel.user.id,
                    name: window.Laravel.user.name + " " + window.Laravel.user.lastname,
                    avatar: window.Laravel.user.avatar,
                    type: "user",
                    roll: "leader",
                }
                this.setState(
                    {
                        selectedMembers: [...this.state.selectedMembers, item],
                        selectedUser: null,
                        selectedRoll: null,
                    }
                )
            }
        );
    }

    handleMember(selectedOption) {
        // this.setState({selectedMembers: [...this.state.selectedMembers, selectedOption]})
        this.setState({selectedUser: selectedOption})
    }

    handleRoll(selectedOption) {
        this.setState({selectedRoll: selectedOption})
    }

    addTag(e) {
        this.setState({tags: [...this.state.tags, this.state.current_tag], current_tag: ''})
    }

    removeTag(e) {
        console.log(e);
        var array = [...this.state.tags]; // make a separate copy of the array
        var index = array.indexOf(e.tag);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({tags: array});
        }
    }

    //popup
    toggleShow(show) {
        this.setState({show});
    }

    render() {
        const {show} = this.state;
        const { selectedOption } = this.state;
        return (
            <span>
                <button onClick={() => this.toggleShow(true)}className="project-header-plus no-button">
                    <i className="fas fa-cog"></i>
                </button>
                <div className={this.state.error_own ? "" : "hidden"}>
                    <Notification  type="error" title="Attention" message="You have removed yourself from the list."/>
                </div>
                <PopPop
                    open={show}
                    closeOnEsc={true}
                    onClose={() => this.toggleShow(false)}
                    closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            Change {this.state.name}
                            <a className="popup-btn--close"  onClick={() => this.toggleShow(false)}>✕</a>
                        </div>
                        <div className="popup-content">
                            <Tabs
                                defaultTab="one"
                                onChange={(tabId) => { tabId}}
                            >
                                <TabList>
                                    <Tab tabFor="one" className="popup-tab">General</Tab>
                                    <Tab tabFor="two" className="popup-tab">Members</Tab>
                                    <Tab tabFor="three" className="popup-tab">Add-ons</Tab>
                                    <Tab tabFor="five" className="popup-tab popup-tab--rights">Advanced</Tab>
                                </TabList>
                                <div className={this.state.updated ? "alert alert-green center-text" : "hidden"}>{this.state.updated_message}
                                    <a className="float-right"  onClick={() => this.setState({ updated: false })}>✕</a>
                                    <div className="clear"> </div>
                                </div>
                                <div className={!this.state.isLoading ? "" : "hidden"}>
                                    <TabPanel tabId="one">
                                        <div className="row">
                                            <div className="twelve columns">
                                                <label>Project name</label>
                                                <div id="red">{this.state.error_title}</div>
                                                <input readOnly={true} type="text" className={this.state.error_title.length > 0 ? "border-red u-full-width" : "u-full-width"} value={this.state.name} onChange={e => this.setState({ title: e.target.value })} />
                                            </div>
                                        </div>
                                          <div className="row">
                                            <div className="twelve columns">
                                                <label>Project description</label>
                                                <div id="red">{this.state.error_description}</div>
                                                <textarea value={this.state.description} className={this.state.error_description.length > 0 ? "border-red u-full-width" : "u-full-width"} onChange={e => this.setState({ description: e.target.value  })}> </textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="twelve columns">
                                                <label>End date</label>
                                                <div id="red">{this.state.error_date}</div>
                                                <input type="date" value={this.state.end_date} onChange={e => this.setState({ end_date: e.target.value  })} className={this.state.error_date.length > 0 ? "border-red u-full-width" : "u-full-width"}/>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel tabId="two">
                                        <div className="popup-groups">
                                            <h5>Members</h5>
                                            {this.state.selectedMembers.length <= 0 ? <div className="alert alert-red">No users or groups have been selected</div> : ""}
                                            {this.state.selectedMembers.map(selected => (
                                                <span>
                                                       {selected.avatar.length > 0 ? <li className="groups-dark"><img src={selected.avatar} /> {selected.name} <span className="tag tag-primary">{selected.roll}</span> <i onClick={e =>this.removeItem({selected})} className="fas fa-minus-circle float-right"> </i>
                                                       </li> : <li className="groups-dark">{selected.name} <span className="tag tag-second">Group</span> <span className="tag tag-primary">{selected.roll}</span> <i onClick={e =>this.removeItem({selected})} className="fas fa-minus-circle float-right"> </i>
                                                       </li>}
                                                    <div className="clear"> </div>
                                                       </span>
                                            ))}
                                        </div>
                                        {this.state.selectedOption}
                                        <div className="popup-addGroup">
                                                <div className="popup-members">
                                                    <form onSubmit={this.addItem}>
                                                         <Select
                                                             placeholder={"Choose a member or group"}
                                                             onChange={this.handleMember}
                                                             className="popup-members-list"
                                                             required = {true}
                                                             options={this.state.memberOptions}
                                                             value={this.state.selectedUser}
                                                             theme={(theme) => ({
                                                                 ...theme,
                                                                 borderRadius: 0,
                                                                 padding: "14px",
                                                                 colors: {
                                                                     ...theme.colors,
                                                                 },
                                                             })}
                                                         />
                                                     <Select
                                                         value={this.state.selectedRoll}
                                                         placeholder={"Choose a role"}
                                                         onChange={this.handleRoll}
                                                         options={roles}
                                                         className="popup-members-roll"
                                                         required = {true}
                                                         theme={(theme) => ({
                                                             ...theme,
                                                             borderRadius: 0,
                                                             padding: "14px",
                                                             colors: {
                                                                 ...theme.colors,
                                                             },
                                                         })}
                                                     />
                                                       <div className="popup-members-add">
                                                        <input type="submit" value="Add member" />
                                                    </div>
                                                    </form>

                                                    <div className="clear"> </div>
                                                </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel tabId="three">
                                        <div className="popup-addons">
                                            <div className="row">
                                                <div className="three columns">
                                                    <h5><i className="fas fa-tasks"> </i>Tasks</h5>
                                                    <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={this.state.tasks}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ tasks: !this.state.tasks })}
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fas fa-sticky-note"></i> Notes</h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={this.state.notes}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ notes: !this.state.notes })}
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fas fa-comments"></i> Forum</h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={this.state.forum}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ forum: !this.state.forum })}
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fas fa-calendar-check"></i> Presences </h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={this.state.presences}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ presences: !this.state.presences })}
                                                        />
                                                     </div>
                                                </div>
                                            </div>
                                            <div className="line line-small"></div>
                                            <div className="row">
                                                <div className="three columns">
                                                    <h5><i className="fas fa-poll-h"> </i>Polls</h5>
                                                    <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={this.state.polls}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ polls: !this.state.polls })}
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fas fa-calendar-day"> </i> Activities</h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={this.state.activities}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ activities: !this.state.activities })}
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fab fa-centercode"> </i> Crisis center</h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={this.state.crisisCenter}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ crisisCenter: !this.state.crisisCenter })}
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fas fa-sign-in-alt"> </i> Logs </h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={this.state.logs}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ logs: !this.state.logs })}
                                                        />
                                                     </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clear"></div>
                                    </TabPanel>
                                    <TabPanel tabId="five">
                                        <div className="popup-tags">
                                            <h5>Tags</h5>
                                            {this.state.tags.length <= 0 ? <div id="red">No tags selected</div> :
                                                <div>
                                                    {this.state.tags.map(tag => (
                                                        <span className="tag tag-second">{tag} <i onClick={e =>this.removeTag({tag})} className="fas fa-minus-circle"> </i></span>
                                                    ))}
                                                </div>
                                            }
                                            <form onSubmit={this.addTag} action="#">
                                                <input type="text" value={this.state.current_tag} className="float-left" onChange={e => this.setState({ current_tag: e.target.value})} placeholder="Party, 2019, ..." required={true}/>
                                                <input type="submit" className="float-right" value="Add new tag" />
                                            </form>
                                        </div>
                                        <h5>Other settings</h5>
                                        <div>
                                            <input type="checkbox" id="scales" name="feature" value="scales" onChange={e => this.setState({ private: !this.state.private})} checked={this.state.private} />
                                            Make this project public: this means that everyone can see the forum, tasks and so on
                                            </div>
                                    </TabPanel>
                                </div>
                            </Tabs>
                            <button className="button-primary button no-button" onClick={this.createProject}>Update project</button>
                        </div>
                        <div className={this.state.isLoading ? "popup-loading" : "hidden"}>
                            <h5>We are busy creating the project. Have a little patience. ...</h5>
                            <ProgressBar isLoading={this.state.isLoading}  cla ssName="fixed-progress-bar" height="10px" color="#5680e9" />
                        </div>
                    </div>
                </PopPop>
            </span>
        );
    }
}

if (document.getElementById('popup-changeProject')) {
    ReactDOM.render(<PopupChangeProject />, document.getElementById('popup-changeProject'));
}