const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    registration_id: {type:Number, required: [true, 'Registration id must be provided']},
    client_username: {type:String, unique: true, uniqueCaseInsensitive: true, required: [true, 'Username must be provided']},
    ip: {type:String},
    status: {type:Number},
    app_version: {type:Number, required: [true, 'App version must be provided']},
    app_version_code: {type:String, required: [true, 'App version code must be provided']},
    device_os: {type:String, required: [true, 'Device os must be provided']},
    device_name: {type:String, required: [true, 'Device name must be provided']}
}, {timestamps: true});

module.exports = dataSchema