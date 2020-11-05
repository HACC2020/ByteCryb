import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './ui/components/NavBar';
import Login from './ui/pages/Login';
import Landing from './ui/pages/Landing';
import Admin from './ui/pages/Admin';
import ViewProfile from './ui/pages/ViewProfile';
import Categories from './ui/pages/Categories';
import RookieTraining from './ui/pages/RookieTraining';
import SignUp from './ui/pages/SignUp';
import Footer from './ui/components/Footer';
import MyJob from './ui/pages/MyJob';
import Proofer from './ui/pages/Proofer';

class App extends React.Component {
  render () {
    return (
        <Router>
          <NavBar/>
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/signup' component={SignUp}/>
            <Route exact path='/my-job' component={MyJob}/>
            <Route exact path='/landing' component={Landing}/>
            <Route exact path='/admin' component={Admin}/>
            <Route exact path='/view-profile' component={ViewProfile}/>
            <Route exact path='/categories' component={Categories}/>
            <Route exact path='/training' component={RookieTraining}/>
            <Route exact path='/proofer' component={Proofer}/>
          </Switch>
          <Footer/>
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
