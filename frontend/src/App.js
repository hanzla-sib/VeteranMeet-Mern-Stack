import SignUp from "./Components/signup";
import Signcom from "./Components/Community/signup";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignInSide from "./Components/Signin";
import SignInSidecom from "./Components/Community/Signin";
import Navbar from "./Components/Veterans/navbar";
import Homepage from "./Components/Veterans/Homepage";
import Profile from "./Components/Veterans/Profile";
import Eventvet from "./Components/Veterans/Eventsvet";
import Homepagecomm from "./Components/Community/Communityhome";
import Landingpage from "./Components/Landingpage";

function App() {
  
  let returned_state_string = localStorage.getItem("credentials");
  let returned_state_object = JSON.parse(returned_state_string);
  let checkstate = localStorage.getItem("checkinguser");
  let checkstatetrue = JSON.parse(checkstate);
 
  
  
  return (

   <div> 
   
    {checkstatetrue ? <BrowserRouter>
      <Routes>
            <Route exact path="/home" element={<Homepage />} />
            <Route exact path="/commhome" element={<Homepagecomm />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/events" element={<Eventvet />} />
      </Routes>
  </BrowserRouter> : <BrowserRouter>
      <Routes>
      <Route exact path="/signupcomunity" element={<Signcom />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/" element={<Landingpage />} />
            <Route exact path="/signin" element={<SignInSide />} />
            <Route exact path="/signincom" element={<SignInSidecom />} />
      </Routes>
  </BrowserRouter>}
  
  </div>

  );
}

export default App;
