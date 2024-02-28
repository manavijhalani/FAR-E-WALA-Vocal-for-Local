import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './Background.png'; // Import your background image here

export default function SignUp() {
  const [value, setValue] = React.useState('false');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const val = event.target.value;
    setValue(val);
  };

  const handleSubmit = () => {
    if (value === 'true') {
      if (!name || !surname || !phone || !password) {
        alert('Please fill in all fields');
      } else if (!/^[0-9]{10}$/.test(phone)) {
        alert('Please enter a valid 10-digit phone number');
      } else if (!/^[A-Za-z0-9]{6,}$/.test(password)) {
        alert('Please enter a valid password (at least 6 characters alphanumeric)');
      } else {
      navigate('/signup1');
    }
    } 
    else {
      if (!name || !surname || !phone || !password) {
        alert('Please fill in all fields');
      } else if (!/^[0-9]{10}$/.test(phone)) {
        alert('Please enter a valid 10-digit phone number');
      } else if (!/^[A-Za-z0-9]{6,}$/.test(password)) {
        alert('Please enter a valid password (at least 6 characters alphanumeric)');
      } else {
        alert('Form submitted successfully');
        navigate('/home');
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // Set background image
        backgroundSize: 'cover', // Ensure the image covers the entire container
        backgroundPosition: 'center', // Center the image
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Set height to cover the entire viewport
      }}
    >
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <LockPersonIcon />
          <Typography variant="h2" component="div">
            Sign Up
          </Typography>
          <Typography variant="body2" color="text.secondary">
            #need to write some text
          </Typography>
          <br />
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            size="small"
            autoComplete="true"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: '100%', marginBottom: 2 }}
          />
          <TextField
            id="surname"
            label="Surname"
            variant="outlined"
            size="small"
            autoComplete="true"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            autoFocus
            sx={{ width: '100%', marginBottom: 2 }}
          />
          <TextField
            id="phoneno"
            label="Phone number"
            variant="outlined"
            multiline="true"
            size="small"
            autoComplete="true"
            autoFocus
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{ width: '100%', marginBottom: 2 }}
          />
          <TextField
            id="pass"
            label="Password"
            variant="outlined"
            multiline="true"
            size="small"
            autoComplete="true"
            autoFocus
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: '100%', marginBottom: 2 }}
          />
          <FormControl sx={{ width: '100%', marginBottom: 2, display: 'flex', justifyContent: 'center' }}>
            <FormLabel id="sellerornot" sx={{ marginLeft: 0, fontSize: '1.2rem' }}>Are you a Seller or not</FormLabel>
            <RadioGroup
              row
              aria-labelledby="sellerornot"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Yes"
                sx={{align:'center'}}
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
          <Button variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
