require("dotenv").config()
const mongoose = require("mongoose");
const connectionToDatabase = async()=>{
    const mongoUri = process.env.MONGODB_URI;
    console.log("uro==>", mongoUri)
    if(!mongoUri){
        console.log("Mongodb uri is missing !!")
    
    }
    try {
        await mongoose.connect(mongoUri);
        console.log("database connected seuccesfully===>")
    }catch(erro){
        console.log("Mongodb connection failed===>",erro.message)
    }
}

module.exports = connectionToDatabase