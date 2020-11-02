import React from "react";
import loginImg from "../../LOGIN.svg";
import { Button, Form } from "react-bootstrap";


export class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg} />
                        
                    </div>
                    <Form >
                        <Form.Group controlId="Usuario" bsSize="large">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                
                                type="text"
                                
                                placeholder='Ingrese el usuario'
                                
                            />
                        </Form.Group>
                        <Form.Group controlId="contraseña" bsSize="large">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                
                                placeholder='Ingrese la contraseña'
                                
                                type="password"
                            />
                        </Form.Group>

                        <div className="footer">
                            <Button type="button" className="btn">
                                Login
          </Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}