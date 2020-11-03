import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './ui/components/NavBar';
import Landing from './ui/pages/Landing';

class App extends React.Component {
  render () {
    return (
        <Router>
          <NavBar/>
          <Switch>
            <Landing/>
          </Switch>
        </Router>
        // <div className="App">
        //   <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <p>
        //       Edit <code>src/App.js</code> and save to reload.
        //     </p>
        //     <a
        //         className="App-link"
        //         href="https://reactjs.org"
        //         target="_blank"
        //         rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a>
        //   </header>
        // </div>
    );
  }
}

export default App;
