const mongoose = require("mongoose");

const url  = process.env.DATABASE_URL;

const connectdb = async ()=>{

    try {
     const response =  await mongoose.connect(url);
          if(response){
        console.log("connected to database successfully");
     }
    } catch (error) {
        console.error("Database Connection failed");
        process.exit(0);
    }
}

module.exports = connectdb;
