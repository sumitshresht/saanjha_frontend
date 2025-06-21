import React, { useState, useEffect } from "react";
import {
  Tabs,
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  Input,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { LuSun, LuLock, LuDatabase } from "react-icons/lu";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Setting() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.style.backgroundColor = darkMode ? "#1A202C" : "#F7FAFC";
    document.documentElement.style.color = darkMode ? "#F7FAFC" : "#1A202C";
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user?.password) setStoredPassword(user.password);
  }, []);

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ text: "Please fill in all fields.", type: "error" });
      return;
    }

    if (currentPassword !== storedPassword) {
      setMessage({ text: "Current password is incorrect.", type: "error" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ text: "New passwords do not match.", type: "error" });
      return;
    }

    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const userId = user?.id || user?.userId;

      await axios.put(
        `https://saanjhabackend-production.up.railway.app/users/${userId}/change-password`,
        newPassword,
        { headers: { "Content-Type": "text/plain" } }
      );

      user.password = newPassword;
      sessionStorage.setItem("user", JSON.stringify(user));
      setMessage({ text: "Password updated successfully!", type: "success" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage({ text: "Failed to update password.", type: "error" });
    }
  };

  return (
    <Box maxW="900px" w="100%" mx="auto" p={{ base: 4, md: 6 }}>
      <Tabs.Root defaultValue="appearance">
        <Tabs.List
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={3}
          mb={6}
        >
          {[
            { value: "appearance", label: "Appearance", icon: <LuSun /> },
            { value: "account-security", label: "Account & Security", icon: <LuLock /> },
            { value: "data-usage", label: "Data Usage", icon: <LuDatabase /> },
          ].map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              px={4}
              py={2}
              borderRadius="lg"
              w={{ base: "100%", sm: "auto" }}
              bg="rgba(255,255,255,0.06)"
              border="1px solid rgba(255,255,255,0.1)"
              backdropFilter="blur(10px)"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              whiteSpace="normal"
              textAlign="center"
              wordBreak="break-word"
              _selected={{ bg: "teal.600", color: "white" }}
              _hover={{ bg: "rgba(255,255,255,0.1)" }}
            >
              {tab.icon}
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* Appearance */}
        <Tabs.Content
          value="appearance"
          p={{ base: 4, md: 6 }}
          borderRadius="2xl"
          w="100%"
          bg="rgba(255,255,255,0.04)"
          border="1px solid rgba(255,255,255,0.12)"
          backdropFilter="blur(10px)"
          color="white"
        >
          <Heading size="md" mb={2}>Appearance</Heading>
          <Text mb={4}>Customize your app's theme preferences.</Text>
          <HStack spacing={4} alignItems="center" wrap="wrap">
            <Text>Dark Mode</Text>
            <Box
              as="button"
              //onClick={() => setDarkMode(!darkMode)}
              onClick={() => alert("This feature is coming soon")}
              bg={darkMode ? "teal.500" : "gray.600"}
              w="42px"
              h="22px"
              borderRadius="full"
              position="relative"
              flexShrink={0}
            >
              <Box
                w="18px"
                h="18px"
                bg="white"
                borderRadius="full"
                position="absolute"
                top="2px"
                left={darkMode ? "20px" : "2px"}
                transition="all 0.3s ease"
              />
            </Box>
          </HStack>
        </Tabs.Content>

        {/* Account & Security */}
        <Tabs.Content
          value="account-security"
          p={{ base: 4, md: 6 }}
          mt={6}
          borderRadius="2xl"
          w="100%"
          bg="rgba(255,255,255,0.04)"
          border="1px solid rgba(255,255,255,0.12)"
          backdropFilter="blur(10px)"
          color="white"
        >
          <Heading size="md" mb={2}>Account & Security</Heading>
          <Text mb={4}>Update your password below.</Text>

          {message.text && (
            <Box
              bg={message.type === "success" ? "green.100" : "red.100"}
              color={message.type === "success" ? "green.800" : "red.800"}
              p={3}
              borderRadius="md"
              mb={4}
              fontWeight="medium"
              textAlign="center"
              overflowWrap="anywhere"
            >
              {message.text}
            </Box>
          )}

          <VStack spacing={4}>
            <Input
              type="password"
              bg="gray.900"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              borderRadius="xl"
              color="white"
              _placeholder={{ color: "gray.400" }}
            />
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              bg="gray.900"
              borderRadius="xl"
              color="white"
              _placeholder={{ color: "gray.400" }}
            />
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              bg="gray.900"
              borderRadius="xl"
              color="white"
              _placeholder={{ color: "gray.400" }}
            />
            <Button
              onClick={handlePasswordChange}
              bg="teal.500"
              _hover={{ bg: "teal.400" }}
              color="white"
              borderRadius="full"
              width="full"
            >
              Update Password
            </Button>
          </VStack>
        </Tabs.Content>

        {/* Data Usage */}
        <Tabs.Content
          value="data-usage"
          p={{ base: 4, md: 6 }}
          mt={6}
          borderRadius="2xl"
          w="100%"
          bg="rgba(255,255,255,0.04)"
          border="1px solid rgba(255,255,255,0.12)"
          backdropFilter="blur(10px)"
          color="white"
        >
          <Heading size="md" mb={2}>Data Usage</Heading>
          <Text mb={4}>
            Manage your stored data preferences and clear app storage.
          </Text>
          <Button
            bg="red.500"
            color="white"
            _hover={{ bg: "red.600" }}
            borderRadius="full"
            onClick={() => {
              sessionStorage.clear();
              localStorage.clear();
              navigate("/login");
              alert("All local data has been cleared.");
              window.location.reload();
            }}
          >
            Clear All Data
          </Button>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
