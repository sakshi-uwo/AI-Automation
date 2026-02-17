import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// @route   POST /api/signup
// @desc    Create a new user (signup)
router.post('/signup', async (req, res) => {
    try {
        const { name, email, role } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: 'Please provide name and email' });
        }

        // Validate role if provided
        const validRoles = ['Admin', 'Builder', 'Civil Engineer', 'Site Manager', 'Client'];
        if (role && !validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role selected' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json(existingUser); // Return existing user
        }

        const newUser = new User({
            name,
            email,
            role: role || 'Client',
            status: 'Active'
        });

        const savedUser = await newUser.save();
        console.log('✅ New user signed up:', savedUser.name, 'as', savedUser.role);

        res.status(201).json(savedUser);
    } catch (err) {
        console.error('❌ Error during signup:', err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/users
// @desc    Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error('❌ Error fetching users:', err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/users
// @desc    Create a new user and emit socket event
router.post('/', async (req, res) => {
    try {
        const { name, email, role, status } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: 'Please provide name and email' });
        }

        const newUser = new User({
            name,
            email,
            role: role || 'Client',
            status: status || 'Active'
        });

        const savedUser = await newUser.save();

        // Emit socket event
        const io = req.app.get('io');
        if (io) {
            io.emit('newUser', savedUser);
            console.log('📢 Real-time event emitted: newUser', savedUser._id);
        }

        res.status(201).json(savedUser);
    } catch (err) {
        console.error('❌ Error saving user:', err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PATCH /api/users/:id
// @desc    Update a user
router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error('❌ Error updating user:', err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
