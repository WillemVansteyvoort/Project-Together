import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import { Wizard, Steps, Step } from 'react-albus';
import ReactPasswordStrength from '@rodrigowpl/react-password-strength'
import { ProgressBar } from 'reprogressbars';

export default class UpdateActivity extends Component {

    constructor(props) {
        super(props)
        this.state = {
        };
        //bind

        this.updateActivity = this.updateActivity.bind(this);

    }



    componentWillMount() {
        this.updateActivity();
    }

    componentDidMount() {
        this.interval =  setInterval(() => this.updateActivity(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }



    updateActivity() {
            axios.post('/api/user/activity', {
                update: this.state.update
            });


    }

    render() {
        return (
            <div>
                <h2>{this.state.message}</h2>
            </div>
        );
    }
}

if (document.getElementById('update-activity')) {
    ReactDOM.render(<UpdateActivity />, document.getElementById('update-activity'));
}
