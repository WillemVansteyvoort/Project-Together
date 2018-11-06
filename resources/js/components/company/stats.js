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
            <div>
                <h5>Total users</h5>
                <Progress
                    percent={10}
                    theme={
                        {
                            active: {
                                symbol: '2/25',
                                trailColor: 'white',
                                color: '#5680e9'
                            },
                            success: {
                                symbol: this.state.percent + '%',
                                trailColor: 'lime',
                                color: 'green'
                            }
                        }
                    }
                />
                <h5>Total Projects</h5>
                <Progress
                    percent={20}
                    theme={
                        {
                            active: {
                                symbol: '2/10',
                                trailColor: 'white',
                                color: '#5680e9'
                            },
                            success: {
                                symbol: '100%',
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
                                    { title: 'Two', value: 15, color: '#5ab9ea' },
                                    { title: 'Three', value: 20, color: '#8488eb' },
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
                <div className="row">
                    <div className="six columns">
                        <span><h5>Make public</h5></span>
                        <Switch
                            onChange={this.handleChange}
                            checked={this.state.checked}
                            className="react-switch"s
                            id="normal-switch"
                        />
                    </div>
                    <div className="six columns">
                        <span><h5>Make company public</h5></span>
                        <Switch
                            onChange={this.handleChange}
                            checked={this.state.checked}
                            className="react-switch"s
                            id="normal-switch"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('company-stats')) {
    ReactDOM.render(<CompanyStats />, document.getElementById('company-stats'));
}
