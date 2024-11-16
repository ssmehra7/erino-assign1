import express from "express";
import cors from "cors" ;
import mainRouter from "./routes/index";







const app = express(); 

//necessary middlewares


app.use(cors());
app.use(express.json());



app.use('/api/v1',mainRouter);

app.listen(8080,()=>{
    console.log("App is listening on 8080");
})