import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import "../Login/syle.scss";
import InformesDoc from './InformesDoc';
import Registro from './Registro';
import Medicamentos from './Medicamentos';


export default class NavDoc extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            doctor: null 
        };

    }


    async componentDidMount() {
        const { match: { params } } = this.props;
      
        await fetch.get(`http://localhost:5000/doctor/${params.id}`)
        .then(response => response.json())  
        .then(doc => {
            console.log('doctor', doc);
            this.setState({ doctor: doc });
          });
      }


    render() {
        return (
            <BrowserRouter >
                <div>
                    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
                        <h1 class="navbar-brand ml-3 font-weight-bold " >{this.props.nombre}</h1>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav ml-auto mr-5">
                                <li className="nav-item">
                                    <Link className="btn font-weight-bold" to="/NavDoc/InformesDoc" activeClassName="active"> Informes</Link>
                                </li>
                                <li >
                                    <Link className="btn font-weight-bold" to="/NavDoc/" activeClassName="active"> Registrar Visita</Link>
                                </li>
                                <li >
                                    <Link className="btn font-weight-bold" to="/NavDoc/Medicamentos" activeClassName="active"> Medicamentos</Link>
                                </li>

                            </ul>
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path="/NavDoc/">
                            <Registro />
                            <Route />
                        </Route>
                        <Route path="/NavDoc/InformesDoc" >
                            <InformesDoc />
                        </Route>
                        <Route path="/NavDoc/Medicamentos">
                            <Medicamentos />
                        </Route>
                    </Switch>



                </div>

            </BrowserRouter>
        );
    }
}