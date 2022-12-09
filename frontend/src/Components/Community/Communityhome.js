import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Collapse, Container, Divider, FormControl, Grid, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import NavbarComm from "./navbarcommunity";
import { Box } from "@mui/system";
// import Sidebar from "./Sidebar";
import axios from "axios";



function Homepagecomm() {

    let returned_state_string = localStorage.getItem("credentials");
    let returned_state_object = JSON.parse(returned_state_string);

    useEffect(() => {
        async function run() {
            await getevnts();
            await getvetrans();
        }
        run();
    }, [])
    const [getallcomingevents, setallevents] = React.useState([]);
    const [gettime, settime] = useState("");
    const [getevent, setevent] = useState("");
    const [getarrayfollow, setarrayfollow] = React.useState([]);

    const [getinvite, setinvite] = useState("");



    const submitevent = async () => {

        try {

            const objec = {
                eventname: getevent, time: gettime, email: returned_state_object.email
            }
            const resp = await axios.post('http://localhost:5000/Communityroute/setmyevents', objec);

            console.log(resp.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getvetrans= async () => {
       
        const requestTasks = [];
        try {
            const resp = await axios.post('http://localhost:5000/VeteranRoute/getfriends');
            for (var i = 0; i < resp.data.length; i++) {
                const object={
                    email:resp.data[i].email,
                    firstname:resp.data[i].firstname
                }
                requestTasks[i] = object;
            }
            setarrayfollow(requestTasks)
            console.log(getarrayfollow);
        } catch (err) {
            console.error(err);
        }
    };

   

    const getevnts = async () => {
        try {

            const objec = {
                email: returned_state_object.email
            }
            var requestTasks = [];
            const resp = await axios.post('http://localhost:5000/Communityroute/fetchmyevents', objec);
            console.log("hello");
            for (var i = 0; i < resp.data.length; i++) {

                const object = {
                    eventname: resp.data[i].Eventname,
                    eventtime: resp.data[i].Eventtime
                }
                requestTasks[i] = object;
            }

            setallevents(requestTasks);
        } catch (err) {
            console.error(err);
        }
    };


    const submitinvite=async (nameevent) => {
        try {

            const objec = {
                email: age,
                ename:nameevent
            }
           
            const resp = await axios.post('http://localhost:5000/VeteranRoute/submitintrestedevents', objec);
            console.log(resp.data);
           
        } catch (err) {
            console.error(err);
        }
    };

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <NavbarComm />
            <Stack sx={{ flexDirection: { xs: "row", md: "row" } }}>

                <Box sx={{ overflowY: "auto", height: "93.5vh", flex: 4, backgroundColor: "white" }}>

                    <Container maxWidth={false} disableGutters  >

                        <Grid direction={"row"} lg={12} xs={6} sm={6}>

                            <Grid direction={"column"} lg={12} xs={10} justifyContent="center" alignItems="center" textAlign={"center"}>
                                <Typography sx={{ fontSize: 30, marginLeft: "100px" }} color="text.secondary" gutterBottom>
                                    Events
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        '& > :not(style)': {
                                            m: 1,
                                            width: 600,
                                            height: 128,
                                        },
                                        marginLeft: "250px",
                                        marginTop: "50px"
                                    }}
                                >



                                    {getallcomingevents.map((name) => (<Card sx={{ minWidth: 40, background: "lightblue" }}>
                                        <Grid container direction="row">
                                            <Grid width="400px" >
                                                <CardContent sx={{ marginTop: "20px" }}>
                                                    <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                                                        {name.eventname}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                                        {name.eventtime}
                                                    </Typography>
                                                </CardContent>
                                            </Grid>
                                            <Grid width="200px">
                                                <CardContent sx={{ marginTop: "20px" }}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">INVITE VETER..</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={age}
                                                            label="Age"
                                                            onChange={handleChange}
                                                        >
                                                        
                                                        {getarrayfollow.map((alpha) => ( <MenuItem value={alpha.email}>{alpha.firstname}</MenuItem>))}
                                                           
                                                        </Select>
                                                    </FormControl>
                                                    <Button onClick={() => submitinvite(name.eventname)} >Invite</Button>
                                                </CardContent>
                                            </Grid>
                                        </Grid>
                                    </Card>))}


                                </Box>

                                {/* <Button onClick={getintreseted}>clickmetoget</Button> */}
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                <Box sx={{ background: "#F4F5F7", flex: 1.5, height: { sx: "auto", md: "93.5vh", lg: "93.5vh" }, borderLeft: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>

                    <Card sx={{ minWidth: 275, marginTop: "70px", marginLeft: "20px" }}>
                        <Typography sx={{ marginLeft: "110px", marginBottom: "30px" }} variant="h5" color="text.secondary" >
                            MAKE EVENT
                        </Typography>
                        <CardContent>
                            <Typography variant="h6" color="text.secondary" >
                                Enter event Name
                            </Typography>

                            <TextField id="standard-basic" onChange={(e) => (setevent(e.target.value))} label="Standard" variant="standard" />
                            <Typography variant="h6" color="text.secondary" sx={{ marginTop: "10px" }} >
                                Enter event Time
                            </Typography>


                            <TextField id="standard-basic" label="Standard" onChange={(e) => settime(e.target.value)} variant="standard" />
                            <Button sx={{ marginTop: "20px", marginLeft: "30px" }} onClick={() => submitevent()} variant="contained">set Event</Button>
                        </CardContent>

                    </Card>
                </Box>


            </Stack>
        </div>

    );
}

export default Homepagecomm;