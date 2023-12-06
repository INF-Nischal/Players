const express = require('express');
const router = express.Router();
const { registerUser, getUsers, deleteUser } = require('../controllers/userController');

router.get('/users', getUsers);

router.post('/register', registerUser);

router.delete('/delete/:id', deleteUser);

module.exports = router;