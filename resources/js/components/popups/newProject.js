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
var roles  = [
    {
        value: "leader",
        label: "leader"
    },
    {
        value: "responsable",
        label: "responable"
    },
    {
        value: "watcher",
        label: "watcher"
    },
    {
        value: "member",
        label: "member"
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
            selectedOption: null,
            selectedMembers: [],


            //success
            updated: false,
            updated_message: "",
            isLoading: false,


        };
        //bind

        this.getGroups = this.getGroups.bind(this);
        this.addGroup = this.addGroup.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    removeGroup() {
        this.setState(selectedGroups => {
            const test = selectedGroups.filter(selectedGroups === "Administrator");
            return { test };
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


    componentWillMount() {
        this.getGroups();
        this.getUsers();

    }

    componentDidMount() {
        // this.interval =  setInterval(() => this.getUsers(), 30000);
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
                        avatar: users[i].avatar,
                        value: users[i].id,
                        label: users[i].name + " " + users[i].lastname,
                    }
                    newOptions[i] = newItem;
                }
                for (var i = 0; i < groups.length; i++) {
                    var newItem = {
                        type: 'group',
                        value: groups[i].id,
                        avatar: '',
                        label: groups[i].name,
                    }
                    newOptions[i+this.state.users.length] = newItem;
                }
                this.setState({memberOptions: newOptions})
            }

        );
    }

    handleChange(selectedOption) {
        this.setState({selectedMembers: [...this.state.selectedMembers, selectedOption]})
        console.log(`Option selected:`, selectedOption);
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
                <PopPop
                    open={show}
                    closeOnEsc={true}
                    onClose={() => this.toggleShow(false)}
                    closeOnOverlay={true}>
                    <div className="popup">
                        <div className="popup-titleBar">
                            Make a new invite
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
                                                <input type="text" />
                                            </div>
                                        </div>
                                          <div className="row">
                                            <div className="twelve columns">
                                                <label>Project description</label>
                                                <textarea> </textarea>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel tabId="two">
                                           <div className="popup-groups">
                                            <h5>Members</h5>
                                               {this.state.selectedMembers.length <= 0 ? <div id="red">No groups selected</div> : ""}
                                               {this.state.selectedMembers.map(selected => (
                                                   <span>
                                                       {selected.avatar.length > 0 ? <li className="groups-dark"><img src={selected.avatar} /> {selected.label}</li> : <li className="groups-dark">{selected.label}</li>}
                                                       <div className="clear"></div>
                                                       </span>
                                               ))}
                                        </div>
                                        {this.state.selectedOption}
                                        <div className="popup-addGroup">
                                                <div className="popup-members">
                                                     <Select
                                                         placeholder={"Choose a member or group"}
                                                         onChange={this.handleChange}
                                                         className="popup-members-list"
                                                         options={this.state.memberOptions}
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
                                                         value={selectedOption}
                                                         placeholder={"Choose a role"}
                                                         // onChange={this.handleChange}
                                                         options={roles}
                                                         className="popup-members-roll"
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
                                                        <input type="submit" value="Add group" />
                                                    </div>
                                                    <div className="clear"></div>
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
                                                            checked={this.state.right_createProject}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ right_createProject: !this.state.right_createProject })}
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fas fa-sticky-note"></i> Notes</h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={this.state.right_createProject}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ right_createProject: !this.state.right_createProject })}
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fas fa-comments"></i> Forum</h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={this.state.right_createProject}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ right_createProject: !this.state.right_createProject })}
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fas fa-calendar-check"></i> Presences </h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={this.state.right_createProject}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ right_createProject: !this.state.right_createProject })}
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
                                                            checked={this.state.right_createProject}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ right_createProject: !this.state.right_createProject })}
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fas fa-calendar-day"> </i> Activities</h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={this.state.right_createProject}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ right_createProject: !this.state.right_createProject })}
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fas fa-comments"></i> Forum</h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={this.state.right_createProject}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ right_createProject: !this.state.right_createProject })}
                                                        />
                                                     </div>
                                                </div>
                                                <div className="three columns">
                                                    <h5><i className="fas fa-calendar-check"></i> Presences </h5>
                                                     <div>
                                                        <Switch
                                                            // onChange={this.handleChange}
                                                            checked={this.state.right_createProject}
                                                            className="react-switch popup-addons--switch"
                                                            id="normal-switch"
                                                            onChange={e => this.setState({ right_createProject: !this.state.right_createProject })}
                                                        />
                                                     </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clear"></div>
                                    </TabPanel>
                                    <TabPanel tabId="five">
                                    </TabPanel>
                                </div>
                            </Tabs>
                            <button className="button-primary button no-button">Create project</button>
                        </div>
                        <div className={this.state.isLoading ? "popup-loading" : "hidden"}>
                            <h5>Generating invitation ...</h5>
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
