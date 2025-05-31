const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
// This route is for creating a new user at api/auth/createUser
router.post('/createUser', [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
    ],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // If validation passes, proceed with saving the user
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ error: 'User with this email already exists' });
    }
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    res.status(201).json({ message: 'User created successfully', user });
});

module.exports = router;