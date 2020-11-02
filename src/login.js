import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import './login.css'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Login() {

    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");

    function validaFormu() {
        return usuario.length > 0 && contraseña.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {

            let myHeaders = new Headers();

            const options = {
                method: 'GET',
                headers: myHeaders

            }

            let respuesta =  await fetch(`http://localhost:5000/usuario/${usuario}`, options);
            console.log(respuesta);
            if (respuesta){
                let usu = await respuesta.json();
                if (contraseña == usu.contaseña){

                }else
                    alert("Contraseña incorrecta");
            }else
                alert("El usuario ingresado no existe");
        } catch (e) {
            alert(e.message);
        }
    }

    return (
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
    );
}