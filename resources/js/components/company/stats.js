import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PieChart from 'react-minimal-pie-chart';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import Switch from "react-switch";
export default class CompanyStats extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked });
    }


    render() {
        return (
            <div className="company-sidebar">
                <h5>Total users</h5>
                <Progress
                    percent={window.Laravel.company.users/window.Laravel.plan.users * 100}
                    theme={
                        {
                            active: {
                                symbol: window.Laravel.company.users + '/' + window.Laravel.plan.users,
                                trailColor: 'white',
                                color: '#5680e9'
                            },
                            success: {
                                symbol: 'MAX',
                                trailColor: 'lime',
                                color: '#E54243'
                            }
                        }
                    }
                />
                <h5>Total Projects</h5>
                <Progress
                    percent={window.Laravel.company.projects/window.Laravel.plan.projects * 100}
                    theme={
                        {
                            active: {
                                symbol: window.Laravel.company.projects + '/' + window.Laravel.plan.projects,
                                trailColor: 'white',
                                color: '#5680e9'
                            },
                            success: {
                                symbol: 'MAX',
                                trailColor: 'red',
                                color: 'red'
                            }
                        }
                    }
                />
                <h5>Tasks</h5>
                <div className="company-chart">
                    <div className="row">
                        <div className="six columns">
                            <PieChart
                                data={[
                                    { title: 'One', value: 10, color: '#5680e9' },
                                    { title: 'Two', value: 5, color: '#5ab9ea' },
                                    { title: 'Three', value: 14, color: '#8488eb' },
                                ]}
                            />
                        </div>
                        <div className="six columns">
                            <div className="company-chart--content">
                                <span className="company-square company-square--primary">Done tasks</span>
                                <span className="company-square company-square--second">Open tasks</span>
                                <span className="company-square company-square--third">Closed tasks</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="button button-primary company-sidebar-settings"><i className="fas fa-cog"></i>Company settings</button>

            </div>
        );
    }
}

if (document.getElementById('company-stats')) {
    ReactDOM.render(<CompanyStats />, document.getElementById('company-stats'));
}
