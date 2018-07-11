import * as Papa from 'papaparse'
import * as React from "react";
import Message from './message.js';

export class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {people: []}
    }

    componentDidMount() {
        const parseData = () => {
            let data;
            const csv = require('./DummyData.csv');

            return new Promise((resolve) => {
                Papa.parse(csv, {
                    complete: (results) => {
                        data = results.data;
                        resolve(data);
                    },
                    delimiter: ',',
                    download: true,
                    dynamicTyping: true,
                    header: true

                });

            });
        };

        parseData().then(data => {
            return this.setState({people: data});
        })
    }


    render() {
        const rows = [];
        for (let i = 0; i < this.state.people.length; i++) {
            const person = this.state.people[i];
            rows.push(
                < Message person={person} key={i}/>
            )
        }


        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 board">
                        <table className="table table-striped table-dark">
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Number</th>
                                <th scope="col">Message</th>
                                <th scope="col"/>
                            </tr>
                            </thead>
                            <tbody>
                            {rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
