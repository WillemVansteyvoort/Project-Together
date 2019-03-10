import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Progress } from 'react-sweet-progress';

export default class FileUploader extends Component {
    constructor(props) {
        super(props)
        this.state ={
            image: ' ',
            uploaded: false,
            message: '',
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }

    onFormSubmit(e){
        e.preventDefault()
        this.fileUpload(this.state.image);
    }
    onChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
    }
    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                image: e.target.result
            })
        };
        reader.readAsDataURL(file);
    }
    fileUpload(image){
        const url = '/api/account/avatar/change';
        const formData = {file: this.state.image}

        axios.post('/api/account/avatar/change', formData).then(response => {
            console.log(response.data)
            if(response.data.uploaded) {
                this.setState({uploaded: true, message: response.data.message, image : ''})
            } else {
                this.setState({uploaded: false, message: response.data.message})

            }
        });
    }

    render() {
        return (
            <span>
                {this.state.uploaded && this.state.message.length > 0 ? <div className="alert alert-green">{this.state.message}</div> : ''}
                {!this.state.uploaded && this.state.message.length > 0 ? <div className="alert alert-red">{this.state.message}</div> : ''}
                <form onSubmit={this.onFormSubmit}>
                    <input type="file"  onChange={this.onChange} />
                    <button type="submit" className="button button-primary no-button">Change avatar</button>
            </form>
            </span>
        );
    }
}

if (document.getElementById('file-uploader')) {
    ReactDOM.render(<FileUploader />, document.getElementById('file-uploader'));
}
