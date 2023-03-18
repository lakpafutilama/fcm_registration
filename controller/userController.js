const mongoose = require('mongoose');
const dataSchema = require('../Models/dataModel');
const { success, error } = require("../response-api/responseApi");

const jsonData = require('../resources/dummy_data')

//Get all users in a ownership
const getAllUsers = (req, res) => {
    const Model = mongoose.model(req.collectionName, dataSchema);
    Model.find().then((data) => {
        if (!data.length) {
            res.status(400).json(error("Empty database", res.statusCode))
        } else {
            res.status(200).json(success("OK", data, res.statusCode))
        }
    })
}

//Get an user's data
const getIndUser = async (req, res) => {
    const Model = mongoose.model(req.collectionName, dataSchema);
    try {
        const user = await Model.findOne({ CLIENT_USERNAME: req.params.username })
        if (!user) {
            res.status(404).json(error("User with this username do not exist", res.statusCode))
        }
        else {
            const doc = await Model.findOne({ CLIENT_USERNAME: req.params.username })
            if (doc == null) {
                res.status(500).json(error(`No user found with username: ${req.params.username}`, res.statusCode))
            }
            else {
                res.json(success("OK", { data: doc }, 200))
            }
        }
    } catch (err) {
        res.status(500).json(error("Internal Server Error", res.statusCode))
    }
}

//Post an new user
const postUser = (req, res) => {
    const Model = mongoose.model(req.collectionName, dataSchema);
    const data = new Model({
        REGISTRATION_ID: req.body.REGISTRATION_ID,
        CLIENT_USERNAME: req.body.CLIENT_USERNAME,
        DEVICE_OS: req.body.DEVICE_OS,
        DEVICE_NAME: req.body.DEVICE_NAME,
        APP_VERSION: req.body.APP_VERSION,
        APP_VERSION_CODE: req.body.APP_VERSION_CODE,
        LOGGED_CELL_NUMBER: req.body.LOGGED_CELL_NUMBER,
        ENABLE: req.body.ENABLE,
        BLACKLIST: req.body.BLACKLIST
    });
    data.save((err, doc) => {
        if (err) {
            res.status(422).json(error("registration_id or username duplication ", res.statusCode))
        } else {
            res.status(200).json(success("OK", `${req.body.CLIENT_USERNAME} is registered.`, res.statusCode))
        }
    })
}

//Delete an user
const deleteUser = async (req, res) => {
    const Model = mongoose.model(req.collectionName, dataSchema);
    try {
        const user = await Model.findOne({ CLIENT_USERNAME: req.params.username })
        if (!user) {
            res.status(404).json(error("User not found", res.statusCode))
        } else {
            await Model.deleteOne({ CLIENT_USERNAME: req.params.username })
            res.json(success("OK", `${req.params.username} is deleted.`, 200))
        }
    } catch (err) {
        res.status(500).json(error("Internal Server Error", res.statusCode))
    }
}

//Update a user's data or create new user
const updateUser = async (req, res) => {
    const Model = mongoose.model(req.collectionName, dataSchema);
    const data = {
        REGISTRATION_ID: req.body.REGISTRATION_ID,
        CLIENT_USERNAME: req.body.CLIENT_USERNAME,
        DEVICE_OS: req.body.DEVICE_OS,
        DEVICE_NAME: req.body.DEVICE_NAME,
        APP_VERSION: req.body.APP_VERSION,
        APP_VERSION_CODE: req.body.APP_VERSION_CODE,
        LOGGED_CELL_NUMBER: req.body.LOGGED_CELL_NUMBER,
        ENABLE: req.body.ENABLE,
        BLACKLIST: req.body.BLACKLIST
    };
    try {
        const user = await Model.findOne({ CLIENT_USERNAME: req.params.username })
        if (!user) {
            try {
                await Model.create(data);
                res.json(success("OK", `New user ${req.body.CLIENT_USERNAME} is registered.`, res.statusCode));
            } catch (err) {
                res.status(422).json(error("Duplication: registration_id or username already in use", res.statusCode));
            }
        } else {
            await Model.updateMany({ CLIENT_USERNAME: req.params.username }, { $set: data })
            res.json(success("OK", `${req.params.username} is updated.`, 200))
        }
    } catch (err) {
        res.status(422).json(error("registration_id or username duplication ", res.statusCode))
    }
}

//Post multiple users
const postUsers = async (req, res) => {
    const Model = mongoose.model(req.collectionName, dataSchema);
    let countS = 0;
    let countF = 0;
    for (const item of jsonData) {
        const data = new Model({
            REGISTRATION_ID: item.REGISTRATION_ID,
            CLIENT_USERNAME: item.CLIENT_USERNAME,
            DEVICE_OS: item.DEVICE_OS,
            DEVICE_NAME: item.DEVICE_NAME,
            APP_VERSION: item.APP_VERSION,
            APP_VERSION_CODE: item.APP_VERSION_CODE,
            LOGGED_CELL_NUMBER: item.LOGGED_CELL_NUMBER,
            ENABLE: item.ENABLE,
            BLACKLIST: item.BLACKLIST
        });
        try {
            await data.save();
            countS++;
        } catch (err) {
            countF++;
        }
    };
    res.status(200).json(success("OK", `Success: ${countS} and Failure: ${countF}`, res.statusCode));
}


module.exports = { getAllUsers, getIndUser, postUser, deleteUser, updateUser, postUsers }