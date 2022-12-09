import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Avatar, Button, Card, CardContent, Checkbox, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack } from '@mui/material';
import axios from 'axios';
import { width } from '@mui/system';

function TabPanel(props) {
    const { children, value, index, ...other } = props;



    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    const [checked, setChecked] = React.useState([1]);
    const [getarrayevents, setarrayevents] = React.useState([]);
    const [getupcomingevents, setupcommingevents] = React.useState([]);
    const [getintrest, setintrest] = React.useState([]);
    let returned_state_string = localStorage.getItem("credentials");
    let returned_state_object = JSON.parse(returned_state_string);

    useEffect(() => {
        async function run() {
            await clickpost();
            await clicktogetupcomming();
            await getintreseted();
        }
        run();
    }, [])

    const Attended = async()  => {

        // alert(ename);
        returned_state_string = localStorage.getItem("credentials");
        returned_state_object = JSON.parse(returned_state_string);
        const obj={
            email:returned_state_object.email,
            
        }
       
        try {
            const resp = await axios.post('http://localhost:5000/VeteranRoute/submitpoints', obj);
            console.log(resp.data);
            

        } catch (err) {
            console.error(err);
        }
    };

    const submitintrested = async (ename,etime) => {

        // alert(ename);
        returned_state_string = localStorage.getItem("credentials");
        returned_state_object = JSON.parse(returned_state_string);
        const obj={
            email:returned_state_object.email,
            ename:ename,
            etime:etime
        }
       
        try {
            const resp = await axios.post('http://localhost:5000/VeteranRoute/submitintrestedevents', obj);
            console.log(resp.data);
            

        } catch (err) {
            console.error(err);
        }
    };
    
    const getintreseted = async () => {

        returned_state_string = localStorage.getItem("credentials");
        returned_state_object = JSON.parse(returned_state_string);
        const requestTasks = [];
        try {
            const resp = await axios.post('http://localhost:5000/VeteranRoute/fetchintrested', returned_state_object);
            setintrest(resp.data)
            console.log(getintrest);
           

        } catch (err) {
            console.error(err);
        }
    };


    const clickpost = async () => {

        returned_state_string = localStorage.getItem("credentials");
        returned_state_object = JSON.parse(returned_state_string);
        const requestTasks = [];
        try {
            const resp = await axios.post('http://localhost:5000/VeteranRoute/fetchmyevents', returned_state_object);
            
            setarrayevents(resp.data);
           

        } catch (err) {
            console.error(err);
        }
    };
    const clicktogetupcomming = async () => {
        const requestTasks = [];
        try {
            const resp = await axios.post('http://localhost:5000/VeteranRoute/getallevents');
            
            for (var i = 0; i < resp.data.length; i++) {
               
                const object = {
                    eventname: resp.data[i].Eventname,
                    eventtime: resp.data[i].Eventtime
                }
                requestTasks[i] = object;
            }
         
            setupcommingevents(requestTasks);

        } catch (err) {
            console.error(err);
        }
    };


    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="My Events" {...a11yProps(0)} />
                    <Tab label="Intrested Events" {...a11yProps(1)} />
                    <Tab label="Upcomming Events" {...a11yProps(2)} />
                    <Tab label="Attended Events" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>

                <Grid direction={"column"} lg={12} xs={10} justifyContent="center" alignItems="center" textAlign={"center"}>
                    {getarrayevents.map((name) => <Box
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

                        <Card sx={{ minWidth: 40, background: "lightblue" }}>
                            <CardContent sx={{ marginTop: "20px" }}>
                                <Typography sx={{ fontSize: 30 }}  color="text.secondary" gutterBottom>
                                    {name.Eventname}
                                </Typography>

                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {name.Eventtime}
                                </Typography>

                            </CardContent>

                        </Card>

                    </Box>
                    )}
                    {/* <Button onClick={clickpost}>clickmetoget</Button> */}
                </Grid>

            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid direction={"column"} lg={12} xs={10} justifyContent="center" alignItems="center" textAlign={"center"}>
                {getintrest.map((name) => <Box
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
                      <Stack direction={'row'}>
                       
                        <Card sx={{ marginLeft: "100px", width: "100%", background: "lightblue" }}>
                        <CardContent sx={{ marginTop: "20px" }}>
                                <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                                    {name}
                                </Typography>

                                

                            </CardContent>
                            </Card>

                            <Button sx={{ height: "60px", marginTop: "40px", marginLeft: "10px" }} onClick={() => Attended()}  variant="contained">Attended</Button>
                        </Stack>
                    </Box>)}
                   
                    {/* <Button onClick={getintreseted}>clickmetoget</Button> */}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Grid direction={"column"} container  lg={12} xs={10} justifyContent="left" alignItems="flex-start" textAlign={"center"}>
                    {getupcomingevents.map((name) => <Box
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


                        <Stack direction={'row'}>
                            <Card sx={{ marginLeft: "100px", width: "100%", background: "lightblue" }}>
                                <CardContent sx={{ marginTop: "20px" }}>
                                    <Typography sx={{ fontSize: 30 }}  color="text.secondary" gutterBottom>
                                        {name.eventname}
                                    </Typography>

                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {name.eventtime}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Button sx={{ height: "60px", marginTop: "40px", marginLeft: "50px" }} onClick={() => submitintrested(name.eventname,name.eventtime)}  variant="contained">mark intreseted</Button>
                          
                        </Stack>
                    </Box>)}


                </Grid>
            </TabPanel>

            <TabPanel value={value} index={3}>
                <Grid direction={"column"} lg={12} xs={10} justifyContent="center" alignItems="center" textAlign={"center"}>
                {getintrest.map((name) => <Box
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
                        <Card sx={{ minWidth: 40, background: "lightblue" }}>
                            <CardContent sx={{ marginTop: "20px" }}>
                                <Typography sx={{ fontSize: 30 }}  color="text.secondary" gutterBottom>
                                    {name}
                                </Typography>
                            </CardContent>

                        </Card>
                        
                    </Box>)}
                   
                    {/* <Button onClick={getintreseted}>clickmetoget</Button> */}
                </Grid>
            </TabPanel>
        </Box >
    );
}