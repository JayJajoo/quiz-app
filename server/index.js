const express=require("express")
const cors=require("cors")
const bodyparser=require("body-parser")
const userRouter=require("./Routes/userRoutes")
const mongoose=require("mongoose")

const app=express()

app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({
    extended:false,
}))

app.use("/api/auth",userRouter)

require("dotenv").config()

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Database connection Successful");
}).catch((err)=>{
    console.log(err)
})

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server started on port ${process.env.PORT}`)
})