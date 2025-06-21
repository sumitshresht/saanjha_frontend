import {
  Avatar,
  Button,
  Card,
  HStack,
  Stack,
  Heading,
  Textarea,
  Input,
  Box,
  Image,
  Text,
  Flex,
  Center,
} from "@chakra-ui/react";
import { useState, useContext, useRef } from "react";
import { UserContext } from "../utils/UserContext";
import { LuX } from "react-icons/lu";
import { FiImage } from "react-icons/fi";
import axios from "axios";

const PostCreator = ({ onPost }) => {
  const storedUser = useContext(UserContext);
  const fileInputRef = useRef(null);

  const currUser = storedUser?.user
    ? {
        name: `${storedUser.user.firstName} ${storedUser.user.lastName}`,
        avatar:
          storedUser.user.profilePhoto && storedUser.user.profilePhoto !== ""
            ? storedUser.user.profilePhoto
            : "https://res.cloudinary.com/dtiqzj2cx/image/upload/v1750023118/xt10jnwtnfkoiksvzu7i.jpg",
        userId: storedUser.user.userId,
      }
    : {
        name: "Guest",
        avatar:
          "https://res.cloudinary.com/dtiqzj2cx/image/upload/v1750023118/xt10jnwtnfkoiksvzu7i.jpg",
        userId: "guest_user",
      };

  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setError("");
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl("");
    }
  };

  const uploadFileToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      setUploading(true);
      const res = await axios.post("https://saanjhabackend-production.up.railway.app/upload", formData);
      return res.data;
    } catch (err) {
      console.error("Upload failed", err);
      setError("Upload failed. Try again.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handlePost = async () => {
    if (content.trim() === "") {
      setError("Post content cannot be empty.");
      return;
    }

    let uploadedUrl = "";
    if (imageFile) {
      uploadedUrl = await uploadFileToCloudinary(imageFile);
      if (!uploadedUrl) return;
    }

    onPost?.(content, uploadedUrl);
    setContent("");
    setImageFile(null);
    setPreviewUrl("");
    setMenuOpen(false);
    setError("");
  };

  return (
    <>
      {/* Frosted Create Box */}
      <Card.Root
        bg="rgba(255, 255, 255, 0.05)"
        backdropFilter="blur(12px)"
        borderRadius="2xl"
        border="1px solid rgba(255, 255, 255, 0.08)"
        p={4}
        color="white"
        boxShadow="md"
        maxW="600px"
        w="100%"
        mx="auto"
      >
        <Card.Body>
          <Stack spacing={3}>
            <HStack spacing={4} align="center">
              <Avatar.Root boxSize="10">
                <Avatar.Image src={currUser.avatar} />
              </Avatar.Root>
              <Input
                placeholder={`What's on your mind, ${storedUser.user.firstName}?`}
                onClick={() => setMenuOpen(true)}
                bg="rgba(255,255,255,0.08)"
                borderRadius="full"
                border="1px solid rgba(255,255,255,0.1)"
                px={4}
                py={2}
                color="white"
                _placeholder={{ color: "gray.400" }}
                readOnly
              />
            </HStack>
          </Stack>
        </Card.Body>
      </Card.Root>

      {menuOpen && (
        <Box
          position="fixed"
          inset="0"
          zIndex={50}
          borderRadius="2xl"
          bg="rgba(0, 0, 0, 0.1)"
          backdropFilter="blur(200px)"
          overflowY="auto"
          px={4}
          py={12} // 👈 Pushes popup toward top
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Box
            //bg="rgba(255, 255, 255, 0.06)"
            bg="gray.800"
            backdropFilter="blur(18px)"
            border="1px solid rgba(255, 255, 255, 0.15)"
            borderRadius="2xl"
            boxShadow="2xl"
            color="white"
            p={6}
            w="100%"
            maxW="550px"
          >
            <Stack spacing={5}>
              <HStack justify="space-between">
                <Heading size="md" flex={1} textAlign="center">
                  Create Post
                </Heading>
                <Button
                  onClick={() => setMenuOpen(false)}
                  variant="ghost"
                  size="sm"
                  borderRadius="full"
                  color="gray.300"
                  _hover={{ bg: "gray.600", color: "white" }}
                >
                  <LuX size={18} />
                </Button>
              </HStack>

              <HStack spacing={3}>
                <Avatar.Root boxSize="10">
                  <Avatar.Image src={currUser.avatar} />
                </Avatar.Root>
                <Text fontWeight="medium" fontSize="sm" color="gray.200">
                  {currUser.name}
                </Text>
              </HStack>

              <Textarea
                placeholder={`What's on your mind, ${storedUser.user.firstName}?`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                bg="rgba(255,255,255,0.08)"
                border="1px solid rgba(255,255,255,0.12)"
                borderRadius="lg"
                color="white"
                height="120px"
                resize="none"
                _placeholder={{ color: "gray.400" }}
              />

              {previewUrl && (
                <Box borderRadius="lg" overflow="hidden">
                  {imageFile?.type.startsWith("video/") ? (
                    <video
                      src={previewUrl}
                      controls
                      style={{
                        width: "100%",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      objectFit="cover"
                      maxH="250px"
                      w="full"
                    />
                  )}
                </Box>
              )}

              <Flex
                justify="space-between"
                align="center"
                border="1px solid rgba(255,255,255,0.15)"
                borderRadius="lg"
                px={4}
                py={2}
              >
                <Text fontSize="sm" color="gray.300">
                  Add to your post
                </Text>
                <Button
                  variant="ghost"
                  size="sm"
                  color="green.300"
                  _hover={{ bg: "gray.700", color: "green.400" }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiImage />
                </Button>
              </Flex>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                hidden
                onChange={handleFileSelect}
              />

              {error && (
                <Text color="red.400" fontSize="sm">
                  {error}
                </Text>
              )}

              <Button
                colorScheme="teal"
                width="100%"
                onClick={handlePost}
                isLoading={uploading}
                loadingText="Posting..."
                borderRadius="full"
                fontWeight="medium"
              >
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
