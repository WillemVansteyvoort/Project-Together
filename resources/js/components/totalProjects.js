import React,  {Component} from "react";
import { render } from 'react-dom';
import PieChart from 'react-minimal-pie-chart';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
class TotalProjects extends Component {
    render() {
        return (
            <div className="row">
                <div className="six columns">
                    <h5> Projects</h5>
                    <Progress
                        type="circle"
                        percent={0}
                        status="test"
                        theme={{
                            test: {
                                color: '#5680e9'
                            }
                        }}
                    />
                </div>
                <div className="six columns">
                    <h5>users</h5>
                    <Progress
                        type="circle"
                        percent={2}
                    />
                </div>
            </div>
        );
    }
}
render(<TotalProjects/>, document.getElementById('total-projects'));
