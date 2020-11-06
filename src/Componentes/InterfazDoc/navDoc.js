import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import "../Login/syle.scss";
import {Button} from 'reactstrap';

export default class NavDoc extends React.Component {
    constructor(props) {
        super(props);

    }



    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-primary">
                <h1 class="navbar-brand ml-3" >Bienvenido Doctor DavidGay</h1>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto mr-5">
                    <li className="nav-item">
                            <Link className="btn font-weight-bold" to="/InformesDoc" activeClassName="active"> Informes</Link>
                        </li>
                        <li >
                            <Link className="btn font-weight-bold" to="/RegistrarV" activeClassName="active"> Registrar Visita</Link>
                        </li>
                        
                        
                    </ul>
                </div>
            </nav>
        );
    }
}