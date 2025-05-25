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

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleSignUp = () => {
        if (email && password) {
            sessionStorage.setItem("userEmail", email);
            sessionStorage.setItem("userPassword", password);
            setMessage({
                text: "Sign-Up Successful! Please log in.",
                type: "success",
            });
            setIsSignUp(false);
            setEmail("");
            setPassword("");
        } else {
            setMessage({
                text: "Please fill in all fields.",
                type: "error",
            });
        }
    };

    const handleLogin = () => {
        const storedEmail = sessionStorage.getItem("userEmail");
        const storedPassword = sessionStorage.getItem("userPassword");

        if (email === storedEmail && password === storedPassword) {
            setMessage({
                text: "Login Successful!",
                type: "success",
            });
        } else {
            setMessage({
                text: "Invalid email or password.",
                type: "error",
            });
        }
    };

    const bgColor = "white";
    const boxShadow = "lg";
    const inputBg = "gray.100";
    const linkColor = "teal.500";

    return (
        <Box
            maxW="400px"
            mx="auto"
            mt="50px"
            p="8"
            borderRadius="lg"
            bg={bgColor}
            boxShadow={boxShadow}
            textAlign="center"
        >
            <Heading as="h2" size="lg" mb="6" color="teal.600">
                {isSignUp ? "Sign Up" : "Login"}
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
                    bg={inputBg}
                    border="none"
                    _focus={{ boxShadow: "outline" }}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    bg={inputBg}
                    border="none"
                    _focus={{ boxShadow: "outline" }}
                />
                {isSignUp ? (
                    <Button
                        colorScheme="teal"
                        size="md"
                        width="full"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </Button>
                ) : (
                    <Button
                        colorScheme="teal"
                        size="md"
                        width="full"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                )}
            </VStack>
            <Link
                mt="4"
                color={linkColor}
                fontWeight="medium"
                onClick={() => {
                    setIsSignUp(!isSignUp);
                    setMessage({ text: "", type: "" }); 
                }}
            >
                {isSignUp
                    ? "Already have an account? Login"
                    : "Don't have an account? Sign Up"}
            </Link>
        </Box>
    );
};

export default Login;
