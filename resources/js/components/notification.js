import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import { Wizard, Steps, Step } from 'react-albus';
import ReactPasswordStrength from '@rodrigowpl/react-password-strength'
import { ProgressBar } from 'reprogressbars';

export default class notification extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: props.type,
            title: props.title,
            message: props.message,
            active: true,
        };
        //bind
        this.notificationInfo = this.notificationInfo.bind(this);
        this.changeState = this.changeState.bind(this);
        this.notificationSuccess = this.notificationSuccess.bind(this);
        this.notificationDanger = this.notificationDanger.bind(this);
        this.notificationError = this.notificationError.bind(this);
    }



    componentWillMount() {
    }

    componentDidMount() {
        this.interval =  setInterval(() => this.changeState(), 4500);
    }


    componentWillUnmount() {
        clearInterval(this.interval);
    }

    changeState() {
        this.setState({active: false});
    }

    notificationInfo() {
        return (
            <div className="notification-container">
                <span>
                    <div className="notification notification-info">
                        <div className="notification-message" role="alert">
                            <div  className={this.state.title.length > 0 ? "title" : "hidden"}>{this.state.title}</div>
                            <div className="message">
                                {this.state.message}
                            </div>
                        </div>
                    </div>
                </span>
            </div>
        )
    }

    notificationSuccess() {
        return (
            <div className="notification-container">
                <span>
                    <div className="notification notification-success">
                        <div className="notification-message" role="alert">
                            <div  className={this.state.title.length > 0 ? "title" : "hidden"}>{this.state.title}</div>
                            <div className="message">
                                {this.state.message}
                            </div>
                        </div>
                    </div>
                </span>
            </div>
        )
    }

    notificationDanger() {
        return (
            <div className="notification-container">
                <span>
                    <div className="notification notification-danger">
                        <div className="notification-message" role="alert">
                            <div  className={this.state.title.length > 0 ? "title" : "hidden"}>{this.state.title}</div>
                            <div className="message">
                                {this.state.message}
                            </div>
                        </div>
                    </div>
                </span>
            </div>
        )
    }

    notificationError() {
        return (
            <div className="notification-container">
                <span>
                    <div className="notification notification-error">
                        <div className="notification-message" role="alert">
                            <div  className={this.state.title.length > 0 ? "title" : "hidden"}>{this.state.title}</div>
                            <div className="message">
                                {this.state.message}
                            </div>
                        </div>
                    </div>
                </span>
            </div>
        )
    }

    render() {
        switch (this.state.type) {
            case "info" :
                    return this.notificationInfo();
                    break;
            case "success" :
                return this.notificationSuccess();
                break;
            case "danger" :
                return this.notificationDanger();
                break;
            case "error" :
                return this.notificationError();
                break;
        }
    }
}
