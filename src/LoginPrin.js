import React from "react";
import "./App.scss";
import LoginAdmin from "./Componentes/LoginAdmin.js"
import "./Componentes/Login/syle.scss";
import { Login } from "./Componentes/Login/index.js"
import { Nav, Button } from "react-bootstrap";


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
        
        if(this.state.tipoLogin){          
        
        return (
            <div className="barraNav">
                <Nav variant="tabs" >
                    <Nav.Item>
                        <Button type="button"  size="md" onClick={()=> this.setState({tipoLogin: false})}>Doctor</Button>
                    </Nav.Item>
                    <Nav.Item>
                        <Button type="button" size="md" onClick={()=> this.setState({tipoLogin: true})} disabled>Admin</Button>
                    </Nav.Item>
                    
                </Nav>
                <div className="contenedor" >
                    <LoginAdmin />
                </div>

            </div>

        );}
        else{
            return (
                <div className="barraNav">
                    <Nav variant="tabs" >
                        <Nav.Item>
                            <Button type="button" size="md" onClick={()=> this.setState({tipoLogin: false})} disabled>Doctor</Button>
                        </Nav.Item>
                        <Nav.Item>
                            <Button type="button" size="md" onClick={()=> this.setState({tipoLogin: true})}>Admin</Button>
                        </Nav.Item>
                        
                    </Nav>
                    <div className="App">
                    <div className="login">
                    <div className="container" >
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