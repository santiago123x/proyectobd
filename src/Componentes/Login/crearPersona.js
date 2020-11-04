import React from "react";
import { Button, ButtonGroup, Form, FormGroup,  Input, InputGroup, InputGroupAddon, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import "./syle.scss";

export class CrearPersona extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        nombre: '',
      apellido: '',
      barrio: null,
      identificacion: '',
      tipodoc: null,
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

     async  agregarEmail (){
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

    borrarEmail(){
        var valor = document.getElementById('email').value;
        
        this.setState({
            email: this.state.email.filter(mail => mail!=valor )
          });
    }

    tiene_letras(texto){
        var letras='abcdefghyjklmnñopqrstuvwxyz!"}#$%&+)@.,-{/(=?¡';
        texto = texto.toLowerCase();
        for(var i=0; i<texto.length; i++){
           if (letras.indexOf(texto.charAt(i),0)!=-1){
              return false;
           }
        }
        return true;
     }
    async  agregarTel (){
        var { value: tel } = await Swal.fire({
          title: 'Ingrese su Telefono',
          input: 'text',
          inputLabel: 'Su Telefono es : ',
          inputPlaceholder: 'Telefonos',
          showCancelButton: true,
          inputValidator: (value) => {
            return new Promise((resolve)=>{
              if ((value.length === 10 || value.length === 7 )&&this.tiene_letras(value)) {
                resolve()
              } else {
                resolve('Debe tener 10(Celular) o 7(Fijo)  Digitos y estos deben ser Numeros')
              }
            }
        
        )}
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

      borrarTel(){
        var valor = document.getElementById('telefono').value;
        
        this.setState({
            telefono: this.state.telefono.filter(tele => tele!=valor )
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
                        <div className="mensaje">
                            <p className="oculto">Fecha de Nacimiento</p>
                      <Input 
                        id="fechaN"
                        placeholder="date placeholder"
                        className="form-control"
                        name="fechaN"
                        bsSize="md"
                        type="date"

                        onChange={this.handleChange}
                      /> </div></FormGroup>
                  </div>
                  <div className="mb-3" >
                    <FormGroup >
                    <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <ButtonGroup>
                    <Button color="primary" onClick={() => this.agregarEmail()}><i class="fa fa-plus"/></Button>
                    <Button color="primary"onClick={() => this.borrarEmail()}><i class="fa fa-minus"/></Button>
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
                    <Button color="primary" onClick={() => this.agregarTel()}><i class="fa fa-plus"/></Button>
                    <Button color="primary" onClick={() => this.borrarTel()}><i class="fa fa-minus"/></Button>
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
              <Button color="success" >Registrar</Button>
              <Button color="danger" onClick={() => this.mostarInser()}>Cancelar</Button>
            </ModalFooter>
          </Modal></div>
          
        );
    }
}