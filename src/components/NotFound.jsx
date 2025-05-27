import { Box, Heading, Button, Text, VStack } from "@chakra-ui/react";
import Lottie from "lottie-react";
import notFound from "../assets/notFound.json";
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.900"
      color="gray.100"
      px={6}
    >
      <VStack spacing={6} textAlign="center" maxW="md">
        <Box boxSize="280px">
          <Lottie animationData={notFound} loop autoplay />
        </Box>
        <Heading fontSize="5xl" fontWeight="extrabold" color="teal.400">
          404
        </Heading>
        <Text mt={4} fontSize="xl" color="gray.400">
          Oops! We couldn't find the page you're looking for
        </Text>
        <Button
          onClick={() => navigate("/")}
          bg="gray.800"
          color="white"
          mt={4}
          _hover={{ bg: "gray.500" }}
          px={6}
          py={2}
          size="lg"
          borderRadius="full"
        >
          Go Back Home
        </Button>
      </VStack>
    </Box>
  );
}

export default NotFound;
