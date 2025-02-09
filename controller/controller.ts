import  Express, {Request, Response}  from "express";
import User from "../models/user.model";
import { CreateUserDto } from "../models/user.dto";
import bcrypt from "bcryptjs"

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
  
      // Check if email exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        res.status(400).json({ message: "Email already exists" });
        return;
      }
  
      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      userData.password = hashedPassword;
  
      // Create user
      const newUser = new User(userData);
      await newUser.save();
  
      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
  
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }
  
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };