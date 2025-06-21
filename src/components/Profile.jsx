import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Box,
  Heading,
  Input,
  VStack,
  Avatar,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import { MdEdit, MdCheck } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import axios from "axios";
import { UserContext } from "../utils/UserContext";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profilePhoto: "",
  });

  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
  });

  const [msg, setMsg] = useState({ text: "", type: "info" });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setForm({
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone ?? "",
      profilePhoto: user.profilePhoto ?? "",
    });
  }, [user]);

  const showMsg = (text, type = "success") => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "info" }), 3000);
  };

  const persistToBackend = async (updated) => {
    try {
      await axios.put(
        `https://saanjhabackend-production.up.railway.app/users/${updated.userId}`,
        updated,
        { headers: { "Content-Type": "application/json" } }
      );
      setUser(updated);
      sessionStorage.setItem("user", JSON.stringify(updated));
      return true;
    } catch (err) {
      console.error("PUT /users failed →", err);
      showMsg("Server update failed", "error");
      return false;
    }
  };

  const saveField = async (field) => {
    const updated = { ...form };
    if (await persistToBackend(updated)) {
      setEditMode((prev) => ({ ...prev, [field]: false }));
      showMsg("Profile updated");
    }
  };

  const uploadPhoto = async (file) => {
    const data = new FormData();
    data.append("file", file);

    try {
      setUploading(true);
      const res = await axios.post("https://saanjhabackend-production.up.railway.app/upload", data);
      const url = res.data;
      const updated = { ...form, profilePhoto: url };
      setForm(updated);
      if (await persistToBackend(updated)) {
        showMsg("Profile picture updated");
      }
    } catch (err) {
      console.error("Upload error →", err);
      showMsg("Image upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const inputOrText = (field, label) => (
    <Flex
      align="center"
      gap={3}
      w="full"
      direction={{ base: "row", sm: "row" }}
    >
      <Text
        fontWeight="semibold"
        color="gray.300"
        fontSize={{ base: "sm", md: "md" }}
        w={{ base: "full", sm: "40%" }}
      >
        {label}:
      </Text>

      {editMode[field] ? (
        <Input
          name={field}
          value={form[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          size="sm"
          bg="gray.900"
          color="white"
          border="1px solid rgba(255,255,255,0.2)"
          _placeholder={{ color: "gray.400" }}
        />
      ) : (
        <Text
          flex="1"
          color="white"
          fontSize={{ base: "sm", md: "md" }}
          w="full"
        >
          {form[field] || "Not set"}
        </Text>
      )}

      <Button
        size="sm"
        variant="ghost"
        color="white"
        bg="gray.700"
        _hover={{ bg: "gray.600" }}
        borderRadius="full"
        onClick={() =>
          editMode[field]
            ? saveField(field)
            : setEditMode({ ...editMode, [field]: true })
        }
      >
        {editMode[field] ? <MdCheck /> : <MdEdit />}
      </Button>
    </Flex>
  );

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={{ base: 8, md: 10 }}
      px={{ base: 4, md: 6 }}
      py={6}
      bg="rgba(255, 255, 255, 0.06)"
      backdropFilter="blur(20px)"
      border="1px solid rgba(255, 255, 255, 0.1)"
      borderRadius="2xl"
      boxShadow="lg"
    >
      <Heading size="lg" mb={6} textAlign="center" color="white">
        My Profile
      </Heading>

      {msg.text && (
        <Box
          mb={4}
          p={3}
          borderRadius="md"
          bg={msg.type === "error" ? "red.100" : "green.100"}
          color={msg.type === "error" ? "red.800" : "green.800"}
          textAlign="center"
          fontWeight="medium"
        >
          {msg.text}
        </Box>
      )}

      <VStack spacing={5} w="full">
        <Box position="relative">
          
<Avatar.Root boxSize="90px">
            <Avatar.Image
              src={form.profilePhoto || "https://res.cloudinary.com/dtiqzj2cx/image/upload/v1750023118/xt10jnwtnfkoiksvzu7i.jpg"}
              alt={`${form.firstName} ${form.lastName}`}
            />
            <Avatar.Fallback name={`${form.firstName} ${form.lastName}`} />
          </Avatar.Root>

          <Button
            size="sm"
            aria-label="Upload"
            borderRadius="full"
            bg="teal.700"
            color="white"
            variant="solid"
            position="absolute"
            bottom={0}
            right={0}
            _hover={{ bg: "teal.500" }}
            isLoading={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            <FaPen size={12} />
          </Button>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={(e) =>
              e.target.files[0] && uploadPhoto(e.target.files[0])
            }
          />
        </Box>

        {inputOrText("firstName", "First Name")}
        {inputOrText("lastName", "Last Name")}
        {inputOrText("email", "Email")}
        {inputOrText("phone", "Phone Number")}
      </VStack>
    </Box>
  );
};

export default Profile;

