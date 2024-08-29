import { Router } from "express";
import { SignInUser, SignUpUser } from "../controller/user.controller";

const userRouter = Router();

userRouter.post('/signup',SignUpUser);
userRouter.post('/signin',SignInUser);
// userRouter.post('/verify-email')
// userRouter.post('/reset-password')

export default userRouter;