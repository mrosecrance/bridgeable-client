import * as React from 'react';
import './App.css';

import logo from './bridgeable.png';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p className="App-intro">
          Hello World!
        </p>
      </div>
    );
  }
}

export default App;
