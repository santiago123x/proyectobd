import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import "../Login/syle.scss";
import { Button } from 'reactstrap';
import InformesDoc from './InformesDoc';
import MapaDoctor from './mapaDoctor';
import Registro from './Registro';
import Medicamentos from './Medicamentos';
import './style.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';


export default class NavDoc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            redirect: null,
            match: null,
            //Datos Doc
            idusuD: null,
            idpD: null,
            nombreD: null,
            apellidoD: null,
            tipodD: null,
            numerdD: null,
            idDoc: null,
            eps: null,
            //



        }

    }

    async componentDidMount() {
        await fetch(`http://localhost:5000/usudoctor/${this.state.match}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        idusuD: result.idusuario,
                        idpD: result.idpersona,
                        nombreD: result.nombre,
                        apellidoD: result.apellido,
                        tipodD: result.tipodocument,
                        numerdD: result.numerodoc,
                        idDoc: result.iddoctor,
                        eps: result.eps
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

                        <h1 class="navbar-brand ml-3 font-weight-bold " >Bienvenido Doctor {this.state.nombreD} {this.state.apellidoD}</h1>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav ml-auto mr-5">
                                <li className="nav-item">
                                    <Link className="btn font-weight-bold" to="/NavDoc/MapaDoc" activeClassName="active"> Mapa <i class="fa fa-map-marker" aria-hidden="true"></i></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn font-weight-bold" to="/NavDoc/InformesDoc" activeClassName="active"> Informes <i class="fa fa-info-circle" aria-hidden="true"></i></Link>
                                </li>
                                <li >
                                    <Link className="btn font-weight-bold" to={`/NavDoc/${match.params.id}`} activeClassName="active"> Registrar Visita <i class="fa fa-folder-open-o" aria-hidden="true"></i></Link>
                                </li>
                                <li >
                                    <Link className="btn font-weight-bold" to="/NavDoc/Medicamentos" activeClassName="active"> Medicamentos <i class="fa fa-heartbeat" aria-hidden="true"></i></Link>
                                </li>
                                <li >
                                    <Button color='info' className="btn font-weight-bold ml-2" onClick={() => this.logOut()} activeClassName="active"> LogOut <i class="fa fa-sign-out" aria-hidden="true"></i></Button>
                                </li>


                            </ul>
                        </div>
                    </nav>

                    <Switch>
                        <Route path="/NavDoc/MapaDoc">
                            <MapaDoctor />
                        </Route>

                        <Route path="/NavDoc/InformesDoc">
                            <InformesDoc />
                        </Route>
                        <Route path="/NavDoc/Medicamentos">
                            <Medicamentos />
                        </Route>
                        <Route exact path="/NavDoc/:id">
                            <Registro idpD={this.state.idpD} idDoc={this.state.idDoc} tipodD={this.state.tipodD}
                                numerdD={this.state.numerdD} eps={this.state.eps} />

                        </Route>
                    </Switch>



                </div>

            </BrowserRouter>
        );
    }
}