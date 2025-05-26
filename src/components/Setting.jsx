import React, { useState, useEffect } from "react";
import {
  Tabs,
  Box,
  Heading,
  Text,
  HStack,
  Switch,
} from "@chakra-ui/react";
import { LuSun, LuLock, LuDatabase } from "react-icons/lu";

export default function Setting() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.style.backgroundColor = darkMode ? "#1A202C" : "#F7FAFC";
    document.documentElement.style.color = darkMode ? "#F7FAFC" : "#1A202C";
    localStorage.setItem("theme", theme);
  }, [darkMode]);

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
            <Heading size="md" mb="2">Appearance</Heading>
            <Text mb="4">
              Customize your app's theme preferences.
            </Text>
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
            <Heading size="md" mb="2">Account & Security</Heading>
            <Text>Update your password, enable 2FA, and manage your credentials.</Text>
          </Box>
        </Tabs.Content>

        <Tabs.Content value="data-usage">
          <Box p="4" bg="gray.50" borderRadius="md">
            <Heading size="md" mb="2">Data Usage</Heading>
            <Text>View and manage how your data is collected and used.</Text>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
