import React, { use } from "react";
import { Box, Flex, Input, Text, Avatar, Button, Menu } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../utils/UserContext";
import {
  BsChatHeart,
  BsSearch,
  BsPerson,
  BsGear,
  BsBoxArrowRight,
  BsChevronDown,
} from "react-icons/bs";
import { useNavigate, useLocation } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useContext(UserContext);
  const fullName = user ? `${user.user.firstName} ${user.user.lastName}` : "Guest";

  const handleLogout = () => {
    // Example: Clear local storage and redirect to login
    localStorage.clear(); // or remove specific auth keys
    window.location.href = "/login"; // adjust path to your login route
  };

  return (
    <Flex
      bg="gray.800"
      color="white"
      marginBottom={1}
      px={6}
      py={4}
      align="center"
      justify="space-between"
      boxShadow="sm"
    >
      {/* Logo */}
      <Flex align="center" fontSize="xl" fontWeight="bold">
        <Box mr={2} color="teal.300">
          <BsChatHeart size={22} />
        </Box>
        <Box>Saanjha</Box>
      </Flex>

      {/* Search Box */}
      <Box
        as="form"
        display="flex"
        alignItems="center"
        bg="gray.900"
        border="1px solid"
        borderColor="gray.700"
        borderRadius="full"
        px={4}
        py={1}
        mx={8}
        w="full"
        maxW="400px"
        transition="all 0.2s ease"
        _focusWithin={{
          boxShadow: "0 0 0 2px teal",
          borderColor: "teal.400",
        }}
        _hover={{
          borderColor: "gray.600",
        }}
      >
        <Input
          placeholder="Search"
          bg="transparent"
          border="none"
          color="white"
          fontSize="sm"
          _placeholder={{ color: "gray.400" }}
          _focus={{ outline: "none" }}
        />
        <Button
          type="submit"
          size="sm"
          variant="ghost"
          color="gray.400"
          _hover={{ bg: "gray.700", color: "white", transform: "scale(1.1)" }}
          _active={{ transform: "scale(0.95)" }}
          transition="all 0.2s ease"
          ml={2}
          px={2}
        >
          <BsSearch />
        </Button>
      </Box>

      {/* User Avatar + Name + Dropdown */}
      <Flex align="center" mr={2}>
        <Avatar.Root>
          <Avatar.Image src="https://images.unsplash.com/photo-1511806754518-53bada35f930" />
          <Avatar.Fallback name="Nate Foss" />
        </Avatar.Root>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button
              variant="ghost"
              size="sm"
              ml={2}
              px={2}
              _hover={{ bg: "gray.700" }}
            >
              <Flex align="center" gap={2}>
                <Text fontWeight="medium" fontSize="sm" color="gray.100">
                  {fullName}
                </Text>

                <BsChevronDown color="white" />
              </Flex>
            </Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content
              bg="gray.900"
              border="1px solid"
              borderColor="gray.700"
              borderRadius="lg"
              minW="200px"
              boxShadow="dark-lg"
              px={2}
              py={2}
            >
              <Menu.Item
                px={4}
                py={2}
                fontSize="sm"
                color="gray.200"
                borderRadius="md"
                onClick={() => navigate("/profile")}
                transition="background 0.2s"
                _hover={{ bg: "gray.600", color: "white" }}
              >
                <Flex align="center" gap={3}>
                  <BsPerson />
                  <Text>Profile</Text>
                </Flex>
              </Menu.Item>

              <Menu.Item
                px={4}
                py={2}
                fontSize="sm"
                color="gray.200"
                borderRadius="md"
                onClick={() => navigate("/setting")}
                transition="background 0.2s"
                _hover={{ bg: "gray.600", color: "white" }}
              >
                <Flex align="center" gap={3}>
                  <BsGear />
                  <Text>Settings</Text>
                </Flex>
              </Menu.Item>

              <Menu.Separator my={1} borderColor="gray.700" />

              <Menu.Item
                px={4}
                py={2}
                fontSize="sm"
                color="red.300"
                borderRadius="md"
                onClick={handleLogout}
                transition="background 0.2s"
                _hover={{ bg: "red.600", color: "white" }}
              >
                <Flex align="center" gap={3}>
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
