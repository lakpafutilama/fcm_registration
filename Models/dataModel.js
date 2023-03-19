const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    // REGISTRATION_ID: {type:String, unique: true, uniqueCaseInsensitive: true, required: [true, 'Registration id must be provided']},
    // CLIENT_USERNAME: {type:String, unique: true, uniqueCaseInsensitive: true, required: [true, 'Username must be provided']},
    REGISTRATION_ID: {type:String},
    // CLIENT_USERNAME: {type:String},
    CLIENT_USERNAME: {type:String, unique: true, uniqueCaseInsensitive: true, required: [true, 'Username must be provided']},
    DEVICE_OS: {type:String},
    DEVICE_NAME: {type:String},
    APP_VERSION: {type:String},
    APP_VERSION_CODE: {type:String},
    LOGGED_CELL_NUMBER: {type:String || Number},
    ENABLE: {type:String},
    BLACKLIST: {type:String}    
}, {timestamps: true});

module.exports = dataSchema