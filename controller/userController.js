const mongoose = require('mongoose');
const dataSchema = require('../Models/dataModel');
const { success, error } = require("../response-api/responseApi");


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

const getIndUser = async (req, res) => {
    const Model = mongoose.model(req.collectionName, dataSchema);
    try {
        const user = await Model.findOne({ client_username: req.params.username })
        if (!user) {
            res.status(404).json(error("User with this username do not exist", res.statusCode))
        }
        else {
            const doc = await Model.findOne({ client_username: req.params.username })
            if (doc == null) {
                res.status(500).json(error("No user found with username: $user", res.statusCode))
            }
            else {
                res.json(success("OK", { data: doc }, 200))
            }
        }
    } catch (err) {
        res.status(500).json(error("Internal Server Error", res.statusCode))
    }
}

const postUser = (req, res) => {
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
            res.status(422).json(error("registration_id or username duplication ", res.statusCode))
        } else {
            res.status(200).json(success("OK", `${req.body.client_username} is registered.`, res.statusCode))
        }
    })
}

const deleteUser = async (req, res) => {
    const Model = mongoose.model(req.collectionName, dataSchema);
    try {
        const user = await Model.findOne({ client_username: req.params.username })
        if (!user) {
            res.status(404).json(error("User not found", res.statusCode))
        } else {
            await Model.deleteOne({ client_username: req.params.username })
            res.json(success("OK", `${req.params.username} has been deleted.`, 200))
        }
    } catch (err) {
        res.status(500).json(error("Internal Server Error", res.statusCode))
    }
}

const updateUser = async (req, res) => {
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
            try {
                const user = await Model.create(data);
                res.json(success("OK", `New user ${req.body.client_username} is registered.`, res.statusCode));
              } catch (err) {
                res.status(422).json(error("Duplication: registration_id or username already in use", res.statusCode));
              }
        } else {
            await Model.updateMany({ client_username: req.params.username }, { $set: data })
            res.json(success("OK", `${req.params.username} is updated.`, 200))
        }
    } catch (err) {
        res.status(422).json(error("registration_id or username duplication ", res.statusCode))

    }
}
module.exports = { getAllUsers, getIndUser, postUser, deleteUser, updateUser }