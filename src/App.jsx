import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Center from "./components/Center";
import Login from "./components/Login";
import Register from "./components/Register";
import Setting from "./components/Setting";
import Message from "./components/Message";
import Profile from "./components/Profile";
import Photos from "./components/Photos";
import Notifications from "./components/Notifications";
import Help from "./components/Help";
import Friends from "./components/Friends";
import { Box, Flex } from "@chakra-ui/react"; // use Flex instead of Container
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
    <Box bg={"gray.900"} minH={"100vh"}>
    <Navbar/>
    <Flex>
      <Sidebar />
    <Routes>
      <Route path="/" element={<Center />} />
      <Route path="/login" element={<Login />} />
      <Route path="/feed" element={<Center />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/messages" element={<Message />} />
      <Route path="/photos" element={<Photos />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/help" element={<Help />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </Flex>
    </Box>
    </>
  );
}

export default App;
