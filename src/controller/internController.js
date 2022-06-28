const intern = require("../Model/internModel")
const college =require("../Model/collegeModel")

const createIntern = async function(req,res) {
   try { 
      let data = req.body;
       //************Here i am writtne validation*********** */

       

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
