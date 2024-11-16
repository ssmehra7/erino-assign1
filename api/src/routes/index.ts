import express from "express"; 

import userRouter from "./user"; 
import authRouter from "./auth";
import contactRouter from "./contact"; 


const router = express.Router(); 




router.use('/user',userRouter); 
router.use('/auth',authRouter);
router.use('/contact',contactRouter); 


export default router;

