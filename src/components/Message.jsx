import { useEffect, useState } from "react";
import {
  VStack,
  Box,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";
import PostCard from "./PostCard";




const Message = () => {
  const storedUser = JSON.parse(sessionStorage.getItem("user"));

const user = {
  name: storedUser ? `${storedUser.firstName} ${storedUser.lastName}` : "Guest",
  avatar: "https://i.pravatar.cc/150?img=12", // optional: can be personalized later
};

const handleUnsave = (unsavedPost) => {
  setSavedPosts((prev) =>
    prev.filter(
      (p) => !(p.title === unsavedPost.title && p.body === unsavedPost.body)
    )
  );
};
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedPosts")) || [];
    setSavedPosts(stored);
  }, []);

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
          savedPosts.map((post, index) => (
            <Box mb={2} key={`${post.title}-${index}`}>
              <PostCard post={post} user={user} onUnsave={handleUnsave} />

            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Message;
