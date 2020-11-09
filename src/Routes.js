import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import LoginPrin from './LoginPrin';
import NavDoc from './Componentes/InterfazDoc/navDoc';
import NoMatch from './Componentes/noMatch';


function App() {
    return (
        <Router>
            <Switch>
            <Route exact path="/NavDoc/:id" component={NavDoc} />
                    
                <Route path="/" component={LoginPrin} />
                  
               
            </Switch>

        </Router>
    )
}


export default App;