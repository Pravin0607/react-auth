import { NextFunction, Request, Response } from "express";
import User from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

export const SignUpUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        // check if user already exists
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(401).json({ message: "User Already Available" });
        } else {
            // generate hash of password
            const hash = await bcrypt.hash(password, 10);
            const user = new User({
                firstName,
                lastName,
                email,
                passwordHash: hash,
            });
            // save user to db
            const resp = await user.save();
            const token = jwt.sign(
                { firstName, lastName, email, id: resp._id },
                jwtSecret,
                { expiresIn: "1d" }
            );
            // send jwt with response
            return res.status(200).json({
                message: "User Created Succesfully!",
                token: `Bearer ${token}`,
            });
        }
    } catch (err) {
        next(err);
    }
};

export const SignInUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are Required." });
    }
    try {
        const user = await User.findOne({ email });
        if (user) {
            const result = await bcrypt.compare(password, user.passwordHash);
            if (result) {
                     const token = jwt.sign(
                        {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            id: user._id,
                        },
                        jwtSecret,
                        { expiresIn: "1d" }
                    );
                    return res.status(200).json({
                        message: "Logged in Succesfully.",
                        token: `Bearer ${token}`,
                    });
             } else {
                return res
                    .status(401)
                    .json({ message: "Invalid Credentials." });
            }
        } else {
            return res.status(401).json({ message: "Invalid Credentials." });
        }
    } catch (err) {
        next(err);
    }
};
