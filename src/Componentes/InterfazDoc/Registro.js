import React from 'react';
import NavDoc from './navDoc';
import { Form, Input, FormGroup, Button } from 'reactstrap';
import './style.scss';



export default class Registro extends React.Component {
    constructor(props) {
        super(props);

    }



    render() {
        return (
            <div>
                <NavDoc />

                <div className="header mt-2 text-center " id="login"><h2 className="m-2 " >Registrar Visita</h2></div>
                <div  >
                    <Form className="mt-1" className="contenido" >
                        
                        <div className="mt-3 ml-4" id="form" >
                            <FormGroup  >
                                <Input id="personas"

                                    className="form-control"
                                    name="personas"
                                    type="select"
                                    bsSize="md" >
                                    <option>Pacientes</option>

                                </Input>
                            </FormGroup>
                        </div>
                        <div className="mt-3 ml-4" id="form" >
                            <FormGroup  >
                                <Input id="personas"

                                    className="form-control"
                                    name="personas"
                                    type="select"
                                    bsSize="md" >
                                    <option>Pacientes</option>

                                </Input>
                            </FormGroup>
                        </div>
                        <div className="mt-3 ml-4" id="form" >
                            <FormGroup  >
                                <Input id="personas"

                                    className="form-control"
                                    name="personas"
                                    type="select"
                                    bsSize="md" >
                                    <option>Pacientes</option>

                                </Input>
                            </FormGroup>
                        </div>
                        <div className="mt-3 ml-4" id="form" >
                            <FormGroup  >
                                <Input id="personas"

                                    className="form-control"
                                    name="personas"
                                    type="select"
                                    bsSize="md" >
                                    <option>Pacientes</option>

                                </Input>
                            </FormGroup>
                        </div>
                        <div className="mt-3 ml-4" id="form" >
                            <FormGroup  >
                                <Input id="personas"

                                    className="form-control"
                                    name="personas"
                                    type="select"
                                    bsSize="md" >
                                    <option>Pacientes</option>

                                </Input>
                            </FormGroup>
                        </div>
                        <div className="mt-3 ml-4" id="form" >
                            <FormGroup  >
                                <Input id="personas"

                                    className="form-control"
                                    name="personas"
                                    type="select"
                                    bsSize="md" >
                                    <option>Pacientes</option>

                                </Input>
                            </FormGroup>
                        </div>
                        <div className="mt-3 ml-4" id="form" >
                            <FormGroup  >
                                <Input id="personas"

                                    className="form-control"
                                    name="personas"
                                    type="select"
                                    bsSize="md" >
                                    <option>Pacientes</option>

                                </Input>
                            </FormGroup>
                        </div>
                        <div className="mt-3 ml-4" id="form" >
                            <FormGroup  >
                                <Input id="personas"

                                    className="form-control"
                                    name="personas"
                                    type="select"
                                    bsSize="md" >
                                    <option>Pacientes</option>

                                </Input>
                            </FormGroup>
                        </div>
                        <div className="mt-3 ml-4" id="form" >
                            <FormGroup  >
                                <Input id="personas"

                                    className="form-control"
                                    name="personas"
                                    type="select"
                                    bsSize="md" >
                                    <option>Pacientes</option>

                                </Input>
                            </FormGroup>
                        </div>
                        <div className="mt-3 ml-4" id="form" >
                            <FormGroup  >
                                <Input id="personas"

                                    className="form-control"
                                    name="personas"
                                    type="select"
                                    bsSize="md" >
                                    <option>Pacientes</option>

                                </Input>
                            </FormGroup>
                        </div>
                        <div className="footer">
                            <Button className="mt-5" size="lg" color='primary'  >
                                Registrar Visita
                            </Button>
                        </div>


                    </Form>
                </div>

            </div>


        );
    }
}