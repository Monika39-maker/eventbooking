import {useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

type userDetail = {
  userFullname: string
  userPassword: string
  
}



export default function OutlinedCard({userFullname, userPassword }: userDetail) {

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
      <Card sx={{maxHeight:'500px', width:'500px', position:'absolute', top:'20%', left:'33%'}}>
      <CardContent >
        <TextField fullWidth id="fullname" label="Fullname" variant="outlined" onChange={handleNameInputChange}/>
        
      </CardContent>
      <CardContent >
        <TextField fullWidth id="password" label="Password" variant="outlined" onChange={handlePasswordInputChange}/>  
      </CardContent>
      <CardActions>
      <Button variant="contained" onClick={handleAdminLogin}>Continue</Button>
      </CardActions>
  </Card>
    {error && (
    <CardContent>
      <Typography color="error">Please try again with correct credentials</Typography>
    </CardContent>
  )}

    </Box>
  );
}