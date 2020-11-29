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
            id: null,



        }

    }


    async componentDidMount() {

    await this.setState({
        match : this.props.match.params,
        //id: this.state.match.id
    })
    
    const algo = parseInt(this.state.match.id)
    this.setState({
        id: algo
    })
    await fetch(`https://dbfuchicovid.herokuapp.com/usuariopersox/${algo}`)
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
        
        //this.state.match = this.props.match.params;
        //console.log(this.state.match)
        
        
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
                                    <Link className="btn font-weight-bold" to={`/NavAdmin/${this.state.id}/MapaAdmin`} activeClassName="active"> Mapa <i class="fa fa-map-marker" aria-hidden="true"></i></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn font-weight-bold" to={`/NavAdmin/${this.state.id}/InformesAdmin`} activeClassName="active"> Informes <i class="fa fa-info-circle" aria-hidden="true"></i></Link>
                                </li>
                                <li >
                                    <Link className="btn font-weight-bold" to={`/NavAdmin/${this.state.id}`} activeClassName="active"> Crear Doctor o Paciente <i class="fa fa-hospital-o" aria-hidden="true"></i></Link>
                                </li>
                                <li >
                                    <Button color='info' className="btn font-weight-bold ml-2" onClick={() => this.logOut()} activeClassName="active"> LogOut <i class="fa fa-sign-out" aria-hidden="true"></i></Button>
                                </li>



                            </ul>
                        </div>
                    </nav>

                    <Switch>
                        <Route path="/NavAdmin/:id/MapaAdmin">
                            <MapaAdmin />
                        </Route>
                        <Route path="/NavAdmin/:id/InformesAdmin">
                            <InformesAdmin />
                        </Route>
                        <Route exact path="/NavAdmin/:id">
                            <CrearDoctor id={this.state.doc} idusu={this.state.idusuario}/>
                        </Route>



                    </Switch>



                </div>

            </BrowserRouter>
        );
    }
}