import React from "react";
import loginImg from "../../LOGIN.svg";
import { Redirect } from "react-router-dom";
import { Button, Form, FormGroup, InputGroup, InputGroupText,  Input } from "reactstrap";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            contraseña: '',
            idusu: [],
            algo:false,
            usu: null,
            redirect: null,
            tipou:'',

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





    async login() {
        try {
            if (this.state.usuario.length > 0 && this.state.contraseña.length > 0) {

                await fetch(`https://dbfuchicovid.herokuapp.com/usuario/${this.state.usuario}`)
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
                                this.setState({ usu : usu})
                                this.setState({tipou: usu.tipousuario})
                                if(this.state.tipou==='super'){
                                    this.setState({ redirect: "/NavAdmin/"+this.state.usu.idusuario });
                                }else{
                                    this.setState({ redirect: "/NavDoc/"+this.state.usu.idusuario });
                                }
                                
                                
                            } else

                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Contraseña invalida intente de nuevo',

                                })
                        }
                    });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ingrese campos Validos',

                })
            }
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingrese campos Validos',

            })
            //alert('Error: ' + e.message);
        }
    }

    render() {
        
        if (this.state.redirect)  {
            console.log('hola '+this.state.usu.idusuario)
            return <Redirect from='/' to={
               this.state.redirect
            } />
            
          }
          
        
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header mb-3 mt-4" id="login"><h2 className="m-2" >Login</h2></div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg} />

                    </div>
                    <Form id='envio' >


                        <div className="mb-3">
                            <FormGroup  >

                                <InputGroup>
                                    <InputGroupText><i class="fa fa-user"></i></InputGroupText>
                                    <Input id="usuario"
                                        placeholder="Usuario"
                                        className="form-control"
                                        name="usuario"
                                        type="text"
                                        bsSize="lg"
                                        value={this.state.usuario}
                                        onChange={this.handleChange}  required  />
                                </InputGroup>
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
                                        bsSize="lg"
                                        value={this.state.contraseña}
                                        onChange={this.handleChange}
                                    /> </InputGroup> </FormGroup>
                        </div>

                        <div className="footer">
                            <Button className="mt-5" size="lg" color='primary' onClick={() => this.login()} >
                                Login <i class="fa fa-sign-in" aria-hidden="true"></i>
        </Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}