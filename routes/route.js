const express = require("express");
const router = express.Router();
const {
  postUser,
  deleteUser,
  updateUser,
  postUsers,
  getUser,
} = require("../controller/userController");
const { checkOwnership } = require("../middleware/checkOwnership");

//Get data
router.get("/:ownership", checkOwnership, getUser);

//post data
router.post("/:ownership", checkOwnership, postUser);

//post json data
router.post("/:ownership/post", checkOwnership, postUsers);

//delete by username
router.delete("/:ownership/:username", checkOwnership, deleteUser);

//update by username
router.put("/:ownership/:username", checkOwnership, updateUser);

module.exports = router;
