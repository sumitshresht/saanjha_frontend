// src/components/PostCreator.jsx
import {
  Avatar,
  Button,
  Card,
  HStack,
  Stack,
  Heading,
  Textarea,
  InputGroup,
  Input,
  Text,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuX } from "react-icons/lu";

const MAX_CHARACTERS = 1000;

const PostCreator = ({ onPost, user }) => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePost = () => {
    if (value.trim() === "") {
      alert("Please enter a post before submitting.");
      return;
    }
    onPost?.(value, title);
    // safely call if provided
    setTitle("");
    setValue("");
    setMenuOpen(false);
  };

  return (
    <>
      <Card.Root
        bg="gray.800"
        borderRadius="lg"
        borderColor={"gray.700"}
        p={4}
        color="white"
        boxShadow="md"
        maxW="900px"
        w="100%"
        mx="auto"
      >
        <Card.Body>
          <Stack mb="6" gap="3">
            <Heading>Post Something</Heading>
            <HStack spacing={4} align="start">
              <Avatar.Root>
                <Avatar.Image src={user.avatar} />
                <Avatar.Fallback name={user.name} />
              </Avatar.Root>

              <InputGroup>
                <Input
                  placeholder="What's on your mind?"
                  bg="gray.700"
                  border="none"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                  _focus={{ bg: "gray.600", border: "none" }}
                  onClick={() => setMenuOpen(true)}
                  readOnly
                />
              </InputGroup>
            </HStack>
          </Stack>
        </Card.Body>
      </Card.Root>

      {menuOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          bg="blackAlpha.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={20}
        >
          <Box
            bg="gray.800"
            borderRadius="lg"
            p={4}
            color="white"
            boxShadow="lg"
            minW="400px"
          >
            <Stack spacing={4}>
              <HStack justify="space-between" align="center">
                <Box flex={1} textAlign="center">
                  <Heading size="md">Create Post</Heading>
                </Box>
                <Button
                  onClick={() => setMenuOpen(false)}
                  variant="ghost"
                  size="sm"
                  color="gray.300"
                  _hover={{ bg: "gray.600", color: "white" }}
                >
                  <LuX size={18} />
                </Button>
              </HStack>

              <HStack spacing={4} align="center">
                <Avatar.Root>
                  <Avatar.Image src={user.avatar} />
                  <Avatar.Fallback name={user.name} />
                </Avatar.Root>

                <Text fontWeight="medium">{user.name}</Text>
              </HStack>
              <Input
                placeholder="Enter a title"
                bg="gray.700"
                border="none"
                color="white"
                _placeholder={{ color: "gray.400" }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Textarea
  placeholder="What's on your mind?"
  bg="gray.700"
  border="none"
  color="white"
  height="150px"
  resize="none"
  _placeholder={{ color: "gray.400" }}
  value={value}
  onChange={(e) =>
    setValue(e.currentTarget.value.slice(0, MAX_CHARACTERS))
  }
/>
              <Text fontSize="xs" color="gray.400" textAlign="right">
                {value.length} / {MAX_CHARACTERS}
              </Text>

              <Button colorScheme="teal" width="100%" onClick={handlePost}>
                Post
              </Button>
            </Stack>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PostCreator;
