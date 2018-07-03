import * as React from "react";
import {IPerson} from "./message_table";

export default class Message extends React.Component<any, IPerson> {
    constructor(props: any) {
        super(props);
        this.state = {
            first_name: props.person['First Name'],
            last_name: props.person['Last Name'],
            message: 'This is the standard message we are sending',
            receiver: props.person['Phone Number'],
            sentState: ''
        };
    }


    public changeMessage = (event: any) => {
        this.setState({message: (event.target.value)});
    };


    public sendSms = () => {
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

    public render() {
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
