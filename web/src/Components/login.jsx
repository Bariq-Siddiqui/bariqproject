import * as yup from 'yup';
import axios from 'axios';
import './style.css';
import Grid from '@mui/material/Grid';
import {useFormik} from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
    useHistory
} from 'react-router-dom';
import { GlobalContext } from '../context/Context';
import { useContext, useReducer } from "react";
// import React, { useState } from "react";
// import Appbar from "./appbar";

const dev = 'http://localhost:8000';
const baseURL = window.location.hostname.split(':')[0] === 'localhost' ? dev : ""
const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .max(10, 'No more then 10')
      .required('Password is required'),
});
  
function Login(){
    let { dispatch } = useContext(GlobalContext);
    let history = useHistory();
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues:{
            email: '',
            password: ''
          },
          onSubmit: onSubmitFunction
    })
    function onSubmitFunction(values){
        axios.post(`${baseURL}/api/v1/login`,{
            email: values.email,
            password: values.password
        }, {
            withCredentials: true
          })
        .then((res)=>{
            if(res){
                console.log("res: ", res.data.email)
                console.log("res: ", res.data.fullName)
                console.log("res: ", res.data.address)
                dispatch({
                  type: "USER_LOGIN",
                  payload: {
                    fullName: res.data.fullName,
                    email: res.data.email,
                    phone: res.data.phone,
                    address: res.data.address,
                    _id: res.data._id
                  },
            });    
                alert('login successfull');
                // history.push('/dashboard');
                // history.push('/login');

            }
        })
        .catch(err=>{
            alert('login unsuccessfull error found');
        })
    }
    return(
        <div className="login">
            <Grid container spacing={2} alignItems="center" textAlign='center' padding='2%' justifyContent="center">
                <Grid item xs={11} sm={10} md={9} lg={8}>
                    <h1 style={{color: "purple"}}> LOG IN </h1>
                   <form onSubmit={formik.handleSubmit}>
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
                            type="password"
                            id="filled-basic"
                            label="Password"
                            variant="standard"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}

                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        /><br /><br />
                        <Button  variant="contained" color="secondary" type="submit">Log in</Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}
export default Login;