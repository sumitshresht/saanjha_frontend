import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import {
  MdRssFeed,
  MdGroup,
  MdMessage,
  MdPhoto,
  MdNotifications,
  MdSettings,
  MdHelpCenter,
} from "react-icons/md";

const Sidebar = () => {
  return (
    <Box
      bg="gray.800"
      w="400px"
      h="100vh"
      color="white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p={4}
      position="sticky"
      top="0"
    >
      {/* Top Section */}
      <VStack align="start" marginLeft={10} marginTop={5} spacing={5}>
        <HStack paddingBottom={3}><MdRssFeed /><Text>Feed</Text></HStack>
        <HStack paddingBottom={3}><MdGroup /><Text>Friends</Text></HStack>
        <HStack paddingBottom={3}><MdMessage /><Text>Message</Text></HStack>
        <HStack paddingBottom={3}><MdPhoto /><Text>Photos</Text></HStack>
        <HStack paddingBottom={3}><MdNotifications /><Text>Notification</Text></HStack>
      </VStack>

      {/* Bottom Section */}
      <VStack align="start" marginLeft={10} marginBottom={10} spacing={4}>
        <HStack paddingBottom={3}><MdSettings /><Text>Setting</Text></HStack>
        <HStack paddingBottom={5}><MdHelpCenter /><Text>Help Center</Text></HStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;
