const rideModel = require("../models/ride-model");
const mapsService = require("../services/maps.service");
const crypto = require('crypto');

async function getFare(pickup , destination) {
  if(!pickup || !destination){
    throw new Error('pickup and destination must be provided')
  }

  const distanceTime = await mapsService.getDistance(pickup, destination);

  if (distanceTime.status !== 'OK') {
    throw new Error(`Maps API error: ${distanceTime.status}`);
  }

  if (
    typeof (distanceTime.distance.value / 100) !== 'number' ||
    typeof (distanceTime.duration.value/ 60) !== 'number'
  ) {
    throw new Error('Invalid distance or duration received from maps service');
  }

  const baseFare = {
    car: 16,
    auto: 12,
    motorcycle: 8
  }

  const perMinuteRate = {
    car: 3,
    auto: 2,
    motorcycle: 1.5
  }

  const perKmRate = {
    car: 5,
    auto: 4,
    motorcycle: 3
  }

  const fare = {
    auto:
      Math.round(baseFare.auto +
      (distanceTime.distance.value / 1000) * perKmRate.auto +
      (distanceTime.duration.value / 60) * perMinuteRate.auto),
    car:
      Math.round(baseFare.car +
      (distanceTime.distance.value / 1000) * perKmRate.car +
      (distanceTime.duration.value / 60) * perMinuteRate.car),
    motorcycle:
      Math.round(baseFare.motorcycle +
      (distanceTime.distance.value / 1000) * perKmRate.motorcycle +
      (distanceTime.duration.value / 60) * perMinuteRate.motorcycle)
  };

  return fare;

}

function getOtp(num){
  function generateOtp(num){
    const otp = crypto.randomInt(Math.pow(10 , num - 1) , Math.pow(10 , num)).toString();
    return otp;
  }
  return generateOtp(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if(!pickup || !destination || !vehicleType){
    throw new Error('All fields are required')
  }

  const fare = await getFare(pickup, destination);

  if (!fare.hasOwnProperty(vehicleType)) {
    throw new Error(`Invalid vehicle type: ${vehicleType}`);
  }

  const ride = await rideModel.create({
    message: "Ride created successfully",
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
}

module.exports.generateFare = async (pickup, destination) => {
  if(!pickup || !destination){
    throw new Error('pickup and destination must be provided')
  }
  const fare = await getFare(pickup, destination);
  return fare;
}
