const mongoose=require('mongoose')

const connectToURLMongoDB=async(url)=>{
    return mongoose.connect(url)
}

module.exports={
    connectToURLMongoDB
}