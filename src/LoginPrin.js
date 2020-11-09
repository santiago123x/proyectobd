import React from "react";
import "./App.scss";
import LoginAdmin from "./Componentes/LoginAdmin.js"
import "./Componentes/Login/syle.scss";
import { Login } from "./Componentes/Login/index.js"
import {  Button } from "react-bootstrap";



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

            return (

                <div className="barraNav" >
                    <nav className="navbar navbar-expand-lg navbar-light bg-primary" id="nave">
                    <h2 className="navbar-brand ml-4 font-weight-bold"  >
                                Login
                        </h2>
                        <div className="container">
                            
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                               
                            </div>
                        </div>
                    </nav>

                    <div className="contenedor" >
                        <LoginAdmin />
                    </div></div>

            );
        }
    }



export default LoginPrin;