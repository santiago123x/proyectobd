import React from 'react';
import { Form, Input, FormGroup, Button, Label, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup } from 'reactstrap';
import './style.scss';
import { FormControl } from 'react-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';



export default class Registro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalInser: false,
      medicamentos: [],
      pacientes: [],
      paciente: null,

      //Form Paciente
      nombreP: '',
      direccionP: '',
      edadP: '',

      //Info Modal Visita
      fechaV: null,
      horaV: null,
      temperatura: '',
      peso: null,
      presionA: '',
      medicamento: null,
      dosis: '',
      obs: '',
      idDoc: props.idDoc,




    }
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

    await fetch('http://localhost:5000/pacientes/')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            pacientes: result
          });
        }
      )
  }

  seleccionarPaciente() {

    if (document.getElementById('paciente').selectedIndex != 0) {
      var nombre = null;
      var año = null;
      var mes = null;
      var dia = null;
      var direccion = '';
      var hoy = new Date();
      var añoAc = hoy.getFullYear();
      var mesAc = (hoy.getMonth() + 1);
      var diaAc = hoy.getDate();
      const index = document.getElementById('paciente').selectedIndex - 1;

      nombre = this.state.pacientes[index].nombre + ' ' + this.state.pacientes[index].apellido;
      direccion = this.state.pacientes[index].nombrevia + ' ' + this.state.pacientes[index].numeroviap + ' # ' +
        this.state.pacientes[index].numerovias + ' - ' + this.state.pacientes[index].numerocasa;
      dia = parseInt(this.state.pacientes[index].fechanaci.substr(8, 2));
      mes = parseInt(this.state.pacientes[index].fechanaci.substr(5, 2));
      año = añoAc - this.state.pacientes[index].fechanaci.substr(0, 4);


      if (mesAc > mes) {
        año += -1;
      }
      else if (mesAc === mes) {
        if (diaAc < dia) {
          año += -1;
        }
      }


      if (año < 0) {
        año = 0;
      }

      this.setState({
        nombreP: nombre,
        direccionP: direccion,
        edadP: año
      });

      document.getElementById('formOcul').style.visibility = 'visible';

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seleccione un Paciente.',
      });
    }

  }


  terminarVisita() {
    document.getElementById('formOcul').style.visibility = 'hidden';

    this.setState({
      nombreP: '',
      direccionP: '',
      edadP: ''
    })
  }

  //Crear Visita

  async crearVisita() {

    var fecha = this.state.fechaV;
    var hora = this.state.horaV;
    var temp = this.state.temperatura;
    var peso = this.state.peso;
    var presion = this.state.presionA;
    var medi = this.state.medicamento;
    var dosis = this.state.dosis;
    var obs = this.state.obs;
    var idDoc = this.props.idDoc;
    var idPac = this.state.paciente;

    const body = { idDoc, idPac, fecha, hora, temp, peso, presion, medi, dosis, obs }

    await fetch(`http://localhost:5000/visita/`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

    await Swal.fire({
      icon: 'success',
      title: `Se ha agregado la Visita al Paciente ${this.state.nombreP}`,
      showConfirmButton: false,
      timer: 2000
    });

    this.cancelar();
  }



  validacion() {
    const fecha = document.getElementById('fechaV').value;
    const hora = document.getElementById('horaV').value;
    const temp = document.getElementById('temperatura').value.trim();
    const peso = document.getElementById('peso').value;
    const pres = document.getElementById('presionA').value.trim();
    const medica = document.getElementById('medicamento').selectedIndex;
    const dosis = document.getElementById('dosis').value.trim();
    const obs = document.getElementById('obs').value.trim();

    var ft = new Date(fecha)
    ft.setDate(ft.getDate() + 1);

    if (ft <= new Date()) {
      document.getElementById('sfechaV').style.display = 'none';
      if (hora !== '') {
        document.getElementById('shoraV').style.display = 'none';
        if (temp !== '') {
          document.getElementById('stemperatura').style.display = 'none';
          if (peso !== '') {
            document.getElementById('speso').style.display = 'none';
            if (pres !== '') {
              document.getElementById('spresionA').style.display = 'none';
              if (medica !== 0) {
                document.getElementById('smedicamento').style.display = 'none';
                if (dosis !== '') {
                  document.getElementById('sdosis').style.display = 'none';
                  if (obs !== '') {
                    document.getElementById('sobs').style.display = 'none';
                    this.crearVisita();
                  } else {
                    document.getElementById('sobs').style.display = 'contents';
                  }
                } else {
                  document.getElementById('sdosis').style.display = 'contents';
                }
              } else {
                document.getElementById('smedicamento').style.display = 'contents';
              }
            } else {
              document.getElementById('spresionA').style.display = 'contents';
            }
          } else {
            document.getElementById('speso').style.display = 'contents';
          }
        } else {
          document.getElementById('stemperatura').style.display = 'contents';
        }
      } else {
        document.getElementById('shoraV').style.display = 'contents';
      }
    } else {
      document.getElementById('sfechaV').style.display = 'contents';
    }

  }

  cancelar() {

    this.mostarInser();

    this.setState({
      fechaV: null,
      horaV: null,
      temperatura: '',
      peso: null,
      presionA: '',
      medicamento: null,
      dosis: '',
      obs: '',
    });

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
                    <Input className="mt-4" id="paciente"

                      className="form-control"
                      name="paciente"
                      type="select"
                      bsSize="md" 
                      value={this.state.paciente}
                      onChange={this.handleChange}>
                      <option selected="true" disabled="disabled">Pacientes</option>
                      {this.state.pacientes.map(pac => (
                        <option value={pac.idpaciente}>
                          {pac.nombre} {pac.apellido} - {pac.numerodoc}
                        </option>
                      ))}

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

                  className="form-control text-center"
                  name="identificacion"
                  type="text"
                  value={this.props.tipodD + ' :    ' + this.props.numerdD}
                  bsSize="md" readOnly>


                </Input>
              </FormGroup>
              <FormGroup className="inputF ml-3 mr-3 mt-3 mt-3" >
                <Label className="font-weight-bold"> Entidad de Salud: </Label>
                <Input id="entidadS"

                  className="form-control text-center"
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

                    className="form-control text-center"
                    name="nombreP"
                    type="text"
                    value={this.state.nombreP}
                    bsSize="md" readOnly>


                  </Input>
                </FormGroup>
                <FormGroup className="inputF ml-3 mr-3 mt-3">
                  <Label className="font-weight-bold"> Edad del Paciente </Label>
                  <Input id="edadP"

                    className="form-control text-center"
                    name="edadP"
                    type="text"
                    value={this.state.edadP}
                    bsSize="md" readOnly>


                  </Input>
                </FormGroup>
                <FormGroup className="inputF ml-3 mr-3 mt-3">
                  <Label className="font-weight-bold"> Dirrección del Paciente </Label>
                  <Input id="direccionP"

                    className="form-control text-center"
                    name="direccionP"
                    type="text"
                    value={this.state.direccionP}
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
                            bsSize="md"
                            value={this.state.fechaV}
                            onChange={this.handleChange} >
                          </Input>
                          <span className="span" id="sfechaV">Debe Ingresar una Fecha valida</span>
                        </div>
                      </FormGroup>
                      <FormGroup className="inputF ml-3 mr-3 mt-3">
                        <div className="mensajeH">
                          <Label className="ocultoH font-weight-bold"> Hora de la Visita </Label>
                          <Input id="horaV"

                            className="form-control"
                            name="horaV"
                            type="time"
                            bsSize="md"
                            value={this.state.horaV}
                            onChange={this.handleChange} >
                          </Input>
                          <span className="span" id="shoraV">Debe Ingresar una Hora</span>
                        </div>
                      </FormGroup>
                      <FormGroup className="inputF ml-3 mr-3 mt-3">
                        <div>
                          <Input id="temperatura"
                            placeholder="Temperatura Del Paciente °C"
                            className="form-control"
                            name="temperatura"
                            type="number"
                            step=".0"
                            bsSize="md"
                            value={this.state.temperatura}
                            onChange={this.handleChange}>
                          </Input>
                          <span className="span" id="stemperatura">Debe Ingresar la Temperatura</span>
                        </div>
                      </FormGroup>
                      <FormGroup className="inputF ml-3 mr-3 mt-3">
                        <div>
                          <Input id="peso"
                            placeholder="Peso Kg"
                            className="form-control"
                            name="peso"
                            type="number"
                            bsSize="md"
                            value={this.state.peso}
                            onChange={this.handleChange} >
                          </Input>
                          <span className="span" id="speso">Debe Ingresar el Peso</span>
                        </div>
                      </FormGroup>

                      <FormGroup className="inputF ml-3 mr-3 mt-3">
                        <div>
                          <Input id="presionA"
                            placeholder="Presión Arterial"
                            className="form-control"
                            name="presionA"
                            type="text"
                            bsSize="md"
                            value={this.state.presionA}
                            onChange={this.handleChange} >
                          </Input>
                          <span className="span" id="spresionA">Debe Ingresar la Presion Arterial</span>
                        </div>
                      </FormGroup>
                      <FormGroup className="inputF ml-3 mr-3 mt-3">
                        <div className="mensajeM">
                          <Label className="ocultoM font-weight-bold"> Medicamento </Label>
                          <Input id="medicamento"

                            className="form-control"
                            name="medicamento"
                            type="select"
                            bsSize="md"
                            value={this.state.medicamento}
                            onChange={this.handleChange}
                            selectedIndex={this.state.medicamento}>
                            <option selected="true" disabled="disabled">Medicamento</option>
                            {this.state.medicamentos.map(med => (
                              <option value={med.idmedicamento}>
                                {med.medicamento}
                              </option>
                            ))}
                          </Input>
                          <span className="span" id="smedicamento">Debe Seleccionar un Medicamento</span>
                        </div>
                      </FormGroup>
                      <FormGroup className="inputF ml-3 mr-3 mt-3">
                        <div>
                          <Input id="dosis"
                            placeholder="Dosis Diaria"
                            className="form-control"
                            name="dosis"
                            type="text"
                            bsSize="md"
                            value={this.state.dosis}
                            onChange={this.handleChange} >

                          </Input>
                          <span className="span" id="sdosis">Debe Ingresar la Dosis</span>
                        </div>
                      </FormGroup>
                      <FormGroup className="inputF ml-3 mr-3 mt-3">
                        <div>
                          <InputGroup>

                            <FormControl
                              as="textarea"
                              placeholder="Observación"
                              aria-label="Observación"
                              bsSize="md"
                              className="form-control"
                              name="obs"
                              id="obs"
                              value={this.state.obs}
                              onChange={this.handleChange} />
                          </InputGroup>
                          <span className="span" id="sobs">Debe Ingresar una Observación</span>
                        </div>
                      </FormGroup>


                    </div>
                  </Form>
                </ModalBody>
                <ModalFooter >
                  <Button color="success" onClick={() => this.validacion()} >Registrar Visita</Button>
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

