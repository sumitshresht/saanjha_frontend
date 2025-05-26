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
import { BsBookmarkFill } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <Box
      bg="gray.800"
      w="300px"
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
      <VStack align="start" spacing={3} px={4} pt={4}>
        <HStack
          spacing={3}
          py={2}
          px={3}
          borderRadius="md"
          color="white"
          onClick={() => navigate("/")} // Add onClick handler to navigate to settings
          bg={isActive("/") ? "gray.700" : "transparent"}// Add onClick handler to navigate to feed
          _focus={{ boxShadow: "outline" }}
          
          _hover={{ bg: "gray.600", cursor: "pointer" }}
          transition="all 0.2s ease"
        >
          <Box fontSize="lg">
            <MdRssFeed />
          </Box>
          <Text fontSize="md">Feed</Text>
        </HStack>

        <HStack
          spacing={3}
          py={2}
          px={3}
          borderRadius="md"
          onClick={() => navigate("/friends")} // Add onClick handler to navigate to friends
          bg={isActive("/friends") ? "gray.700" : "transparent"}
          _hover={{ bg: "gray.700", cursor: "pointer" }}
          transition="all 0.2s ease"
        >
          <Box fontSize="lg">
            <MdGroup />
          </Box>
          <Text fontSize="md">Friends</Text>
        </HStack>

        <HStack
          spacing={3}
          py={2}
          px={3}
          borderRadius="md"
          onClick={() => navigate("/messages")} // Add onClick handler to navigate to settings
          bg={isActive("/messages") ? "gray.700" : "transparent"}// Add onClick handler to navigate to feed
          _hover={{ bg: "gray.700", cursor: "pointer" }}
          transition="all 0.2s ease"
        >
          <Box fontSize="lg">
            <BsBookmarkFill />
          </Box>
          <Text fontSize="md">Saved Post</Text>
        </HStack>

        <HStack
          spacing={3}
          py={2}
          px={3}
          borderRadius="md"
          onClick={() => navigate("/photos")} // Add onClick handler to navigate to photos
          bg={isActive("/photos") ? "gray.700" : "transparent"}
          _hover={{ bg: "gray.700", cursor: "pointer" }}
          transition="all 0.2s ease"
        >
          <Box fontSize="lg">
            <MdPhoto />
          </Box>
          <Text fontSize="md">Photos</Text>
        </HStack>

        <HStack
          spacing={3}
          py={2}
          px={3}
          borderRadius="md"
          onClick={() => navigate("/notifications")} // Add onClick handler to navigate to notifications
          bg={isActive("/notifications") ? "gray.700" : "transparent"}
          _hover={{ bg: "gray.700", cursor: "pointer" }}
          transition="all 0.2s ease"
        >
          <Box fontSize="lg">
            <MdNotifications />
          </Box>
          <Text fontSize="md">Notification</Text>
        </HStack>
      </VStack>

      <Box borderBottom="1px solid" borderColor="gray.700" my={4} mx={4} />

      {/* Bottom Section */}
      <VStack align="start" spacing={3} marginBottom={20} px={4} pb={6}>
        <HStack
          spacing={3}
          py={2}
          px={3}
          borderRadius="md"
          onClick={() => navigate("/setting")} // Add onClick handler to navigate to settings
          bg={isActive("/setting") ? "gray.700" : "transparent"}
          _hover={{ bg: "gray.700", cursor: "pointer" }}
          transition="all 0.2s ease"
        >
          <Box fontSize="lg">
            <MdSettings />
          </Box>
          <Text fontSize="md">Setting</Text>
        </HStack>

        <HStack
          spacing={3}
          py={2}
          px={3}
          borderRadius="md"
          onClick={() => navigate("/help")} // Add onClick handler to navigate to help center
          bg={isActive("/help") ? "gray.700" : "transparent"}
          _hover={{ bg: "gray.700", cursor: "pointer" }}
          transition="all 0.2s ease"
        >
          <Box fontSize="lg">
            <MdHelpCenter />
          </Box>
          <Text fontSize="md">Help Center</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;
