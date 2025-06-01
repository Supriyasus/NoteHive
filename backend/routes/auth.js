const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middlewares/fetchuser'); // Middleware to fetch user from JWT token

const JWT_SECRET = process.env.JWT_SECRET

const User = require('../models/User');
// ROUTE 1: This route is for creating a new user at api/auth/createUser
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
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword
    });
    // Create a JWT token for the user
    const payload = {
        user: {
            id: user.id
        }
    };
    const authToken = jwt.sign(payload, JWT_SECRET);
    // Send the token in the response
    res.json({ authToken });
    res.status(201).json({ message: 'User created successfully', user });
});

// ROUTE 2: This route is for logging in a user at api/auth/login
router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').exists().withMessage('Password is required')
    ],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// ROUTE 3: This route is for getting the logged-in user details at api/auth/getUser
router.get('/getUser',fetchuser, async (req, res) => {
    const userId = req.user.id; 
    try {
        const user = await User.findById(userId).select('-password'); // Exclude password from response
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;