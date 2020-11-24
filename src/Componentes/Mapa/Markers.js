import React from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet'





const Markers = (props) => {
    const { places } = props
    
    const markers = places.map((place, i) => (
        
        <Marker key={i} position={{lng: place.longitud, lat: place.latitud}}>
           <Tooltip >
                {place.nombrevia}{place.numeroviap} # {place.numerovias}  - {place.numerocasa}
            </Tooltip>
            <Popup>
                {place.nombre}{' '}{place.apellido}
            </Popup>
        </Marker>
    ))
    return (markers);
    
}

export default Markers;