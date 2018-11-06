import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
export default class TabsAccount extends Component {
    render() {
        return (
                   <Tabs defaultTab="vertical-tab-one" vertical>
                       <div className="row">
                           <div className="three columns">
                               <div className="account-menu">
                                   <TabList>
                                       <h5>Your settings</h5>
                                       <Tab tabFor="vertical-tab-one" className="account-tab"><i className="fas fa-user"> </i> Adjust your profile</Tab>
                                       <Tab tabFor="vertical-tab-two"  className="account-tab"><i className="fas fa-cog"> </i>Change your settings</Tab>
                                       <Tab tabFor="vertical-tab-three"  className="account-tab"><i className="fas fa-camera"> </i>Upload avatar</Tab>
                                       <h5>Account security</h5>
                                       <Tab tabFor="vertical-tab-four" className="account-tab"><i className="fas fa-user"> </i> Two step verification</Tab>
                                       <Tab tabFor="vertical-tab-five"  className="account-tab"><i className="fas fa-life-ring"> </i>Change password</Tab>
                                       <Tab tabFor="vertical-tab-six"  className="account-tab"><i className="fas fa-tags"> </i>My sessions</Tab>
                                       <h5>Website content</h5>
                                       <Tab tabFor="vertical-tab-one" className="account-tab"><i className="fas fa-signal"> </i> My statistics</Tab>
                                       <Tab tabFor="vertical-tab-seven"  className="account-tab"><i className="fas fa-download"> </i>Download your data</Tab>
                                   </TabList>
                               </div>
                           </div>
                           <div className="nine columns">
                               <div className="account-content">
                                   <TabPanel tabId="vertical-tab-one">
                                       <h4>Change your profile</h4>
                                       <div className="alert alert-red">
                                           You are using a local account from Chiro Jongens Kalfort. Some settings can't be changed.
                                       </div>
                                       <div className="row">
                                           <div className="six columns">
                                               <label for="">Full name</label>
                                               <input type="text" value="Willem Vansteyvoort" />
                                               <label htmlFor="">Username</label>
                                               <input type="text" value="WillemV" readOnly/>
                                               <label htmlFor="">City</label>
                                               <input type="text" value="Puurs"/>
                                               <label htmlFor="">Street</label>
                                               <input type="text"  value="G. Gezellelaan 35"/>
                                               <label htmlFor="">Country</label>
                                               <input type="text" value="Belgium"/>
                                           </div>
                                           <div className="six columns">
                                               <label htmlFor="">Birthdate</label>
                                               <input type="date"/>
                                               <label htmlFor="">Phone</label>
                                               <input type="text"/>
                                               <label htmlFor="">Function</label>
                                               <input type="text"/>
                                               <label htmlFor="">Website</label>
                                               <input type="text"/>
                                           </div>
                                       </div>
                                       <h5>Social media</h5>
                                       <h5>Biografy</h5>
                                       <textarea>Hallo ik ben Willem Vansteyvoort, al 5 jaar ben ik erg geprikkeld door IT.</textarea>
                                       <input type="submit" value="Update profile" />
                                   </TabPanel>
                                   <TabPanel tabId="vertical-tab-two">
                                       <p>Tab 2 content</p>
                                   </TabPanel>
                                   <TabPanel tabId="vertical-tab-three">
                                       <p>Tab 3 content</p>
                                   </TabPanel>
                                   <TabPanel tabId="vertical-tab-four">
                                       <p>Tab 4 content</p>
                                   </TabPanel>
                                   <TabPanel tabId="vertical-tab-five">
                                       <p>Tab 5 content</p>
                                   </TabPanel>
                                   <TabPanel tabId="vertical-tab-six">
                                       <p>Tab 6 content</p>
                                   </TabPanel>
                                   <TabPanel tabId="vertical-tab-seven">
                                       <p>Tab 7 content</p>
                                   </TabPanel>
                               </div>
                           </div>
                       </div>
                   </Tabs>
        );
    }
}

if (document.getElementById('tabs2-account')) {
    ReactDOM.render(<TabsAccount />, document.getElementById('tabs2-account'));
}
