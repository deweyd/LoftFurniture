import './Map.scss'
import { useCallback, useEffect, useState } from "react";
import { DirectionsRenderer, GoogleMap } from '@react-google-maps/api';


function Map() {
    const [map, setMap] = useState(null);
    const [mapCentre, setMapCentre] = useState({ lat: 50.48856401456545, lng: 30.471688255681993 });
    const [mapLocation, setMapLocation] = useState(null);
    const station = { lat: 50.48856401456545, lng: 30.471688255681993 };
    const [directions, setDirections] = useState(null);
    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const handleClickMap = useCallback(({ lat, lng }) => {
        setMapLocation({ lat, lng });
    }, []);

    const handleDirections = useCallback((response) => {
        if (response !== null) {
            setDirections(response);
        }
    }, []);

    const calculateDirections = useCallback(() => {
        if (mapLocation) {
            const direcServ = new window.google.maps.DirectionsService();
            direcServ.route(
                {
                    origin: mapLocation,
                    destination: station,
                    travelMode: window.google.maps.TravelMode.DRIVING
                },
                handleDirections
            );
        }
    }, [mapLocation, handleDirections]);

    const mapLoads = useCallback((mapLoad) => {
        setMap(mapLoad);
        if (mapLocation) {
            setMapCentre(mapLocation);
        }
    }, [mapLocation]);


    const getUset = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setMapLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                },
                (error) => {
                    console.error('Error' + error)
                }
            )
        } else (
            console.error('Error')
        )
    }, [])

    useEffect(() => {
        getUset()
    }, [getUset])

    useEffect(() => {
        if (map && mapLocation) {
            setMapCentre(mapLocation);
            calculateDirections();
        }
    }, [map, mapLocation]);
    return (
        <div className="map">
            <div className="map__title">Адрес нашей компании</div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCentre}
                zoom={10}
                onClick={(e) => handleClickMap(e.latLng.toJSON())}
                onLoad={mapLoads}
            >
                {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
        </div>
    );
}

export default Map;