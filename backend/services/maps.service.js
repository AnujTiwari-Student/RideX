const axios = require('axios');
const captainModel = require('../models/captain-model')

module.exports.getLocation = async (address) => {
    const key = process.env.Google_Maps_Api_Key_Location
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}`

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            const location = response.data.results[0].geometry.location
            return {
                lat: location.lat,
                lng: location.lng,
            }
        }else{
            throw new Error('Error in getting location')
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports.getDistance = async (origin, destination) => {
    if(!origin || !destination) throw new Error('origin and destination must be provided')
    const key = process.env.Google_Maps_Api_Key
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${key}`

    try {
        const response = await axios.get(url);
        if (response.data.status !== 'OK') {
            throw new Error(`Google Maps API error: ${response.data.status}`);
        }
        const element = response.data.rows[0].elements[0];
        if (element.status === 'ZERO_RESULTS') {
            throw new Error('No results found for the given origin and destination');
        }

        return element;
    }catch (error) {
        console.log(error);
        throw error
    }
}

module.exports.getLocationSuggestion = async (input) => {
    if(!input) throw new Error('location must be provided')
    const key = process.env.Google_Maps_Api_Key
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${key}`

    try {
        const response = await axios.get(url);
        if (response.status === 401 || response.data.status === "REQUEST_DENIED") {
            console.error("Unauthorized: Check API key or billing status");
            throw new Error("Unauthorized request. Check API key or billing.");
        }

        if (response.data.status !== "OK") {
            throw new Error(`Google Maps API error: ${response.data.status}`);
        }

        return response.data.predictions;
    }catch (error) {
        console.log(error);
        throw error
    }
}

module.exports.getNearByCaptains = async (lat, lng , radius) => {
    const captain = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[lat, lng], radius / 6371]
                }
            }
    })

    return captain
}