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

  const distance = await mapsService.getDistance(pickup, destination);
  if (distance.status !== 'OK') {
    throw new Error(`Maps API error: ${distance.status}`);
  }

  const ride = await rideModel.create({
    message: "Ride created successfully",
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
    distance: distance.distance.text,
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

module.exports.deleteRide = async (rideId) => {
  const ride = await rideModel.findByIdAndDelete(rideId);
  return ride;
}

module.exports.confirmRide = async (rideId , captainId) => {
  
  if(!rideId){
    throw new Error('Invalid ride id')
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    { $set: { captain: captainId, status: "confirmed" } },
    { new: true },
  );

  const ride = await rideModel.findById(rideId).populate('user').populate('captain').select('+otp');

  if (!ride) {
    throw new Error('Ride not found')
  }

  return ride;
}

module.exports.startRide = async (rideId, otp) => {
  if(!rideId || !otp){
    throw new Error('Invalid ride id or otp')
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    { $set: { status: "ongoing" } },
    { new: true },
  );

  const ride = await rideModel.findById(rideId).populate('user').populate('captain').select('+otp');

  if (!ride) {
    throw new Error('Ride not found')
  }
  if (ride.otp !== otp) {
    throw new Error('Invalid OTP')
  }

  return ride;
}

module.exports.rideArriving = async (rideId) => {
  if(!rideId){
    throw new Error('Invalid ride id')
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    { $set: { status: "arriving" } },
    { new: true },
  );

  const ride = await rideModel.findById(rideId).populate('user').populate('captain').select('+otp');

  if (!ride) {
    throw new Error('Ride not found')
  }

  return ride;
}

module.exports.cancelRide = async (rideId) => {
  if(!rideId){
    throw new Error('Invalid ride id')
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    { $set: { status: "cancelled" , message: "Ride cancelled" } },
    { new: true },
  );

  const ride = await rideModel.findById(rideId).populate('user').populate('captain').select('-otp');

  if (!ride) {
    throw new Error('Ride not found')
  }

  return ride;
}

module.exports.finishRide = async (rideId) => {
  if(!rideId){
    throw new Error('Invalid ride id')
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    { $set: { status: "completed" } },
    { new: true },
  );

  const ride = await rideModel.findById(rideId).populate('user').populate('captain').select('-otp');

  if (!ride) {
    throw new Error('Ride not found')
  }

  return ride;
}
