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
      modalInser: false,
      idperso: '',
      //Direccion
      viaP: null,
      selViaP: [],
      numViaP: '',
      numViaS: '',
      numCasa: '',
      tipoInm: null,
      selTipoInm: [],
      comTipoInm: '',
      bloqueInt: null,
      selBloqueInt: [],
      comBloqueInt: '',

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
      email: this.state.email.filter(mail => mail !== valor)
    });
  }

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
      telefono: this.state.telefono.filter(tele => tele !== valor)
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

    await fetch('http://localhost:5000/viap/')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            selViaP: result
          });
        }
      )

    await fetch('http://localhost:5000/inmueble/')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            selTipoInm: result
          });
        }
      )

    await fetch('http://localhost:5000/bloque/')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            selBloqueInt: result
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
    var barrio = this.state.barrio;

    // Direccion

    var idviaprincipal = this.state.viaP;
    var numeroviap = this.state.numViaP;
    var numerovias = this.state.numViaS;
    var numerocasa = this.state.numCasa;
    var idtipoinmueble = this.state.tipoInm;
    var idbloqueinterior = this.state.bloqueInt;
    var numeroinmueble = this.state.comTipoInm;
    var numerobloque = this.state.comBloqueInt;

    const body = { nombre, apellido, tipodoc, numerodoc, barrio, fechanaci };

    await fetch('http://localhost:5000/persona',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

    await fetch(`http://localhost:5000/personaiden/${numerodoc}`)
      .then(response => response.json())
      .then(usua => {
        this.setState({
          idperso: usua[0].idpersona
        })
      });


    var idpersona = this.state.idperso

    const bodyD = { idviaprincipal, idpersona, numeroviap, numerovias, numerocasa, idtipoinmueble, idbloqueinterior, numeroinmueble, numerobloque }

    await fetch(`http://localhost:5000/direccion/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyD)
    });

    if (this.state.email.length > 0) {
      for (var i = 0; i < this.state.email.length; i++) {
        var email = this.state.email[i];
        let body = { email, idpersona }
        await fetch('http://localhost:5000/email',
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });

      }
    }

    if (this.state.telefono.length > 0) {
      for (var i = 0; i < this.state.telefono.length; i++) {
        var telefono = this.state.telefono[i];
        let body = { telefono, idpersona }
        await fetch('http://localhost:5000/telefono',
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });

      }
    }

    await Swal.fire({
      icon: 'success',
      title: `Se ha agregado la Persona ${nombre} ${apellido}`,
      showConfirmButton: false,
      timer: 1500
    })

  
    this.cancelar();

  }



  cancelar() {
    this.setState({
      nombre: '',
      apellido: '',
      identificacion: '',
      telefono : [],
      email : [],
      numViaP: '',
      numViaS: '',
      numCasa: '',
      comTipoInm: '',
      comBloqueInt: '',
      fechaN : '',
    })

    this.mostarInser();

  }
  validaInmBlo() {
    const tipoInm = document.getElementById('tipoInm').selectedIndex;
    const comTipoInm = document.getElementById('comTipoInm').value;
    const bloqueInt = document.getElementById('bloqueInt').selectedIndex;
    const comBloqueInt = document.getElementById('comBloqueInt').value;

    if (tipoInm === 0 && comTipoInm === '') {
      if (bloqueInt === 0 && comBloqueInt === '') {
        return true
      }
      else if (bloqueInt !== 0 && comBloqueInt !== '') {
        return true
      }
    }
    else if (tipoInm !== 0 && comTipoInm !== '') {
      if (bloqueInt === 0 && comBloqueInt === '') {
        return true
      }
      else if (bloqueInt !== 0 && comBloqueInt !== '') {
        return true
      }
    } else {
      return false
    }

  }

  superValidacion() {
    const nom = document.getElementById('nombre').value.trim();
    const apell = document.getElementById('apellido').value.trim();
    const tipod = document.getElementById('tipodoc').selectedIndex;
    const doc = document.getElementById('identificacion').value.trim();
    const barr = document.getElementById('barrio').selectedIndex;
    const fecha = document.getElementById('fechaN').value;
    const viaP = document.getElementById('viaP').selectedIndex;
    const numViaP = document.getElementById('numViaP').value;
    const numViaS = document.getElementById('numViaS').value;
    const numCasa = document.getElementById('numCasa').value;


    var ft = new Date(fecha)
    ft.setDate(ft.getDate() + 1);
    if (nom !== "" && nom.length <= 20) {
      document.getElementById('snombre').style.display = 'none';
      if (apell !== "" && apell.length <= 30) {
        document.getElementById('sapellido').style.display = 'none';
        if (tipod !== 0) {
          document.getElementById('stipodoc').style.display = 'none';
          if (doc !== "" && doc.length <= 30) {
            document.getElementById('sidentificacion').style.display = 'none';
            if (barr !== 0) {
              document.getElementById('sbarrio').style.display = 'none';
              if (ft <= new Date()) {
                document.getElementById('sfechaN').style.display = 'none';

                if (viaP !== 0 && numViaP !== '' && numViaS !== '' && numCasa !== '') {
                  document.getElementById('sdireccion').style.display = 'none';
                  if (this.validaInmBlo()) {
                    document.getElementById('sinm').style.display = 'none';
                    this.crearPerso();
                  } else {
                    document.getElementById('sinm').style.display = 'contents';
                  }
                } else {
                  document.getElementById('sdireccion').style.display = 'contents';
                }
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
          Crear Persona <i class="fa fa-user-plus" aria-hidden="true"></i>
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
                      <option selected="true" disabled="disabled">Tipo de Documento</option>
                      {this.state.tiposdoc.map(tipo => (
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
                <div className="mb-3">
                  <FormGroup  >
                    <div className="mensajeD">
                      <p className="ocultoD">Dirección</p>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <Input id="viaP"

                            className="form-control"
                            name="viaP"
                            type="select"
                            bsSize="md"
                            selectedIndex={this.state.viaP}
                            onChange={this.handleChange}>
                            <option selected="true" disabled="disabled">Via Principal</option>
                            {this.state.selViaP.map(via => (
                              <option value={via.idviaprincipal}>
                                {via.nombrevia}
                              </option>
                            ))}
                          </Input>
                        </InputGroupAddon>
                        <Input id="numViaP"

                          className="form-control"
                          name="numViaP"
                          type="text"
                          bsSize="md"
                          value={this.state.numViaP}
                          onChange={this.handleChange} />
                        <h4 className='ml-1 mr-1 mt-1'> # </h4>
                        <Input id="numViaS"

                          className="form-control"
                          name="numViaS"
                          type="text"
                          bsSize="md"
                          value={this.state.numViaS}
                          onChange={this.handleChange} />
                        <h4 className='ml-1 mr-1 mt-1'> -  </h4>
                        <Input id="numCasa"

                          className="form-control"
                          name="numCasa"
                          type="text"
                          bsSize="md"
                          value={this.state.numCasa}
                          onChange={this.handleChange} />
                      </InputGroup>
                    </div>
                  </FormGroup>
                  <span className="span" id="sdireccion">Debe Ingresar una Direccion Valida</span>
                </div>
                <div className="mb-3" >
                  <FormGroup >
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Input
                          id="tipoInm"
                          type="select"

                          className="form-control"
                          name="tipoInm"
                          bsSize="md"
                          selectedIndex={this.state.tipoInm}
                          onChange={this.handleChange}
                        >
                          <option>Tipo de Inmueble</option>
                          {this.state.selTipoInm.map(inm => (
                            <option value={inm.idtipoinmueble}>
                              {inm.nombreinmueble}
                            </option>
                          ))}

                        </Input>
                      </InputGroupAddon>
                      <Input id="comTipoInm"
                        placeholder='Num'
                        className="form-control"
                        name="comTipoInm"
                        type="text"
                        bsSize="md"
                        value={this.state.comTipoInm}
                        onChange={this.handleChange} />

                    </InputGroup>
                  </FormGroup>
                </div>
                <div className="mb-3" >
                  <FormGroup >
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Input
                          id="bloqueInt"
                          type="select"

                          className="form-control"
                          name="bloqueInt"
                          bsSize="md"
                          selectedIndex={this.state.bloqueInt}
                          onChange={this.handleChange}

                        >
                          <option>Bloque o Interior</option>
                          {this.state.selBloqueInt.map(blo => (
                            <option value={blo.idbloqueinterior}>
                              {blo.nombrebloqueoint}
                            </option>
                          ))}

                        </Input>
                      </InputGroupAddon>
                      <Input id="comBloqueInt"
                        placeholder='Num'
                        className="form-control"
                        name="comBloqueInt"
                        type="text"
                        bsSize="md"
                        value={this.state.comBloqueInt}
                        onChange={this.handleChange} />
                    </InputGroup>
                  </FormGroup>
                  <span className="span" id="sinm">No debe dejar Campos Incompletos</span>
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