import styled from "@emotion/styled";
import { Avatar, Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({

    '&:hover': {
        background: "#3F51B6",
    }
}));
function CommSide() {

    return (
        <Stack direction="row"
            sx={{

                overflowY: "auto",
                height: {  md: "95%" },
                flexDirection: {xs:"column" ,md: "column" },
                alignItems: "center"
            }}>

 
            <NavLink style={{ textDecoration: "none", color: "white" }} to="/commhome"><span> <button
                className="category-btn">Home </button></span></NavLink>

        </Stack>
    )
}

export default CommSide;