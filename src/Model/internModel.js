const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    collegeId: {
      type: ObjectId,
      required: true,
      ref: "college",
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
 
);

module.exports = mongoose.model("intern", internSchema);
