import React, { useState, useEffect } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Checkbox, FormControlLabel } from '@mui/material';
import { LockOpenOutlined } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { SignInWithGoogle } from './firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const paperStyle = { padding: 20, height: '500px', width: 600, margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnStyle = { margin: '8px 0' };

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[!@#$%^&])[a-zA-Z\d!@#$%^&]{8,}$/;

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({
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
        if (!usernameRegex.test(formData.username)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                username: 'Username must be alphanumeric and between 3 to 20 characters long'
            }));
            return;
        }
        if (!passwordRegex.test(formData.password)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                password: 'Password must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, and one number'
            }));
            return;
        }
        console.log("Form submitted:", formData);
    };

    const handleGoogleSignIn = async () => {
        try {
            SignInWithGoogle();
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    useEffect(() => {
        // Check if the user is already signed in
        const name = localStorage.getItem("name");
        if (name !== null) {
            navigate('/category'); // Navigate to '/category' if the user is already signed in
        }
    }, [navigate]);

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
                <Button onClick={handleGoogleSignIn} color='primary' variant="contained" style={btnStyle} fullWidth>
                    Sign in with Google
                </Button>
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
        </Grid>
    );
}
