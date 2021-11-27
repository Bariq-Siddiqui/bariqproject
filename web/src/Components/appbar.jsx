import axios from 'axios';
// Drawer
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LogoutIcon from '@mui/icons-material/Logout';
// end drawer
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
// import Login from './Components/login';
import Login from './login';
// import Signup from './Components/signup';
import Signup from './signup';
// import Dashboard from './Components/dasboard';
import Dashboard from './dasboard';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import { GlobalContext } from './../context/Context';
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { Redirect } from 'react-router';
import Splash from "./splashScreen";
const dev = 'http://localhost:8000';

const baseURL = window.location.hostname.split(':')[0] === 'localhost' ? dev : ""


function Appbar(){

  useEffect(() => {
    axios.get(`${baseURL}/api/v1/profile`, {
      withCredentials: true
  })
      .then((res) => {
          console.log("res +++: ", res.data);
          setProfile(res.data)
      })
    axios.get(`${baseURL}/api/v1/profile`, {
      withCredentials: true
    })
      .then((res) => {
        console.log("res: ", res.data);

        if (res.data.email) {

          dispatch({
            type: "USER_LOGIN",
            payload: {
              fullName: res.data.fullName,
              email: res.data.email,
              _id: res.data._id
            }
          })
        } else {
          dispatch({ type: "USER_LOGOUT" })
        }
      }).catch((e) => {
        dispatch({ type: "USER_LOGOUT" })
      })

    return () => {
    };
    
  }, []);
  // Drawer
const [changestate, setState] = React.useState({
  left: false
});
const toggleDrawer = (anchor, open) => (event) => {
  if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }

  setState({ ...changestate, [anchor]: open });
};
let history = useHistory();
    // Logout
function logout() {
  dispatch({
      type: "USER_LOGOUT",
      payload: null
  })
  history.push("/login");

}
const list = (anchor) => (
  <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 290 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
  >
    <List>
      {[profile.fullName, profile.email,profile.phone, profile.address].map((text, index) => (
        <ListItem button key={index}>
          <ListItemIcon>
            {
            // (index % 2 === 0) ? <PersonIcon /> : <MailIcon />
            index * 2 === 0 ? <PersonIcon /> : index * 2 === 2 ? <MailIcon /> : index * 2 === 4 ? <LocalPhoneIcon />:<HomeIcon/>}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {['Logout'].map((text, index) => (
        <ListItem button key={text} onClick={() => {
          axios.post(`${baseURL}/api/v1/logout`,{}, {
              withCredentials: true
          })
              .then((res) => {
                  console.log("res +++: ", res.data);

                  dispatch({
                      type: "USER_LOGOUT"
                  })
              })
      }} >
          <ListItemIcon>
            <LogoutIcon/> 
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </Box>
);
// Drawer End
  let { state, dispatch } = useContext(GlobalContext);
  const [profile, setProfile] = useState({})
  return(
      <div className="Appbar">
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='secondary'>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
            {(state.user) ?
          <React.Fragment>
          <MenuIcon onClick={toggleDrawer('left', true)}/>
          <Drawer
            anchor={'left'}
            open={changestate['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        </React.Fragment>
            
            :
          <MenuIcon/>
            }


            {/* {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)}/>
          <Drawer
            anchor={anchor}
            open={changestate[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))} */}
        
  

            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Project
            </Typography>
            {/* <Button color="inherit" onClick={()=> {history.push('/') }}>Splash </Button> */}
            <Button color="inherit" onClick={()=> {history.push('/') }}>Dashboard</Button>
            <Button color="inherit" onClick={()=> {history.push('/signup')} }>Signup</Button>
            <AccountCircleIcon style={{font:'2rem'}} onClick={()=> {history.push('/') }}/>
          </Toolbar>
        </AppBar>
      </Box>
      {/* <Switch>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <Signup />
        </Route>
      </Switch> */}

      {/* {(state.user) ?

        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>

          <Redirect to="/" />
        </Switch>
      :
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
  
          <Redirect to="/" />
        </Switch>
      } */}


{(state.user === undefined) ?
        <Switch>
          <Route exact path="/">
            <Splash />
          </Route>
        </Switch>
        : null}

      {(state.user === null) ?
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />

        </Switch> : null
      }

      {(state.user) ?
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
        </Switch>
        : null}
    </div>
  )
}
export default Appbar;