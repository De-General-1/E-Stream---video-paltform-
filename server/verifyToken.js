import jwt from "jsonwebtoken"
import {createError} from "./error.js"

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token
    if(!token) return next(createError(401, "You are not authenticated"))

    jwt.verify(token, process.env.JWT, (err,user) => {
        if(err) return next(createError(402, "Token is not valid"))
        req.user = user;
        next()
    });
}


export const requireAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'Admin access required' });
    }
};