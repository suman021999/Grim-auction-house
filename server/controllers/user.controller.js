import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import {User} from '../models/user.models.js';





export const registerAccount = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  
})
export const loginAccount  = asyncHandler(async (req, res) => {})

export const admin  = asyncHandler(async (req, res) => {})

export const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  
  res.status(200).json({ message: 'Logged out successfully' });
});



