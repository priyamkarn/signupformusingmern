const express = require('express');
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const User = require('../db');
const signupSchema = zod.object({
    name: zod.string().min(1),
    email: zod.string().email(),
    password: zod.string().min(8)
});
router.post('/signup', async (req, res) => {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "Incorrect data submitted",
            errors: result.error.errors 
        });
    }
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            message: "Email already taken"
        });
    }
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ userId: user._id }, "jwtsecret", { expiresIn: '1h' });
    res.cookie('authToken', token);
    res.json({
        message: "User created successfully"
    });
});
module.exports = router;
