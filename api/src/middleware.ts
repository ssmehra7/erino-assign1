import { NextFunction, Request,Response } from "express"
import jwt from "jsonwebtoken"




export const authenticateToken = (request:Request,response:Response,next:NextFunction)=>{
    
  const authHeader = request.headers['authorization'] as string | undefined;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.status(403).json({
        message:"authheader is not present"
      });
  }

    const token = authHeader.split(" ")[1]; 
    if (!token) {
        console.log(authHeader);
        return response.status(401).json({ message: "Access denied, token missing" });
      }
    
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "jwt_secret");
        //@ts-ignore
        request.userId = decoded.userId; 
        next();
      } catch (error) {
        return response.status(403).json({ message: "Invalid token" });
      }

}