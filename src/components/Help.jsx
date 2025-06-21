import {
  Box,
  Heading,
  Text,
  VStack,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";

function Help() {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      px={{ base: 4, md: 8 }}
      py={{ base: 8, md: 12 }}
      bg="transparent"
    >
      <Box
        w="full"
        maxW="800px"
        mx="auto"
        bg="rgba(255, 255, 255, 0.06)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(255, 255, 255, 0.12)"
        borderRadius="2xl"
        boxShadow="lg"
        color="gray.100"
        p={{ base: 6, md: 10 }}
        mt={{ base: 4, md: 8 }}
      >
        <Heading
          fontSize={{ base: "2xl", md: "3xl" }}
          textAlign="center"
          color="teal.300"
          mb={4}
        >
          Help Center
        </Heading>

        <Text
          textAlign="center"
          fontSize={{ base: "sm", md: "md" }}
          color="gray.400"
          mb={8}
        >
          Get answers to common questions or reach out for support.
        </Text>

        <Flex mb={10} justify="center">
          <Input
            placeholder="Search for help..."
            bg="rgba(255,255,255,0.05)"
            color="white"
            border="1px solid rgba(255,255,255,0.1)"
            maxW="500px"
            _placeholder={{ color: "gray.500" }}
            _focus={{
              borderColor: "teal.400",
              boxShadow: "0 0 0 1px teal.400",
            }}
            size="md"
            borderRadius="md"
          />
        </Flex>

        <VStack spacing={6} align="stretch">
          <Box borderBottom="1px solid rgba(255, 255, 255, 0.1)" pb={4}>
            <Text fontWeight="semibold" mb={1}>
              How do I edit my profile?
            </Text>
            <Text fontSize="sm" color="gray.400">
              Click your name in the top-right, go to “Profile”, and edit any field using the pencil icon.
            </Text>
          </Box>

          <Box borderBottom="1px solid rgba(255, 255, 255, 0.1)" pb={4}>
            <Text fontWeight="semibold" mb={1}>
              How do I reset my password?
            </Text>
            <Text fontSize="sm" color="gray.400">
              Go to “Settings”, scroll to the password section, and follow the steps.
            </Text>
          </Box>

          <Box pb={2}>
            <Text fontWeight="semibold" mb={1}>
              Who do I contact for support?
            </Text>
            <Text fontSize="sm" color="gray.400">
              Email us at <u>support@example.com</u>. We’ll respond within 24 hours.
            </Text>
          </Box>
        </VStack>

        <Flex justify="center" mt={10}>
          <Button
            onClick={() => navigate("/")}
            bg="teal.600"
            color="white"
            _hover={{ bg: "teal.500" }}
            borderRadius="full"
            px={6}
            py={2}
            size="md"
            fontWeight="semibold"
          >
            Back to Home
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default Help;
