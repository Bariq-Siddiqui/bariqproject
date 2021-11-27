
import Stack from '@mui/material/Stack';
import Post from "./post";




import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/Context";
import {useFormik} from 'formik';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './style.css';
import { useContext,useState, useEffect } from "react"
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red,blue,purple } from '@mui/material/colors';
import { useRef } from "react"
// import { Box } from '@mui/system';
import TableHead from '@mui/material/TableHead';
import Avatar from '@mui/material/Avatar';
const dev = 'http://localhost:8000';
const baseURL = window.location.hostname.split(':')[0] === 'localhost' ? dev : ""

function Dashboard(){

    const [inputText, setInputText] = useState("");
    const [posts, setPosts] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [isMore, setIsMore] = useState(true)

    useEffect(() => {
        axios.get(`${baseURL}/api/v1/posts?page=0`, {
            withCredentials: true
        })
            .then((res) => {
                console.log("res +++: ", res.data);
                setPosts(res.data)
            })
    }, [refresh])




    const loadMore = () => {
        axios.get(`${baseURL}/api/v1/posts?page=${posts.length}`,
            {
                withCredentials: true
            })
            .then((res) => {
                console.log("res +++: ", res.data);
                if (res.data?.length) {
                    const newPosts = [...posts, ...res.data]
                    setPosts(newPosts)
                } else {
                    setIsMore(false)
                }
            })
    }
    // const submit = () => {
    //     if (inputText !== "") {
    //         axios.post(`${baseURL}/api/v1/post`, {
    //             postText: inputText
    //         }, {
    //             withCredentials: true
    //         })
    //             .then((res) => {
    //                 console.log("res: ", res.data);
    //                 setRefresh(!refresh)
    //                 alert("post created");

    //             })
    //     }
    // }

    const formik = useFormik({
        initialValues:{
            post: ''
        },
        onSubmit: onSubmitFunction
    })
    function onSubmitFunction(values){
            axios.post(`${baseURL}/api/v1/post`, {
                postText: values.post
            }, {
                withCredentials: true
            })
                .then((res) => {
                    console.log("res: ", res.data);
                    setRefresh(!refresh)
                    alert("post created");

            })
    }








    let { state, dispatch } = useContext(GlobalContext);
    const [profile, setProfile] = useState({})
    // const formik = useFormik({
    //     initialValues:{
    //         post: ''
    //     },
    //     onSubmit: onSubmitFunction
    // })
    // function onSubmitFunction(values){
    //     axios.post(`${baseURL}/api/v1/createpost`,{
    //       post: values.post,
    //       userName:state.user.fullName
    //     })
    //     .then(res=>{
    //       alert('Post Created Successfully');
    //     })
    //     .catch((err)=>{
    //       alert('Some thing went wrong please try with different Post');
    //     })
    // }

    // const [users, setUsers] = useState([]);
    // useEffect(() => {
    //     axios.get(`${baseURL}/api/v1/dashboard`)
    //     	.then(res=>{
    //             console.log(res.data)
    //             setUsers(res.data)
    //     });
    // }, []);
    return(
        <div className="dashboard">
            {/* DASHBOARD */}            
            <Grid container spacing={2} alignItems="center" textAlign='center' padding='2%' justifyContent="center">
                <Grid item xs={11} sm={10} md={9} lg={8}>
                    <h1 style={{color: "purple"}}> Create New Post </h1>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Post"
                            variant="standard"
                            type = "TextField"
                            name="post"
                            value={formik.values.post}
                            onChange={formik.handleChange}

                            error={formik.touched.post && Boolean(formik.errors.post)}
                            helperText={formik.touched.post && formik.errors.post}
                        />
                        <br /><br />
                        <Button  variant="contained" color="secondary" type="submit">Post</Button>
                    </form>
                </Grid>
            </Grid>
            {/* {users.map((eachUser,index) => {
                return( 
                <>
                    <Grid key={index} container spacing={2} alignItems="center" marginTop='1%' justifyContent="center">
                        <Grid item xs={11} sm={10} md={9} lg={8}>
                            <TableContainer elevation={3} component={Paper}>
                                <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" colSpan={2} style={{ display: 'flex' , paddingLeft: '5%' }}>
                                            <Avatar sx={{ bgcolor: purple[500] }}>{(eachUser.userName).charAt(0)}</Avatar>
                                            <span style={{ fontSize:"1.4em", paddingLeft: '2%',paddingTop: '1%' }}>{eachUser.userName}</span>
                                            
                                        </TableCell>

                                    </TableRow>
                                </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" align="left" scope="row">
                                                {eachUser.post}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <Grid>
                                    <ThumbUpIcon sx={{ color: blue[500]}}/><FavoriteIcon sx={{ color: red[600],paddingLeft:'10%' }}/><ShareIcon sx={{ color: blue[600],paddingLeft:'10%' }}/><DeleteIcon sx={{ color: red[600],paddingLeft:'10%' }}/><EditIcon sx={{ color: blue[600],paddingLeft:'10%' }}/>
                                </Grid>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </>
                )
            })} */}


<br />

{posts.map((eachPost,i) => (
    <Post key={i} fullName={eachPost.fullName} email={eachPost.email} text={eachPost.postText} />
))}

<br />

{(isMore) ? <Button onClick={loadMore}>Load More</Button> : null}






        </div>
    //     <div style={{ margin: "1rem" }}>

    //     <h1> Dashboard Page </h1>


    //     <Stack spacing={2} direction="column">

    //         <TextField
    //             id="outlined-multiline-static"
    //             multiline
    //             rows={4}
    //             value={inputText}
    //             onChange={(e) => {
    //                 setInputText(e.target.value)
    //             }}
    //             placeholder="What's in your mind"
    //         /> <br />
    //         <Button variant="contained" onClick={submit}>Post</Button>

    //     </Stack>

    //     <br />

    //     {posts.map((eachPost) => (
    //         <Post name={eachPost.fullName} email={eachPost.email} text={eachPost.postText} />
    //     ))}

    //     <br />

    //     {(isMore) ? <Button onClick={loadMore}>Load More</Button> : null}

    // </div>
    )
}

export default Dashboard;