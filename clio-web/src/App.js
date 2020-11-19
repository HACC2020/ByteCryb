import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './ui/components/NavBar';
import Login from './ui/pages/Login';
import Landing from './ui/pages/Landing';
import Admin from './ui/pages/Admin';
import ViewProfile from './ui/pages/ViewProfile';
import RookieTraining from './ui/pages/RookieTraining';
import Leaderboard from './ui/pages/Leaderboard';
import SignUp from './ui/pages/SignUp';
import Footer from './ui/components/Footer';
import MyJob from './ui/pages/MyJob';
import Proofer from './ui/pages/Proofer';
import TestPage from './ui/pages/TestPage';
import Record from './ui/pages/Record';
import ProoferCategories from './ui/pages/ProoferCategories';
import EditJobPage from './ui/pages/EditJobPage';

class App extends React.Component {
  render () {
    return (
        <Router>
          <NavBar/>
          <Switch>
            <Route exact path='/testPage' component={TestPage}/>
            <Route exact path='/record/:job_id' component={Record}/>
            <Route exact path='/' component={Login}/>
            <Route exact path='/signup' component={SignUp}/>
            <Route exact path='/my-job' component={MyJob}/>
            <Route exact path='/landing' component={Landing}/>
            <Route exact path='/leaderboard' component={Leaderboard}/>
            <Route exact path='/admin' component={Admin}/>
            <Route exact path='/view-profile' component={ViewProfile}/>
            <Route exact path='/training' component={RookieTraining}/>
            <Route exact path='/review-records' component={ProoferCategories}/>
            <Route exact path='/review/:job_id' component={Proofer}/>
            <Route exact path='/edit-job/:job_id' component={EditJobPage}/>
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
