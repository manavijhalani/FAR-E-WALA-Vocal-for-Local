import React from 'react';
import { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Checkbox, FormControlLabel } from '@mui/material';
import { LockOpenOutlined } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink from react-router-dom

export default function Login() {
    const paperStyle = { padding: 20, height: '450px', width: 600, margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnStyle = { margin: '8px 0' };

    // Regular expressions for validation
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Alphanumeric and underscore, 3-20 characters
    const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[!@#$%^&])[a-zA-Z\d!@#$%^&]{8,}$/;

    // State to store form data and validation errors
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate username
        if (!usernameRegex.test(formData.username)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                username: 'Username must be alphanumeric and between 3 to 20 characters long'
            }));
            return;
        }
        // Validate password
        if (!passwordRegex.test(formData.password)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                password: 'Password must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, and one number'
            }));
            return;
        }
        // If validation passes, you can proceed with form submission or further actions
        console.log("Form submitted:", formData);
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
                        error={Boolean(errors.username)}
                        helperText={errors.username}
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
                        error={Boolean(errors.password)}
                        helperText={errors.password}
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
                    <RouterLink to="/signup"> {/* Use RouterLink and specify the route to Seller */}
                        Sign Up
                    </RouterLink>
                </Typography>
            </Paper>
        </Grid>
    );
}
