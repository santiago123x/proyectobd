import React from "react";
import "./App.scss";
import LoginAdmin from "./Componentes/LoginAdmin.js"
import "./Componentes/Login/syle.scss";
import { Login } from "./Componentes/Login/index.js"
import { Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


class LoginPrin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipoLogin: true
        };
    }

    state = {
        tipoLogin: true
    }

    render() {

        if (this.state.tipoLogin) {

            return (

                <div className="barraNav" >
                    <nav className="navbar navbar-expand-lg navbar-light bg-primary" id="nave">
                    <h2 className="navbar-brand ml-4"  >
                                Login
                        </h2>
                        <div className="container">
                            
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item active">
                                        <Button type="button" size="md" onClick={() => this.setState({ tipoLogin: false })}>Doctor</Button>
                                    </li>
                                    <li className="nav-item">
                                        <Button type="button" size="md" onClick={() => this.setState({ tipoLogin: true })} disabled>Admin</Button>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className="contenedor" >
                        <LoginAdmin />
                    </div></div>

            );
        }
        else {
            return (
                <div className="barraNav">

                    <nav className="navbar navbar-expand-lg navbar-light bg-primary" id="nave">
                    <h2 className="navbar-brand ml-4" >
                                Login
                        </h2>
                        <div className="container">
                            
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item active">
                                        <Button type="button" size="md" onClick={() => this.setState({ tipoLogin: false })} disabled>Doctor</Button>
                                    </li>
                                    <li className="nav-item">
                                        <Button type="button" size="md" onClick={() => this.setState({ tipoLogin: true })}>Admin</Button>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className="App">
                        <div className="login">
                            <div className="container " >
                                <Login />
                            </div>
                        </div>
                    </div>

                </div>

            );
        }
    }
}


export default LoginPrin;