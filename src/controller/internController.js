const intern = require("../Model/internModel")
const college =require("../Model/collegeModel");
const collegeModel = require("../Model/collegeModel");

const createIntern = async function(req,res) {
   try { 
      let data = req.body;
       //************Here i am writtne validation*********** */
       if(!Object.keys(data).length)
       return res.status(400).send({status:false,message:"requst body is empty"})

      //  if(!data.collegeName)
      //  return res.status(400).send({status:false,message:"College name is Required"})

      //  if(!data.collegeName.trim().match(/^[a-zA-Z]+$/))
      //    return res.status(400).send({status:false,message:"name should be is correct format"})
         
      //    let checkCollegeName= await collegeModel.find({name:data.collegeName})
      //    if(!checkCollegeName)
      //    return res.status(400).send({status:false,message:"Your college is not registered"})

         if(!data.name)
         return res.status(400).send({status:false,message:"Name must be entered"})

         if(!data.name.trim().match(/^[a-zA-Z,\s]*$/))
         return res.status(400).send({status:false,message:"name should be is correct format"})

         if(!email)
         return res.status(400).send({status:false,message:"Email must be entered"})

         if(!data.name.trim().match(/^[a-zA-Z0-9\+]*$/))
         return res.status(400).send({status:false,message:"name should be is correct format"})
         if(!email())
       

      //******************************************************** */
      delete data.collegeName._id
      let created =await intern.create(data)
      return res.status(201).send({status : true , data : created })
   }catch(err) {
    //console.log(err.error)
    return res.status(500).send({status : true , msg: " "})
   }
  }
module.exports.createIntern = createIntern;
