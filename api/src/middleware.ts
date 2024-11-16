import { NextFunction, Request,Response } from "express"
import jwt from "jsonwebtoken"




export const authenticateToken = (request:Request,response:Response,next:NextFunction)=>{
    //@ts-ignore
    const authHeader:string = request.header.authorization; 
    const token = authHeader && authHeader.split(" ")[1]; 
    if (!token) {
        return response.status(401).json({ message: "Access denied, token missing" });
      }
    
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
        //@ts-ignore
        request.user = decoded; // Attach the decoded user data to the request object
        next();
      } catch (error) {
        return response.status(403).json({ message: "Invalid token" });
      }

}