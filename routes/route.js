const express = require('express');
const router = express.Router();
const { getAllUsers, getIndUser, postUser, deleteUser, updateUser } = require('../controller/userController');
const {checkOwnership} = require("../middleware/checkOwnership")

//Get all data
router.get('/:ownership', checkOwnership, getAllUsers )


//Get data by username
router.get('/:ownership/:username', checkOwnership, getIndUser);

//post data
router.post('/:ownership', checkOwnership, postUser);


//delete by username
router.delete('/:ownership/:username', checkOwnership, deleteUser)


//update by username
router.put('/:ownership/:username', checkOwnership, updateUser)

module.exports = router;