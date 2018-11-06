import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
export default class TabsDashboard extends Component {
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
                                    <div className="dashboard-message">
                                        <h5>Message from the company</h5>
                                        <p>
                                            Nunc posuere sollicitudin ipsum id feugiat. <a>Nunc rhoncus</a> nisl quis massa venenatis ultricies. Morbi eleifend faucibus orci ac consectetur. Etiam vitae pharetra neque. Sed pulvinar magna ut neque convallis fringilla. Aliquam ultricies quam eu eros laoreet faucibus.
                                        </p>
                                        <p>
                                            Integer a ipsum quis justo sollicitudin accumsan ac a lectus. Nulla dapibus hendrerit dui, finibus tincidunt arcu rutrum et. Donec rhoncus tincidunt eleifend. Donec quis elit libero. Donec semper quis turpis ut mollis. Nullam vitae libero quis libero placerat tristique.

                                        </p>
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
                            <div className="dashboard-notifications">
                            <span className="dashboard-notifications--day">
                                Today
                            </span>
                                <div className="dashboard-notifications-items">
                                    <article>
                                        <ul className="dashboard-notifications-item">
                                            <li className="dashboard-notifications-item--time">2 hours ago</li>
                                            <li className="dashboard-notifications-item--icon"><i className="fas fa-key"> </i></li>
                                            <li className="dashboard-notifications-item--image"><img src="images/founder.jpg"/></li>
                                        </ul>
                                        <div className="dashboard-notifications-item--content">
                                            <b>New login session to your account</b>
                                            <p>Someone has login to your account from Safari webbrowser.</p>
                                        </div>
                                        <div className="dashboard-notifications--line clear"> </div>
                                    </article>
                                    <article>
                                        <ul className="dashboard-notifications-item">
                                            <li className="dashboard-notifications-item--time">2 hours ago</li>
                                            <li className="dashboard-notifications-item--icon"><i className="fas fa-hands-helping"> </i></li>
                                            <li className="dashboard-notifications-item--image"><img src="images/founder.jpg"/></li>
                                        </ul>
                                        <div className="dashboard-notifications-item--content">
                                            <b>Welcome to worktogether!</b>
                                            <p>Thanks for joining us! If you have questions about the working, read our <a href="">documentation</a>.</p>
                                        </div>
                                        <div className="dashboard-notifications--line clear"> </div>
                                    </article>
                                </div>
                                <span className="dashboard-notifications--day">
                                YESTERDAY
                            </span>
                                <div className="dashboard-notifications-items">
                                    <article>
                                        <ul className="dashboard-notifications-item">
                                            <li className="dashboard-notifications-item--time">2 hours ago</li>
                                            <li className="dashboard-notifications-item--icon"><i className="fas fa-project-diagram"> </i></li>
                                            <li className="dashboard-notifications-item--image"><img src="images/founder.jpg"/></li>
                                        </ul>
                                        <div className="dashboard-notifications-item--content">
                                            <b>New project created</b>
                                            <p><a>Andy Klinkers</a> has created a new project named <a>PekesFuif</a> and you're invited to it. Check now the project.</p>
                                        </div>
                                        <div className="dashboard-notifications--line clear"> </div>
                                    </article>
                                    <article>
                                        <ul className="dashboard-notifications-item">
                                            <li className="dashboard-notifications-item--time">2 hours ago</li>
                                            <li className="dashboard-notifications-item--icon"><i className="fas fa-hands-helping"> </i></li>
                                            <li className="dashboard-notifications-item--image"><img src="images/founder.jpg"/></li>
                                        </ul>
                                        <div className="dashboard-notifications-item--content">
                                            <b>Welcome to worktogether!</b>
                                            <p>Thanks for joining us! If you have questions about the working, read our <a href="">documentation</a>.</p>
                                        </div>
                                        <div className="dashboard-notifications--line clear"> </div>
                                    </article>
                                </div>
                                <span className="dashboard-notifications--day">
                                MONDAY
                            </span>
                                <div className="dashboard-notifications-items">
                                    <article>
                                        <ul className="dashboard-notifications-item">
                                            <li className="dashboard-notifications-item--time">2 hours ago</li>
                                            <li className="dashboard-notifications-item--icon"><i className="fas fa-project-diagram"> </i></li>
                                            <li className="dashboard-notifications-item--image"><img src="images/founder.jpg"/></li>
                                        </ul>
                                        <div className="dashboard-notifications-item--content">
                                            <b>New project created</b>
                                            <p><a>Andy Klinkers</a> has created a new project named <a>PekesFuif</a> and you're invited to it. Check now the project.</p>
                                        </div>
                                        <div className="dashboard-notifications--line clear"> </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel tabId="three">
                        <div className="dashboard-tab--content">
                            <div className="dashboard-activities">
                                <h4>All activities</h4>
                                <div className="dashboard-activities-line">
                                    <div className="dashboard-activities-item">
                                    <span className="dashboard-activities-item--time">
                                        12u40
                                    </span>
                                        <div className="dashboard-activities-item--content">
                                            <a>Willem Vansteyvoort</a> created a new post in <a>PekesFuif 2018</a>
                                        </div>
                                    </div>
                                    <div className="dashboard-activities-item">
                                    <span className="dashboard-activities-item--time">
                                        08u30
                                    </span>
                                        <div className="dashboard-activities-item--content">
                                            <a>Johan De boer</a> has marked a task as done in <a>Pekesfuif 2018</a>
                                        </div>
                                    </div>
                                    <div className="dashboard-activities-item">
                                    <span className="dashboard-activities-item--time">
                                        4 mar.
                                    </span>
                                        <div className="dashboard-activities-item--content">
                                            The end date of <a>PekesFuiif 2018</a> has been updated to 24/02/2019
                                        </div>
                                    </div>
                                    <div className="dashboard-activities-item">
                                    <span className="dashboard-activities-item--time">
                                        12 feb.
                                    </span>
                                        <div className="dashboard-activities-item--content">
                                            <a>Willem Vansteyvoort</a> uploaded a new file in <a>Pekesfuuif 2018</a> named: "Sponsor fiches"
                                        </div>
                                    </div>
                                    <div className="dashboard-activities-item">
                                    <span className="dashboard-activities-item--time">
                                        1 jan.
                                    </span>
                                        <div className="dashboard-activities-item--content">
                                            The name of <a>Pekesfuif 2017</a> is changed to <a>Pekesfuif 2019</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

if (document.getElementById('tabs-dashboard')) {
    ReactDOM.render(<TabsDashboard />, document.getElementById('tabs-dashboard'));
}
