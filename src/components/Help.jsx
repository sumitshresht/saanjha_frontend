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
      bg="gray.900"
      color="gray.100"
      px={6}
      py={12}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box maxW="3xl" w="full">
        <Heading fontSize="4xl" textAlign="center" color="teal.400" mb={4}>
          Help Center
        </Heading>

        <Text textAlign="center" fontSize="md" color="gray.400" mb={8}>
          Get answers to common questions or reach out for support.
        </Text>

        <Flex mb={10} justify="center">
          <Input
            placeholder="Search for help..."
            bg="gray.800"
            color="gray.100"
            border="1px solid"
            borderColor="gray.700"
            maxW="500px"
            _placeholder={{ color: "gray.500" }}
            _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal" }}
            size="md"
            borderRadius="md"
          />
        </Flex>

        <VStack spacing={6} align="stretch">
          <Box
            borderBottom="1px solid"
            borderColor="gray.800"
            pb={4}
          >
            <Text fontWeight="medium" mb={1}>
              How do I edit my profile?
            </Text>
            <Text fontSize="sm" color="gray.400">
              Click your name in the top-right, go to “Profile”, and edit any field using the pencil icon.
            </Text>
          </Box>

          <Box
            borderBottom="1px solid"
            borderColor="gray.800"
            pb={4}
          >
            <Text fontWeight="medium" mb={1}>
              How do I reset my password?
            </Text>
            <Text fontSize="sm" color="gray.400">
              Go to “Settings”, scroll to the password section, and follow the steps.
            </Text>
          </Box>

          <Box pb={4}>
            <Text fontWeight="medium" mb={1}>
              Who do I contact for support?
            </Text>
            <Text fontSize="sm" color="gray.400">
              Email us at <u>support@example.com</u>. We’ll respond within 24 hours.
            </Text>
          </Box>
        </VStack>

        <Flex justify="center" mt={12}>
          <Button
            onClick={() => navigate("/")}
            bg="gray.800"
            color="white"
            _hover={{ bg: "gray.500" }}
            borderRadius="full"
            px={6}
            size="lg"
          >
            Back to Home
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default Help;
