import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Center from "./components/Center";
import Login from "./components/Login";
import Register from "./components/Register";
import Setting from "./components/Setting";
import Saved from "./components/Saved";
import Profile from "./components/Profile";
import People from "./components/People";
import PeoplePosts from "./components/PeoplePosts";
import NotFound from "./components/NotFound";
import Notifications from "./components/Notifications";
import Help from "./components/Help";
import Search from "./components/Search";
import MyPost from "./components/MyPost";

import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import { useLocation } from "react-router";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const location = useLocation();
  const hideLayoutRoutes = ["/login", "/register"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <Box
      h="100vh"
      w="100%"
      overflowX="hidden"
      bg="gray.900"
      px={{ base: 2, md: 6 }}
      py={hideLayout ? 0 : 4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{
        //background: "radial-gradient(ellipse at top, #1e293b 0%, #0f172a 100%)",
      }}
    >
      {!hideLayout && <Navbar />}

      <Flex
        direction="row"
        w="100%"
        //maxW="1700px"
        mt={hideLayout ? 0 : 4}
        gap={4}
        flex="1"
        alignItems="flex-start"
        overflow="hidden"
        position="relative"
      >
        {!hideLayout && (
  <Sidebar /> // <-- ALWAYS render Sidebar; it controls its layout internally
)}


        <Box
          flex="1"
          w="100%"
          h={hideLayout ? "100vh" : "calc(100vh - 130px)"} // ⬅ adjust height (navbar ~64px + padding)
          p={{ base: 3, md: 6 }}
          overflowY="auto" // ⬅ allow only vertical scrolling
          scrollBehavior="smooth"
          
          borderRadius="2xl"
          style={{
            background: "rgba(255, 255, 255, 0.06)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
          className="transparent-scrollbar"
        >
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Center />} />
              <Route path="/feed" element={<Center />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/search" element={<Search />} />
              <Route path="/people" element={<People />} />
              <Route path="/people/:userId" element={<PeoplePosts />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/help" element={<Help />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/mypost" element={<MyPost />} />
            </Route>

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
