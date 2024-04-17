import React, { useState, useEffect } from 'react';
import { Grid, Paper, Avatar, Typography } from '@mui/material';
import firebase from 'firebase/compat/app'; // Update the import statement to use 'compat' for compatibility mode
import 'firebase/compat/auth'; // Import the auth module
import 'firebase/compat/database'; // Import the Realtime Database module

const db = firebase.database(); // Get a reference to the Firebase Realtime Database

const Profile = () => {
  const [userData, setUserData] = useState(null); // Define state variable for user data

  useEffect(() => {
    const phone = localStorage.getItem('phone');
    if (phone) {
      const userRef = db.ref('users');
      userRef.orderByChild('phone').equalTo(phone).once('value', (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          const userId = Object.keys(userData)[0];
          const user = userData[userId];
          setUserData(user);
        } else {
          console.log('User data not found');
        }
      }, (error) => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  // Define style for Paper component
  const paperStyle = {
    padding: 20,
    margin: 20,
    elevation: 10 // Adding elevation to match the component prop
  };

  return (
    <Grid container justifyContent="center">
      <Paper style={paperStyle}>
        <Grid container justifyContent="center" alignItems="center" direction="column">
          <Avatar src={userData?.avatar} sx={{ width: 100, height: 100, marginBottom: 2 }} />
          <Typography variant="h5">Profile</Typography>
        </Grid>
        {userData ? (
          <>
            <Typography variant="h5" gutterBottom>{userData.name}</Typography>
            <Typography variant="body1" gutterBottom>Phone: {userData.phone}</Typography>
            {/* Render additional user data here */}
          </>
        ) : (
          <Typography variant="body1">Loading user data...</Typography>
        )}
      </Paper>
    </Grid>
  );
};

export default Profile;