
import { Container } from "@mui/system";
import React from "react";
import Navbarland from "./landingpagenavbar";
import Landingpagebox from "./landingpagebox";
function Landingpage() {
    return (
        <Container disableGutters maxWidth sx={{ background: "linear-gradient(to left bottom,#000000, #000046);", height: '100vh' }} >
            <Navbarland />
            
                <Landingpagebox />

        </Container>
    )
}

export default Landingpage;