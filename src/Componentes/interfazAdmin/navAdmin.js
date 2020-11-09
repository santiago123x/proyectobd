import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import "../Login/syle.scss";
import CrearDoctor from './crearDoctor';
import '../InterfazDoc/style.scss';
import InformesAdmin from './informesAdmin';


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




    render() {
        const { match } = this.props;
        this.state.match = match.params.id;
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
                                    <Link className="btn font-weight-bold" to="/NavAdmin/InformesAdmin" activeClassName="active"> Informes</Link>
                                </li>
                                <li >
                                    <Link className="btn font-weight-bold" to={`/NavAdmin/${match.params.id}`} activeClassName="active"> Crear Doctor o Paciente</Link>
                                </li>


                            </ul>
                        </div>
                    </nav>

                    <Switch>

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