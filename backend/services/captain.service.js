const captainModel = require('../models/captain-model')

module.exports.createCaptain = async ({
    fullname , email , password , status , vehicle , location
})=>{
    if(!fullname || !email || !password || !status || !vehicle){
        throw new Error('All fields are required')
    }
    const captain = await captainModel.create({
        fullname,
        email,
        password,
        status,
        vehicle,
        location
    })
    return captain
}