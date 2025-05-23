import React from 'react';
import {useState} from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography } from '@mui/material';

type userDetail = {
  userFullname?: string
  userPassword?: string
  
}



export default function AdminLogin({userFullname, userPassword }: Readonly<userDetail>) {

  const [userInputFullname, setUserInputFullname] = useState<string>('')
  const [userInputPassword, setUserInputPassword] = useState<string>('')
  const [error , setError] = useState(false)
  const navigate = useNavigate()

  const handleAdminLogin = () => {
    if (userInputFullname === userFullname && userPassword === userInputPassword) {
      navigate('/admin')
    } else {
      setError(true)
      
    }
  }

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value } = e.target;
    setUserInputFullname(value)
  }
  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value } = e.target;
    setUserInputPassword(value)
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Typography variant="h4" sx={{textAlign:'center'}}>Admin Login</Typography>
      <Card sx={{maxHeight:'500px', width:'500px', position:'absolute', top:'20%', left:'33%'}}>
      <CardContent >
        <TextField fullWidth id="fullname" label="Fullname" variant="outlined" onChange={handleNameInputChange} data-testid="fullname-input" />
        
      </CardContent>
      <CardContent >
        <TextField fullWidth id="password" type="password" label="Password" variant="outlined" onChange={handlePasswordInputChange} data-testid="password-input"/>  
      </CardContent>
      <CardActions>
      <Button variant="contained" id="button" onClick={handleAdminLogin} data-testid="continue-button">Continue</Button>
      </CardActions>
  </Card>
    {error && (
    <CardContent>
      <Typography color="error" data-testid="wrong-credential-message">Please try again with correct credentials</Typography>
    </CardContent>
  )}

    </Box>
  );
}