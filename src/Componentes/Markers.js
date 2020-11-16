import React from 'react';
import {Marker,Popup} from 'react-leaflet'





const Markers = (props)=>{
    const {places} = props
    const markers = places.map((place, i) => (
        
        <Marker key={i} position={place.geometry}>
        <Popup>
            {place.name}
          </Popup>
        </Marker>
    ))
        return (markers         
        );
    

}

export default Markers;