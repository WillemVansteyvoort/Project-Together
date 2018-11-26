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
            test: '',
        };
        //bind

        this.updateNot = this.updateNot.bind(this);
        this.delNot = this.delNot.bind(this);
    }



    componentWillMount() {
        this.updateNot();
    }

    componentDidMount() {
        Echo.private('user-notifications' + window.Laravel.user.id).listen('Notifications', e => {
            // this.setState({ posts: [e.post, ...this.state.posts] });
                this.setState({ notifications: [e.notification, ...this.state.notifications], empty: false });
        })

        // this.interval = setInterval(() => this.getPosts(), 100000);
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
            <span>
                 <audio>
			<source src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3" type="audio/mpeg" >
			</source>
		</audio>
            <span className={this.state.notifications.length <= 0 ? "" : "notifications-active"}> </span>
                <div id="notifications" className="notifications-content tab-content">
                <h6 className="notifications-title">Notifications</h6>
                <span className={this.state.empty ? "tag tag-red" : "tag tag-green"} onClick={this.delNot}>  {this.state.empty ? "There are no notifications found" : "Mark as read"}</span>
                {this.state.notifications.map(notification => (
                    <article  >
                        <div className="notifications-alert--icon">
                            <i className={notification.type}> </i>
                            <span className="notifications-alert--time"><Timestamp time={notification.created_at} precision={2} /></span>
                        </div>
                        <div className="notifications-alert--text">
                            <p><a className="notifications-alert--title float-left">{notification.title}</a></p>
                            <p>{notification.content}</p>
                        </div>
                        <div className="clear"> </div>
                    </article>
                ))}
                </div>
            </span>
        );
    }
}

if (document.getElementById('menu-notifications')) {
    ReactDOM.render(<MenuNotification />, document.getElementById('menu-notifications'));
}
