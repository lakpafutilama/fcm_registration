const mongoose = require('mongoose');
require("dotenv").config();


mongoose.set('strictQuery', true);

const uri = process.env.URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
},(err)=>{
    if(err){  
        console.log("No connection: error: "+err);
    }else{
        console.log("Connection successful");

    }
});
module.exports = mongoose;