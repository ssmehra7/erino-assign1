import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import axios from "axios";
import { common } from "@mui/material/colors";

const backend_url = import.meta.env.VITE_APP_BACKEND_URL;

const CreateContact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false }); // Clear errors on user input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone,company } = formData;

    let isValid = true;
    const newErrors = {
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
    };

    if (!firstName) {
      newErrors.firstName = true;
      isValid = false;
    }
    if (!lastName) {
      newErrors.lastName = true;
      isValid = false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = true;
      isValid = false;
    }
    if (!phone || !/^\d{10}$/.test(phone)) {
      newErrors.phone = true;
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        const payLoad = {
          firstName, 
          lastName, 
          company, 
          phone, 
          email, 
          userId:"fdf60d74-c5f2-4a5f-bf71-40af09e59908",
        }
        const response = await axios.post(`${backend_url}/api/v1/contact/create`, payLoad);
        console.log("Contact Created:", response.data);
        alert("Contact created successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          jobTitle: "",
        });
      } catch (error) {
        console.error("Error creating contact:", error);
        alert("Failed to create contact. Please try again.");
      }
    }
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: "2rem" }}>
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Create Contact
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              variant="outlined"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              helperText={errors.firstName && "First name is required"}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              helperText={errors.lastName && "Last name is required"}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              helperText={errors.email && "Enter a valid email"}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              variant="outlined"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              helperText={errors.phone && "Enter a valid 10-digit phone number"}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Company"
              variant="outlined"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Job Title"
              variant="outlined"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Create Contact
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateContact;
