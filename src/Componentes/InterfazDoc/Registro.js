import React from 'react';
import { Form, Input, FormGroup, Button, Label, Modal, ModalHeader, ModalBody, ModalFooter,  InputGroup } from 'reactstrap';
import './style.scss';
import { FormControl } from 'react-bootstrap';



export default class Registro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalInser: false,
      medicamentos: [],
      medicamento: ''


    }
  }




  mostarInser() {
    this.setState({
      modalInser: !this.state.modalInser
    });
  }

  async componentDidMount() {
    await fetch('http://localhost:5000/medicamentos/')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            medicamentos: result
          });
        }
      )
  }

  seleccionarPaciente() {
    document.getElementById('formOcul').style.visibility = 'visible';
  }
  terminarVisita() {
    document.getElementById('formOcul').style.visibility = 'hidden';
  }

  cancelar() {


    this.mostarInser();

  }
  render() {
    return (
        
      <div className="total">
        <div className="header mt-2 text-center " id="login"><h2 className="Titulo m-2 " >Registrar Visita</h2></div>
        <div className="conteneT mt-2">
          <div className="contene ml-5">
            <div className="mt-3" >
              <Form className="contenido mt-2" >

                <div className="form mt-3  "  >

                  <Label className="mt-3 font-weight-bold">Registrar Visita del Paciente :</Label>

                  <FormGroup className="ml-3 mr-3 mt-2" >
                    <Input className="mt-4" id="personas"

                      className="form-control"
                      name="personas"
                      type="select"
                      bsSize="md" >
                      <option>Pacientes</option>

                    </Input>
                  </FormGroup>

                  <div className="footer mb-1">
                    <Button className="mb-3" size="lg" color='primary' onClick={() => this.seleccionarPaciente()} >
                      Registrar Visita
                                        </Button>

                  </div>

                </div>
              </Form>
            </div>

            <div className="formD mt-3 ">
              <Label className="ml-3 mr-3 mt-3 font-weight-bold">Informacion Doctor</Label>
              <FormGroup className="inputF ml-3 mr-3 mt-3">
                <Label className="font-weight-bold"> Id Doctor: </Label>
                <Input id="identificacion"

                  className="form-control"
                  name="identificacion"
                  type="text"
                  value={this.props.tipodD +' :    '+ this.props.numerdD}
                  bsSize="md" readOnly>


                </Input>
              </FormGroup>
              <FormGroup className="inputF ml-3 mr-3 mt-3 mt-3" >
                <Label className="font-weight-bold"> Entidad de Salud: </Label>
                <Input id="entidadS"

                  className="form-control"
                  name="entidadS"
                  type="text"
                  value={this.props.eps}
                  bsSize="md" readOnly >


                </Input>
              </FormGroup>

            </div>
          </div>
          <div className="formularioP">
            <div className="contieneFP" id="formOcul">
              <div className="datosP mt-4 mb-2">
                <Label className="ml-3 mr-3 mt-3 font-weight-bold">Informacion del Paciente</Label>
                <FormGroup className="inputF ml-3 mr-3 mt-3">
                  <Label className="font-weight-bold"> Nombre del Paciente </Label>
                  <Input id="nombreP"

                    className="form-control"
                    name="nombreP"
                    type="text"
                    bsSize="md" readOnly>


                  </Input>
                </FormGroup>
                <FormGroup className="inputF ml-3 mr-3 mt-3">
                  <Label className="font-weight-bold"> Identificacion del Paciente </Label>
                  <Input id="identificacionP"

                    className="form-control"
                    name="identificacionP"
                    type="text"
                    bsSize="md" readOnly>


                  </Input>
                </FormGroup>
                <FormGroup className="inputF ml-3 mr-3 mt-3">
                  <Label className="font-weight-bold"> Dirrección del Paciente </Label>
                  <Input id="direccionP"

                    className="form-control"
                    name="direccionP"
                    type="text"
                    bsSize="md" readOnly>


                  </Input>
                </FormGroup>
                <Button id="bper" className="ml-3 mb-3 mt-4" size="lg" color='primary' onClick={() => this.mostarInser()} >
                  Visita
                                </Button>{' '}
                <Button id="bper" className="ml-3 mb-3 mt-4" size="lg" color='primary' onClick={() => this.terminarVisita()} >
                  Cancelar
                                        </Button>
              </div>
              <Modal
                size="md"
                centered isOpen={this.state.modalInser} id="insertar">
                <ModalHeader>
                  <div><h3>Registrar Visita</h3></div>
                </ModalHeader>
                <ModalBody>
                  <Form>
                    <div className="datosPM mt-2 mb-2">

                      <FormGroup className="inputF ml-3 mr-3 mt-3">
                        <div className="mensajeF">
                          <Label className="ocultoF font-weight-bold"> Fecha de la Visita </Label>
                          <Input id="fechaV"

                            className="form-control"
                            name="fechaV"
                            type="date"
                            bsSize="md" >
                          </Input>
                        </div>
                      </FormGroup>
                      <FormGroup className="inputF ml-3 mr-3 mt-3">
                        <div className="mensajeH">
                          <Label className="ocultoH font-weight-bold"> Hora de la Visita </Label>
                          <Input id="horaV"

                            className="form-control"
                            name="horaV"
                            type="time"
                            bsSize="md" >
                          </Input>
                        </div>
                      </FormGroup>
                      <FormGroup className="inputF ml-3 mr-3 mt-3">

                        <Input id="temperatura"
                          placeholder="Temperatura Del Paciente °C"
                          className="form-control"
                          name="temperatura"
                          type="number"
                          step=".0"
                          bsSize="md">
                        </Input>
                      </FormGroup>
                      <FormGroup className="inputF ml-3 mr-3 mt-3">

                        <Input id="peso"
                          placeholder="Peso Kg"
                          className="form-control"
                          name="peso"
                          type="text"
                          bsSize="md" >
                        </Input>
                      </FormGroup>

                      <FormGroup className="inputF ml-3 mr-3 mt-3">

                        <Input id="presionA"
                          placeholder="Presión Arterial"
                          className="form-control"
                          name="presionA"
                          type="text"
                          bsSize="md" >
                        </Input>
                      </FormGroup>
                      <FormGroup className="inputF ml-3 mr-3 mt-3">
                        <div className="mensajeM">
                          <Label className="ocultoM font-weight-bold"> Medicamento </Label>
                          <Input id="medicamento"

                            className="form-control"
                            name="medicamento"
                            type="select"
                            bsSize="md"
                            selectedIndex={this.state.medicamento}>
                            <option>Medicamento</option>
                            {this.state.medicamentos.map(med => (
                              <option value={med.idmedicamento}>
                                {med.medicamento}
                              </option>
                            ))}
                          </Input>
                        </div>
                      </FormGroup>
                      <FormGroup className="inputF ml-3 mr-3 mt-3">

                        <Input id="dosis"
                          placeholder="Dosis Diaria"
                          className="form-control"
                          name="dosis"
                          type="text"
                          bsSize="md" >

                        </Input>
                      </FormGroup>
                      <FormGroup className="inputF ml-3 mr-3 mt-3">
                        <InputGroup>

                          <FormControl as="textarea" placeholder="Observación" aria-label="Observación" />
                        </InputGroup>
                      </FormGroup>


                    </div>
                  </Form>
                </ModalBody>
                <ModalFooter >
                  <Button color="success" >Registrar Visita</Button>
                  <Button color="danger" onClick={() => this.cancelar()} >Cancelar</Button>
                </ModalFooter>
              </Modal>


            </div>
          </div>
        </div>
      </div>


    );
  }
}

