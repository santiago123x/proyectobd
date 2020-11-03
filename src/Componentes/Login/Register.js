import React from "react";
import loginImg from "../../LOGIN.svg";
import { Button, Form, FormGroup, Label, Input, InputGroup, InputGroupText, FormFeedback, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      apellido: '',
      usuario: '',
      contraseña: '',
      barrio: null,
      tipousuario: 'super',
      identificacion: '',
      tipodoc: null,
      email: [],
      telefono: [],
      fechaN: '',
      idusu: [],
      barrios: [],
      tiposdoc: [],
      codi: '',
      codigo: '4dm1n',
      modalInser: false,
      personas: [],
      usuexi: false,
      yaregis: false

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


  async validainfo() {

    await fetch(`http://localhost:5000/usuario/${this.state.usuario}`)
      .then(response => response.json())
      .then(usua => {
        if (usua.length === 0) {
          this.setState({
            usuexi: false
          });
        } else {
          this.setState({
            usuexi: true
          });
        }
      });
    var index = document.getElementById('personas').selectedIndex - 1;
    
    if (index >= 0) {
    var idpersona = this.state.personas[index].idpersona
    await fetch(`http://localhost:5000/usuario2/${idpersona}`)
      .then(response => response.json())
      .then(usua => {
        if (usua.length === 0) {
          this.setState({
            yaregis: false
          });
        } else {
          this.setState({
            yaregis: true
          });
        }
      });
    }
  }

  async crearUsuario() {

    this.validainfo();
    if (window.confirm(`Desea agregar el Usuario:  ${this.state.usuario}`)) {
      try {
        var index = document.getElementById('personas').selectedIndex - 1;
        if (index >= 0) {
          if (!this.state.usuexi) {
            if (!this.state.yaregis) {
              var nickname = this.state.usuario;
              var contra = this.state.contraseña;
              var idpersona = this.state.personas[index].idpersona;
              var tipo_usu = this.state.tipousuario;

              const body = { nickname, contra, idpersona, tipo_usu };

              await fetch('http://localhost:5000/usuario',
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body)
                });
              Swal.fire({
                icon: 'success',
                title: `Se ha agregado el Usuario con NickName ${this.state.usuario}`,
                showConfirmButton: false,
                timer: 1500
              })
              window.location.reload();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ya existe un Usuario asociado a esta Persona.',
              })
            }
          } else
            
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ya existe un Usuario con este Nickname por favor seleccione otro.',
          })
        } else {
          Swal.fire(
            'Debe seleccionar una Persona para Registrar',
            'O Ingresar una nueva Persona',
            'warning'
          )
        }

      } catch (err) {
        console.error(err.message);
      }
    }

  }



  mostrarForm() {
    if (this.state.codi == this.state.codigo) {
      document.getElementById('envioR').style.visibility = 'visible';
      document.getElementById('mevoy').style.visibility = 'hidden';
      document.getElementById('codigo').style.visibility = 'hidden';
      document.getElementById('en').style.display = 'none';

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Codigo de Admin no es Correcto'
      })
    }
  }
  mostarInser() {
    this.setState({
      modalInser: !this.state.modalInser
    });
  }

  render() {
    return (

      <div className="base-container " ref={this.props.containerRef}>
        <div className="header mb-3 mt-4" type="button" id="register"><h2 className="m-2" >Registro</h2></div>
        <div className="content "  >
          <div className="image">
            <img src={loginImg} />
          </div>

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
                  </div>
                  <div >
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
                  </div>
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
                  <div >
                    <FormGroup  >

                      <Input id="identifacion"
                        placeholder="Identifacion"
                        className="form-control"
                        name="identifacion"
                        type="text"
                        bsSize="md"
                        value={this.state.identifacion}
                        onChange={this.handleChange} />
                    </FormGroup>
                  </div>
                  <div className="mb-3">
                    <FormGroup  >
                      <Input id="barrio"
                        placeholder="Barrio"
                        className="form-control"
                        name="barrio"
                        type="select"
                        bsSize="md"
                        onChange={this.handleChange}>
                        <option>Barrios</option>
                        {this.state.barrios.map(bar => (
                          <option key={bar.id_barrio}>
                            {bar.nombre}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </div>

                  <div className="mb-3" >
                    <FormGroup  >

                      <Input
                        id="fechaN"
                        placeholder="date placeholder"
                        className="form-control"
                        name="fechaN"
                        bsSize="md"
                        type="date"

                        onChange={this.handleChange}
                      /> </FormGroup>
                  </div>
                  <div className="mb-3" >
                    <FormGroup  >

                      <Input
                        id="email"
                        placeholder="Email"
                        className="form-control"
                        name="email"
                        bsSize="md"
                        type="email"

                        onChange={this.handleChange}
                      /> </FormGroup>
                  </div>
                  <div className="mb-3" >
                    <FormGroup  >

                      <Input
                        id="telefono"
                        placeholder="Telefono"
                        className="form-control"
                        name="telefono"
                        bsSize="md"
                        type="text"

                        onChange={this.handleChange}
                      /> </FormGroup>
                  </div>
                </div>
              </Form>
            </ModalBody>
            <ModalFooter >
              <Button color="success" >Registrar</Button>
              <Button color="danger" onClick={() => this.mostarInser()}>Cancelar</Button>
            </ModalFooter>
          </Modal>
          <div id='epa' >
            <Form id='en'  >
              <div className="mb-3">
                <FormGroup  >

                  <Input id="codigo"
                    placeholder="Codigo"
                    className="form-control"
                    name="codi"
                    type="text"
                    bsSize="sm"
                    value={this.state.codi}
                    onChange={this.handleChange} />
                </FormGroup></div>
              <Button id='mevoy' onClick={() => this.mostrarForm()}>Verificar</Button></Form>
            <Form id='envioR'  >
              <div id="regis" className="contRegis">
                <div className="mb-3">
                  <FormGroup  >
                    <InputGroup>
                      <InputGroupText><i class="fa fa-user"></i></InputGroupText>
                      <Input id="usuario"
                        placeholder="Usuario"
                        className="form-control"
                        name="usuario"
                        type="text"
                        bsSize="md"
                        value={this.state.usuario}
                        onChange={this.handleChange} /></InputGroup>
                  </FormGroup>
                </div>
                <div className="mb-3" >
                  <FormGroup  >
                    <InputGroup>
                      <InputGroupText><i class="fa fa-lock"></i></InputGroupText>
                      <Input
                        id="contraseña"
                        placeholder="Contraseña"
                        className="form-control"
                        name="contraseña"
                        type="password"
                        bsSize="md"
                        value={this.state.contraseña}
                        onChange={this.handleChange}
                      /></InputGroup> </FormGroup>
                </div>
                <div className="mb-1">
                  <FormGroup  >
                    <Input id="personas"

                      className="form-control"
                      name="personas"
                      type="select"
                      bsSize="md" >
                      <option>Personas</option>
                      {this.state.personas.map(per => (
                        <option key={per.idpersona}>
                          {per.nombre}  {per.apellido} {per.numerodoc}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </div>
              </div>
              <div className="footer">
                <Button size="lg" color='primary' onClick={() => this.crearUsuario()} >
                  Registro
              </Button>
                <Button className="ml-3" size="lg" color='primary' onClick={() => this.mostarInser()} >
                  Crear Persona
              </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>

    );
  }
}