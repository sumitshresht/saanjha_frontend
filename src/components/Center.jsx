import { Box } from "@chakra-ui/react";
import PostFeed from "./PostFeed";

const Center = () => {
  return (
    <Box
      w="100%"
      maxW="1000px"
      mx="auto"
      px={{ base: 2, md: 6 }}
      py={{ base: 4, md: 6 }}
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <PostFeed />
    </Box>
  );
};

export default Center;
