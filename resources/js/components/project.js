import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
const Timestamp = require('react-timestamp');
import Popup from 'reactjs-popup'
import newProject from './popups/newProject'
import {ProgressBar} from "reprogressbars";
import PulseLoader from "./company/company";
import {Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody,} from 'react-accessible-accordion';
import LocalizedStrings from 'localized-strings';
import en from './lang/en.json';
import nl from './lang/nl.json';

let strings = new LocalizedStrings({en,nl});
export default class Projects extends Component {

    constructor(props) {
        super(props)
        this.state = {
            overlay: false,
            projects: [],
            currentProject: null,
            openProjects: [],
            closedProjects: [],
            loading: true,
        };

        this.changeOverlay = this.changeOverlay.bind(this);
        this.getProjects = this.getProjects.bind(this);
    }

    componentWillMount() {
        this.getProjects();
        this.initLang();
    }

    initLang () {
        strings.setLanguage(window.Laravel.lang);
    }

    changeOverlay(index) {
        this.setState({overlay: true, currentProject: this.state.projects[index]})
    }

    getProjects() {
        axios.get('/api/projects/all').then((
            response
            ) =>
                this.setState({
                    projects: response.data,
                    openProjects:  response.data.filter(function (project) {
                        return ((new Date(project.end_date) >= new Date() || project.end_date === null) && project.status !== 2);
                    }),
                    closedProjects: response.data.filter(function (project) {
                        return ((new Date(project.end_date) < new Date() && project.end_date !== null) || project.status === 2);
                    }),
                    loading: false,
                })
        );
    }
    render() {
        return (
            <div className="projects">
                <div className="row">
                  <div className="twelve columns">
                      {this.state.overlay
                          ?
                          <div className="projects-overlay">
                              {this.state.currentProject.map(project => (
                                  <div style="margin-top: 6%">
                                      {project.name}
                                  </div>
                              ))}
                              <h3>dsfdsf</h3>
                          </div>
                          :
                          <div className="projects-overview">
                              <h4>{strings.getString("Your projects")}  <Popup trigger={<i className="fas fa-question info"> </i>} position="top left">
                                  {close => (
                                      <div className="popup-sidebar">
                                          <h2>Projects</h2>
                                          <p>This is the project page where you can find all your projects you belongs to. When you want to go to a project, you simply have to click on a project.</p>
                                      </div>
                                  )}
                              </Popup></h4>
                              <Tabs
                                  defaultTab="one"
                                  onChange={(tabId) => { }}
                              >
                                  <TabList>
                                      <Tab tabFor="one" className="projects-tab">{strings.getString("Active projects")} </Tab>
                                      <Tab tabFor="two" className="projects-tab">{strings.getString("Archived projects")}</Tab>
                                  </TabList>
                                  <TabPanel tabId="one">
                                      <table className="u-full-width">
                                          <thead>
                                          <tr id="no-bg">
                                              <th>{strings.getString("Name")}</th>
                                              <th>{strings.getString("Started on")}</th>
                                              <th>{strings.getString("Ends on")}</th>
                                              <th>Status</th>
                                          </tr>
                                          </thead>
                                          <tbody>
                                          {this.state.openProjects.map((project, i)=> (
                                              <tr key={i}  onClick={e =>window.location.href='./' + project.url + "/project"}>
                                                  <td>{project.name}</td>
                                                  <td><Timestamp time={project.created_at} precision={2} utc={false} autoUpdate={60}   /></td>
                                                  <td>{project.end_date !== null ? <Timestamp time={new Date(project.end_date)} precision={2} utc={false} autoUpdate={60}  /> : "-" }</td>
                                                  <td><span className="tag tag-green">Open</span></td>
                                              </tr>
                                          ))}
                                          {this.state.openProjects.length === 0 && !this.state.loading ? <tr><td>{strings.getString("No projects were found")}</td></tr> : ""}
                                          </tbody>
                                      </table>
                                  </TabPanel>
                                  <TabPanel tabId="two">
                                      <table className="u-full-width">
                                          <thead>
                                          <tr  id="no-bg">
                                              <th>{strings.getString("Name")}</th>
                                              <th>{strings.getString("Started on")}</th>
                                              <th>{strings.getString("Ended on")}</th>
                                              <th>Status</th>
                                              <th></th>
                                          </tr>
                                          </thead>
                                          <tbody>
                                          {this.state.closedProjects.map((project, i) => (
                                              <tr key={i} onClick={e =>window.location.href='./' + project.url + "/end/project"}>
                                                  <td>{project.name}</td>
                                                  <td><Timestamp time={project.created_at} precision={2} utc={false} autoUpdate={60}   /></td>
                                                  <td><Timestamp time={new Date(project.end_date)} precision={2} utc={false} autoUpdate={60}  /></td>
                                                  <td><span className="tag tag-red">{strings.getString("Closed")}</span></td>
                                              </tr>
                                          ))}
                                          {this.state.closedProjects.length === 0 && !this.state.loading ? <tr><td>{strings.getString("No closed projects were found")}</td></tr> : ""}
                                          </tbody>
                                      </table>
                                  </TabPanel>
                              </Tabs>
                          </div>
                      }
                  </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('projects')) {
    ReactDOM.render(<Projects />, document.getElementById('projects'));
}
