const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = mongoose.Schema({ 
    name : {
        type : String, 
        require :true,
        trim : true
    },
    email : {
         type :String,
         trim :true,
         unique : true,
         required : true
    },
    mobile : {
        type : String,
        unique :true,
        trim :true,
        required :true

    },
    collegeId : { type : ObjectId,
                 ref: "college" , 
                 required : true },
    
    isDeleted : { type: Boolean,
                default :false }
}, 
{ timestamps : true})

module.exports = mongoose.model('intern', internSchema)