import React, { Fragment } from "react";
import { Button, Form, Label, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { CrearPersona } from '../Login/index';

export default class CrearDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: [],
            personas: [],
            persona: null,
            modalInserD: false,
            modalInserP: false,
            nombrePa: '',
            selecdoc: null,
            selecpa: null,

        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    async componentDidMount() {

        await fetch('http://localhost:5000/persona/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        personas: result
                    });
                }
            )

    }



    validaM(x) {
        const index = document.getElementById('personas').selectedIndex - 1;
        if (index >= 0) {
            if (x === 'P') {

                this.modalPaciente();
            }
            else {
                this.modalDoctor();
            }
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Seleccione una Persona.',
            })
        }
    }

    modalPaciente() {

        this.setState({
            modalInserP: !this.state.modalInserP
        });

    }
    modalDoctor() {
        this.setState({
            modalInserD: !this.state.modalInserD
        });
    }

    cancelarP() {
        this.modalPaciente();
    }
    cancelarD() {
        this.modalDoctor();
    }


    render() {
        return (
            <Fragment>
                <div className="total">
                    <div className="header mt-2 text-center " id="login"><h2 className="Titulo m-2 " >Crear Doctor o Paciente</h2></div>
                    <div className="conteneT mt-2">
                        <div className="conteneA mt-2">
                            <div className="mt-1" >

                                <Form className="contenido mt-3 " >

                                    <div className="form mt-2 mb-2 "  >
                                        <h4 className="ml-3 mr-3 mt-3 font-weight-bold">Crear</h4>
                                        <Label className="mt-4 font-weight-bold">Seleccione la Persona de la base de datos :</Label>

                                        <FormGroup className="selP ml-3 mr-3 mt-2 mb-3" >
                                            <Input className="mt-4" id="personas"

                                                className="form-control"
                                                name="personas"
                                                type="select"
                                                bsSize="md"
                                                selectedIndex={this.state.idperso} >
                                                <option>Personas</option>
                                                {this.state.personas.map(per => (
                                                    <option value={per.idpersona}>
                                                        {per.nombre}  {per.apellido} {per.numerodoc}
                                                    </option>
                                                ))}

                                            </Input>
                                        </FormGroup>

                                        <div className="footer mt-3 mb-4">
                                            <Button className="mb-3 mr-2" size="lg" color='primary' onClick={() => this.validaM('P')} >
                                                Crear Paciente
                                        </Button>
                                            <Button className="mb-3" size="lg" color='primary' onClick={() => this.validaM('D')} >
                                                Crear Doctor
                                        </Button>
                                            <CrearPersona className="mb-4" />
                                        </div>

                                    </div>
                                </Form>
                            </div>
                            <div className="formD mt-1 ">
                                <div className="inputsFA mb-2">
                                    <h4 className="ml-3 mr-3 mt-3 font-weight-bold">Actualizar o Borrar</h4>

                                    <FormGroup className="selP inputF ml-3 mr-3 mt-3 ">
                                        <Label className="font-weight-bold"> Lista de Pacientes: </Label>
                                        <Input id="pacientesSelec"

                                            className="form-control"
                                            name="pacientesSelec"
                                            type="select"
                                            bsSize="md"

                                            selectedIndex={this.state.selecpa}
                                        >
                                            <option>Pacientes</option>



                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="selP inputF ml-3 mr-3 mt-3 ">
                                        <Label className="font-weight-bold"> Lista de Doctores: </Label>
                                        <Input id="docSelec"

                                            className="form-control"
                                            name="docSelec"
                                            type="select"
                                            bsSize="md"

                                            selectedIndex={this.state.selecdoc}
                                        >
                                            <option>Doctores</option>



                                        </Input>
                                    </FormGroup>

                                    <div className="footerA mt-2 mb-1">
                                        <div className='paciente'>
                                            <Button className="mb-2 mr-3" size="lg" color='primary' onClick={() => this.validaM('P')} >
                                                Actualizar Paciente
                                        </Button>
                                            <Button className="mb-2" size="lg" color='primary' onClick={() => this.validaM('D')} >
                                                Actualizar Doctor
                                        </Button>
                                        </div>
                                        <div className="doc">

                                            <Button className="mb-2 mr-3" size="lg" color='primary' onClick={() => this.validaM('P')} >
                                                Borrar Paciente
                                        </Button>
                                            <Button className="mb-2" size="lg" color='primary' onClick={() => this.validaM('D')} >
                                                Borrar Doctor
                                        </Button>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>



                    </div>
                </div>

                {/* Modal Crear Paciente */}
                <Modal
                    size="md"
                    centered isOpen={this.state.modalInserP} id="insertar">
                    <ModalHeader>
                        <div><h3>Crear Paciente</h3></div>
                    </ModalHeader>
                    <ModalBody>

                        <Form>
                            <div id="regisM" className="contRegisM">
                                <div className="mb-3">
                                    <FormGroup  >
                                        <Input id="nombrePa"
                                            placeholder="Nombre"
                                            className="form-control"
                                            name="nombrePa"
                                            bsSize="md"
                                            type="text"
                                            value={this.state.nombrePa}
                                            onChange={this.handleChange} />
                                    </FormGroup>
                                </div>

                            </div>
                        </Form>
                    </ModalBody>
                    <ModalFooter >
                        <Button color="success" >Crear</Button>
                        <Button color="danger" onClick={() => this.cancelarP()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>


                {/* Modal Crear Doctor */}
                <Modal
                    size="md"
                    centered isOpen={this.state.modalInserD} id="insertar">
                    <ModalHeader>
                        <div><h3>Crear Doctor</h3></div>
                    </ModalHeader>
                    <ModalBody>

                    </ModalBody>
                    <ModalFooter >
                        <Button color="success" >Crear</Button>
                        <Button color="danger" onClick={() => this.cancelarD()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </Fragment >
        );
    }

}