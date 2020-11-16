import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import "../Login/syle.scss";
import CrearDoctor from './crearDoctor';
import '../InterfazDoc/style.scss';
import InformesAdmin from './informesAdmin';
import MapaAdmin from './mapaAdmin';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

export default class NavAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            contraseña: '',
            nombre: '',
            apellido: '',
            idpersona: '',
            idusuario: '',
            doc: '',
            match: null,
            redirect: null,



        }

    }


    async componentDidMount() {
        console.log(this.state.match);
        await fetch(`http://localhost:5000/usuariopersox/${this.state.match}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        nickname: result[0].nickname,
                        contraseña: result[0].contraseña,
                        nombre: result[0].nombre,
                        apellido: result[0].apellido,
                        idpersona: result[0].idpersona,
                        idusuario: result[0].idusuario,
                        doc: result[0].numerodoc
                    });
                }
            )

    }

    logOut() {
        Swal.fire({
            title: 'Esta Seguro ?',
            text: "Desea Cerrar Sesión ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si !'
        }).then((result) => {
            if (result.isConfirmed) {
                this.setState({ redirect: '/' })
            }
        })

    }


    render() {
        const { match } = this.props;
        this.state.match = match.params.id;

        if (this.state.redirect) {

            return <Redirect to={
                this.state.redirect
            } />

        }

        return (
            <BrowserRouter >
                <div className="total">
                    <nav class="navbar navbar-expand-lg navbar-light bg-primary">

                        <h1 class="navbar-brand ml-3 font-weight-bold " >Bienvenido Admin {this.state.nombre}  {this.state.apellido} </h1>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav ml-auto mr-5">
                                <li className="nav-item">
                                    <Link className="btn font-weight-bold" to="/NavAdmin/MapaAdmin" activeClassName="active"> Mapa <i class="fa fa-info-circle" aria-hidden="true"></i></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn font-weight-bold" to="/NavAdmin/InformesAdmin" activeClassName="active"> Informes <i class="fa fa-info-circle" aria-hidden="true"></i></Link>
                                </li>
                                <li >
                                    <Link className="btn font-weight-bold" to={`/NavAdmin/${match.params.id}`} activeClassName="active"> Crear Doctor o Paciente <i class="fa fa-hospital-o" aria-hidden="true"></i></Link>
                                </li>
                                <li >
                                    <Button color='info' className="btn font-weight-bold ml-2" onClick={() => this.logOut()} activeClassName="active"> LogOut <i class="fa fa-sign-out" aria-hidden="true"></i></Button>
                                </li>



                            </ul>
                        </div>
                    </nav>

                    <Switch>
                        <Route path="/NavAdmin/MapaAdmin">
                            <MapaAdmin />
                        </Route>
                        <Route path="/NavAdmin/InformesAdmin">
                            <InformesAdmin />
                        </Route>
                        <Route exact path="/NavAdmin/:id">
                            <CrearDoctor id={this.state.doc} />
                        </Route>



                    </Switch>



                </div>

            </BrowserRouter>
        );
    }
}