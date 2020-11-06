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

            fetch(`http://localhost:5000/usuario/${usuario}`)
            .then(response => response.json())
            .then(usua => {if (usua.length === 0){

                alert("No existe un usuario con ese nick");

                }else{

                    let usu = usua[0];
                    if (usu.contraseña === contraseña)
                        alert("Bienvenido " + usu.nickname)
                    else 
                        alert("Contraseña invalida intente de nuevo")
            }});

            /*const res =  await fetch(`http://localhost:5000/usuario/${usuario}`);
            console.log(res);
            if (res){
                const usua = await res.json();
                setData(usua);
                console.log(data)
                alert("rowcout = " + data) ;

                if (data.length === 0){

                    alert("No existe un usuario con ese nick");

                }else{

                    let usu = data[0];
                    if (usu.contraseña === contraseña)
                        alert("Bienvenido " + usu.nickname)
                    else 
                        alert("Contraseña invalida intente de nuevo")
                }
                    
            }else
                alert("No hay respuesta de la base de datos. \nVerifique su conexion");*/
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