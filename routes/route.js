const express = require("express");
const router = express.Router();
const {
  postUser,
  deleteUser,
  updateUser,
  postUsers,
  getUser,
  getAllUser,
} = require("../controller/userController");

//Get all data
router.get("/all", getAllUser);

//Get data
router.get("/", getUser);

//post data
router.post("/", postUser);

//post json data
router.post("/post", postUsers);

//delete by username
router.delete("/:username", deleteUser);

//update by username
router.put("/:username", updateUser);

module.exports = router;
