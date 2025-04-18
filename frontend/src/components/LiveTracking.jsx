import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker, Polyline, DirectionsRenderer } from '@react-google-maps/api';

const LiveTracking = ({ destination , start }) => {

    // console.log("Start: ", start)

  const [currentPosition, setCurrentPosition] = useState({ lat: 26.8933, lng: 80.9874 });
  const [mapCenter, setMapCenter] = useState( destination || { lat: 26.8933, lng: 80.9874 });
  const [path, setPath] = useState([]);
  const [directions, setDirections] = useState(null)
//   useEffect(() => {
//     console.log("DIrections: ", directions)
//   },[directions])

  useEffect(()=>{
    if(start && destination){
      setMapCenter(destination)
    }
  } , [destination , start])

  useEffect(() => {
    if (start && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: new window.google.maps.LatLng(start.lat, start.lng),
          destination: new window.google.maps.LatLng(destination.lat, destination.lng),
          travelMode: window.google.maps.TravelMode.DRIVING, 
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            console.log('Directions result:', result);
            setDirections(result);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [start, destination]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error fetching user location:', error);
          setCurrentPosition({ lat: 26.8933, lng: 80.9874 }); 
          setMapCenter({ lat: 26.8933, lng: 80.9874 });
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setCurrentPosition({ lat: 26.8933, lng: 80.9874 }); 
      setMapCenter({ lat: 26.8933, lng: 80.9874 });
    }
  }, []);

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });
            setPath((prevPath) => [...prevPath, { lat: latitude, lng: longitude }]);
          },
          (error) => {
            console.error('Error fetching user location:', error);
          }
        );
      }
    };

    updateLocation();

    const interval = setInterval(updateLocation, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_Google_Maps_Api_Key}
        onLoad={() => console.log('Google Maps script loaded successfully')}
        onError={(error) => console.error('Error loading Google Maps script:', error)}
      >
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '430px' }}
          center={mapCenter}
          zoom={15}
          options={{
            mapTypeControl: false, 
          }}
        >
          {!start && !destination && (
            <Marker position={currentPosition} />
          )}

        {destination && (
          <Marker
            position={destination}
          />
        )}

        {start && (
          <Marker
            position={start}
          />
        )}

          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: 'black',
                  strokeOpacity: 1,
                  strokeWeight: 2,
                },
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LiveTracking;