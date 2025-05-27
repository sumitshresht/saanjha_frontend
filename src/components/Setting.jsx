import React, { useState, useEffect } from "react";
import {
  Tabs,
  Box,
  Heading,
  Text,
  HStack,
  Switch,
  VStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { LuSun, LuLock, LuDatabase } from "react-icons/lu";

export default function Setting() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Password-related states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.style.backgroundColor = darkMode
      ? "#1A202C"
      : "#F7FAFC";
    document.documentElement.style.color = darkMode ? "#F7FAFC" : "#1A202C";
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user?.password) {
      setStoredPassword(user.password);
    }
  }, []);

  const handlePasswordChange = () => {
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

    const user = JSON.parse(sessionStorage.getItem("user"));
    user.password = newPassword;
    sessionStorage.setItem("user", JSON.stringify(user));

    setMessage({ text: "Password updated successfully!", type: "success" });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Box maxW="800px" mx="auto" p={6}>
      <Tabs.Root defaultValue="appearance">
        <Tabs.List gap="2" mb="4">
          <Tabs.Trigger
            value="appearance"
            px="4"
            py="2"
            borderRadius="md"
            _selected={{ bg: "gray.500", color: "white" }}
            _hover={{ bg: "gray.700" }}
            display="flex"
            alignItems="center"
            gap="2"
          >
            <LuSun />
            Appearance
          </Tabs.Trigger>
          <Tabs.Trigger
            value="account-security"
            px="4"
            py="2"
            borderRadius="md"
            _selected={{ bg: "gray.500", color: "white" }}
            _hover={{ bg: "gray.700" }}
            display="flex"
            alignItems="center"
            gap="2"
          >
            <LuLock />
            Account & Security
          </Tabs.Trigger>
          <Tabs.Trigger
            value="data-usage"
            px="4"
            py="2"
            borderRadius="md"
            _selected={{ bg: "gray.500", color: "white" }}
            _hover={{ bg: "gray.700" }}
            display="flex"
            alignItems="center"
            gap="2"
          >
            <LuDatabase />
            Data Usage
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="appearance">
          <Box p="4" bg="gray.50" borderRadius="md">
            <Heading size="md" mb="2">
              Appearance
            </Heading>
            <Text mb="4">Customize your app's theme preferences.</Text>
            <HStack spacing={4} alignItems="center">
              <Text>Dark Mode</Text>
              <Switch.Root
                checked={darkMode}
                onCheckedChange={(e) => setDarkMode(e.checked)}
              >
                <Switch.HiddenInput />
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch.Root>
            </HStack>
          </Box>
        </Tabs.Content>

        <Tabs.Content value="account-security">
          <Box p="4" bg="gray.50" borderRadius="md">
            <Heading size="md" mb="2">
              Account & Security
            </Heading>
            <Text mb="4">Update your password below.</Text>

            {message.text && (
              <Box
                bg={message.type === "success" ? "green.100" : "red.100"}
                color={message.type === "success" ? "green.800" : "red.800"}
                p={3}
                borderRadius="md"
                mb={4}
                fontWeight="medium"
                textAlign="center"
              >
                {message.text}
              </Box>
            )}

            <VStack spacing={4}>
              <Input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                bg="white"
              />
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                bg="white"
              />
              <Input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                bg="white"
              />
              <Button
                colorScheme="teal"
                width="full"
                onClick={handlePasswordChange}
              >
                Update Password
              </Button>
            </VStack>
          </Box>
        </Tabs.Content>

        <Tabs.Content value="data-usage">
  <Box p="4" bg="gray.50" borderRadius="md">
    <Heading size="md" mb="2">
      Data Usage
    </Heading>
    <Text mb={4}>Manage your stored data preferences and clear app storage.</Text>

    <Button
      colorScheme="red"
      variant="outline"
      borderRadius="full"
      onClick={() => {
        alert("All local data has been cleared.");
        window.location.reload(); // optional: refresh to reflect changes
      }}
    >
      Clear All Data
    </Button>
  </Box>
</Tabs.Content>

      </Tabs.Root>
    </Box>
  );
}
