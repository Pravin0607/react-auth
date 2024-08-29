import { Router } from "express";

const userRouter = Router();

userRouter.get('/signin',(req,res)=>{
    res.send('Hello World! are you ready');
})

export default userRouter;