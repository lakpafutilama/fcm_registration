const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    registration_id: { type: String },
    client_username: { type: String, unique: true, required: true },
    device_os: { type: String },
    device_name: { type: String },
    app_version: { type: String },
    app_version_code: { type: String },
    logged_cell_number: { type: String || Number },
    enable: { type: String },
    blacklist: { type: String },
  },
  { timestamps: true }
);

module.exports = dataSchema;
