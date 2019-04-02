import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Simulator from './Simulator';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigator from './navBar';


const routing = (
    <Router>
        <div>
            <Navigator>

            </Navigator>
            <Route exact path="/" component={App} />
            <Route path="/simulator" component={Simulator} />
            {/* <Route path="/contact" component={Contact} /> */}
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
