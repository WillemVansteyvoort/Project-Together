import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
const Timestamp = require('react-timestamp');
export default class MenuNotification extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notifications : [],
            empty: true,
        };
        //bind

        this.updateNot = this.updateNot.bind(this);
        this.delNot = this.delNot.bind(this);
    }



    componentWillMount() {
        this.updateNot();
    }

    componentDidMount() {
        this.interval =  setInterval(() => this.updateNot(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateNot() {
        axios.get('/api/menu/notifications').then((
            response
            ) =>
                this.setState({
                    notifications: response.data.notifications,
                    empty: response.data.empty
                })
        );
    }

    delNot(e) {
        e.preventDefault();
        this.setState({
            notifications: [],
            empty: true,
        });
        axios.post('/api/menu/notifications', {});


    }

    render() {
        return (
            <div>
                <h6 className="notifications-title">Notifications</h6>
                <span className={this.state.empty ? "tag tag-red" : "tag tag-green"} onClick={this.delNot}>  {this.state.empty ? "There are no notifications found" : "Mark as read"}</span>
                {this.state.notifications.map(notification => (
                    <article className="notifications-alert">
                        <div className="notifications-alert--icon">
                            <i className={notification.type}> </i>
                            <span className="notifications-alert--time"><Timestamp time={notification.created_at} precision={2} /></span>
                        </div>
                        <div className="notifications-alert--text">
                            <b><a className="notifications-alert--title float-left">{notification.title}</a></b>
                            <p>{notification.content}</p>
                        </div>
                        <div className="clear"> </div>
                    </article>
                ))}
            </div>
        );
    }
}

if (document.getElementById('menu-notifications')) {
    ReactDOM.render(<MenuNotification />, document.getElementById('menu-notifications'));
}
