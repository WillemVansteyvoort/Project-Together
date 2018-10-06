import React,  {Component} from "react";
import { render } from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
class TabsDashboard extends Component {
    render() {
        return (
           <div>
            <Tabs
                defaultTab="one"
                onChange={(tabId) => { console.log(tabId) }}
            >
                <TabList>
                    <div className="row">
                        <div className="dashboard-tabs">
                            <div className="row">
                                <div className="four columns">
                                    <Tab className="dashboard-tab" tabFor="one">Overview</Tab>

                                </div>
                                <div className="four columns">
                                    <Tab className="dashboard-tab" tabFor="two">Notifications</Tab>

                                </div>
                                <div className="four columns">
                                    <Tab className="dashboard-tab" tabFor="three">Activities</Tab>

                                </div>
                            </div>
                        </div>
                    </div>
                </TabList>
                <TabPanel tabId="one">
                    <div className="dashboard-tab--content">
                        <div className="dashboard-welcome">
                            <h1>Welcome to Project Together!</h1>
                            <div className="dashboard-welcome--content">
                                <p>
                                    It seems that you are new at Project Together. Thanks for chosen for us! Now you're company is setup, you can start to invite your staff members to work together with you. After that you can create your first project.
                                    If you need help check out our documentation.
                                </p>
                                <a href="" className="button button-second"><i className="fas fa-plus"> </i> Create your first project</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="six columns">
                                <div className="dashboard-tasks">
                                    <h5>Your tasks</h5>
                                    <table className="u-full-width">
                                       <tr>
                                            <td><i className="fas fa-circle dashboard-tasks--danger"> </i></td>
                                           <td><a href="">Verslag voor vergadering maken en doorsturen</a></td>
                                            <td id="italic">10 minutes</td>
                                        </tr>
                                        <tr>
                                            <td><i className="fas fa-circle dashboard-tasks--normal"> </i></td>
                                            <td><a href="">Facebook evenement aanmaken en mensen uitnodigen</a></td>
                                            <td id="italic">not estimated</td>
                                        </tr>
                                        <tr>
                                            <td><i className="fas fa-circle dashboard-tasks--medium"> </i></td>
                                            <td><a href="">Contacteren Coca Cola voor sponsoring</a></td>
                                            <td id="italic">not estimated</td>
                                        </tr>
                                        <tr>
                                            <td><i className="fas fa-circle dashboard-tasks--normal"> </i></td>
                                            <td><a href="">Facebook evenement aanmaken en mensen uitnodigen</a></td>
                                            <td id="italic">Two days</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className="six columns">
                                <div className="dashboard-sessions">
                                    <h5>Your sesions</h5>
                                    <table className="u-full-width">
                                        <tr>
                                            <td>109.131.0.0</td>
                                            <td>Win10 - Chrome 69.0</td>
                                            <td  id="italic">10 minutes ago</td>
                                            <td><a href="" className="dashboard-sessions--check"><i className="fas fa-eye"> </i></a></td>
                                        </tr>
                                        <tr>
                                            <td>109.131.0.0</td>
                                            <td >Win10 - Chrome 69.0</td>
                                            <td  id="italic">10 minutes ago</td>
                                            <td><a href="" className="dashboard-sessions--check"><i className="fas fa-eye"> </i></a></td>
                                        </tr>
                                        <tr>
                                            <td>19.131.070</td>
                                            <td>Win10 - Chrome 69.0</td>
                                            <td  id="italic">10 minutes ago</td>
                                            <td><a href="" className="dashboard-sessions--check"><i className="fas fa-eye"> </i></a></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-news">
                            <div className="row">
                                <div className="four columns">
                                    <div className="dashboard-news--item">
                                        <img className="dashboard-news--image"  src="images/calender.png"/>
                                        <h6 className="dashboard-news--title"><a href="">Be organized with Calender</a></h6>
                                    </div>
                                </div>
                                <div className="four columns">
                                    <div className="dashboard-news--item">
                                        <img className="dashboard-news--image"  src="images/note.jpg"/>
                                        <h6 className="dashboard-news--title"><a href="">New Update: make your notes</a></h6>
                                    </div>
                                </div>
                                <div className="four columns">
                                    <div className="dashboard-news--item">
                                        <img className="dashboard-news--image"  src="images/work.jpg"/>
                                        <h6 className="dashboard-news--title"><a href="">Project Together version: 1.0</a></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel tabId="two">
                    <div className="dashboard-tab--content">
                        <h5>Notifcations</h5>
                    </div>
                </TabPanel>
                <TabPanel tabId="three">
                    <div className="dashboard-tab--content">
                        <h5>activities</h5>
                    </div>
                </TabPanel>
            </Tabs>
           </div>
        );
    }
}
render(<TabsDashboard/>, document.getElementById('dashboard-tabs'));
