import * as yup from 'yup';
import axios from 'axios';
import './style.css';
import {useFormik} from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {
  useHistory
} from "react-router-dom";

const dev = 'http://localhost:8000';
const baseURL = window.location.hostname.split(':')[0] === 'localhost' ? dev : ""
const validationSchema = yup.object({
  fullName: yup
  .string('Enter your Name')
  .min(3, 'Name should be of minimum 3 characters length')
  .max(20, 'No more then 20')  
  .required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup
    .string('Enter your phone number')
    .min(10, 'Phone should be of minimum 10 length')
    .max(11, 'No more then 11 length')
    .required('Phone number is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .max(10, 'No more then 10')
    .required('Password is required'),
    address: yup
    .string('Enter your address')
    .min(3, 'Address should be of minimum 3 characters length')
    .max(20, 'No more then 20')  
    .required('Address is required'),
});

function Signup() {
  
  let history = useHistory();
  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues:{
      fullName: '',
      email: '',
      phone: '',
      password:'',
      address:''
    },
    onSubmit: onSubmitFunction
  });
  function onSubmitFunction(values){
    axios.post(`${baseURL}/api/v1/signup`,{
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      password: values.password,
      address: values.address
    })
    .then(res=>{
      alert('SignUp Successfull');
      history.push('/');
    })
    .catch((err)=>{
      alert('Some thing went wrong please try with different email');
    })
  }
  return (
    <div className="signup">
      <Grid container spacing={2} alignItems="center" textAlign='center' padding='2%' justifyContent="center">
        <Grid item xs={11} sm={10} md={9} lg={8}>
          <h1 style={{color: "purple"}}>  SIGN UP </h1>
            <form onSubmit={formik.handleSubmit}>

              <TextField
                fullWidth
                color="secondary"
                id="outlined-basic"
                label="Full Name"
                variant="standard"
          
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}

                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
              />

              <TextField
                fullWidth
                color="secondary"
                id="outlined-basic"
                label="Email"
                variant="standard"
                type = "email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}

                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                color="secondary"
                id="outlined-basic"
                label="Phone Number"
                variant="standard"
                type = "number"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}

                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />

              <TextField
                fullWidth
                color="secondary"
                type="password"
                id="filled-basic"
                label="Password"
                variant="standard"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
           
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              >
              </TextField>
              <TextField
                fullWidth
                color="secondary"
                id="filled-basic"
                label="Address"
                variant="standard"
                type="address"

                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}

                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              /> <br /><br />

              <Button  variant="contained" color="secondary" type="submit">Sign Up</Button>
            </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default Signup;
