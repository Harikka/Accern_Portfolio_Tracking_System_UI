import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Dasboard from './Components/Dashboard.jsx';
import PrintReport from './Components/Report';

class App extends Component {
render(){
    return (
      <Router>
        <div>
          <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="collapse navbar-collapse" id="navbarColor02">
              <ul class="navbar-nav mr-auto">
              <li class="nav-item active"><Link to={'/'} className="nav-link"> Dasboard </Link></li>
                    <li class="nav-item"><Link to={'/report'} className="nav-link"> Report </Link></li>
                </ul>
                </div>
            </nav>
            <Switch>
                <Route exact path='/' component={Dasboard} />
                <Route exact path='/report' component={PrintReport}  />
            </Switch>
        </div>
      </Router>
    );
   }
}


export default App;
