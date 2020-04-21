const express=require('express')
const Student=require('./Routes/Student')
const helmet=require("helmet")
const compression=require("compression")
const app=express()
const cors=require("cors")
app.use(helmet())
app.use(compression())
app.use(express.json())

app.use(cors())
app.use('/Student',Student)
app.listen(process.env.PORT,()=>{console.log("Listening")})



