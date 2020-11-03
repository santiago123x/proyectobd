import { Button, Form, FormGroup, InputGroupText, Input, Label, Row, Col, Container } from "reactstrap";
import React, { ReactComponent } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export class CrearDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            tipodoc: null,
            direccion: '',
            barrio: null,
            fechaN: '',
            identificacion: '',
            email: [],
            telefono: [],

            usuario: '',
            contraseña: '',
            tipousuario: 'Doctor',
            idPersona: null,


            idusu: [],
            barrios: [],
            tiposdoc: [],


        };
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <Container>

                <Form>
                    <Row>
                        <Col>
                            <Label for="Nombre">Nombre</Label>
                            <Input type="text" name="Nombre" id="Nombre" placeholder="Nombre" />

                        </Col>
                        <Col>
                            <Label for="Apellido">Apellido</Label>
                            <Input type="text" name="Apellido" id="Apellido" placeholder="Apellido" />
                        </Col>
                        <Col>
                            <Label for="Nombre">Nombre</Label>
                            <Input type="text" name="Nombre" id="Nombre" placeholder="Nombre" />
                        </Col>
                        <Col>
                            <Label for="Nombre">Nombre</Label>
                            <Input type="text" name="Nombre" id="Nombre" placeholder="Nombre" />
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }

}