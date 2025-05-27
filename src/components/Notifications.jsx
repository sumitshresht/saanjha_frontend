import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import Lottie from "lottie-react";
import comingSoon from "../assets/comming.json"; // Ensure this file exists

function Notification() {
  return (
    <Box
      minH="100vh"
      bg="gray.900"
      color="gray.100"
      px={6}
      py={10}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {/* Notification title at the top */}
      <Heading fontSize="2xl" color="teal.400" mb={8}>
        Notifications
      </Heading>

      {/* Centered animation and subtext */}
      <VStack spacing={6} textAlign="center" maxW="lg" mt="auto" mb="auto">
        <Box boxSize="300px">
          <Lottie animationData={comingSoon} loop autoplay />
        </Box>
        <Text fontSize="xl" color="gray.400">
          This feature is coming soon. Stay tuned for updates!
        </Text>
      </VStack>
    </Box>
  );
}

export default Notification;
