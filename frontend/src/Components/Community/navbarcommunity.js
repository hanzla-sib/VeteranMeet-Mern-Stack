import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";


const Styledbar = styled(Toolbar)({
    justifyContent: "space-between",
});

function NavbarComm() {
    const navigate = useNavigate();
    function handleclick(){
        localStorage.removeItem("credentials");
        localStorage.setItem("checkinguser",false);
        navigate("/");
        window.location.reload(true);
    }
    return (
        <AppBar p={2} sx={{ position: "sticky", backgroundColor: "#1D9C0" }}>
            <Styledbar variant="dense" >
                <Typography variant="h6" sx={{ marginLeft: "24px" }}>Community</Typography>
                <Button onClick={handleclick} sx={{color:"white",background:"black"}} variant="contained">Logout</Button>
            </Styledbar>
        </AppBar>
    )
}

export default NavbarComm;