import bcrypt from "bcrypt"

import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { signupSchema,loginSchema } from "../utils/Joi.js";

// ** Signup Controller **
const signup = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, description, password } = req.body;
  
  if(!name||!email||!password||!phoneNumber||!description){
    return res.status(400).json({message:"All fields are required!"})
  }
    const existingUser = await User.findOne({ email });
    console.log(existingUser)
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = new User({
      name,
      email,
      phoneNumber,
      description,
      password: hashedPassword 
    });
  
    await user.save();
    res.status(201).json({ user,message: 'User created successfully', success: true });
  });


// ** Login Controller **
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    req.session.userId = user._id;
    req.session.isAuthenticated = true;
  
    res.status(200).json({user, message: 'Login successful', success: true });
  });



// ** Logout Controller **
const logout = asyncHandler((req, res) => {
  // Destroy the session
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }
    res.status(200).json({ message: 'Logout successful' ,success:true});
  });
});

const getUser = asyncHandler(async (req, res) => {
    // Ensure the user is authenticated
    if (!req.session.isAuthenticated) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
  
    // Find the user by ID from session
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // Return user details without the password
    res.status(200).json({user,success:true
    });
  });


export {login,logout,signup,getUser}