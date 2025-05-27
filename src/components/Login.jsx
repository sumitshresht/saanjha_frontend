import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../utils/UserContext"; // adjust path if needed

import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  VStack,
  Flex,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import videoBg from "../assets/video1.mp4"; // Replace with your actual path

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();
  const from = location.state?.from;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { setUser } = useContext(UserContext);

  const handleLogin = () => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (!storedUser) {
      return setMessage({
        text: "No registered user found. Please sign up.",
        type: "error",
      });
    }
    if (email === storedUser.email && password === storedUser.password) {
  setUser(storedUser); // update context
  setMessage({ text: "Login Successful!", type: "success" });
  setTimeout(() => navigate(from || "/feed", { replace: true }), 1000);
} else {
  setMessage({ text: "Invalid email or password.", type: "error" });
}

  };

  return (
    <Flex minH="100vh" w="full" direction={{ base: "column", md: "row" }}>
      {/* Left side: video + overlay text */}
      <Box
        flex={1}
        pos="relative"
        display={{ base: "none", md: "block" }}
        overflow="hidden"
      >
        <Box
          as="video"
          src={videoBg}
          autoPlay
          loop
          muted
          playsInline
          objectFit="cover"
          width="100%"
          height="100%"
          pos="absolute"
          top="0"
          left="0"
          zIndex="0"
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          w="full"
          h="full"
          bg="rgba(0, 0, 0, 0.6)"
          zIndex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          p={10}
          color="white"
        >
          <Box maxW="400px" zIndex="2">
            <Heading fontSize="4xl" mb={4} color="teal.300">
              Welcome to Saanjha
            </Heading>
            <Text fontSize="md" color="gray.200">
              Where thoughts spark conversations.<br />
              Saanjha is your space to share, connect, and stay in the moment.
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Right side: login form */}
      <Flex
        flex={1}
        bg="gray.800"
        color="gray.100"
        align="center"
        justify="center"
        p={8}
      >
        <Box w="full" maxW="400px">
          <Heading fontSize="2xl" mb={6} textAlign="center" color="teal.300">
            Log in to Saanjha
          </Heading>

          {message.text && (
            <Box
              mb={4}
              p={3}
              borderRadius="md"
              bg={message.type === "success" ? "green.600" : "red.600"}
              textAlign="center"
              fontSize="sm"
            >
              {message.text}
            </Box>
          )}

          <VStack spacing={4}>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="gray.700"
              borderColor="gray.600"
              _placeholder={{ color: "gray.400" }}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="gray.700"
              borderColor="gray.600"
              _placeholder={{ color: "gray.400" }}
            />
            <Button
              colorScheme="teal"
              w="full"
              borderRadius="full"
              onClick={handleLogin}
            >
              Login
            </Button>
          </VStack>

          <Text mt={6} fontSize="sm" textAlign="center">
            Don’t have an account?{" "}
            <Link color="teal.300" onClick={() => navigate("/register")}>
              Sign up
            </Link>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
