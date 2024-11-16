import React, { useState } from 'react';
import { TextField, Button, Paper, Grid, Typography } from '@mui/material';
import axios from 'axios';

const backend_url = import.meta.env.VITE_APP_BACKEND_URL;

export default function CreateContact() {
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Token check
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found, please log in');
      return;
    }

    // Form data to be sent to the backend
    const contactData = {
      firstName,
      lastName,
      phone,
      email,
      jobTitle,
      company,
    };

    try {
      setLoading(true);
      setError(''); // Reset error before making API request

      // Send request to the backend to create the contact
      const response = await axios.post(
        `${backend_url}/api/v1/contact/create`,
        contactData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success response
      if (response.status === 200) {
        alert('Contact created successfully');
        // Optionally, you can clear the form or redirect the user
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
        setJobTitle('');
        setCompany('');
      }
    } catch (error) {
      // Handle error
      setError('Failed to create contact. Please try again.');
      console.error('Error creating contact:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ padding: 3, width: '400px', margin: '0 auto', mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        Create Contact
      </Typography>
      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Create Contact'}
        </Button>
      </form>
    </Paper>
  );
}
