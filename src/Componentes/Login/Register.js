import React from "react";
import loginImg from "../../LOGIN.svg";
import { Button, Form } from "react-bootstrap";

export class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Registro</div>
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
            <Form.Group controlId="email" bsSize="large">
              <Form.Label>Email</Form.Label>
              <Form.Control

                placeholder='Ingrese el Email'

                type="email"
              />
            </Form.Group>

            <div className="footer">
              <Button type="button" className="btn">
                Registrar
          </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}