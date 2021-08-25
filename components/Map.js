import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({})
    const coordinates = searchResults?.map(result => ({
        longitude: result.long,
        latitude : result.lat
    }))

    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width:"100%",
        height:"100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 8
    });

    return (
        <ReactMapGL
            mapStyle = "mapbox://styles/nilugette/cksr7cvtp1yf618ljc9nep8c3"
            mapboxApiAccessToken = {process.env.mapbox_key}
            {...viewport}
            onViewportChange={(viewport) => setViewport(viewport)}
        >
        {
            searchResults?.map((result, i)=>(
                <div key={i} >
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p 
                            role="img"
                            onClick={()=> setSelectedLocation(result)} 
                            className="cursor-pointer text-2xl animate-bounce"
                            aria-label="push-pin"
                        >📌</p>
                    </Marker>
                    {selectedLocation.long === result.long && (
                        <Popup
                            onClose={()=> setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >{result.title}</Popup>
                    )}
                </div>
            ))
        }
        </ReactMapGL>
    )
}

export default Map