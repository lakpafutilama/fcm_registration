const express = require('express');
const router = express.Router();
const dataSchema = require('../Models/collections');
const mongoose = require('mongoose');

require("dotenv").config();

const {success, error} = require("../response-api/responseApi")

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


//Get all data
router.get('/:ownership', checkOwnership, (req, res) => {
  const Model = mongoose.model(req.collectionName, dataSchema);
  Model.find().then((data) => {
    if (!data.length) {
      res.status(400).json(error("Error in data entry", res.statusCode))
    } else {
      res.status(200).json(success("OK", data, res.statusCode))
    }
  })
})


//Get data by username
router.get('/:ownership/:username', checkOwnership, async (req, res) => {
  const Model = mongoose.model(req.collectionName, dataSchema);
  try {
    const user = await Model.findOne({ client_username: req.params.username })
    if (!user) {
      res.status(404).json(error("User do not exist", res.statusCode))
    }
    else {
      const doc = await Model.findOne({ client_username: req.params.username })
      if (doc == null) {
        res.status(500).json(error("User not found", res.statusCode))
      }
      else {
        res.json(success("OK", { data: doc }, 200))
      }
    }
  } catch (err) {
    res.status(500).json(error("Internal Server Error", res.statusCode))
  }
});

//post data
router.post('/:ownership', checkOwnership, (req, res) => {
  const Model = mongoose.model(req.collectionName, dataSchema);
  const data = new Model({
    registration_id: req.body.registration_id,
    client_username: req.body.client_username,
    ip: req.body.ip,
    status: req.body.status,
    app_version: req.body.app_version,
    app_version_code: req.body.app_version_code,
    device_os: req.body.device_os,
    device_name: req.body.device_name
  });
  data.save((err, doc) => {
    if (err) {
      res.status(422).json(error("User with this username already exist", res.statusCode))
    } else {
      res.status(200).json(success("OK", { data: doc }, res.statusCode))
    }
  })
});


//delete by username
router.delete('/:ownership/:username', checkOwnership, async (req, res) => {
  const Model = mongoose.model(req.collectionName, dataSchema);
  try {
    const user = await Model.findOne({ client_username: req.params.username })
    if (!user) {
      res.status(404).json(error("User not found", res.statusCode))
    } else {
      await Model.deleteOne({ client_username: req.params.username })
      res.json(success("OK", req.params.username, 200))
    }
  } catch (err) {
    res.status(500).json(error("Internal Server Error", res.statusCode))
  }
})


//update by username
router.put('/:ownership/:username', checkOwnership, async (req, res) => {
  const Model = mongoose.model(req.collectionName, dataSchema);
  const data = {
    registration_id: req.body.registration_id,
    client_username: req.body.client_username,
    ip: req.body.ip,
    status: req.body.status,
    app_version: req.body.app_version,
    app_version_code: req.body.app_version_code,
    device_os: req.body.device_os,
    device_name: req.body.device_name
  };
  try {
    const user = await Model.findOne({ client_username: req.params.username })
    if (!user) {
      res.status(404).json(error("User not found", res.statusCode))
    } else {
      await Model.updateMany({ client_username: req.params.username }, { $set: data })
      res.json(success("OK", req.params.username, 200))
    }
  } catch (err) {
    console.log(req.params.username)
    res.status(500).json(error("Internal Server Error", res.statusCode))
  }
})

module.exports = router;