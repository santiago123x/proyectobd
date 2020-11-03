import React, { useState, ReactComponent } from "react";
import loginImg from "../../LOGIN.svg";
import { Button, Form, FormGroup, InputGroupText, InputGroupAddon, Input, Label } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

/*
function Login()  {

    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");


    function validaFormu() {
        return usuario.length > 0 && contraseña.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {

            fetch(`http://localhost:5000/usuario/${usuario}`)
                .then(response => response.json())
                .then(usua => {
                    if (usua.length === 0) {

                        alert("No existe un usuario con ese nick");

                    } else {

                        let usu = usua[0];
                        if (usu.contraseña === contraseña)
                            alert("Bienvenido " + usu.nickname)
                        else
                            alert("Contraseña invalida intente de nuevo")
                    }
                });


        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Login</div>
            <div className="content">
                <div className="image">
                    <img src={loginImg} />

                </div>
                <div className="Login">
                    <form onSubmit={handleSubmit}>
                        <Form.Group controlId="Usuario" bsSize="large">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={usuario}
                                placeholder='Ingrese el usuario'
                                onChange={e => setUsuario(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="contraseña" bsSize="large">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                value={contraseña}
                                placeholder='Ingrese la contraseña'
                                onChange={e => setContraseña(e.target.value)}
                                type="password"
                            />
                        </Form.Group>
                        <Button block bsSize="large" variant='primary' disabled={!validaFormu()} type="submit">
                            Login
        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Login;


*/





export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            contraseña: '',
            idusu: []
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


    validaFormu() {
        return this.state.usuario.length > 0 && this.state.contraseña.length > 0;
    }

    async login() {
        try {

            await fetch(`http://localhost:5000/usuario/${this.state.usuario}`)
                .then(response => response.json())
                .then(usua => {
                    if (usua.length === 0) {

                        alert("No existe un usuario con ese nick");

                    } else {

                        let usu = usua[0];

                        if (usu.contraseña === this.state.contraseña) {
                            alert("Bienvenido " + usu.nickname)
                            this.state.idusu = usu;
                        } else
                            alert("Contraseña invalida intente de nuevo")
                    }
                });

            alert(this.state.idusu.idusuario + this.state.idusu.nickname );
        } catch (e) {
            alert(e.message);
        }
    }

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg} />

                    </div>
                    <Form  id='envio' >
                        
                        
                            <div className="mb-3">
                                <FormGroup  >
                                    <Label>Usuario</Label>
                                    <Input id="usuario"
                                        placeholder="Usuario"
                                        className="form-control"
                                        name="usuario"
                                        type="text"
                                        bsSize="lg"
                                        value={this.state.usuario}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>
                            <div className="mb-3" >
                                <FormGroup  >
                                <Label>Contraseña</Label>
                                    <Input
                                        id="contraseña"
                                        placeholder="Contraseña"
                                        className="form-control"
                                        name="contraseña"
                                        type="password"
                                        bsSize="lg"
                                        value={this.state.contraseña}
                                        onChange={this.handleChange}
                                    /> </FormGroup>
                            </div>

                            <div className="footer">
                                <Button  size="lg" color='primary' onClick={() => this.login()} >
                                    Login
        </Button>
                            </div>
                    </Form>
                </div>
                </div>
        );
    }
}