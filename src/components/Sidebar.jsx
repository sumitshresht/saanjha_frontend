import {
  Box,
  VStack,
  Text,
  HStack,
  Button,
  IconButton,
  Drawer,
  Portal,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  MdRssFeed,
  MdGroup,
  MdMessage,
  MdPhoto,
  MdNotifications,
  MdSettings,
  MdHelpCenter,
} from "react-icons/md";
import { BsBookmarkFill, BsList } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const isMobile = useBreakpointValue({ base: true, lg: false });

  const sidebarLinks = [
    { icon: <MdRssFeed />, label: "Feed", path: "/" },
    { icon: <MdGroup />, label: "Friends", path: "/friends" },
    { icon: <BsBookmarkFill />, label: "Saved Post", path: "/messages" },
    { icon: <MdPhoto />, label: "Photos", path: "/photos" },
    {
      icon: <MdNotifications />,
      label: "Notification",
      path: "/notifications",
    },
  ];

  const bottomLinks = [
    { icon: <MdSettings />, label: "Setting", path: "/setting" },
    { icon: <MdHelpCenter />, label: "Help Center", path: "/help" },
  ];

  return (
    <>
      {/* Sidebar for large screens */}
      <Box
        display={{ base: "none", lg: "flex" }}
        bg="gray.800"
        w="300px"
        h="100vh"
        color="white"
        flexDirection="column"
        justifyContent="space-between"
        p={4}
        position="sticky"
        top="0"
      >
        <VStack align="start" spacing={3} px={4} pt={4}>
          {sidebarLinks.map((item) => (
            <HStack
              key={item.path}
              spacing={3}
              py={2}
              px={3}
              borderRadius="md"
              bg={isActive(item.path) ? "gray.700" : "transparent"}
              _hover={{ bg: "gray.600", cursor: "pointer" }}
              onClick={() => navigate(item.path)}
              transition="all 0.2s ease"
            >
              <Box fontSize="lg">{item.icon}</Box>
              <Text fontSize="md">{item.label}</Text>
            </HStack>
          ))}
        </VStack>

        <Box borderBottom="1px solid" borderColor="gray.700" my={4} mx={4} />

        <VStack align="start" spacing={3} marginBottom={20} px={4} pb={6}>
          {bottomLinks.map((item) => (
            <HStack
              key={item.path}
              spacing={3}
              py={2}
              px={3}
              borderRadius="md"
              bg={isActive(item.path) ? "gray.700" : "transparent"}
              _hover={{ bg: "gray.700", cursor: "pointer" }}
              onClick={() => navigate(item.path)}
              transition="all 0.2s ease"
            >
              <Box fontSize="lg">{item.icon}</Box>
              <Text fontSize="md">{item.label}</Text>
            </HStack>
          ))}
        </VStack>
      </Box>

      {/* Drawer for mobile */}
      {isMobile && (
        <Drawer.Root placement={"left"}>
          <Drawer.Trigger asChild>
            <Button
              variant="ghost"
              aria-label="Open sidebar"
              position="fixed"
              top={4}
              left={4}
              zIndex={10}
              bg="gray.700"
              color="white"
              _hover={{ bg: "gray.600" }}
              _active={{ bg: "gray.500" }}
            >
              <BsList />
            </Button>
          </Drawer.Trigger>

          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content bg="gray.800" color="white" w="250px">
                <Drawer.Header borderBottom="1px solid gray">
                  Menu
                </Drawer.Header>
                <Drawer.Body>
                  <Box
                    display={{ base: "flex", lg: "flex" }}
                    bg="gray.800"
                    w="300px"
                    h="100vh"
                    color="white"
                    flexDirection="column"
                    justifyContent="space-between"
                    p={4}
                    position="sticky"
                    top="0"
                  >
                    <VStack align="start" spacing={3} px={4} pt={4}>
                      {sidebarLinks.map((item) => (
                        <HStack
                          key={item.path}
                          spacing={3}
                          py={2}
                          px={3}
                          borderRadius="md"
                          bg={isActive(item.path) ? "gray.700" : "transparent"}
                          _hover={{ bg: "gray.600", cursor: "pointer" }}
                          onClick={() => navigate(item.path)}
                          transition="all 0.2s ease"
                        >
                          <Box fontSize="lg">{item.icon}</Box>
                          <Text fontSize="md">{item.label}</Text>
                        </HStack>
                      ))}
                    </VStack>

                    <Box
                      borderBottom="1px solid"
                      borderColor="gray.700"
                      my={4}
                      mx={4}
                    />

                    <VStack
                      align="start"
                      spacing={3}
                      marginBottom={20}
                      px={4}
                      pb={6}
                    >
                      {bottomLinks.map((item) => (
                        <HStack
                          key={item.path}
                          spacing={3}
                          py={2}
                          px={3}
                          borderRadius="md"
                          bg={isActive(item.path) ? "gray.700" : "transparent"}
                          _hover={{ bg: "gray.700", cursor: "pointer" }}
                          onClick={() => navigate(item.path)}
                          transition="all 0.2s ease"
                        >
                          <Box fontSize="lg">{item.icon}</Box>
                          <Text fontSize="md">{item.label}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Box>
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      )}
    </>
  );
};

export default Sidebar;
