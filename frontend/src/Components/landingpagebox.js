

import { Box, Button, Grid, ListItem, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

import { useNavigate } from "react-router-dom";


function Landingpagebox() {

    const navigate = useNavigate();
    function navigateveteran() {
        navigate("/signup");
        window.location.reload(true);
    }

    function navigatecommunity() {
        navigate("/signupcomunity");
        window.location.reload(true);
    }
    return (
        <Container >
            <Box >
                <Typography sx={{ marginTop: "150px" }} textAlign={"center"} fontSize={"40px"} color={"#cbb4d4"} >WELCOME TO </Typography>
                <Typography textAlign={"center"} fontSize={"50px"} color={"#F16529"} >VETERAN_MEET</Typography>
                <Box marginTop={"60px"} textAlign={"center"} >
                    <Button variant="contained" onClick={navigateveteran} sx={{ marginRight: "60px" }} size="large">Signup as Veteran</Button>
                    <Button variant="contained" onClick={navigatecommunity} size="large">Signup as Community</Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Landingpagebox;