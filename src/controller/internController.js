const internModel = require("../Model/internModel");
const collegeModel = require("../Model/collegeModel");

const createIntern = async function (req, res) {
  try {
    let data = req.body;
    
    //  body validtion
    if (!Object.keys(data).length)
      return res
        .status(400)
        .send({ status: false, message: "requst body is empty" });

    
        let checkCollegeId=await collegeModel.findOne({name:data.collegeName}) //we are taking clg name from db and storing it in checkCollegeId
        if(!checkCollegeId)
        return res.status(404).send({status:false,msg:"Colllege Not found"})
        req.body.collegeId=checkCollegeId._id //we r requsting college name in body and we r getting the result for exixting clg id

    // Name  validation
    if (!data.name)
      return res
        .status(400)
        .send({ status: false, message: "Name must be entered" });
        if (!data.name.trim().match(/^[a-zA-Z]+$/))
       return res.status(400).send({status:false,msg:"enter a valid name"})


    // email id vaildation
    if (!data.email)
      return res
        .status(400)
        .send({ status: false, message: "email must be entered" });
    if (
      !/^[A-Za-z0-9_]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/.test(
        data.email.trim()
      )
    )
      return res
        .status(400)
        .send({ status: false, msg: "Enter a valid email address." });

    let isRegisteredemail = await internModel.find({ email: data.email });
    if (isRegisteredemail.length) //it ll not show dupilcacy msg 
      return res
        .status(400)
        .send({ status: false, message: "emailid already used or register" });

    //  mobile number  validation
    if (!data.mobile.trim().match(/^(\+\d{1,3}[- ]?)?\d{10}$/))
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid mobile number" });

    let isRegisteredMobile = await internModel.find({ mobile: data.mobile });
    if (isRegisteredMobile.length)
      return res
        .status(400)
        .send({ status: false, message: " mobile number is already register" });

     let createIntern = await internModel.create(data);
    return res.status(201).send({ status: true, data: createIntern });
  } catch (err) {
    //console.log(err.error)
    return res.status(500).send({ status: false, msg: err.message });
  }
};
module.exports.createIntern = createIntern;
