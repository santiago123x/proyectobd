import React from 'react';
import '../InterfazDoc/style.scss';
import {Map,TileLayer} from 'react-leaflet';
import Markers from './Markers.js'



export default class Mapa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            geoloc: []
        }; 
               
    }

    async componentDidMount() {

        await fetch(`http://localhost:5000/geolocalizacion/`)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                geoloc: result         
              });
            }            
          )
    }
    
     
      
    render() {
        return (
            <div className="total">
                
                <div className="header mt-2 text-center " id="login"><h2 className="Titulo m-2 " >Mapa</h2></div>
                   
                <div className="conteneT mt-2">
                    <div className="conteMap">
                    <Map center={{lat: '3.42158',lng: '-76.5205'}} zoom={13}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>

                        <Markers places={this.state.geoloc}/>
                    </Map>
                    </div>
                    
                </div>
                
            </div>
            
        );
    }
    
}
