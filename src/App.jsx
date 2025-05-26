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
import { useLocation } from "react-router"
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const location = useLocation();
  const hideLayoutRoutes = ["/login", "/register"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <Box bg="gray.900" minH="100vh">
      {!hideLayout && <Navbar />}
      <Flex>
        {!hideLayout && <Sidebar />}
        <Box flex="1" p={4}> {/* Main content wrapper */}
          <Routes>
            <Route element={<ProtectedRoute />}>
            <Route path="/feed" element={<Center />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Message />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/help" element={<Help />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/friends" element={<Friends />} />
            </Route>
            
            {/* Public Routes */}
            <Route path="/" element={<Center />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
      </Flex>
    </Box>
  );
}


export default App;
