const mongoose = require("mongoose");
const dataSchema = require("../Models/dataModel");
const { success, error } = require("../response-api/responseApi");

const jsonData = require("../resources/dummy_data");

const schemaData = [
  "registration_id",
  "client_username",
  "device_os",
  "device_name",
  "app_version",
  "app_version_code",
  "logged_cell_number",
  "enable",
  "blacklist",
];

//Get all user's data
const getAllUser = async (req, res) => {
  const Model = mongoose.model(req.collectionName, dataSchema);
  try {
    const user = await Model.find();
    if (user.length == 0) {
      res.status(404).json(error("No data in database", res.statusCode));
    } else {
      res.json(success("OK", user, 200));
    }
  } catch (err) {
    res.status(500).json(error("Internal Server Error", res.statusCode));
  }
};

//Get filtered user's data
const getUser = async (req, res) => {
  const Model = mongoose.model(req.collectionName, dataSchema);
  try {
    const filterReq = req.query.filter;
    let keys = Object.keys(filterReq);
    const invalidKeys = keys.filter((key) => !schemaData.includes(key));
    if (invalidKeys.length > 0) {
      res.status(400).json(error("Wrong parameter", res.statusCode));
    } else {
      const Users = await Model.find(filterReq);
      if (Users.length == 0) {
        res.status(404).json(error("Not found", res.statusCode));
      } else {
        res.json(success("OK", Users, 200));
      }
    }
  } catch (err) {
    res.status(500).json(error("Cannot get", res.statusCode));
  }
};

//Post an new user
const postUser = async (req, res) => {
  const Model = mongoose.model(req.collectionName, dataSchema);
  try {
    await Model.create(req.body);
    res
      .status(200)
      .json(
        success(
          "OK",
          `${req.body.client_username} is registered`,
          res.statusCode
        )
      );
  } catch (err) {
    res.status(422).json(error("Username mismatch", res.statusCode));
  }
};

//Delete an user
const deleteUser = async (req, res) => {
  const Model = mongoose.model(req.collectionName, dataSchema);
  try {
    const user = await Model.findOne({ client_username: req.params.username });
    if (!user) {
      res.status(404).json(error("User not found", res.statusCode));
    } else {
      await Model.deleteOne({ client_username: req.params.username });
      res.json(success("OK", `${req.params.username} is deleted.`, 200));
    }
  } catch (err) {
    res.status(500).json(error("Internal Server Error", res.statusCode));
  }
};

//Update a user's data or create new user
const updateUser = async (req, res) => {
  const Model = mongoose.model(req.collectionName, dataSchema);
  try {
    const user = await Model.findOne({ client_username: req.params.username });
    if (!user) {
      try {
        await Model.create(req.body);
        res.json(
          success(
            "OK",
            `New user ${req.body.client_username} is registered`,
            res.statusCode
          )
        );
      } catch (err) {
        res.status(422).json(error("Username mismatch", res.statusCode));
      }
    } else {
      await Model.updateMany(
        { client_username: req.params.username },
        { $set: req.body }
      );
      res.json(success("OK", `${req.params.username} is updated`, 200));
    }
  } catch (err) {
    res.status(422).json(error("Username mismatch", res.statusCode));
  }
};

//Post multiple users
const postUsers = async (req, res) => {
  const Model = mongoose.model(req.collectionName, dataSchema);
  Model.insertMany(jsonData);
  res.status(200).json(success("OK", "Success", res.statusCode));
};

module.exports = {
  getAllUser,
  getUser,
  postUser,
  deleteUser,
  updateUser,
  postUsers,
};
