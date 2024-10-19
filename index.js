const express=require('express');
const urlRouter=require('./routes/url');
const { connectToURLMongoDB } = require('./connection');
const app=express();


const PORT=process.env.PORT || 8000;

//connecting to mongoDB for link-shorted DB
connectToURLMongoDB('mongodb://127.0.0.1:27017/link-shorter')
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((error)=>{
    console.error("Error while connecting",error)
})

//middleware to parse json input
app.use(express.json())

//routing for URL
app.use('/url',urlRouter)


//listening the server at 8000
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})