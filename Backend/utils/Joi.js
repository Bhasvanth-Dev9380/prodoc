import Joi from 'joi';

// Signup validation schema
const signupSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(10).max(15).required(),
  description: Joi.string().min(10).max(700).required(),
  password: Joi.string().min(6).max(1024).required()
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(1024).required()
});


export {signupSchema,loginSchema}