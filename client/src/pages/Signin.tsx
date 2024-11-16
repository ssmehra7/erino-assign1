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

const backend_url = import.meta.env.VITE_APP_BACKEND_URL;

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
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
    const { email, password } = formData;

    let isValid = true;
    const newErrors = { email: false, password: false };

    // Validate the form inputs
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
        // Make the API request to sign in
        const response = await axios.post(
          `${backend_url}/api/v1/auth/signin`,
          { email, password }
        );

        console.log("Response Data:", response.data);

        // Extract the token from the response
        const token = response.data.token;

        // Store the token in localStorage
        if (token) {
          localStorage.setItem("token", token);
          alert("Sign-in successful!");
          // Optionally, you can redirect the user to another page
          // window.location.href = '/dashboard'; // or use React Router's navigate
        } else {
          alert("No token received. Please try again.");
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        alert("Sign-in failed. Please check your credentials.");
      }
    }
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: "2rem" }}>
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
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
              Sign In
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignIn;
