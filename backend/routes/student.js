const express = require("express");
const Student = require("../models/student");
const router = express.Router();

router.post("", (req, res, next) => {
  const student = new Student({
    name: req.body.name,
    dateOfBirth: req.body.dateOfBirth,
    bloodGroup: req.body.bloodGroup,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    department: req.body.department,
    batch: req.body.batch,
  });
  student.save().then((createdStudent) => {
    res.status(201).json({
      message: "Student Record Added Sucessfully",
      studentId: createdStudent._id,
    });
  });
});

router.put("/:id", (req, res, next) => {
  const student = new Student({
    _id: req.body.id,
    name: req.body.name,
    dateOfBirth: req.body.dateOfBirth,
    bloodGroup: req.body.bloodGroup,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    department: req.body.department,
    batch: req.body.batch,
  });
  Student.updateOne({ _id: req.body.id }, student).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Student record Updated Sucessfully" });
  });
});

router.get("", (req, res, next) => {
  Student.find().then((student) =>
    res
      .status(200)
      .json({ message: "Fetching Record Sucess", students: student })
  );
});

router.delete("/:id", (req, res, next) => {
  Student.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(201).json({ message: "Deleted Sucessfully" });
  });
});

module.exports = router;
