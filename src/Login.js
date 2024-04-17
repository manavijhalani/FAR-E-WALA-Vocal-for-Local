import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Checkbox, FormControlLabel } from '@mui/material';
import { LockOpenOutlined } from '@mui/icons-material';
import { Link as RouterLink, useNavigate, Route, Routes } from 'react-router-dom';
import firebase from 'firebase/compat/app'; // Update the import statement to use 'compat' for compatibility mode
import 'firebase/compat/auth'; // Import the auth module
import 'firebase/compat/database'; // Import the Realtime Database module
import Profile from './profile'; // Import the Profile component

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDM-SSjSjDzaYDBn1x1PJR0oi4Q5e_Dcnc",
  authDomain: "farewala-569aa.firebaseapp.com",
  projectId: "farewala-569aa",
  storageBucket: "farewala-569aa.appspot.com",
  messagingSenderId: "499790925683",
  appId: "1:499790925683:web:12da0e00ad9b9c8b87bf06",
  measurementId: "G-YRKVP16HML",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function Login() {
  const paperStyle = { padding: 20, height: '500px', width: 600, margin: "20px auto" };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnStyle = { margin: '8px 0' };

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(); // Call the handleLogin function to verify the credentials
  };
  
  const handleLogin = async () => {
    try {
      const userRef = firebase.database().ref('users');
      userRef.orderByChild('phone').equalTo(formData.username).once('value', async (snapshot) => {
        const userData = snapshot.val();
        console.log('Retrieved User Data:', userData);
        if (userData) {
          const userId = Object.keys(userData)[0];
          const user = userData[userId];
          console.log('User Password:', user.password);
          if (user.password === formData.password) {
            // Navigate to profile page and pass username as a state
            localStorage.setItem('phone',formData.username)
            navigate('/profile');
          } else {
            console.log('Incorrect password');
          }
        } else {
          console.log('User not found');
        }
      });
    } catch (error) {
      console.log('An error occurred. Please try again.', error);
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      // Implement Google Sign-In if needed
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Paper elevation={10} style={paperStyle}>
        <Grid container justifyContent="center" alignItems="center" direction="column">
          <Avatar style={avatarStyle}><LockOpenOutlined /></Avatar>
          <Typography variant="h5">Login</Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField 
            label='Username' 
            placeholder='Enter username' 
            fullWidth 
            required 
            margin="normal" 
            autoComplete='true'
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField 
            label='Password' 
            placeholder='Enter password' 
            type='password' 
            fullWidth 
            required 
            margin="normal" 
            autoComplete='true' 
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
          <Button type='submit' color='primary' variant="contained" style={btnStyle} fullWidth>
            Sign in
          </Button>
        </form>
        <Typography>
          <Link href="#">
            Forgot password?
          </Link>
        </Typography>
        <Typography>
          Do you have an account?
          <RouterLink to="/signup">
            Sign Up
          </RouterLink>
        </Typography>
      </Paper>
      {/* Remove the Profile component from here */}
    </Grid>
  );
}