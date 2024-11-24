import express, { Request, Response } from "express"; 
import prisma from "../db";
import { authenticateToken } from "../middleware";




const router = express.Router(); 



router.get('/view',authenticateToken,async(request, response)=>{


    try{
      const body = request.body;  //still protected;
      //@ts-ignore
      const userId = request.userId;
      if (!userId){
        return response.status(401).json({
          message:"User not found",
        })
      }

      const contacts = await prisma.contact.findMany({
        where:{
          userId,
        }
      }); 


      return response.status(200).json({
        message:"This is your all contacts", 
        contacts,
      })

    }catch(error){
        
    }
})




router.post('/create',authenticateToken, async (request:Request,response:Response)=>{
    try {
        const {firstName, lastName, email, phone, company, jobTitle}= request.body;
       
        //@ts-ignore
        const userId = request.userId; 
       
        
        console.log(userId); 



        if(!userId){
            return response.status(404).json({
                message:"User not logged in",
            })
        }
    

        const contact = await prisma.contact.create({
            data:{
                firstName, 
                lastName, 
                email, 
                phone, 
                company,
                jobTitle,
                //@ts-ignoreE
                // userId:request.user.userId,
                userId,
    
            }
        })

        return response.status(200).json({
            message:"contact created successfully",
            contact,
        })
    } catch (error) {
        return response.status(500).json({
            message:"ERROR_CREATE_CONTACT"
        })
    }

    

})



router.put('/update/:id',authenticateToken, async (request, response) => {


    try {
    
      const { id } = request.params; 
      const updateData = request.body; 
      // const userId = updateData.userId; //after do it using jwt
      //@ts-ignore
      const userId = request.userId;

      if(!userId){
        return response.status(404).json({
            message:"User not logged in",
        })
    }

  
     
      const existingContact = await prisma.contact.findUnique({
        where: { id },
      });
  
      if (!existingContact) {
        return response.status(404).json({
          message: "CONTACT_NOT_FOUND",
        });
      }
  
      
      const updatedContact = await prisma.contact.update({
        where: { id },
        data: updateData, 
      });
  
      return response.status(200).json({
        message: "Contact updated successfully",
        updatedContact,
      });
    } catch (error) {
      console.error("Error updating contact:", error);
      return response.status(500).json({
        message: "ERROR_UPDATE_CONTACT",
      });
    }
  });


  router.delete('/delete/:id',authenticateToken, async (request, response) => {
    try {
      const { id } = request.params; 
      //@ts-ignore
      const userId = request.userId; 
      console.log(userId); 


      if (!userId){
        return response.status(404).json({
            message:"You are not authorized to delete",
        })
      }
  
      
      const existingContact = await prisma.contact.findUnique({
        where: { id },
      });
  
      if (!existingContact) {
        return response.status(404).json({
          message: "CONTACT_NOT_FOUND",
        });
      }
  
   
      await prisma.contact.delete({
        where: { id },
      });
  
      return response.status(200).json({
        message: "Contact deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting contact:", error);
      return response.status(500).json({
        message: "ERROR_DELETE_CONTACT",
      });
    }
  });
  
  

  export default router; 