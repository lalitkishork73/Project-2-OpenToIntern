const mongoose = require("mongoose")

const CollegeSchema = new mongoose.Schema({
     name : {
         type : String,
         required : true,
         trim :true
     },
     fullName : {
        type : String,
        required : true,
        trim : true
    },
    logoLink : 
     {
         type :String,
         required :true,
     },
     isDeleted :{
        type : Boolean,
        default : false
     }
},{timestamps :true});

const collegeModel = mongoose.model('college', CollegeSchema)

module.exports = collegeModel