import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
const Timestamp = require('react-timestamp');
import {ProgressBar} from "reprogressbars";
import PulseLoader from "./company/company";
import {Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody,} from 'react-accessible-accordion';
export default class Projects extends Component {

    constructor(props) {
        super(props)
        this.state = {
            overlay: false,
            projects: [],
            currentProject: null,
        };

        this.changeOverlay = this.changeOverlay.bind(this);
        this.getProjects = this.getProjects.bind(this);
    }

    componentWillMount() {
        this.getProjects();
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
                              <h4>Your projects</h4>
                              <button className="button button-primary no-button"><i className="fas fa-plus"> </i> New project</button>
                              <Tabs
                                  defaultTab="one"
                                  onChange={(tabId) => { console.log(tabId) }}
                              >
                                  <TabList>
                                      <Tab tabFor="one" className="projects-tab">Active projects </Tab>
                                      <Tab tabFor="two" className="projects-tab">Archive</Tab>
                                  </TabList>
                                  <TabPanel tabId="one">
                                      <table className="u-full-width">
                                          <thead>
                                          <tr>
                                              <th>Name</th>
                                              <th>Started on</th>
                                              <th>ends in</th>
                                              <th>Status</th>
                                          </tr>
                                          </thead>
                                          <tbody>
                                          {this.state.projects.map((project, i)=> (
                                              <tr key={i} className={new Date(project.end_date) >= new Date() || project.end_date === null ? "" : "hidden"}  onClick={e =>window.location.href='./' + project.url + "/project"}>
                                                  <td>{project.name}</td>
                                                  <td><Timestamp time={project.created_at} precision={2} utc={false} autoUpdate={60}   /></td>
                                                  <td>{project.end_date !== null ? <Timestamp time={new Date(project.end_date)} precision={2} utc={false} autoUpdate={60}  /> : "-" }</td>
                                                  <td><span className="tag tag-green">Open</span></td>
                                              </tr>
                                          ))}
                                          </tbody>
                                      </table>
                                  </TabPanel>
                                  <TabPanel tabId="two">
                                      <table className="u-full-width">
                                          <thead>
                                          <tr>
                                              <th>Name</th>
                                              <th>Started on</th>
                                              <th>Finished on</th>
                                              <th>Status</th>
                                              <th></th>
                                          </tr>
                                          </thead>
                                          <tbody>
                                          {this.state.projects.map((project, i) => (
                                              <tr key={i} className={(new Date(project.end_date) >= new Date()) || (project.end_date === null) ? "hidden" : ""}  onClick={e =>this.changeOverlay(i)}>
                                                  <td>{project.name}</td>
                                                  <td><Timestamp time={project.created_at} precision={2} utc={false} autoUpdate={60}   /></td>
                                                  <td><Timestamp time={new Date(project.end_date)} precision={2} utc={false} autoUpdate={60}  /></td>
                                                  <td><span className="tag tag-red">Closed</span></td>
                                              </tr>
                                          ))}
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
