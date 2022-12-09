
import React from "react";
import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
function Navbarland(){
    return(
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              VETERAN-MEET
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default Navbarland;