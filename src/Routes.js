import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import LoginPrin from './LoginPrin';
import NavDoc from './Componentes/InterfazDoc/navDoc';
import NavAdmin from './Componentes/interfazAdmin/navAdmin';



function App() {
    return (
        <Router>
            <Switch>
                <Route  path="/NavDoc/:id" component={NavDoc} />
                <Route  path="/NavAdmin/:id" component={NavAdmin} />

                <Route path="/" component={LoginPrin} />


            </Switch>

        </Router>
    )
}


export default App;