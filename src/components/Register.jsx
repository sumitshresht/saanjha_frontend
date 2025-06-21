import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  Link,
  Text,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router";
import videoBg from "../assets/video1.mp4"; 

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    const { firstName, lastName, email, phone, password, confirmPassword } = form;
    const userId = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "_");
    const profilePhoto = "";

    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      return setMessage({ text: "Please fill in all fields.", type: "error" });
    }

    if (password !== confirmPassword) {
      return setMessage({ text: "Passwords do not match.", type: "error" });
    }

    const user = { userId, firstName, lastName, email, phone, password, profilePhoto };
    sessionStorage.setItem("user", JSON.stringify(user));
    const response = await axios.post(`https://saanjhabackend-production.up.railway.app/register`, user);
    console.log(response);

    setMessage({ text: "Sign-Up Successful! Redirecting to login...", type: "success" });
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <Flex minH="100vh" w="full" direction={{ base: "column", md: "row" }}>
      {/* Left: video branding */}
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
              Join Saanjha
            </Heading>
            <Text fontSize="md" color="gray.200">
              Sign up to be heard.<br />
Whether it’s a thought, a laugh, or a story — Saanjha brings you closer to your people.
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Right: registration form */}
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
            Create your Saanjha Account
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
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              bg="gray.700"
              borderColor="gray.600"
              _placeholder={{ color: "gray.400" }}
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              bg="gray.700"
              borderColor="gray.600"
              _placeholder={{ color: "gray.400" }}
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              bg="gray.700"
              borderColor="gray.600"
              _placeholder={{ color: "gray.400" }}
            />
            <Input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              bg="gray.700"
              borderColor="gray.600"
              _placeholder={{ color: "gray.400" }}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              bg="gray.700"
              borderColor="gray.600"
              _placeholder={{ color: "gray.400" }}
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              bg="gray.700"
              borderColor="gray.600"
              _placeholder={{ color: "gray.400" }}
            />
            <Button
              colorScheme="teal"
              width="full"
              borderRadius="full"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </VStack>

          <Text mt={6} fontSize="sm" textAlign="center">
            Already have an account?{" "}
            <Link color="teal.300" onClick={() => navigate("/login")}>
              Log in
            </Link>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Register;
