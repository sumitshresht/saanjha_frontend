import React, { useState, useContext } from "react";
import { Box, Flex, Input, Text, Avatar, Button, Menu } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router";
import { useBreakpointValue } from "@chakra-ui/react";
import { UserContext } from "../utils/UserContext";
import { motion } from "framer-motion";
import {
  BsChatHeart,
  BsSearch,
  BsPerson,
  BsGear,
  BsBoxArrowRight,
  BsChevronDown,
} from "react-icons/bs";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useContext(UserContext);
  const placeholderText = useBreakpointValue({ base: "", md: "Search" });
  const fullName = user?.user
    ? `${user.user.firstName} ${user.user.lastName}`
    : "Guest";
  const profile =
    user?.user?.profilePhoto && user.user.profilePhoto !== ""
      ? user.user.profilePhoto
      : "https://res.cloudinary.com/dtiqzj2cx/image/upload/v1750023118/xt10jnwtnfkoiksvzu7i.jpg";

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);
      setSearchText("");
    }
  };

  return (
    <Flex
      w="100%"
      maxW="100vw"
      bg="rgba(255, 255, 255, 0.06)"
      backdropFilter="blur(10px)"
      borderBottom="1px solid rgba(255, 255, 255, 0.1)"
      borderRadius="xl"
      color="white"
      px={2}
      py={3}
      align="center"
      justify="space-between"
      position="sticky"
      top={0}
      zIndex={1000}
      gap={2}
    >
      {/* Left: Hamburger + Logo */}
      <Flex
        marginLeft={{ base: "12", md: "12", lg: "0.5" }}
        align="center"
        minW="fit-content"
        mr={2}
      >
        {/* Assuming hamburger icon is injected outside this Navbar */}
        <Box
          fontSize="xl"
          fontWeight="bold"
          onClick={() => navigate("/")}
          color="teal.300"
          display="flex"
          alignItems="center"
          cursor="pointer"
        >
          <Box ml={2} display={{ base: "block", md: "block" }}>
            Saanjha
          </Box>
        </Box>
      </Flex>

      {useBreakpointValue({ base: true, md: false }) ? (
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button
              size="sm"
              variant="ghost"
              color="white"
              px={2}
              borderRadius="full"
              bg="rgba(255, 255, 255, 0.08)"
              _hover={{ bg: "rgba(255,255,255,0.2)" }}
            >
              <BsSearch size={18} />
            </Button>
          </Menu.Trigger>

          <Menu.Positioner>
            <Menu.Content
              as={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              bg="rgba(20, 20, 20, 0.85)"
              backdropFilter="blur(12px) saturate(150%)"
              borderRadius="lg"
              boxShadow="dark-lg"
              p={4}
              w="100vw"
              maxW="100vw"
              border="1px solid rgba(255,255,255,0.1)"
              zIndex={9999}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchText.trim()) {
                    navigate(
                      `/search?q=${encodeURIComponent(searchText.trim())}`
                    );
                    setSearchText("");
                    document.body.click(); // close the menu
                  }
                }}
              >
                <Flex gap={3} align="center">
                  <Input
                    autoFocus
                    placeholder="Search anything..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    borderRadius="xl"
                    bg="gray.800"
                    color="white"
                    px={4}
                    py={2}
                    _placeholder={{ color: "gray.400" }}
                    _focus={{
                      borderColor: "teal.400",
                      boxShadow: "0 0 0 1px teal",
                    }}
                    flex="1"
                  />
                  <Button
                    type="submit"
                    colorScheme="teal"
                    px={4}
                    borderRadius="xl"
                    boxShadow="md"
                  >
                    <BsSearch />
                  </Button>
                </Flex>
              </form>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      ) : (
        <Box
          as="form"
          onSubmit={handleSearch}
          display="flex"
          alignItems="center"
          bg="rgba(255, 255, 255, 0.08)"
          border="1px solid rgba(255,255,255,0.2)"
          borderRadius="full"
          px={4}
          py={1}
          flex="1"
          maxW="400px"
          mx={2}
          transition="all 0.2s ease"
          _focusWithin={{
            boxShadow: "0 0 0 2px teal",
            borderColor: "teal.400",
          }}
          _hover={{
            borderColor: "rgba(255,255,255,0.4)",
          }}
        >
          <Input
            placeholder="Search..."
            bg="transparent"
            border="none"
            color="white"
            fontSize="sm"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            _placeholder={{ color: "gray.400" }}
            _focus={{ outline: "none" }}
          />
          <Button
            type="submit"
            size="sm"
            variant="ghost"
            color="gray.400"
            _hover={{
              bg: "rgba(255,255,255,0.1)",
              color: "white",
              transform: "scale(1.1)",
            }}
            _active={{ transform: "scale(0.95)" }}
            transition="all 0.2s ease"
            ml={2}
            px={2}
          >
            <BsSearch />
          </Button>
        </Box>
      )}

      {/* Right: Avatar and dropdown */}
      <Flex
        align="center"
        minW="fit-content"
        pr={{ base: 4, md: 4 }}
        position="relative"
        zIndex={9999} // ensure it's above everything
      >
        <Avatar.Root boxSize="10">
          <Avatar.Image src={profile} name={fullName} />
        </Avatar.Root>

        <Menu.Root>
          <Menu.Trigger asChild>
            <Button
              variant="ghost"
              size="sm"
              ml={2}
              px={2}
              _expanded={{ bg: "rgba(255,255,255,0.1)" }}
              _hover={{ bg: "rgba(255,255,255,0.1)" }}
            >
              <Flex align="center" gap={1} flexShrink={0}>
                <Text
                  fontWeight="medium"
                  display={{ base: "none", md: "block" }}
                  fontSize="sm"
                  color="gray.100"
                  isTruncated
                  maxW="100px"
                >
                  {fullName}
                </Text>
                <Box
                  as={BsChevronDown}
                  variant="ghost"
                  bg="transparent"
                  // marginLeft="-6"
                  boxSize={4}
                  color="white"
                />
              </Flex>
            </Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content
              bg="rgba(20, 20, 20, 0.9)"
              placement="bottom-end" // ✅ important
              backdropFilter="blur(12px)"
              borderRadius="md"
              minW="200px"
              px={2}
              py={2}
              boxShadow="lg"
              border="1px solid rgba(255,255,255,0.1)"
            >
              <Menu.Item color="white" onClick={() => navigate("/profile")}>
                <Flex gap={3}>
                  <BsPerson />
                  <Text>Profile</Text>
                </Flex>
              </Menu.Item>
              <Menu.Item color="white" onClick={() => navigate("/setting")}>
                <Flex gap={3}>
                  <BsGear />
                  <Text>Settings</Text>
                </Flex>
              </Menu.Item>
              <Menu.Separator />
              <Menu.Item
                onClick={handleLogout}
                _hover={{ bg: "red.600", color: "white" }}
                color="red.300"
              >
                <Flex gap={3}>
                  <BsBoxArrowRight />
                  <Text>Logout</Text>
                </Flex>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Flex>
    </Flex>
  );
}
