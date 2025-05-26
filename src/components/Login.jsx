import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  Link,
  Text,
} from "@chakra-ui/react";
import {Outlet, useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const from = location.state?.from
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    if (!storedUser) {
      return setMessage({ text: "No registered user found. Please sign up.", type: "error" });
    }

    if (email === storedUser.email && password === storedUser.password) {
      setMessage({ text: "Login Successful!", type: "success" });
      setTimeout(() => navigate("/feed"), 1000); // redirect after login
    } else {
      setMessage({ text: "Invalid email or password.", type: "error" });
    }
    navigate(from, { replace: true });
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="50px"
      p="8"
      borderRadius="lg"
      bg="white"
      boxShadow="lg"
      textAlign="center"
    >
      <Heading as="h2" size="lg" mb="6" color="teal.600">
        Login
      </Heading>
      {message.text && (
        <Box
          mb="4"
          p="3"
          borderRadius="md"
          bg={message.type === "success" ? "green.100" : "red.100"}
          color={message.type === "success" ? "green.800" : "red.800"}
        >
          <Text fontWeight="medium">{message.text}</Text>
        </Box>
      )}
      <VStack spacing="4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          bg="gray.100"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          bg="gray.100"
        />
        <Button colorScheme="teal" width="full" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
      <Link mt="4" color="teal.500" onClick={() => navigate("/register")}>
        Don't have an account? Sign Up
      </Link>
    </Box>
  );
};

export default Login;
