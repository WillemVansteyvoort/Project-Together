import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import PopPop from 'react-poppop';
import Popup from 'reactjs-popup'
import ReactPasswordStrength from '@rodrigowpl/react-password-strength';
import { ProgressBar } from 'reprogressbars';
import Switch from "react-switch";
import Select from 'react-select';
import Notification from '../notification';
var roles  = [
    {
        value: "member",
        label: "member"
    },
    {
        value: "watcher",
        label: "watcher"
    },
    {
        value: "responsable",
        label: "responsable"
    },
    {
        value: "leader",
        label: "leader"
    },

]


export default class PopupNewProject extends Component {


    constructor(props) {
        super(props)
        this.state = {
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
            description: "",
            end_date: "",
            tasks: true,
            notes: true,
            forum: false,
            presences: false,
            board: false,
            polls: false,
            activities: true,
            logs: false,
            crisisCenter: false,
            private: false,

            //errors
            error_title: "",
            error_name: false,
            error_date: "",
            error_description: "",
            error_own: false,
            error_own_timer: 0,

            created: false,
            created_timer: 0,
            url: '',
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
        this.checkName = this.checkName.bind(this);
    }


    removeGroup() {
        this.setState(test => {this.state.memberOptions.filter(key => [key].value == 1);
        });
    }

    changeCreated() {
        if(this.state.created_timer) {
            this.setState({created: false})
        }
    }
    changeCreatedTimer() {
        this.setState({created_timer: 1})
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
        this.checkName();
        if(this.state.title.length < 4) {
            this.setState({error_title: "The project title must have 4 characters minimum"});
        } else {
            this.setState({error_title: ""});
        }
        if(this.state.error_name) {
            this.setState({error_title: "This name is already in use"});

        }
        if(this.state.description.length < 10) {
            this.setState({error_description: "The description must have 10 characters minimum"});
        } else {
            this.setState({error_description: ""});
        }

        let CurrentDate = new Date();
        let givenDate = new Date(this.state.end_date);
        let timeError = false;
        if(this.state.end_date !== null && givenDate < CurrentDate){
            timeError = true;
            this.setState({error_date: "Given date is not greater than the current date."});
        } else {
            timeError = false;
                this.setState({error_date: ""});
        }
        if(this.state.title.length >= 4 && this.state.description.length >= 10 && !timeError && !this.state.error_name) {
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
                board: this.state.board,
                polls: this.state.polls,
                activities: this.state.activities,
                logs: this.state.logs,
                crisisCenter: this.state.crisisCenter,
                private: this.state.private,
                selectedMembers: this.state.selectedMembers,
                tags: this.state.tags
            }).then(response => {
                window.location.href = response.data + "/project";
                this.setState({
                    url: response.data,
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
                    show: false,
                    created: true,
                });
            });
           this.getUsers();
        }
    }

    componentWillMount() {
        this.getGroups();
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
        var array = [...this.state.tags]; // make a separate copy of the array
        var index = array.indexOf(e.tag);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({tags: array});
        }
    }

    checkName() {
        console.log("wa");
        axios.post('/api/project/check/name', {
           name: this.state.title,
        }).then(response => {
            if(response.data) {
                this.setState({error_title: "This name is already in use", error_name: true});
            }
        });
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
                <li><button onClick={() => this.toggleShow(true)} className="button-second button no-button"><i className="fas fa-plus"> </i> New project</button></li>
                <div className={this.state.error_own ? "" : "hidden"}>
                    <Notification  type="error" title="Attention" message="You have removed yourself from the list."/>
                </div>
                 <div id="success" className={this.state.created ? "" : "hidden"}>
                    <Notification  type="success" title="successfully" message="The new project is successfully been created"/>
                </div>
                <PopPop
                    open={show}
                    closeOnEsc={true}
                    onClose={() => this.toggleShow(false)}
                    closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            Make a new Project  <Popup trigger={<i className="fas fa-question white float-right"> </i>} position="top right">
                                  {close => (
                                      <div className="popup-sidebar">
                                          <h2>New project</h2>
                                          <p>You are now on the page where can you can make a new project. You have four tabs: general, members, add-ons and Advanced.</p>
                                          <h5>General</h5>
                                          <p>On this tab you can find basic information for your project. If you want you can also select an end date for the project. </p>
                                          <h5>Members</h5>
                                          <p>Here you can add members to the project. You can add members individualy or with a group. Then you have to choose a specific role for the member:</p>
                                          <ul>
                                              <li><b>Watcher:</b> Member has access, but can just observe</li>
                                              <li><b>Member:</b> Normal access</li>
                                              <li><b>Responsable:</b> Has admin access</li>
                                              <li><b>Leader:</b> Can change project-settings</li>
                                          </ul>
                                          <p>To know more about the roles, you can go to <a>this page.</a></p>
                                          <h5>Add-ons</h5>
                                          <p>here you must choose the features for your project. To know what each add-on is, you can go to <a>this page</a>.</p>
                                      </div>
                                  )}
                              </Popup>
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
                                                <input type="text" className={this.state.error_title.length > 0 ? "border-red u-full-width" : "u-full-width"} value={this.state.title} onChange={e => this.setState({ title: e.target.value })} onBlur={e => this.checkName()} />
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
                                            {this.state.selectedMembers.map((selected, i) => (
                                                <span key={i}>
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
                                                    <h5><i className="fas fa-calendar-check"></i> Board </h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={this.state.board}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ board: !this.state.board })}
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

                                        <h5>Other settings</h5>
                                        <div>
                                            <input type="checkbox" id="scales" name="feature" value="scales" onChange={e => this.setState({ private: !this.state.private})} checked={this.state.private} />
                                            Make this project public: this means that everyone can see the forum, tasks and so on
                                            </div>
                                        <div className="popup-tags">
                                            <h5>Tags</h5>
                                            {this.state.tags.length <= 0 ? <div id="red">No tags selected</div> :
                                                <div>
                                                    {this.state.tags.map((tag, i) => (
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
                            <button className="button-primary button no-button" onClick={this.createProject}>Create project</button>
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

if (document.getElementById('popup-newProject')) {
    ReactDOM.render(<PopupNewProject />, document.getElementById('popup-newProject'));
}