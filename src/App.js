import * as React from 'react';
import './App.css';

import logo from './bridgeable.png';
import {List} from "./message_table.js";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <List/>
      </div>
    );
  }
}

export default App;
