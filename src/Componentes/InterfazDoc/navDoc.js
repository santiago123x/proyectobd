import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import "../Login/syle.scss";
import InformesDoc from './InformesDoc';
import Registro from './Registro';
import Medicamentos from './Medicamentos';
import './style.scss';


export default class NavDoc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
      
      
          }

    }


    

    


    render() {
        const {match} =this.props;
        return (
            <BrowserRouter >
            <div className="total">
            <nav class="navbar navbar-expand-lg navbar-light bg-primary">
               
                <h1 class="navbar-brand ml-3 font-weight-bold " >Bienvenido Doctor {match.params.id}</h1>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto mr-5">
                    <li className="nav-item">
                            <Link className="btn font-weight-bold" to="/NavDoc/InformesDoc" activeClassName="active"> Informes</Link>
                        </li>
                        <li >
                            <Link className="btn font-weight-bold" to={`/NavDoc/${match.params.id}`} activeClassName="active"> Registrar Visita</Link>
                        </li>
                        <li >
                            <Link className="btn font-weight-bold" to="/NavDoc/Medicamentos" activeClassName="active"> Medicamentos</Link>
                        </li>
                                                
                    </ul>
                </div>
            </nav>
            
            <Switch>
          
          <Route path="/NavDoc/InformesDoc">
            <InformesDoc />
          </Route>
          <Route path="/NavDoc/Medicamentos">
            <Medicamentos />
          </Route>
          <Route exact path="/NavDoc/:id">
              <Registro />
            
          </Route>
        </Switch>



            </div>

            </BrowserRouter>
        );
    }
}