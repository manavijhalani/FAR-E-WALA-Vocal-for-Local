import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import backgroundImage from './bg2.png';
import Data from './Data.json';
import { Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';

const StyledBackgroundPaper = styled(Paper)(({ theme }) => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(2),
}));

export default function Favorite() {
  return (
    <>  <StyledBackgroundPaper>
    <br></br>
    <br></br>
    <br></br>
    <br></br><br></br>
    <br></br><br></br>
    <br></br><br></br>
    <br></br>
   </StyledBackgroundPaper>
   <br></br>
   
        <Typography variant="h4" gutterBottom>Category</Typography>
        <Typography variant="h6" gutterBottom>Select a category you wish to see</Typography>
      
      <Grid container spacing={2} justifyContent="center">
        {Data.map((result, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={result.img}
                  alt={result.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {result.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {result.des}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}