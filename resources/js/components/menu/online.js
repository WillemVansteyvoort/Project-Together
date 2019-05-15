import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';
import { Wizard, Steps, Step } from 'react-albus';
import ReactPasswordStrength from '@rodrigowpl/react-password-strength'
import { ProgressBar } from 'reprogressbars';
import PulseLoader from 'react-spinners/PulseLoader';

export default class MenuOnline extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users : [],
            isLoading: true,
        };
        //bind

        this.updateOnline = this.updateOnline.bind(this);
        this.firstOnline = this.firstOnline.bind(this);

    }



    componentWillMount() {
        this.firstOnline;
        this.updateOnline();
    }

    componentDidMount() {
        this.interval =  setInterval(() => this.updateOnline(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    firstOnline() {
            axios.get('/api/menu/online').then((
                response
                ) =>
                    this.setState({
                        users: response.data,
                        isLoading: false
                    })
            );

    }

    updateOnline() {
        this.firstOnline();
            axios.get('/api/menu/online').then((
                response
            ) =>
                this.setState({
                    users: response.data,
                })
        );


    }

    render() {
        return (
            <div className="people-item">
                <PulseLoader ClassName="pulse-loader"
                             sizeUnit={"px"}
                             color={'#5680e9'}
                             loading={this.state.isLoading}
                />                {this.state.users.map(user => (
                <h6 key={user.id}><i  className="fas fa-circle"> </i><a href={user.username + "/profile/"}> {user.name} {user.lastname}</a></h6>

                ))}
                {this.state.users.length === 0 ? "There are no members online" : ""}
            </div>
        );
    }
}

if (document.getElementById('menu-online')) {
    ReactDOM.render(<MenuOnline />, document.getElementById('menu-online'));
}
