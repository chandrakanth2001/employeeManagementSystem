const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
    },
    course: {
      type: [String],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true } // This enables the 'createdAt' and 'updatedAt' fields
);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
