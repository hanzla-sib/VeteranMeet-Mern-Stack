import { Avatar, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import styled from "@emotion/styled";
import { Button, ButtonBase, Grid, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";


import axios from "axios";
import Navbar from "./navbar";



const Img = styled('img')({
  
  
  maxWidth: '100%',
  maxHeight: '100%',
 borderRadius: "50%"
});


function Profile() {
  useEffect(()=>{
 
    fetchimage();
  
    },[])

    
  let returned_state_string = localStorage.getItem("credentials");
    let returned_state_object = JSON.parse(returned_state_string);


    const[gethobies,sethobies]=React.useState({hobies:"",email:""});
 
   const submithobies = async () => {

  
    try {
       
        const resp = await axios.post('http://localhost:5000/VeteranRoute/sethobies',gethobies);
        alert(resp.data);
        // setarrayfollow(resp.data);
        
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
  };
  const handleclick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };
  const inputRef = useRef(null);

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


const [getimage, setimage] = React.useState({ img: "", check: false });



const handleFileUpload = async (e) => {
  console.log("hello from handlefileupload");
  returned_state_string = localStorage.getItem("credentials");
  returned_state_object = JSON.parse(returned_state_string);
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    if(base64){
    
      const obj={
        image:base64,
        email:returned_state_object.email
      }
       try {
      const resp = await  axios.post('http://localhost:5000/VeteranRoute/uploaduserpicture', obj);
      alert(resp.data);
     
  } catch (err) {
      // Handle Error Here
      console.error(err);
  }
    }
};



const [getarrayfollow, setarrayfollow] = React.useState("");
const fetchimage = async () => {

  
  try {
      returned_state_string = localStorage.getItem("credentials");
      returned_state_object = JSON.parse(returned_state_string);
      const obj={
        email:returned_state_object.email
      }
      const resp = await axios.post('http://localhost:5000/VeteranRoute/fetchprofiepic',obj);
      
      setarrayfollow(resp.data);
      
  } catch (err) {
      // Handle Error Here
      console.error(err);
  }
};




  return (
    <div>
    <Navbar />
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
       <Box sx={{ background: "linear-gradient(#304352, #3498db);",flex:1, height: { sx: "auto", md: "93.5vh", lg: "93.5vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar />

      </Box>
      <Box pl={"20px"} sx={{ overflowY: "auto", height: "93.5vh", flex: 8 }}>
        <Container maxWidth={false}  >
        <Grid lg={12} xs={6} sm={6} sx={{height:"400px"}}>
                                <Box>
                                    <Box 
                                        component="img"
                                        sx={{
                                            height: 300,
                                            width: "100%",
                                            marginBottom: "20px"
                                        }}
                                        alt="The house from the offer."
                                        src="https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg"
                                    >
                                       
                                    </Box>
                                    <Box onClick={handleclick} position={"relative"} bottom="150px" left="500px"  sx={{display: { lg: "inline-block",md:"none",sm:"none",xs:"none"}}}>
                                    <Avatar 
                                            alt="Remy Sharp"
                                            // src={getarrayfollow.check?getarrayfollow.photo:"s"}
                                            src={getarrayfollow}
                                            sx={{ width: 200, height: 200 }}
                                        />
                                    </Box>
                                
                                </Box>
                                <Button onClick={fetchimage}>getprofilepic</Button>
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
          <Grid container justifyContent={"center"} alignItems="center" spacing={2} direction={"row"} sx={{boxShadow:20, borderRadius:"30px",}}>
           
            <Grid item xs={12} container sm={12} md={6} lg={6} justifyContent={"center"} >
              
              <Paper
                sx={{
                  border: "none", boxShadow: "20",
                  p: 2,
                  margin: 'auto',
                  marginTop: "10px",
                  marginBottom:"40px",
                  borderRadius:"30px",
                  maxWidth: 500,
                  flexGrow: 1,
                  backgroundColor:"white"
                }}
              >
                <Grid container justifyContent={"center"} alignItems="center" spacing={2} direction={"column"} sx={{backgroundColor:"white", borderRadius:"30px",}}>
                  <Grid item xs={12} sm container justifyContent={"flex-start"}>
                    <Typography variant="h5" style={{color:"black"}}>Add Hobbies: </Typography>
                  </Grid>
                  <Grid item xs={12} sm container justifyContent={"flex-end"}>
                    <TextField sx={{ width: "70%", input: { color: 'black' } }} id="outlined-basic" label="Enter Hobby" onChange={(e)=>sethobies({hobies:e.target.value,email:returned_state_object.email})} variant="outlined" focused/>
                  </Grid>
                  <Grid item xs={12} sm container justifyContent={"flex-end"}>
                    <Button variant="contained" onClick={submithobies} sx={{ background: "#545CD8" }}>Save</Button>
                  </Grid>
                </Grid>
              </Paper>
              </Grid>
          </Grid>
        </Container>
      </Box>
    </Stack>
    </div>
  )
}

export default Profile;