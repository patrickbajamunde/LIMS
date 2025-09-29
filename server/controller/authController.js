import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';

export const register = async (req, res) => { 
    const { name, email, password, role} = req.body;

    if (!name || !email || !password) {
        return res.json({success: false, message: 'Missing Details'})
    }

    try {
        
        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.json({success: false, message: 'User already exists'});
        }
        
        const hashPassword = await bycrypt.hash(password, 10);

        const user = new userModel({
            name,
            email,
            password: hashPassword,
            role
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            secure: process.env.NODE_ENV === 'production',

        });
         
        return res.json({success: true, message: 'User registered successfully'});

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.json({success: false, message: 'Email and password are required'});
    }

    //check if email or password is valid
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success: false, message: 'Invalid email or password'});
        }

        // Check if the password is correct
        // Compare the provided password with the hashed password in the database
        const isMatch = await bycrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({success: false, message: 'Invalid password'});
        }

        // Generate a JWT token
        /*const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            secure: process.env.NODE_ENV === 'production',

        });*/
        
        // Store user info in session
        // make a security fix to prevent session hijacking
        req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
        };
        return res.json({success: true, message:"Login successful", role: user.role});

        

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const logout = async (req, res) => {
    try {
        req.session.destroy();
        return res.json({success: true, message: 'Logged out successfully'});

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const authMiddleware = (req, res, next) => {
    if(req.session && req.session.user) {
        req.user = req.session.user; // Attach user info to the request object
        next();
    } else {
        res.status(401).json({success: false, message: 'Unauthorized'});
    }
}