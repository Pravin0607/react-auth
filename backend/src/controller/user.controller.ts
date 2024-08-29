import { Request, Response } from "express";
import User from "../model/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const SignUpUser=async (req:Request,res:Response)=>{
    const {firstName,lastName,email,password}=req.body;
    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({message:'All fields are required'});
    }
    try{
        // check if user already exists
        const user=await User.find({email:email});
        if(user)
        {
            return res.status(401).json({message:'User Already Available'});
        }
        else
        {
            // generate hash of password
            bcrypt.hash(password,10,async (err,hash)=>{
                const user=new User({
                    firstName,
                    lastName,
                    email,
                    passwordHash:hash
                });

                // save user to db
                const resp=await user.save();
                const jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    return res.status(500).json({ message: 'Failed to create User!' });
                }
    
                const token = jwt.sign(
                    { firstName, lastName, email, id: resp._id },
                    jwtSecret,
                    { expiresIn: '1d' }
                )
                // send jwt with response
                return res.status(200).json({message:"User Created Succesfully!",token:`bearer ${token}`})
            })
        }
    }
    catch(err){
        if(err instanceof Error)
        {
            console.log(err.message);
            res.status(500).json({message:err.message});
        }
    } 
}

export const SignInUser=async(req:Request,res:Response)=>{
    console.log(req.body);
    res.status(200).json({message:'Signing in user',data:{...req.body}})   
}