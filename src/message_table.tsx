import * as Papa from 'papaparse'
import * as React from "react";
import Message from './message';
import Auth from './Auth';

export interface IPerson{
    receiver: number,
    first_name: string,
    last_name: string,
    message: string
}

interface IListState {
    people: [IPerson]
}

export class List extends React.Component<any, IListState> {
    constructor(props: any) {
        super(props);
        this.state = {people: [] as any[]} as IListState
    }

    public componentDidMount() {
        const parseData = () => {
            let data;
            const csv = require('./DummyData.csv');

            return new Promise((resolve) => {
                Papa.parse(csv, {
                    complete: (results) => {
                        data = results.data as [IPerson];
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
            return this.setState({people: data} as IListState);
        })
    }


    public render() {
        const auth = new Auth();
        auth.login();
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
