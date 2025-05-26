import React, { useState, useEffect } from "react";
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

const Profile = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setForm(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveField = (field) => {
    const updatedUser = { ...form };
    sessionStorage.setItem("user", JSON.stringify(updatedUser));
    setEditMode({ ...editMode, [field]: false });
    setMessage("Profile updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const renderField = (label, fieldName) => (
    <Flex align="center" gap={2} width="100%">
      {editMode[fieldName] ? (
        <Input
          name={fieldName}
          value={form[fieldName]}
          onChange={handleChange}
          size="sm"
          bg="gray.50"
          flex="1"
        />
      ) : (
        <Text flex="1" fontSize="md" color="white">
          <strong>{label}:</strong> {form[fieldName] || "Not set"}
        </Text>
      )}

      <Button
        onClick={() =>
          editMode[fieldName]
            ? handleSaveField(fieldName)
            : setEditMode({ ...editMode, [fieldName]: true })
        }
        size="sm"
        bg="gray.800"
        color="white"
        _hover={{ bg: "gray.700" }}
        borderRadius="md"
        px="2"
        minW="auto"
      >
        {editMode[fieldName] ? <MdCheck /> : <MdEdit />}
      </Button>
    </Flex>
  );

  return (
    <Box
      maxW="500px"
      mx="auto"
      mt="50px"
      p="6"
      bg="gray.800"
      borderRadius="xl"
      boxShadow="lg"
      border="1px solid"
      borderColor="gray.100"
    >
      <Heading size="lg" mb="6" textAlign="center" color="white">
        My Profile
      </Heading>

      {message && (
        <Box
          mb="4"
          p="3"
          borderRadius="md"
          bg="green.100"
          color="green.800"
          textAlign="center"
        >
          {message}
        </Box>
      )}

      <VStack spacing={5}>
        <Avatar.Root>
          <Avatar.Image
            src="https://i.pravatar.cc/150?img=12"
            alt={`${form.firstName} ${form.lastName}`}
          />
          <Avatar.Fallback name={`${form.firstName} ${form.lastName}`} />

        </Avatar.Root>
        

        {renderField("First Name", "firstName")}
        {renderField("Last Name", "lastName")}
        {renderField("Email", "email")}
        {renderField("Phone Number", "phone")}
      </VStack>
    </Box>
  );
};

export default Profile;
