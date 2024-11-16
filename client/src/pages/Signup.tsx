import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

import axios from "axios";
const backend_url =  import.meta.env.VITE_APP_BACKEND_URL;
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false }); // Clear errors as the user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(backend_url);
    const { username, email, password } = formData;
  
    let isValid = true;
    const newErrors = { username: false, email: false, password: false };
  
    if (!username) {
      newErrors.username = true;
      isValid = false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = true;
      isValid = false;
    }
    if (!password || password.length < 6) {
      newErrors.password = true;
      isValid = false;
    }
  
    setErrors(newErrors);
  
    if (isValid) {
      try {
        const response = await axios.post(
          `${backend_url}/api/v1/auth/signup`,
          { username, email, password }
        );
        console.log("Response Data:", response.data);
        alert("Sign-up successful!");
      } catch (error) {
        console.error("Error during sign-up:", error);
        alert("Sign-up failed. Please try again.");
      }
    }
  };
  
  return (
    <Grid container justifyContent="center" style={{ marginTop: "2rem" }}>
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              helperText={errors.username && "Username is required"}
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
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              helperText={
                errors.password && "Password must be at least 6 characters"
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignUp;
