import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Collapse, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Navbar from "./navbar";
import { Box } from "@mui/system";
import Sidebar from "./Sidebar";
import axios from "axios";
import styled from "@emotion/styled";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StadiumIcon from '@mui/icons-material/Stadium';
import StarIcon from '@mui/icons-material/Star';

function Homepage() {
    const [setarray, getarray] = React.useState([]);
    const [getarrayfollow, setarrayfollow] = React.useState([]);
    const [getarrayhobies, setarrayhobies] = React.useState([]);
    const [getrankwithp, setrank] = React.useState({rank:"",points:""});

    let returned_state_string = localStorage.getItem("credentials");
    let returned_state_object = JSON.parse(returned_state_string);
    let size = 0;
    useEffect(() => {
        clickpost();
        getfriends();
        getHobies();
        getrank();

    }, [])

    // const[getfromemail,setfromemail]=useState({email:"",check:false});

    function followclick(email) {
        returned_state_string = localStorage.getItem("credentials");
        returned_state_object = JSON.parse(returned_state_string);
        const followers = {
            myemail: returned_state_object.email,
            followedemail: email
        }
        axios.post('http://localhost:5000/VeteranRoute/followfollowers', followers)
            .then(res => alert(res.data));
    }

    const getfriends = async () => {

        const requestTasks = [];
        try {
            const resp = await axios.post('http://localhost:5000/VeteranRoute/getfriends');
            for (var i = 0; i < resp.data.length; i++) {
                requestTasks[i] = resp.data[i];
            }
            setarrayfollow(requestTasks)
        } catch (err) {
            console.error(err);
        }
    };


    const getHobies = async () => {

        const obj={
            email:returned_state_object.email,
        }
        const requestTasks = [];
        try {
            const resp = await axios.post('http://localhost:5000/VeteranRoute/getHobies',obj);
            // for (var i = 0; i < resp.data.length; i++) {
            //     requestTasks[i] = resp.data[i];
            // }
            setarrayhobies(resp.data);
        } catch (err) {
            console.error(err);
        }
    };

    
    const getrank = async () => {

        const obj={
            email:returned_state_object.email,
        }
        const requestTasks = [];
        try {
            const resp = await axios.post('http://localhost:5000/VeteranRoute/getrank',obj);
            
            setrank(resp.data);
        } catch (err) {
            console.error(err);
        }
    };

    const clickpost = async () => {
        returned_state_string = localStorage.getItem("credentials");
        returned_state_object = JSON.parse(returned_state_string);
        const requestTasks = [];
        try {
            const resp = await axios.post('http://localhost:5000/VeteranRoute/getposts', returned_state_object);
            for (var i = 0; i < resp.data.length; i++) {
                requestTasks[i] = resp.data[i];
            }
            getarray(requestTasks)

        } catch (err) {
            console.error(err);
        }
    };



    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.click();
    };

    const handlepost = async () => {
        returned_state_string = localStorage.getItem("credentials");
        returned_state_object = JSON.parse(returned_state_string);

        // console.log(returned_state_object)

        alert("clicked");
        try {

            // setPostImage(()=>({ ...postImage, email: returned_state_object.email }))

            const obj = {
                email: returned_state_object.email,
                myFile: postImage.myFile,
                msg: postImage.msg

            }

            const resp = await axios.post('http://localhost:5000/VeteranRoute/uploadimageandtext', obj);
            alert(resp.data);

        } catch (err) {
            console.error(err);
        }

    }
    function decodeBase64(base64data) {
        alert(base64data);
    }

    const [postImage, setPostImage] = React.useState({
        myFile: "",
        check: false,
        msg: "",
        email: ""
    });
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };




    //------------
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({ ...postImage, myFile: base64, check: true });
    };



    return (
        <div>
            <Navbar />
            <Stack sx={{ flexDirection: { xs: "row", md: "row" } }}>
                <Box sx={{ background: "linear-gradient(#304352, #3498db);", flex: 1.5, height: { sx: "auto", md: "93.5vh", lg: "93.5vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
                    <Sidebar />
                </Box>
                <Box sx={{ overflowY: "auto", height: "93.5vh", flex: 4, backgroundColor: "white" }}>
                    <Container maxWidth={false} disableGutters  >
                        <Grid direction={"column"} lg={12} xs={6} sm={6}>

                            <Grid direction={"column"} lg={12} xs={10} justifyContent="center" alignItems="center" textAlign={"center"}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        '& > :not(style)': {
                                            m: 1,
                                            width: 600,
                                            height: 128,
                                        },
                                        marginLeft: "60px",
                                        marginTop: "50px"
                                    }}
                                >
                                    <Paper elevation={0}>
                                        <TextField onChange={event => setPostImage({ ...postImage, msg: event.target.value })} label="WHATS UP!!!!!" placeholder="WANA POST !" fullWidth color="secondary" focused />
                                        <Grid lg={12} direction={"row"} container justifyContent="flex-end" marginTop="8px">
                                            <Button onClick={handleClick} sx={{ marginRight: "10px" }} variant="contained"><AddAPhotoIcon /></Button>
                                            <Button onClick={handlepost} variant="contained">Post</Button>
                                        </Grid>
                                    </Paper>
                                </Box>
                            </Grid>
                            <input
                                style={{ display: 'none' }}
                                type="file"
                                label="Image"
                                ref={inputRef}
                                name="myFile"
                                accept=".jpeg, .png, .jpg"
                                onChange={(e) => handleFileUpload(e)}
                            />
                            {/* <h1>{setarray.length}</h1> */}

                            {setarray.map((name) => <Grid lg={12} xs={6} md={8} direction={"column"} container alignItems="left" >
                                <Card sx={{ maxWidth: 700, marginLeft: "40px", marginTop: "70px" }}>
                                    <CardHeader sx={{ background: "#F4F5F7" }}
                                        avatar={
                                            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                                                H
                                            </Avatar>
                                        }
                                        subheader="September 14, 2016"
                                    />
                                    <CardMedia
                                        component="img"
                                        height="500"
                                        image={name.media}
                                        alt="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {name.content}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <ShareIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>)}
                        </Grid>
                    </Container>
                </Box>

                <Box sx={{ background: "#F4F5F7", flex: 1.5, height: { sx: "auto", md: "93.5vh", lg: "93.5vh" }, borderLeft: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>

                    <List sx={{ marginTop: "30px", width: '100%', maxWidth: 360, bgcolor: '#F4F5F7' }}>
                        <Typography sx={{ marginLeft: "80px", fontFamily: "monospace",marginBottom:"20px" }} variant="h5">Follow List</Typography>
                        {getarrayfollow.map((value) => (
                            <ListItem 
                                key={value}
                                secondaryAction={
                                    <IconButton >
                                        <Button  variant="outlined" onClick={() => followclick(value.email)} > <AddCircleIcon />Follow</Button>
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar

                                        alt={`Avatar n°${value + 1}`}
                                        src={value.photo}
                                    />
                                </ListItemAvatar>
                                <Typography sx={{ fontFamily: "monospace" }} variant="body1">{value.firstname}</Typography>

                            </ListItem>
                        ))}
                    </List>
                  
                    <List sx={{ width: '100%', maxWidth: 360,marginTop:"40px", bgcolor: 'background.paper' , bgcolor: '#F4F5F7' }}>
                    <Typography sx={{ marginLeft: "110px", fontFamily: "monospace" }} variant="h5">Hobbies</Typography>
                        {getarrayhobies.map((value) => (<ListItem>
                            <StadiumIcon fontSize="large" color="success" sx={{marginRight:"10px"}}/>
                            <ListItemText primary={value}  />
                        </ListItem>))}

                    </List>

                    <List sx={{ width: '100%', maxWidth: 360,marginTop:"40px" ,bgcolor: 'background.paper' , bgcolor: '#F4F5F7' }}>
                    <Typography sx={{ marginLeft: "110px", fontFamily: "monospace" }} variant="h5">Rank</Typography>
                    <ListItem>
                            <StarIcon fontSize="large" color="primary" sx={{marginRight:"10px"}}/>
                            <ListItemText   primary={getrankwithp.ranking}  />
                            <ListItemText   primary={getrankwithp.points}  />
                        </ListItem>

                    </List>



                    {/* <Button onClick={getfriends}>getfriends</Button>
                    <Button onClick={clickpost}>getposts</Button> */}

                </Box>

            </Stack>
        </div>

    );
}

export default Homepage;