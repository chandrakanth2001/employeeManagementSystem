import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './EmployeeForm.css';


const EmployeeForm = ({ employee = {}, onSubmitSuccess }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [image, setImage] = useState(employee.image || '');

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      setImage(URL.createObjectURL(file)); // For previewing the image
      setValue("image", file); // Store the file for form submission
    },
    accept: 'image/*'
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append required fields
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('mobile', data.mobile);
    formData.append('designation', data.designation);
    formData.append('gender', data.gender);

    // Handle 'course' checkboxes as an array
    if (data.course && data.course.length > 0) {
      data.course.forEach(course => formData.append('course[]', course));
    }

    // Handle image if present
    if (data.image) {
      formData.append('image', data.image); // Directly append the image file
    }

    try {
      const response = await axios.post('http://localhost:5000/api/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onSubmitSuccess(response.data);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <div className="employee-form">
      <h2>{employee ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            defaultValue={employee?.name}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            defaultValue={employee?.email}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        {/* Mobile */}
        <div className="form-group">
          <label>Mobile</label>
          <input
            type="text"
            {...register('mobile', { required: 'Mobile number is required' })}
            defaultValue={employee?.mobile}
          />
          {errors.mobile && <p>{errors.mobile.message}</p>}
        </div>

        {/* Designation */}
        <div className="form-group">
          <label>Designation</label>
          <select {...register('designation', { required: 'Designation is required' })}>
            <option value="">Select Designation</option>
            <option value="Manager">Manager</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.designation && <p>{errors.designation.message}</p>}
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender</label>
          <label>
            <input
              type="radio"
              {...register('gender', { required: 'Gender is required' })}
              value="Male"
              defaultChecked={employee?.gender === 'Male'}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              {...register('gender', { required: 'Gender is required' })}
              value="Female"
              defaultChecked={employee?.gender === 'Female'}
            />
            Female
          </label>
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>

        {/* Courses */}
        <div className="form-group">
          <label>Courses</label>
          <label>
            <input
              type="checkbox"
              {...register('course')}
              value="React"
              defaultChecked={employee?.course?.includes('React')}
            />
            React
          </label>
          <label>
            <input
              type="checkbox"
              {...register('course')}
              value="Node.js"
              defaultChecked={employee?.course?.includes('Node.js')}
            />
            Node.js
          </label>
          <label>
            <input
              type="checkbox"
              {...register('course')}
              value="Python"
              defaultChecked={employee?.course?.includes('Python')}
            />
            Python
          </label>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Image</label>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {image ? <img src={image} alt="Preview" width="100" /> : <p>Drag and drop an image here, or click to select</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
