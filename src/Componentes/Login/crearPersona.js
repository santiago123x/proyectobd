import React from "react";
import { Button, ButtonGroup, Form, FormGroup, Input, InputGroup, InputGroupAddon, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import "./syle.scss";

export class CrearPersona extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      apellido: '',
      barrio: '',
      identificacion: '',
      email: [],
      telefono: [],
      fechaN: '',
      barrios: [],
      tiposdoc: [],
      modalInser: false
      
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

  async agregarEmail() {
    var { value: email } = await Swal.fire({
      title: 'Ingrese su Email',
      input: 'email',
      inputLabel: 'Su Correo Electronico es : ',
      showCancelButton: true,
      inputPlaceholder: 'Email'

    })
    if (email) {
      var corritos = this.state.email
      corritos.push(email)
      this.setState({
        email: corritos
      });

      Swal.fire(`Email Ingresado: ${email}`)
    }
  }

  borrarEmail() {
    var valor = document.getElementById('email').value;

    this.setState({
      email: this.state.email.filter(mail => mail != valor)
    });
  }

  tiene_letras(texto) {
    var letras = 'abcdefghyjklmnñopqrstuvwxyz!"}#$%&+)@.,-{/(=?¡';
    texto = texto.toLowerCase();
    for (var i = 0; i < texto.length; i++) {
      if (letras.indexOf(texto.charAt(i), 0) != -1) {
        return false;
      }
    }
    return true;
  }
  async agregarTel() {
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
    if (tel && tel.length <= 10) {
      var corritos = this.state.telefono
      corritos.push(tel)
      this.setState({
        telefono: corritos
      });

      Swal.fire(`Telefono Ingresado: ${tel}`)
    }
  }

  borrarTel() {
    var valor = document.getElementById('telefono').value;

    this.setState({
      telefono: this.state.telefono.filter(tele => tele != valor)
    });
  }
  async componentDidMount() {
    await fetch('http://localhost:5000/tipodoc/')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            tiposdoc: result
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
  mostarInser() {
    this.setState({
      modalInser: !this.state.modalInser
    });
  }

  async crearPerso() {


    var nombre = this.state.nombre;
    var apellido = this.state.apellido;
    var numerodoc = this.state.identificacion;
    var tipodoc = document.getElementById('tipodoc').selectedIndex;
    var fechanaci = this.state.fechaN;
    var barrio = this.state.barrios[document.getElementById('barrio').selectedIndex - 1].id_barrio;

    console.log(nombre, apellido, tipodoc, numerodoc, barrio, fechanaci)
    const body = { nombre, apellido, tipodoc, numerodoc, barrio, fechanaci };

    /*await fetch('http://localhost:5000/persona',
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body)
                });*/

    await fetch(`http://localhost:5000/personaiden/${this.state.identificacion}`)
      .then(response => response.json())
      .then(usua => {
        
        if (usua.length === 0) {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No existe un usuario con ese nick',

          })

        } else {

          let usu = usua[0];

          if (usu.contraseña === this.state.contraseña) {

            Swal.fire({
              icon: 'success',
              title: 'Bienvenido ' + usu.nickname,
              showConfirmButton: false,
              timer: 1500
            })
            this.state.idusu = usu;
          } else

            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Contraseña invalida intente de nuevo',

            })
        }
      });


  }

  cancelar() {
    this.state.nombre = ''
    this.state.apellido = ''
    this.state.identificacion = ''
    this.state.telefono = []
    this.state.email = []

    this.mostarInser();

  }

  superValidacion() {
    const nom = document.getElementById('nombre').value.trim();
    const apell = document.getElementById('apellido').value.trim();
    const tipod = document.getElementById('tipodoc').selectedIndex;
    const doc = document.getElementById('identificacion').value.trim();
    const barr = document.getElementById('barrio').selectedIndex;
    const fecha = document.getElementById('fechaN').value;
    var ft = new Date(fecha)
    ft.setDate(ft.getDate() + 1);
    if (nom != "" && nom.length <= 20) {
      document.getElementById('snombre').style.display = 'none';
      if (apell != "" && apell.length <= 30) {
        document.getElementById('sapellido').style.display = 'none';
        if (tipod != 0) {
          document.getElementById('stipodoc').style.display = 'none';
          if (doc != "" && doc.length <= 30) {
            document.getElementById('sidentificacion').style.display = 'none';
            if (barr != 0) {
              document.getElementById('sbarrio').style.display = 'none';
              if (ft <= new Date()) {
                document.getElementById('sfechaN').style.display = 'none';
                this.crearPerso();
              } else {
                document.getElementById('sfechaN').style.display = 'contents';
              }

            } else {
              document.getElementById('sbarrio').style.display = 'contents';
            }
          } else {
            document.getElementById('sidentificacion').style.display = 'contents';
          }
        } else {
          document.getElementById('stipodoc').style.display = 'contents';
        }
      } else {
        document.getElementById('sapellido').style.display = 'contents';
      }
    } else {
      document.getElementById('snombre').style.display = 'contents';
    }
  }

  render() {
    return (
      <div className="base-container" id="persona" ref={this.props.containerRef}>



        <Button id="bper" className="ml-3" size="lg" color='primary' onClick={() => this.mostarInser()} >
          Crear Persona
        </Button>

        <Modal
          size="md"
          centered isOpen={this.state.modalInser} id="insertar">
          <ModalHeader>
            <div><h3>Registrar Persona</h3></div>
          </ModalHeader>
          <ModalBody>
            <Form>
              <div id="regisM" className="contRegisM">
                <div className="mb-3">
                  <FormGroup  >
                    <Input id="nombre"
                      placeholder="Nombre"
                      className="form-control"
                      name="nombre"
                      bsSize="md"
                      type="text"
                      value={this.state.nombre}
                      onChange={this.handleChange} />
                  </FormGroup>
                  <span className="span" id="snombre">Debe Ingresar un Nombre</span>
                </div>
                <div className="mb-3">
                  <FormGroup  >

                    <Input id="apellido"
                      placeholder="Apellido"
                      className="form-control"
                      name="apellido"
                      type="text"
                      bsSize="md"
                      value={this.state.apellido}
                      onChange={this.handleChange} />
                  </FormGroup>
                  <span className="span" id="sapellido">Debe Ingresar un Apellido</span>
                </div>
                <div className="mb-3">
                  <FormGroup  >
                    <Input id="tipodoc"
                      className="form-control"
                      name="identtipodocifacion"
                      type="select"
                      bsSize="md"
                      onChange={this.handleChange}>
                      <option>Tipo de Documento</option>
                      {this.state.tiposdoc.map(tipo => (
                        <option key={tipo.idtipo}>
                          {tipo.tipodocument}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <span className="span" id="stipodoc">Seleccione un Tipo de Documento valido</span>
                </div>
                <div className="mb-3">
                  <FormGroup  >

                    <Input id="identificacion"
                      placeholder="Identificación"
                      className="form-control"
                      name="identificacion"
                      type="text"
                      bsSize="md"
                      value={this.state.identificacion}
                      onChange={this.handleChange} />
                  </FormGroup>
                  <span className="span" id="sidentificacion">Debe Ingresar una Identificación Valida</span>
                </div>
                <div className="mb-3">
                  <FormGroup  >
                    <Input id="barrio"
                      placeholder="Barrio"
                      className="form-control"
                      name="barrio"
                      type="select"
                      bsSize="md"
                      selectedIndex={this.state.barrio}
                      onChange={this.handleChange}>
                      <option>Barrios</option>
                      {this.state.barrios.map(bar => (
                        <option key={bar.id_barrio}>
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
                        id="fechaN"
                        placeholder="date placeholder"
                        className="form-control"
                        name="fechaN"
                        bsSize="md"
                        type="date"
                        value={this.state.fechaN}
                        onChange={this.handleChange}
                      /> </div></FormGroup>
                  <span className="span" id="sfechaN">Debe Ingresar una Fecha Valida</span>
                </div>
                <div className="mb-3" >
                  <FormGroup >
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <ButtonGroup>
                          <Button color="primary" onClick={() => this.agregarEmail()}><i class="fa fa-plus" /></Button>
                          <Button color="primary" onClick={() => this.borrarEmail()}><i class="fa fa-minus" /></Button>
                        </ButtonGroup>
                      </InputGroupAddon>
                      <Input
                        id="email"
                        type="select"
                        placeholder="Email"
                        className="form-control"
                        name="email"
                        bsSize="md"

                      >
                        <option>Email</option>
                        {this.state.email.map(mail => (
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
                          <Button color="primary" onClick={() => this.agregarTel()}><i class="fa fa-plus" /></Button>
                          <Button color="primary" onClick={() => this.borrarTel()}><i class="fa fa-minus" /></Button>
                        </ButtonGroup>
                      </InputGroupAddon>
                      <Input
                        id="telefono"
                        placeholder="Telefono"
                        className="form-control"
                        name="telefono"
                        bsSize="md"
                        type="select">

                        <option>Telefonos</option>
                        {this.state.telefono.map(tel => (
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
            <Button color="success" onClick={() => this.superValidacion()}>Registrar</Button>
            <Button color="danger" onClick={() => this.cancelar()}>Cancelar</Button>
          </ModalFooter>
        </Modal></div>

    );
  }
}