const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  phoneNumber: { type: Number, required: true },
  address: { type: String, reqyired: true },
  bloodGroup: { type: String, required: true },
  department: { type: String, required: true },
  batch: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
