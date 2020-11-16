import React from 'react';
import '../InterfazDoc/style.scss';
import {Map,TileLayer} from 'react-leaflet';
import Markers from './Markers.js'
import {places} from './data.json'


export default class Mapa extends React.Component {
    constructor(props) {
        super(props);

    }



    render() {
        return (
            <div className="total">
                
                <div className="header mt-2 text-center " id="login"><h2 className="Titulo m-2 " >Mapa</h2></div>
                   
                <div className="conteneT mt-2">
                    <div className="conteMap">
                    <Map center={{lat: '3.42158',lng: '-76.5205'}} zoom={13}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>

                        <Markers places={places}/>
                    </Map>
                    </div>
                </div>
                
            </div>
            
        );
    }
}