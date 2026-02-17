import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Login user (email-based for now)
router.post('/login', async (req, res) => {
    try {
        const { email, role } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Please provide an email' });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if role matches if provided (case-insensitive)
        if (role && user.role.toLowerCase() !== role.toLowerCase()) {
            return res.status(401).json({
                message: 'Unauthorized role',
                error: `User role is ${user.role}, but requested ${role}`
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'secret_aiauto',
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('❌ Error during login:', err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
