import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const allowedRoutes = ["/api/user/signin", "/api/user/signup"];
    if (allowedRoutes.includes(req.url)) {
        return next();
    } 
    else 
    {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            if (token) {
                try {
                    const decoded:JwtPayload | string = jwt.verify(token, jwtSecret);
                    const currentTime=Math.floor(Date.now()/1000);
                    if( decoded && typeof decoded !=='string')
                    {
                        if(decoded.exp && currentTime>decoded.exp)
                        {
                            return res.status(401).json({message : "token Expired Login Again."});
                        }
                        else
                        {
                            req.body.uid=decoded.id;
                            req.body.email=decoded.email;
                           return next();
                        }
                    }
                } catch (err) {
                   return res.status(401).json({ message: "Invalid Token." });
                }
            } else {
               return res.status(401).json({ message: "Token not provided." });
            }
        } else {
           return res.status(401).json({ message: "Authorization header not provided." });
        }
    }
};

export default authenticateUser