import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Text,
  VStack,
  Heading,
  Spinner,
  Avatar,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router"; // ✅ import this

const People = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ initialize it

  const fetchPeople = async () => {
    try {
      const res = await axios.get("https://saanjhabackend-production.up.railway.app/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <Box w="100%">
      <Heading fontSize="2xl" mb={4} color="white">
        People
      </Heading>

      {loading ? (
        <Spinner color="teal.300" />
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={6}
        >
          {users.map((user) => (
            <Box
              key={user.userId}
              onClick={() => navigate(`/people/${user.userId}`)} // ✅ added this
              border="1px solid rgba(255,255,255,0.1)"
              borderRadius="xl"
              p={4}
              display="flex"
              alignItems="center"
              gap={4}
              boxShadow="md"
              cursor="pointer"
              _hover={{ boxShadow: "lg", transform: "scale(1.02)", bg: "gray.800" }}
              transition="all 0.2s ease"
            >
              <Avatar.Root boxSize="14">
                <Avatar.Image
                  src={
                    user.profilePhoto?.trim()
                      ? user.profilePhoto
                      : "https://res.cloudinary.com/dtiqzj2cx/image/upload/v1750023118/xt10jnwtnfkoiksvzu7i.jpg"
                  }
                />
              </Avatar.Root>

              <VStack align="start" spacing={1}>
                <Text fontWeight="bold" color="white">
                  {user.firstName} {user.lastName}
                </Text>
                <Text fontSize="sm" color="gray.400">
                  ID: {user.userId}
                </Text>
              </VStack>
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default People;
