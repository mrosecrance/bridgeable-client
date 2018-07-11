import * as React from "react";

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: props.person['First Name'],
            last_name: props.person['Last Name'],
            message: 'This is the standard message we are sending',
            receiver: props.person['Phone Number'],
            sentState: ''
        };
    }


    changeMessage = (event) => {
        this.setState({message: (event.target.value)});
    };


    sendSms = () => {
        const URL = process.env.REACT_APP_SERVER_URL;

        fetch(URL + '/api/send', {
            body: JSON.stringify({message: this.state.message, receiver: this.state.receiver}),
            headers: {
                Accept: 'application/JSON',
                'Content-Type': 'application/JSON',
    },
            method: 'POST',
        })
            .then(resp => {
                // tslint:disable-next-line:no-console
                console.log(resp, URL);
                resp.json();
                this.setState({sentState: 'Successfull'})
            })
            .catch(error => {
                // tslint:disable-next-line:no-console
                console.error('Failed to fetch', error);
                this.setState({sentState: 'Failed'})

            })
    };

    render() {
        return (
            <tr>
                <td>{this.state.first_name} {this.state.last_name}</td>
                <td>{this.state.receiver}</td>
                <td>
                    <textarea value={this.state.message}
                              onChange={this.changeMessage}
                    />
                </td>
                <td>
                    <button className="btn btn-primary" onClick={this.sendSms}>Send message</button>
                </td>
            </tr>
        );
    }
}
