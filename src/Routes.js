import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import LoginPrin from './LoginPrin';
import LoginAdmin from "./Componentes/LoginAdmin.js";
import InformesDoc from "./Componentes/InterfazDoc/InformesDoc"
import Registro from "./Componentes/InterfazDoc/Registro";


function App() {
    return (
        <Router>
            <Switch>
                
                <Route path="/RegistrarV">
                <Registro />
                </ Route>
                <Route path="/InformesDoc">
                <InformesDoc />
                </ Route>
                <Route path="/">
                <LoginPrin />
                </Route>
            </Switch>

        </Router>
    )
}


export default App;