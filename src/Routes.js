import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import LoginPrin from './LoginPrin';
import LoginAdmin from "./Componentes/LoginAdmin.js";
import InformesDoc from "./Componentes/InterfazDoc/InformesDoc"
import Registro from "./Componentes/InterfazDoc/Registro";
import Medicamentos from "./Componentes/InterfazDoc/Medicamentos";
import NavDoc from './Componentes/InterfazDoc/navDoc';


function App() {
    return (
        <Router>
            <Switch>
            <Route path="/NavDoc/:id" component={NavDoc}/>

                <Route path="/RegistrarV">
                    <Registro />
                </ Route>
                <Route path="/InformesDoc">
                    <InformesDoc />
                </ Route>
                <Route path="/Medicamentos">
                    <Medicamentos />
                </ Route>
                <Route path="/">
                    <LoginPrin />
                </Route>
            </Switch>

        </Router>
    )
}


export default App;