const axios = require('axios');

module.exports.getLocation = async (address) => {
    const key = process.env.Google_Maps_Api_Key
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