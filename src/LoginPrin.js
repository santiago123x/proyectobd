import React from "react";
import "./App.scss";
import LoginAdmin from "./Componentes/LoginAdmin.js"
import "./Componentes/Login/syle.scss";




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

               

                    <div className="contenedor" >
                        <LoginAdmin />
                    </div>

            );
        }
    }



export default LoginPrin;