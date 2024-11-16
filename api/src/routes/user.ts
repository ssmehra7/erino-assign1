
import express from "express"
import { authenticateToken } from "../middleware";
import prisma from "../db";

const router = express.Router(); 




router.get('/',(request,response)=>{


    return response.json({
        message:"Hi from the user home router",
    })
})


router.get('/profile',authenticateToken,async (request,response)=>{
    //@ts-ignore
    const userId =request.userId;

    const user = await prisma.user.findUnique({
        where:{
            id:userId,
        }
    })
   
    return response.json({
        message:"Hi from the user profile",
        user 
    })
})


export default router; 