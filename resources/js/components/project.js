import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import {ProgressBar} from "reprogressbars";
import PulseLoader from "./company/company";
export default class Projects extends Component {

    constructor(props) {
        super(props)
        this.state = {
            overlay: false
        };

        this.changeOverlay = this.changeOverlay.bind(this);
    }


    changeOverlay() {
        this.setState({overlay: true})
    }


    render() {
        return (
            <div className="projects">
                <div className="row">
                  <div className="twelve columns">
                      {this.state.overlay
                          ?
                          <div className="projects-overlay">

                          </div>
                          :
                          <div className="projects-overview">
                              <h4>Your projects</h4>
                              <button className="button button-primary no-button"><i className="fas fa-plus"> </i> New project</button>
                              <table className="u-full-width">
                                  <thead>
                                  <tr>
                                      <th> </th>
                                      <th>Name</th>
                                      <th>Started on</th>
                                      <th>ends in</th>
                                      <th>Status</th>
                                  </tr>
                                  </thead>
                                  <tr onClick={this.changeOverlay}>
                                      <th><i className="far fa-star star"></i></th>
                                      <td>Pekesweekend</td>
                                      <td>2 days ago</td>
                                      <td>15 minutes</td>
                                      <td><span className="tag tag-green">Open</span></td>
                                  </tr>
                                  <tr>
                                      <th><i className="fas fa-star star"></i></th>
                                      <td>Pekesweekend</td>
                                      <td>2 days ago</td>
                                      <td>15 minutes</td>
                                      <td><span className="tag tag-red">Closed</span></td>
                                  </tr>
                              </table>
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
