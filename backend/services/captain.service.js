const captainModel = require('../models/captain-model')

module.exports.createCaptain = async ({
    firstname , lastname , email , password , status , vehicleColor , vehicleType , vehicleCapacity , vehiclePlate
})=>{
    if(!firstname || !email || !password || !vehicleColor || !vehicleType || !vehicleCapacity || !vehiclePlate){
        throw new Error('All fields are required')
    }
    const captain = await captainModel.create({
        firstname,
        lastname,
        email,
        password,
        status,
        vehicleColor,
        vehiclePlate,
        vehicleType,
        vehicleCapacity,
        role: 'captain'
    })
    return captain
}