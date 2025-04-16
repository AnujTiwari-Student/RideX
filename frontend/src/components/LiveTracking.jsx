import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker, Polyline } from '@react-google-maps/api';

const LiveTracking = () => {

  const [currentPosition, setCurrentPosition] = useState({ lat: 26.8933, lng: 80.9874 });
  const [mapCenter, setMapCenter] = useState({ lat: 26.8933, lng: 80.9874 });
  const [path, setPath] = useState([]);

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
          <Marker position={currentPosition} />
          {/* <Polyline path={path} options={{ strokeColor: '#FF0000', strokeOpacity: 1, strokeWeight: 2 }} /> */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LiveTracking;