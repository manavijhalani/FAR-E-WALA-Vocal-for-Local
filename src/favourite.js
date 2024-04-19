import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import backgroundImage from './newbg.png';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent', // Set background color to transparent
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 600,
  color: theme.palette.text.primary,
}));

const StyledBackgroundPaper = styled(Paper)(({ theme }) => ({
  backgroundImage: `url(${backgroundImage})`, // Apply background image here
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(2),
}));

// Simulated data fetched from Firebase
const favoritesData = [
  {
    id: 1,
    vendername: "Vender Name 1",
    message: "This is a message 1"
  },
  {
    id: 2,
    vendername: "Vender Name 2",
    message: "This is a message 2"
  },
  // Add more items as needed
];

const username = "Saba"; // Simulated username from profile

export default function Favorite() {
  const numFavorites = favoritesData.length;

  return (
    <>
      <StyledBackgroundPaper>
       <br></br>
       <br></br>
       <br></br>
       <br></br><br></br>
       <br></br><br></br>
       <br></br><br></br>
       <br></br>
      </StyledBackgroundPaper>
      <br></br>
      <Typography variant="h4" gutterBottom>{username}'s Favorites ({numFavorites})</Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          {favoritesData.map((item) => (
            <StyledPaper key={item.id}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar><PermIdentityIcon /></Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1">{item.vendername}</Typography>
                  <Typography variant="body2">{item.message}</Typography>
                </Grid>
              </Grid>
            </StyledPaper>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
