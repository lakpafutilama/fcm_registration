const {error} = require("../response-api/responseApi");

require("dotenv").config();

ownerShipArray = process.env.ownerShipArray;

function checkOwnership(req, res, next) {
  const collectionName = req.params.ownership;
  if (ownerShipArray.includes(collectionName)) {
    req.collectionName = collectionName; // set the collection name in the request object
    next();
  } else {
    res.status(403).json(error("Forbidden", res.statusCode));
  }
}

module.expotrs = {checkOwnership}