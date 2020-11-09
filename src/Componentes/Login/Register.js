import React from "react";
import loginImg from "../../LOGIN.svg";
import { Button, Form, FormGroup, Input, InputGroup, InputGroupText, Row, Col } from "reactstrap";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { CrearPersona } from './crearPersona';


export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: '',
      contraseña: '',
      tipousuario: '',
      tipousuario2: '',
      idusu: [],
      codi: '',
      codigo: '4dm1n',
      personas: [],
      usuexi: false,
      yaregis: false,
      idperso: ''


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
        var tip = document.getElementById('tipousu').selectedIndex - 1;
        if (tip >= 0) {
          if (index >= 0) {
            if (!this.state.usuexi) {
              if (!this.state.yaregis) {
                var nickname = this.state.usuario;
                var contra = this.state.contraseña;
                var idpersona = document.getElementById('personas').value;
                var tipo_usu = document.getElementById('tipousu').value

                const body = { nickname, contra, idpersona, tipo_usu };
                console.log(body);
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
            } else {

              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ya existe un Usuario con este Nickname por favor seleccione otro.',
              })
            }
          } else {
            Swal.fire(
              'Debe seleccionar una Persona para Registrar',
              'O Ingresar una nueva Persona',
              'warning'
            )
          }

        } else {
          Swal.fire(
            'Debe seleccionar un Tipo de Usuario',
            'Para Realizar el Registro',
            'warning'
          )
        }
      } catch (err) {
        console.error(err.message);
      }
    }

  }



  mostrarForm() {
    if (this.state.codi === this.state.codigo) {
      document.getElementById('envioR').style.display = 'contents';
      document.getElementById('mevoy').style.display = 'none';
      document.getElementById('codigo').style.display = 'none';
      document.getElementById('en').style.display = 'none';

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Codigo de Admin no es Correcto'
      })
    }
  }


  render() {
    return (

      <div className="base-container " ref={this.props.containerRef}>
        <div className="header mb-1 mt-4" type="button" id="register"><h2 className="m-2" >Registro</h2></div>
        <div className="content "  >
          <div className="image">
            <img src={loginImg} />
          </div>

          <div id='epa' >
            <Form id='en'  >
              <div className="mb-1">
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
              <Button id='mevoy' onClick={() => this.mostrarForm()}>Verificar <i class="fa fa-lock" aria-hidden="true"></i></Button></Form>


            <Form id='envioR'  >
              <div id="regis" className="contRegis">
                <div className="mb-1">
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
                <div className="mb-1" >
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
                    <Input id="tipousu"

                      className="form-control"
                      name="tipousu"
                      type="select"
                      bsSize="md"
                      selectedIndex={this.state.tipousuario}
                      onChange={this.handleChange} >
                        <option>Tipo de Usuario</option>
                        <option value="super">Admin</option>
                        <option value="doctor">Doctor</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="mb-1">
                  <FormGroup  >
                    <Input id="personas"

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
                </div>
              </div>
              <div className="footer">
                <Row className="justify-content-md-center">
                  <Col >
                    <Button size="lg" color='primary' onClick={() => this.crearUsuario()} >
                      Registro <i class="fa fa-users" aria-hidden="true"></i>
              </Button>
                  </Col>

                  <Col>
                    <CrearPersona />
                  </Col>
                </Row>

              </div>
            </Form>

          </div>
        </div>

      </div>


    );
  }
}