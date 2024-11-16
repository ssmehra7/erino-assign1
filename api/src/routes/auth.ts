import express, { Request, Response } from "express";
import prisma from "../db";
import jwt from "jsonwebtoken"; 

const router = express.Router();

router.post('/signup', async (request: Request, response: Response) => {
  try{
    const body = request.body;

  const { username, email, password } = body;

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (user) {
    return response.status(400).json({
      message: "User already existed"
    });
  }

  const newUser = await prisma.user.create({
    data: {
      userName: username,
      email,
      password
    }
  });

  return response.status(200).json({
    message: "User created successfully",
    newUser
  });
  }catch(error){
    console.log(error); 
    response.status(500).json({
      message:"ERROR SIGNUP_PROCESS"
    })
  }
});


//------------------------------------------signin---------------------------------------------

router.post('/signin',async (request,response)=>{
    try {
        const body = request.body; 
        const {email,password} = body; 

        const user = await prisma.user.findUnique({
          where:{
            email
          }
        }); 

        if (!user) {
          return response.status(401).json({
            message:"User with email not found", 
          })
        }

        if(!(password === user.password)){
          return response.status(403).json({
            message:"Password is not correct",
          })
        }

        const payload = {userId:user.id}; 

        const token = jwt.sign(payload,"jwt_secret",{expiresIn:"1h"}); 

        return response.status(200).json({
          message:"User logged in successfully", 
          user,
          token
        })

        

    } catch (error) {
      
    }
})

export default router;
