const rideModel=require('../models/ride.model');
const mapService=require('../services/maps.services');
const crypto=require('crypto');
const { sendMessageToSocketId } = require('../socket');
function getOtp(num) {
  function generateOtp(num) {
      const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
      return otp;
  }
  return generateOtp(num);
}

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error('Please provide pickup and destination locations');
  }

  try {
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    // console.log(distanceTime);

    // Parse distance (convert "81.0 km" to 81.0)
    const distance = parseFloat(distanceTime.distance.split(' ')[0]);

    // Parse duration (convert "1 hour 36 mins" to minutes)
    const durationParts = distanceTime.duration.split(' ');
    // console.log(durationParts);
    let duration = 0;
    for (let i = 0; i < durationParts.length; i++) {
      if (durationParts[i] === 'hour' || durationParts[i] === 'hours') {
        duration += parseFloat(durationParts[i-1]) * 60;
      }
      if (durationParts[i] === 'mins' || durationParts[i] === 'min') {
        duration += parseFloat(durationParts[i-1]);
      }
    }

    if (isNaN(distance) || isNaN(duration)) {
      throw new Error('Invalid distance or duration values received from map service');
    }

    const baseFare = {
      auto: 30,
      car: 50,
      moto: 20
    };

    const perKmRate = {
      auto: 10,
      car: 15,
      moto: 8
    };

    const perMinuteRate = {
      auto: 2,
      car: 3,
      moto: 1.5
    };

    const fare = {
      auto: Math.max(Math.round(baseFare.auto + (distance * perKmRate.auto) + (duration * perMinuteRate.auto)), baseFare.auto),
      car: Math.max(Math.round(baseFare.car + (distance * perKmRate.car) + (duration * perMinuteRate.car)), baseFare.car),
      moto: Math.max(Math.round(baseFare.moto + (distance * perKmRate.moto) + (duration * perMinuteRate.moto)), baseFare.moto)
    };

    return fare;
  } catch (error) {
    throw new Error(`Error calculating fare: ${error.message}`);
  }
}

module.exports.getFare = getFare;

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('All fields are required');
  }

  try {
    const fares = await getFare(pickup, destination);
    const calculatedFare = fares[vehicleType];

    if (isNaN(calculatedFare) || calculatedFare <= 0) {
      throw new Error('Invalid fare calculation');
    }

    const ride = await rideModel.create({
      user,
      pickup,
      destination,
      otp: getOtp(6),
      fare: calculatedFare,
      vehicleType
    });

    return ride;
  } catch (error) {
    throw new Error(`Failed to create ride: ${error.message}`);
  }
};

module.exports.confirmRide = async ({
  rideId, captain
}) => {
  if (!rideId) {
      throw new Error('Ride id is required');
  }

  await rideModel.findOneAndUpdate({
      _id: rideId
  }, {
      status: 'accepted',
      captain: captain._id
  })

  const ride = await rideModel.findOne({
      _id: rideId
  }).populate('user').populate('captain').select('+otp');

  if (!ride) {
      throw new Error('Ride not found');
  }

  return ride;

}

module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
      throw new Error('Ride id and OTP are required');
  }

  const ride = await rideModel.findOne({
      _id: rideId
  }).populate('user').populate('captain').select('+otp');

  if (!ride) {
      throw new Error('Ride not found');
  }
  console.log(ride);
  // if (ride.status != 'accepted') {
  //     throw new Error('Ride not accepted');
  // }

  if (ride.otp !== otp) {
      throw new Error('Invalid OTP');
  }

  await rideModel.findOneAndUpdate({
      _id: rideId
  }, {
      status: 'ongoing'
  })
   sendMessageToSocketId(ride.user.socketId, {
    event:'ride-started',
    data:ride
   })
  return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
      throw new Error('Ride id is required');
  }

  const ride = await rideModel.findOne({
      _id: rideId,
      captain: captain._id
  }).populate('user').populate('captain').select('+otp');

  if (!ride) {
      throw new Error('Ride not found');
  }

  if (ride.status !== 'ongoing') {
      throw new Error('Ride not ongoing');
  }

  await rideModel.findOneAndUpdate({
      _id: rideId
  }, {
      status: 'completed'
  })

  return ride;
}