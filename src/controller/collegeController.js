const collegeModel = require("../Model/collegeModel");
const internModel = require("../Model/internModel");

const createCollege = async function (req, res) {
  try {
    // ********************************Validation****************************************************
    const data = req.body;

    if (!Object.keys(data).length)
      return res
        .status(400)
        .send({ status: false, message: "You must enter data" });

    if (!data.name)
      return res
        .status(400)
        .send({ status: false, message: "You must be enter your college name" });
    if (!data.name.trim().match(/^[a-zA-Z]+$/))
      return res.status(400).send({ status: false, meg: "Enter a valid name" });

    if (!data.fullName)
      return res
        .status(400)
        .send({ status: false, message: "Enter the Full name" });

    if (!data.fullName.trim().match(/^[a-zA-Z,\-,\s]*$/))
      return res
        .status(400)
        .send({ status: false, msg: "Enter a valid FullName" });

    if (!data.logoLink)
      return res
        .status(400)
        .send({ status: false, message: "please provide logolink" });

    if (
      !data.logoLink
        .trim()
        .match(
          /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%.\+#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.#?&//=]*)$/
        )
    )
      return res
        .status(400)
        .send({ status: false, message: "Enter the valid logo Link" });

    //******************************************************************************************* */
    let createCollege = await collegeModel.create(data);
    return res.status(201).send({ status: true, data: createCollege });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

const collegeDetails = async function (req, res) {
  try {
    const info = req.query.collegeName;
    if (!info)
      return res
        .status(400)
        .send({ status: false, message: "Please Enter College Name" });

    const college = await collegeModel.findOne({
      name: info,
      isDeleted: false,
    });
    if (!college)
      return res.status(404).send({
        status: false,
        message: "Did not found college with this name.",
      });

    const { name, fullName, logoLink } = college;

    const data = { name, fullName, logoLink };


    const collegeIdFromcollege = college._id;

    console.log(collegeIdFromcollege);

    const internList = await internModel.find({
      collegeId: collegeIdFromcollege,
      isDeleted: false,
    }).select({__id:1,name:1,email:1,mobile:1});
    

    if (internList.length == 0)
      return res.status(404).send({
        status: false,
        message: `We Did not Have Any Intern With ${info} College`,
      });

    data["intern"] = internList;
    res.status(200).send({ status: true, data: data });
  } catch (err) {
    res.status(500).send({
      status: false,
      msg: "Server not responding",
      error: err.message,
    });
  }
};

module.exports.createCollege = createCollege;
module.exports.collegeDetails = collegeDetails;
