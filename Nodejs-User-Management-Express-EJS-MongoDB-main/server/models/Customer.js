const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  tel: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: false,
  },
  Department: {
    type: String,
    required: false,
  },
  empno: {
    type: String,
    required: false,
  },
  porc: {
    type: String,
    enum: ["permanent", "contract", "Select"],
    required: false,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Select"],
    required: false,
  },
  designation: {
    type: String,
    required: false,
  },
  qualification: {
    type: String,
    required: false,
  },
  yog: {
    type: Date,
    required: false,
  },
  doj: {
    type: Date,
    required: false,
  },
  aadharno: {
    type: String,
    required: false,
  },

  panno: {
    type: String,
    required: false,
  },

  vanno: {
    type: String,
    required: false,
  },

  pfno: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  remarks: {
    type: String,
    required: false,
  },
  prevexp: {
    type: String,
    required: false,
  },
  arrisexp: {
    type: String,
    required: false,
  },
  totexp: {
    type: String,
    required: false,
  },
  prevcompname: {
    type: String,
    required: false,
  },
  accno: {
    type: String,
    required: false,
  },
  ifsc: {
    type: String,
    required: false,
  },
  bankname: {
    type: String,
    required: false,
  },
  bankid: {
    type: String,
    required: false,
  },
  dlname: {
    type: String,
    required: false,
  },
  dlemail: {
    type: String,
    required: false,
  },
  dlph: {
    type: String,
    required: false,
  },
  ecpname: {
    type: String,
    required: false,
  },
  ecpnumber: {
    type: String,
    required: false,
  },
  emailSent6Months: {
    type: Boolean,
    default: false,
  },
  emailSent1Year: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
