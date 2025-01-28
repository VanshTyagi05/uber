const mapsService=require('../services/maps.services');
const {validationResult}=require('express-validator');
module.exports.getCoordinates=async(req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  const {address}=req.query;
  try{
    
    const coordinates=await mapsService.getAddressCoordinates(address);
    res.status(200).json({coordinates});
  }catch(err){
    res.status(500).json({ message:'Coordinates not found' });
  }
}

module.exports.getDistanceTime=async(req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { origin, destination } = req.query;
  try {
    const distanceTime = await mapsService.getDistanceTime(origin, destination);
    res.status(200).json(distanceTime);
  } catch (err) {
    res.status(500).json({ message: 'Distance and time calculation failed' });
  }
}
module.exports.getAutoSuggestions = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { input } = req.query;
  try {
    const suggestions = await mapsService.getPlaceSuggestions(input);
    res.status(200).json({ suggestions });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get place suggestions' });
  }
}