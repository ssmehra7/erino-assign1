import { Button, Box, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        textAlign: 'center', // Centers the text horizontally
      }}
    >
      {/* Title */}
      <Typography variant="h3" sx={{ mb: 4 }}>
        Landing Page
      </Typography>
      <Typography variant="h6" sx={{ mb: 6 }}>
        Contact Management Application Assignment
      </Typography>
      
      {/* Status message */}
      <Typography variant="h5" sx={{ mb: 6, fontStyle: 'italic', color: 'gray', }}>
        Design is a work in progress, but all features are complete.
      </Typography>

      {/* Buttons */}
      <Button onClick={() => navigate('/signin')} variant="contained" color="primary" sx={{ mb: 2 }}>
        Signin Button
      </Button>
      <Button onClick={() => navigate('/signup')} variant="contained" color="primary" sx={{ mb: 2 }}>
        Signup Button
      </Button>
      <Button onClick={() => navigate('/create')} variant="contained" color="primary" sx={{ mb: 2 }}>
        Create Button
      </Button>
      <Button onClick={() => navigate('/dashboard')} variant="contained" color="primary" sx={{ mb: 2 }}>
        Dashboard Button
      </Button>
    </Box>
  );
}

export default Landing;
