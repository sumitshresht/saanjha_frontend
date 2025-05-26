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
import { useNavigate } from "react-router";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    const { firstName, lastName, email, phone, password, confirmPassword } = form;

    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      return setMessage({ text: "Please fill in all fields.", type: "error" });
    }

    if (password !== confirmPassword) {
      return setMessage({ text: "Passwords do not match.", type: "error" });
    }

    // Store user info in sessionStorage
    const user = { firstName, lastName, email, phone, password };
    sessionStorage.setItem("user", JSON.stringify(user));

    setMessage({ text: "Sign-Up Successful! Redirecting to login...", type: "success" });
    setTimeout(() => navigate("/login"), 2000);
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
        Sign Up
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
        <Input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} bg="gray.100" />
        <Input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} bg="gray.100" />
        <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} bg="gray.100" />
        <Input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} bg="gray.100" />
        <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} bg="gray.100" />
        <Input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} bg="gray.100" />
        <Button colorScheme="teal" width="full" onClick={handleSignUp}>
          Sign Up
        </Button>
      </VStack>
      <Link mt="4" color="teal.500" onClick={() => navigate("/login")}>
        Already have an account? Login
      </Link>
    </Box>
  );
};

export default Register;
