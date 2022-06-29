const internModel = require("../Model/internModel");
const collegeModel = require("../Model/collegeModel");

const createIntern = async function (req, res) {
  try {
    let data = req.body;
    //************Here i am writtne validation*********** */
    //  body validtion
    if (!Object.keys(data).length)
      return res
        .status(400)
        .send({ status: false, message: "requst body is empty" });

    //  College Name Validation
    /*  if (!data.collegeName)
      return res
        .status(400)
        .send({ status: false, message: "College name is Required" });

    if (!data.collegeName.trim().match(/^[a-zA-Z]+$/))
      return res
        .status(400)
        .send({ status: false, message: "name should be is correct format" }); */

    let checkCollegeName = await collegeModel.find({ name: data.name });
    if (!checkCollegeName)
      return res
        .status(400)
        .send({ status: false, message: "Your college is not registered" });

    // Name  validation
    if (!data.name)
      return res
        .status(400)
        .send({ status: false, message: "Name must be entered" });

    if (!data.name.trim().match(/^[a-zA-Z,\s]*$/))
      return res
        .status(400)
        .send({ status: false, message: "name should be is correct format" });

    // Email id vaildation
    if (!data.email)
      return res
        .status(400)
        .send({ status: false, message: "Email must be entered" });
   /*  if (
      !/^[A-Za-z0-9_]{3,11},@[A-Za-z]{3,6},[.]{1}[A-Za-z.]{2,6}$/.test(
        data.email.trim()
      )
    )
      return res
        .status(400)
        .send({ status: false, message: "Email should be in correct format" }); */

    let isRegisteredEmail = await internModel.find({ email: data.email });
    if (isRegisteredEmail.length)
      return res
        .status(400)
        .send({ status: false, message: "Email id is alerady used or register" });

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

    //******************************************************** */

    let getData = await collegeModel.findOne({ name: data.collegeName}).select({ _id: 1 })

    if (!getData) return res.status(404).send({ status: false, message: "Enter a valid college name" })

    data.collegeId = getData._id; //adding new element "collegeId" in object data.
    
    let showInterData = await internModel.create(data);
    res.status(201).send({ status: true, massage: showInterData });
     data.collegeName._id;
    let createIntern = await internModel.create(data);
    return res.status(201).send({ status: true, data: createIntern });
  } catch (err) {
    return res.status(500).send({ status: true, msg: err.message });
  }
};
module.exports.createIntern = createIntern;
