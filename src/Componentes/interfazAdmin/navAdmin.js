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



        }

    }







    render() {
        const { match } = this.props;
        return (
            <BrowserRouter >
                <div className="total">
                    <nav class="navbar navbar-expand-lg navbar-light bg-primary">

                        <h1 class="navbar-brand ml-3 font-weight-bold " >Bienvenido Admin {match.params.id}</h1>
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
                            <CrearDoctor />
                        </Route>



                    </Switch>



                </div>

            </BrowserRouter>
        );
    }
}