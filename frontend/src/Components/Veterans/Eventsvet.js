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
import TabPanel from "./Tabs";

function Eventvet() {
    let returned_state_string = localStorage.getItem("credentials");
    let returned_state_object = JSON.parse(returned_state_string);

    const [gettime, settime] = useState("");
    const [getevent, setevent] = useState("");
    // const [Event,setfullevent]=useState({eventname:"",time:"",email:""});
    const [getarrayfollow, setarrayfollow] = React.useState([]);
   
    const submitevent = async () => {

        
        try {
            // setfullevent({eventname:getevent,time:gettime,email:returned_state_object.email});
            
            const objec={
                eventname:getevent,time:gettime,email:returned_state_object.email
            }
            const resp = await axios.post('http://localhost:5000/VeteranRoute/setmyevents',objec);
            alert(resp.data);
        } catch (err) {
            console.error(err);
        }
    };

  


    return (
        <div>
            <Navbar />
            <Stack sx={{ flexDirection: { xs: "row", md: "row" } }}>
                <Box sx={{ background: "linear-gradient(#304352, #3498db);", flex: 1, height: { sx: "auto", md: "93.5vh", lg: "93.5vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
                    <Sidebar />
                </Box>
                <Box sx={{ overflowY: "auto", height: "93.5vh", flex: 4, backgroundColor: "white" }}>
                    <Container maxWidth={false} disableGutters  >
                        <Grid direction={"column"} lg={12} xs={6} sm={6}>
                            <TabPanel />
                        </Grid>
                    </Container>
                </Box>

                <Box sx={{ background: "#F4F5F7", flex: 1.5, height: { sx: "auto", md: "93.5vh", lg: "93.5vh" }, borderLeft: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>

                    <Card sx={{ minWidth: 275, marginTop: "70px", marginLeft: "20px" }}>
                        <CardContent>
                            <Typography variant="h6" color="text.secondary" >
                                Enter event Name
                            </Typography>
                            <TextField onChange={(e) => (setevent(e.target.value))} id="standard-basic" label="Standard" variant="standard" />
                            <Typography variant="h6" color="text.secondary" sx={{ marginTop: "10px" }} >
                                Enter event Time
                            </Typography>
                            <TextField onChange={(e) => settime(e.target.value)} id="standard-basic" label="Standard" variant="standard" />
                            <Button onClick={()=>submitevent()} sx={{marginTop:"20px"}} variant="contained">set Event</Button>
                        </CardContent>

                    </Card>
                </Box>

            </Stack>
        </div>

    );
}

export default Eventvet;