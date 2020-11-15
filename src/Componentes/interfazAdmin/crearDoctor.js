import React, { Fragment } from "react";
import { Button, Form, Label, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, ButtonGroup } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import { CrearPersona } from '../Login/index';

export default class CrearDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: [],
            personas: [],
            persona: null,
            //Modals
            modalInserD: false,
            modalInserP: false,
            modalActuD: false,
            //
            nombrePa: '',
            selecdoc: null,
            selecpa: null,
            listDoc: [],
            //Info Modal Doc
            universidad: null,
            universidades: [],
            eps: null,
            epss: [],
            //
            //Actu Modal Doc
            nombreAD: '',
            apellidoAD: '',
            tipoD_AD: null,
            idenAD: '',
            barrioAD: null,
            fechaAD: null,
            emailAD: [],
            emailBAD: [],
            telAD: [],
            uniAD: null,
            epsAD: null,
            idPerDoc: null,
            //Barrios y TiposID
            barrios: [],
            tiposDOC: [],
            //Info Modal Pac

            //
            haydoc: false,

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

    // Inicializacion

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

        await fetch('http://localhost:5000/doctores/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        listDoc: result
                    });

                }
            )

        await fetch('http://localhost:5000/universidades/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        universidades: result
                    });

                }
            )
        await fetch('http://localhost:5000/eps/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        epss: result
                    });

                }
            )

        await fetch('http://localhost:5000/tipodoc/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        tiposDOC: result
                    });
                }
            )

        await fetch('http://localhost:5000/barrio/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        barrios: result
                    });
                }
            )

    }

    // Crear Doctores y Pacientes

    async hayDoctor() {
        await fetch(`http://localhost:5000/doctor/${this.state.persona}`)
            .then(response => response.json())
            .then(result => {
                if (result.length === 0) {
                    this.setState({
                        haydoc: false
                    });
                } else {
                    this.setState({
                        haydoc: true
                    });
                }

            });
    }

    async crearDoctor() {

        const indexU = document.getElementById('universidad').selectedIndex - 1;
        const indexE = document.getElementById('eps').selectedIndex - 1;

        if (indexU >= 0 && indexE >= 0) {
            var idpersona = this.state.persona;
            var identidadsalud = this.state.eps;
            var iduniversidad = this.state.universidad;
            const nombre = this.state.personas[document.getElementById('persona').selectedIndex - 1].nombre;
            const apellido = this.state.personas[document.getElementById('persona').selectedIndex - 1].apellido;
            const body = { idpersona, identidadsalud, iduniversidad }


            await fetch(`http://localhost:5000/doctor/`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            await Swal.fire({
                icon: 'success',
                title: `Se ha agregado el Doctor ${nombre} ${apellido}`,
                showConfirmButton: false,
                timer: 1500
            })
            this.cancelarD();
            window.location.reload();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Seleccione una Universidad y una Eps Valida.',
            })
        }
    }

    //Actualizar Doctor

    async actuDoc(){
        const id = document.getElementById('docSelec').value;
        var nombre = this.state.nombreAD;
        var apellido = this.state.apellidoAD;
        var tipodoc = this.state.tipoD_AD;
        var numerodoc = this.state.idenAD;
        var barrio = this.state.barrioAD;
        var fechanaci = this.state.fechaAD;
        var email = this.state.emailAD;
        var tel = this.state.telAD;
        var iduniversidad = this.state.uniAD;
        var identidadsalud = this.state.epsAD;
        var idpersona = this.state.idPerDoc;
        
        const body = { nombre, apellido, tipodoc, numerodoc, barrio, fechanaci }

        await fetch(`http://localhost:5000/persona/${idpersona}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })

        const bodyD = { identidadsalud, iduniversidad }

        await fetch(`http://localhost:5000/doctor/${id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyD)
        })
        /*
        for(var i=0;i<this.state.emailAD.length;i++){
            if(!false){
                await fetch(`http://localhost:5000/`)
            }
        }
        for(var i=0;i<this.state.emailBAD.length;i++){
            if(true){
                await fetch(`http://localhost:5000/`)
            } 
        }*/
        


    }


    //Cargar Datos ActuDoc

    async cargarDatosActuDoc() {
        const id = document.getElementById('docSelec').value;

        await fetch(`http://localhost:5000/doctorinfo/${id}`)
            .then(response => response.json())
            .then((result) => {

                this.setState({
                    nombreAD: result.nombre,
                    apellidoAD: result.apellido,
                    idenAD: result.numerodoc,
                    tipoD_AD: result.idtipo,
                    barrioAD: result.id_barrio,
                    uniAD: result.iduniversidad,
                    epsAD: result.ideps,
                    fechaAD: result.fechanaci.substr(0,10),
                    idPerDoc: result.idpersona,

                });
                console.log(this.state.fechaAD)

            });

        await fetch(`http://localhost:5000/email/${this.state.idPerDoc}`)
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                for(var i=0;i<result.length;i++){
                    this.setState({
                        emailAD: [result[i].email]
                    })
                }
            });

        
            await fetch(`http://localhost:5000/telefono/${this.state.idPerDoc}`)
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                for(var i=0;i<result.length;i++){
                    this.setState({
                        telAD: [result[i].telefono]
                    })
                }
            });

    }



    // Eliminar Doctor

    async borrarDoctor() {
        const id = document.getElementById('docSelec').value;
        Swal.fire({
            title: 'Esta Seguro ?',
            text: "No se podra Recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
        }).then((result) => {
            if (result.isConfirmed) {
                /*await fetch (`/doctor/${id}`, {
                    method: "DELETE"
                })      */
                Swal.fire(
                    'Borrado!',
                    'Se ha Borrado el Doctor.',
                    'success'
                )
            }
        })

    }


    // ---------------- Email --------------------

    async agregarEmail(x) {
        var { value: email } = await Swal.fire({
            title: 'Ingrese su Email',
            input: 'email',
            inputLabel: 'Su Correo Electronico es : ',
            showCancelButton: true,
            inputPlaceholder: 'Email'

        })
        if (email && x === 'D') {
            var corritos = this.state.emailAD
            corritos.push(email)
            this.setState({
                emailAD: corritos
            });

            Swal.fire(`Email Ingresado: ${email}`)
        }
        if (email === 'P') {
            var corritos = this.state.emailAD
            corritos.push(email)
            this.setState({
                emailAD: corritos
            });

            Swal.fire(`Email Ingresado: ${email}`)
        }
    }

    borrarEmailAD() {

        var valor = document.getElementById('emailAD').value;
        var corritos = []
        corritos.push(valor)
        this.setState({
            emailBAD : corritos,
            emailAD: this.state.emailAD.filter(mail => mail !== valor)
        });
    }


    // ---------------- Telefono --------------------


    tiene_letras(texto) {
        var letras = 'abcdefghyjklmnñopqrstuvwxyz!"}#$%&+)@.,-{/(=?¡';
        texto = texto.toLowerCase();
        for (var i = 0; i < texto.length; i++) {
            if (letras.indexOf(texto.charAt(i), 0) !== -1) {
                return false;
            }
        }
        return true;
    }
    async agregarTel(x) {
        var { value: tel } = await Swal.fire({
            title: 'Ingrese su Telefono',
            input: 'text',
            inputLabel: 'Su Telefono es : ',
            inputPlaceholder: 'Telefonos',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if ((value.length === 10 || value.length === 7) && this.tiene_letras(value)) {
                        resolve()
                    } else {
                        resolve('Debe tener 10(Celular) o 7(Fijo)  Digitos y estos deben ser Numeros')
                    }
                }

                )
            }
        })
        if (tel && tel.length <= 10 && x === 'D') {
            var corritos = this.state.telAD
            corritos.push(tel)
            this.setState({
                telAD: corritos
            });

            Swal.fire(`Telefono Ingresado: ${tel}`)
        }
        if (tel && tel.length <= 10 && x === 'P') {
            var corritos = this.state.telefonoAD
            corritos.push(tel)
            this.setState({
                telAD: corritos
            });

            Swal.fire(`Telefono Ingresado: ${tel}`)
        }
    }

    borrarTelAD() {
        var valor = document.getElementById('telAD').value;

        this.setState({
            telAD: this.state.telAD.filter(tele => tele !== valor)
        });
    }

    // Validaciones y Modals

    async validaM(x) {

        const index = document.getElementById('persona').selectedIndex - 1;

        if (index >= 0) {
            await this.hayDoctor();
            if (x === 'P') {

                this.modalPaciente();
            }
            else {
                if (!this.state.haydoc) {
                    this.modalDoctor();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Esta Persona ya es un Doctor.',
                    })
                }
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

    async validaActuD(x) {
        const index = document.getElementById('docSelec').selectedIndex - 1;

        if (index >= 0 && x === 'A') {
            await this.cargarDatosActuDoc();
            this.modalActuD();
            document.getElementById('tipoD_AD').value = this.state.tipoD_AD;
            document.getElementById('barrioAD').value = this.state.barrioAD;
            document.getElementById('epsAD').value = this.state.epsAD;
            document.getElementById('uniAD').value = this.state.uniAD;
            document.getElementById('fechaAD').value = this.state.fechaAD;
        }
        else if (index >= 0 && x === 'D') {
            this.borrarDoctor();
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Seleccione un Doctor.',
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

    modalActuD() {
        this.setState({
            modalActuD: !this.state.modalActuD
        });
    }
    cancelarActuD() {
        this.modalActuD();
        this.setState({
            nombreAD: '',
            apellido: '',
            tipoD_AD: null,
            idenAD: '',
            barrioAD: null,
            fechaAD: null,
            emailAD: [],
            telAD: [],
            uniAD: null,
            epsAD: null,
            idPerDoc: null,
            emailBAD: [],
        })
    }

    cancelarP() {
        this.modalPaciente();
    }
    cancelarD() {

        this.setState({ universidad: '' })
        this.setState({ eps: '' })
        this.modalDoctor();
    }


    render() {
        return (
            <Fragment>
                <div className="total">
                    <div className="header mt-2 text-center " id="login"><h2 className="Titulo m-2 " >Crear Doctor o Paciente</h2></div>
                    <div className="conteneT pt-1 mt-3">
                        <div className="conteneA mt-3">
                            <div className="mt-3" >

                                <Form className="contenido pt-3 mt-3 " >

                                    <div className="form pt-2 mt-2 mb-2 "  >
                                        <h4 className="ml-3 mr-3 mt-3 font-weight-bold">Crear</h4>
                                        <Label className="mt-4 font-weight-bold">Seleccione la Persona de la base de datos :</Label>

                                        <FormGroup className="selP ml-3 mr-3 mt-2 mb-3" >


                                            <Input className="mt-4" id="persona"

                                                className="form-control"
                                                name="persona"
                                                type="select"
                                                bsSize="md"

                                                onChange={this.handleChange} >
                                                <option selected="true" disabled="disabled">Personas</option>
                                                {this.state.personas.map(per => (
                                                    <option value={per.idpersona}>
                                                        {per.nombre}  {per.apellido} - {per.numerodoc}
                                                    </option>
                                                ))}

                                            </Input>


                                        </FormGroup>

                                        <div className="footer mt-3 mb-4">
                                            <Button className="mb-3 mr-2" size="lg" color='primary' onClick={() => this.validaM('P')} >
                                                Crear Paciente <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                            </Button>
                                            <Button className="mb-3" size="lg" color='primary' onClick={() => this.validaM('D')} >
                                                Crear Doctor <i class="fa fa-user-md" aria-hidden="true"></i>
                                            </Button>
                                            <CrearPersona className="mb-4" />
                                        </div>

                                    </div>
                                </Form>
                            </div>
                            <div className="formD mt-4 ">
                                <div className="inputsFA mb-4">
                                    <h4 className="ml-3 mr-3 mt-4 mb-3 font-weight-bold">Actualizar o Borrar</h4>

                                    <FormGroup className="selP inputF mb-3 ml-3 mr-3 mt-3 ">
                                        <Label className="font-weight-bold"> Lista de Pacientes: </Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <ButtonGroup>
                                                    <Button color="primary" ><i class="fa fa-wrench" /></Button>
                                                    <Button color="primary" ><i class="fa fa-trash-o " /></Button>
                                                </ButtonGroup>
                                            </InputGroupAddon>
                                            <Input id="pacientesSelec"

                                                className="form-control"
                                                name="pacientesSelec"
                                                type="select"
                                                bsSize="md"

                                                selectedIndex={this.state.selecpa}
                                            >
                                                <option selected="true" disabled="disabled">Pacientes</option>



                                            </Input>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className="selP inputF mb-3 ml-3 mr-3 mt-3 ">
                                        <Label className="font-weight-bold"> Lista de Doctores: </Label>
                                        <InputGroup>

                                            <Input id="docSelec"

                                                className="form-control"
                                                name="docSelec"
                                                type="select"
                                                bsSize="md"

                                                selectedIndex={this.state.selecdoc}
                                            >
                                                <option selected="true" disabled="disabled">Doctores</option>
                                                {this.state.listDoc.map(doc => (
                                                    <option value={doc.iddoctor}>
                                                        {doc.nombre} {doc.apellido} - {doc.numerodoc}
                                                    </option>
                                                ))}

                                            </Input>

                                            <InputGroupAddon addonType="prepend">
                                                <ButtonGroup>
                                                    <Button color="primary" onClick={() => this.validaActuD('A')}><i class="fa fa-wrench" /></Button>
                                                    <Button color="primary" onClick={() => this.validaActuD('D')}><i class="fa fa-trash-o " /></Button>
                                                </ButtonGroup>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>



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
                    <Form>
                        <ModalBody>

                            <FormGroup className=" mb-3 ml-3 mr-3 mt-3 ">
                                <Label className="font-weight-bold"> Universidad: </Label>
                                <InputGroup>

                                    <Input id="universidad"

                                        className="form-control"
                                        name="universidad"
                                        type="select"
                                        bsSize="md"
                                        onChange={this.handleChange}

                                    >
                                        <option>Universidad</option>
                                        {this.state.universidades.map(uni => (
                                            <option value={uni.iduniversidad}>
                                                {uni.nombreuni}
                                            </option>
                                        ))}

                                    </Input>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className=" mb-3 ml-3 mr-3 mt-3 ">
                                <Label className="font-weight-bold"> Eps: </Label>
                                <InputGroup>

                                    <Input id="eps"

                                        className="form-control"
                                        name="eps"
                                        type="select"
                                        bsSize="md"
                                        onChange={this.handleChange}
                                        selectedIndex={this.state.eps}
                                    >
                                        <option>Eps</option>
                                        {this.state.epss.map(ep => (
                                            <option value={ep.ideps}>
                                                {ep.nombreeps}
                                            </option>
                                        ))}

                                    </Input>
                                </InputGroup>
                            </FormGroup>

                        </ModalBody>
                        <ModalFooter >
                            <Button color="success" onClick={() => this.crearDoctor()} >Crear Doctor</Button>
                            <Button color="danger" onClick={() => this.cancelarD()}>Cancelar</Button>
                        </ModalFooter>
                    </Form>
                </Modal>

                {/* Modal Actu Doc */}

                <Modal
                    size="md"
                    centered isOpen={this.state.modalActuD} id="insertar">
                    <ModalHeader>
                        <div><h3>Actualizar Doctor</h3></div>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <div id="regisM" className="contRegisM">
                                <div className="mb-3">
                                    <FormGroup  >
                                        <Input id="nombreAD"
                                            placeholder="Nombre"
                                            className="form-control"
                                            name="nombreAD"
                                            bsSize="md"
                                            type="text"
                                            value={this.state.nombreAD}
                                            onChange={this.handleChange} />
                                    </FormGroup>
                                    <span className="span" id="snombre">Debe Ingresar un Nombre</span>
                                </div>
                                <div className="mb-3">
                                    <FormGroup  >

                                        <Input id="apellidoAD"
                                            placeholder="Apellido"
                                            className="form-control"
                                            name="apellidoAD"
                                            type="text"
                                            bsSize="md"
                                            value={this.state.apellidoAD}
                                            onChange={this.handleChange} />
                                    </FormGroup>
                                    <span className="span" id="sapellido">Debe Ingresar un Apellido</span>
                                </div>
                                <div className="mb-3">
                                    <FormGroup  >
                                        <Input id="tipoD_AD"
                                            className="form-control"
                                            name="tipoD_AD"
                                            type="select"
                                            bsSize="md"
                                            onChange={this.handleChange}>
                                            <option selected="true" disabled="disabled">Tipo de Documento</option>

                                            {this.state.tiposDOC.map(tipo => (

                                                <option value={tipo.idtipo}>
                                                    {tipo.tipodocument}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                    <span className="span" id="stipodoc">Seleccione un Tipo de Documento valido</span>
                                </div>
                                <div className="mb-3">
                                    <FormGroup  >

                                        <Input id="idenAD"
                                            placeholder="Identificación"
                                            className="form-control"
                                            name="idenAD"
                                            type="text"
                                            bsSize="md"
                                            value={this.state.idenAD}
                                            onChange={this.handleChange} />
                                    </FormGroup>
                                    <span className="span" id="sidentificacion">Debe Ingresar una Identificación Valida</span>
                                </div>
                                <div className="mb-3">
                                    <FormGroup  >
                                        <Input id="barrioAD"
                                            placeholder="Barrio"
                                            className="form-control"
                                            name="barrioAD"
                                            type="select"
                                            bsSize="md"
                                            selectedIndex={this.state.barrioAD}
                                            onChange={this.handleChange}>
                                            <option selected="true" disabled="disabled">Barrios</option>
                                            {this.state.barrios.map(bar => (
                                                <option value={bar.id_barrio}>
                                                    {bar.nombre}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                    <span className="span" id="sbarrio">Seleccione un Barrio</span>
                                </div>

                                <div className="mb-3" >
                                    <FormGroup  >
                                        <div className="mensaje">
                                            <p className="oculto">Fecha de Nacimiento</p>
                                            <Input
                                                id="fechaAD"
                                                placeholder="date placeholder"
                                                className="form-control"
                                                name="fechaAD"
                                                bsSize="md"
                                                type="date"
                                                value={this.state.fechaN}
                                                onChange={this.handleChange}
                                            /> </div></FormGroup>
                                    <span className="span" id="sfechaN">Debe Ingresar una Fecha Valida</span>
                                </div>
                                <FormGroup className=" mb-3   mt-3 ">

                                    <InputGroup>

                                        <Input id="uniAD"

                                            className="form-control"
                                            name="uniAD"
                                            type="select"
                                            bsSize="md"
                                            onChange={this.handleChange}

                                        >
                                            <option selected="true" disabled="disabled">Universidad</option>
                                            {this.state.universidades.map(uni => (
                                                <option value={uni.iduniversidad}>
                                                    {uni.nombreuni}
                                                </option>
                                            ))}

                                        </Input>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className=" mb-3  mt-3 ">

                                    <InputGroup>

                                        <Input id="epsAD"

                                            className="form-control"
                                            name="epsAD"
                                            type="select"
                                            bsSize="md"
                                            onChange={this.handleChange}
                                            selectedIndex={this.state.epsAD}
                                        >
                                            <option selected="true" disabled="disabled">Eps</option>
                                            {this.state.epss.map(ep => (
                                                <option value={ep.ideps}>
                                                    {ep.nombreeps}
                                                </option>
                                            ))}

                                        </Input>
                                    </InputGroup>
                                </FormGroup>
                                <div className="mb-3" >
                                    <FormGroup >
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <ButtonGroup>
                                                    <Button color="primary" onClick={() => this.agregarEmail('D')}><i class="fa fa-plus" /></Button>
                                                    <Button color="primary" onClick={() => this.borrarEmailAD()}><i class="fa fa-minus" /></Button>
                                                </ButtonGroup>
                                            </InputGroupAddon>
                                            <Input
                                                id="emailAD"
                                                type="select"
                                                placeholder="Email"
                                                className="form-control"
                                                name="emailAD"
                                                bsSize="md"

                                            >
                                                <option>Email</option>
                                                {this.state.emailAD.map(mail => (
                                                    <option >
                                                    {mail}
                                                </option>
                                                ))}
                                            </Input>
                                        </InputGroup>
                                    </FormGroup>
                                </div>
                                <div className="mb-3" >
                                    <FormGroup >
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <ButtonGroup>
                                                    <Button color="primary" onClick={() => this.agregarTel('D')}><i class="fa fa-plus" /></Button>
                                                    <Button color="primary" onClick={() => this.borrarTelAD()}><i class="fa fa-minus" /></Button>
                                                </ButtonGroup>
                                            </InputGroupAddon>
                                            <Input
                                                id="telAD"
                                                placeholder="Telefono"
                                                className="form-control"
                                                name="telAD"
                                                bsSize="md"
                                                type="select">

                                                <option>Telefonos</option>
                                                {this.state.telAD.map(tel => (
                                                    <option >
                                                        {tel}
                                                    </option>
                                                ))}
                                            </Input>
                                        </InputGroup>
                                    </FormGroup>
                                </div>


                            </div>
                        </Form>
                    </ModalBody>
                    <ModalFooter >
                        <Button color="success" >Actualizar</Button>
                        <Button color="danger" onClick={() => this.cancelarActuD()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </Fragment >
        );
    }

}