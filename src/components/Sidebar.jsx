import {
  Box,
  VStack,
  Text,
  HStack,
  Button,
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
import { FaUsers } from "react-icons/fa";
import { BsBookmarkFill, BsList } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";

const Sidebar = () => {
  const navigate = useNavigate();
  const drawerRef = useRef();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const isMobile = useBreakpointValue({ base: true, lg: false }) ?? false;
  //console.log("isMobile:", isMobile);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
  if (!drawerOpen) return;

  const handleClickOutside = (e) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      setDrawerOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [drawerOpen]);

  const sidebarLinks = [
    { icon: <MdRssFeed />, label: "Feed", path: "/" },
    { icon: <MdGroup />, label: "My Posts", path: "/mypost" },
    { icon: <BsBookmarkFill />, label: "Saved Post", path: "/saved" },
    { icon: <FaUsers />, label: "People", path: "/people" },
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

  const GlassBox = ({ children }) => (
    <Box
      bg="rgba(255, 255, 255, 0.06)"
      backdropFilter="blur(20px) saturate(180%)"
      WebkitBackdropFilter="blur(20px) saturate(180%)"
      border="1px solid rgba(255, 255, 255, 0.1)"
      borderRadius="xl"
      p={4}
      color="white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minH="100%"
    >
      {children}
    </Box>
  );

  return (
    <>
      {/* Sidebar for large screens */}
      <Box
        display={{ base: "none", lg: "block" }}
        position="sticky"
        top="0"
        height="calc(100vh - 130px)"
        minW="260px"
        maxW="260px"
      >
        <GlassBox>
          {/* Scrollable top links */}
          <Box overflowY="auto" py={4} px={2} flex="1">
            <VStack align="start" spacing={3}>
              {sidebarLinks.map((item) => (
                <HStack
                  key={item.path}
                  spacing={3}
                  py={2}
                  px={3}
                  borderRadius="md"
                  bg={
                    isActive(item.path)
                      ? "rgba(255,255,255,0.1)"
                      : "transparent"
                  }
                  _hover={{ bg: "rgba(255,255,255,0.1)", cursor: "pointer" }}
                  onClick={() => {
                    navigate(item.path);
                    setDrawerOpen(false);
                  }}
                  transition="all 0.2s ease"
                  w="full"
                >
                  <Box fontSize="lg">{item.icon}</Box>
                  <Text fontSize="md">{item.label}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>

          {/* Fixed bottom links */}
          <Box py={4} px={2} borderTop="1px solid rgba(255,255,255,0.1)">
            <VStack align="start" spacing={3}>
              {bottomLinks.map((item) => (
                <HStack
                  key={item.path}
                  spacing={3}
                  py={2}
                  px={3}
                  borderRadius="md"
                  bg={
                    isActive(item.path)
                      ? "rgba(255,255,255,0.1)"
                      : "transparent"
                  }
                  _hover={{ bg: "rgba(255,255,255,0.1)", cursor: "pointer" }}
                  onClick={() => {
                    navigate(item.path);
                    setDrawerOpen(false);
                  }}
                  transition="all 0.2s ease"
                  w="full"
                >
                  <Box fontSize="lg">{item.icon}</Box>
                  <Text fontSize="md">{item.label}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        </GlassBox>
      </Box>

      {/* Drawer for mobile */}
      {isMobile && (
        <Drawer.Root
          placement="left"
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          //onClose={() => setDrawerOpen(false)}
        >
          {!drawerOpen && (
            <Button
              variant="solid"
              aria-label="Open sidebar"
              position="fixed"
              top={4}
              left={4}
              zIndex={9999}
              mt={3}
              ml={{ base: "2", md: "6" }}
              bg="transparent"
              maxW="10"
              color="white"
              border="1px solid rgba(255,255,255,0.1)"
              _hover={{ bg: "rgba(255,255,255,0.12)" }}
              _active={{ bg: "rgba(255,255,255,0.2)" }}
              onClick={() => setDrawerOpen(true)}
            >
              <BsList />
            </Button>
          )}

          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content
                bg="transparent"
                border="none"
                ref={drawerRef}
               // onPointerDownOutside={() => setDrawerOpen(false)}
                boxShadow="none"
                w="260px"
              >
                <Drawer.Header
                  fontWeight="bold"
                  borderBottom="1px solid rgba(255,255,255,0.1)"
                  color="white"
                  bg="gray.800"
                >
                  Menu
                </Drawer.Header>
                <Drawer.Body p={0}>
                  <GlassBox>
                    <VStack align="start" spacing={3} px={2} pt={4}>
                      {sidebarLinks.map((item) => (
                        <HStack
                          key={item.path}
                          spacing={3}
                          py={2}
                          px={3}
                          borderRadius="md"
                          bg={
                            isActive(item.path)
                              ? "rgba(255,255,255,0.1)"
                              : "transparent"
                          }
                          _hover={{
                            bg: "rgba(255,255,255,0.1)",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            navigate(item.path);
                            setDrawerOpen(false);
                          }}
                          transition="all 0.2s ease"
                        >
                          <Box fontSize="lg">{item.icon}</Box>
                          <Text fontSize="md">{item.label}</Text>
                        </HStack>
                      ))}
                    </VStack>

                    <VStack align="start" spacing={3} px={2} pb={6}>
                      {bottomLinks.map((item) => (
                        <HStack
                          key={item.path}
                          spacing={3}
                          py={2}
                          px={3}
                          borderRadius="md"
                          bg={
                            isActive(item.path)
                              ? "rgba(255,255,255,0.1)"
                              : "transparent"
                          }
                          _hover={{
                            bg: "rgba(255,255,255,0.1)",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            navigate(item.path);
                            setDrawerOpen(false);
                          }}
                          transition="all 0.2s ease"
                        >
                          <Box fontSize="lg">{item.icon}</Box>
                          <Text fontSize="md">{item.label}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </GlassBox>
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
