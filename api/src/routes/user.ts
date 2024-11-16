
import express from "express"

const router = express.Router(); 




router.get('/',(request,response)=>{


    return response.json({
        message:"Hi from the user home router",
    })
})


router.get('/profile',(request,response)=>{

    console.log("Hi from the profile")
    return response.json({
        message:"Hi from the user profile", 
    })
})


export default router; 