const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const multer = require('multer');
const path = require('path');

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new employee
router.post('/', upload.single('image'), async (req, res) => {
  const { name, email, mobile, designation, gender, courses } = req.body;
  let imageUrl = '';
  
  // Handle image upload
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }
  
  const employee = new Employee({ name, email, mobile, designation, gender, courses, imageUrl });
  
  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an employee
router.put('/:id', upload.single('image'), async (req, res) => {
  const { name, email, mobile, designation, gender, courses } = req.body;
  let imageUrl = '';
  
  // Handle image upload if present
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }
  
  try {
    const updatedData = { name, email, mobile, designation, gender, courses, imageUrl };
    const employee = await Employee.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
