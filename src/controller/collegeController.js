const collegeModel = require("../Model/collegeModel");
const { intern } = require("./internController");

const createCollege = async function (req, res) {
  try {
    
    // ********************************Validation****************************************************
    const data = req.body;
    if(!Object.keys(data).length)
     return res.status(400).send({ status :false, message: "You most enter data"})

     if(!data.name) return res.status(400).send({status:false, message :"You mast be enter your name"})
     if((!data.name.trim().match(/^[a-zA-Z]+$/)))
        return res.status(400).send({status: false, meg :"Enter a valid name"})

     if(!data.fullName)   
       return res.status(400).send({status :false,message : "Enter the Full name"})

     if(!data.fullName.trim().match(/^[a-zA-Z,\-,\s]*$/))
       return res.status(400).send({status : false,msg : "Enter a valid FullName"})
     
    if(!data.logoLink)
       return res.status(400).send({status :false,message : "You Enter the logo link"})
       
       if (!data.logoLink.trim().match(/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%.\+#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.#?&//=]*)$/)) 
            return res.status(400).send({status : false, message : "Enter the valid logo Link"})  
     
     //******************************************************************************************* */
    let createCollege = await collegeModel.create(data);
         return res.status(201).send({ status: true, data: created });
  } catch (err) {
        return  res.status(500).send({ status: false, msg: err.message });
  }
}




const  getcollege = async function (req ,res){
    let  getData = req.body 

    if(!getData.collegeName)
      return res.send.status(400).send({status :false , message : "You most be enter  the collge  Name"})

    let findCollge = await college.findOne({name : getData.collegeName })
    
    if(!findCollge)
     return res.status(404).send({status :false , message : " Your college is not registeed with us"})

    let collegeId = findCollge._id
      let findIntern = await intern.find({ college :collegeId, isDeleted :false }).select({_id : 1,name : 1, email :1 , mobile:1})

      return res.status(200).send ({ status : true,
        data : {
             "name" : findCollge.name,
             "fullName" :findCollge.fullName,
             "logoLink":findCollge.logoLink,
             "interests":findIntern
        }
     })
}

module.exports.createCollege = createCollege;
module.exports.getcollege =getcollege;