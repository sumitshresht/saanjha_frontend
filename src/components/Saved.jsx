import { useEffect, useState } from "react";
import {
  VStack,
  Box,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";
import PostCard from "./PostCard";
import axios from "axios";

const Saved = () => {
  const storedUser = JSON.parse(sessionStorage.getItem("user"));

  const user = {
    name: storedUser
      ? `${storedUser.firstName} ${storedUser.lastName}`
      : "Guest",
    avatar: storedUser?.profilePhoto || "https://i.pravatar.cc/150?img=12",
    userId: storedUser?.userId,
  };

  const [savedPosts, setSavedPosts] = useState([]);

  const handleUnsave = (unsavedPost) => {
    setSavedPosts((prev) => prev.filter((p) => p.postId !== unsavedPost.postId));
  };

  useEffect(() => {
    if (!user.userId) return;

    const fetchSavedPosts = async () => {
      try {
        const res = await axios.get(`https://saanjhabackend-production.up.railway.app/saved`, {
          params: {
            userId: user.userId,
          },
        });
        setSavedPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch saved posts:", error);
      }
    };

    fetchSavedPosts();
  }, [user.userId]);

  return (
    <Container maxW="900px" py={6}>
      <VStack spacing={4} align="stretch">
        <Heading color="teal.300" textAlign="center">
          Saved Posts
        </Heading>

        {savedPosts.length === 0 ? (
          <Text color="gray.400" textAlign="center">
            No saved posts yet.
          </Text>
        ) : (
          [...savedPosts].reverse().map((post) => (
            <Box mb={2} key={post.postId}>
              <PostCard post={post} user={user} onUnsave={handleUnsave} />
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Saved;
