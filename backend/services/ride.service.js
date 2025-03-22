const rideModel = require("../models/ride-model");
const mapsService = require("../services/maps.service");

async function getFare(pickup , destination) {
  if(!pickup || !destination){
    throw new Error('pickup and destination must be provided')
  }

  const distanceTime = await mapsService.getDistance(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 5,
    motorcycle: 20
  }

  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5
  }

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8
  }

  const fare = {
    auto: baseFare.auto + (distanceTime.distance * perKmRate.auto) + (distanceTime.duration * perMinuteRate.auto),
    car: baseFare.car + (distanceTime.distance * perKmRate.car) + (distanceTime.duration * perMinuteRate.car),
    motorcycle: baseFare.motorcycle + (distanceTime.distance * perKmRate.motorcycle) + (distanceTime.duration * perMinuteRate.motorcycle)
  }

  return fare;

}

const createRide = async (ride) => {
  const newRide = new rideModel(ride);
  return await newRide.save();
}
