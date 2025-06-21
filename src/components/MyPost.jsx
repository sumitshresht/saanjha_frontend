import { useEffect, useState, useContext } from "react";
import { Box, Heading, Text, VStack, Container } from "@chakra-ui/react";
import axios from "axios";
import PostCard from "./PostCard";
import { UserContext } from "../utils/UserContext";

function MyPost() {
  const { user } = useContext(UserContext);
  const userId = user?.userId;

  const [myPosts, setMyPosts] = useState([]);

  const fetchMyPosts = async () => {
  try {
    const res = await axios.get(`https://saanjhabackend-production.up.railway.app/posts/user/${userId}`);
    const sorted = res.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setMyPosts(sorted);
  } catch (err) {
    console.error("Failed to fetch your posts", err);
  }
};


  const handleDeletePost = (deletedPost) => {
    setMyPosts((prev) => prev.filter((post) => post.postId !== deletedPost.postId));
  };

  useEffect(() => {
    if (userId) {
      fetchMyPosts();
    }
  }, [userId]);

  return (
    <Container maxW="900px" py={6}>
      <VStack spacing={4} align="stretch">
        <Heading color="teal.300" textAlign="center" mb={4}>
          My Posts
        </Heading>

        {myPosts.length === 0 ? (
          <Text color="gray.400" textAlign="center">
            You haven't created any posts yet.
          </Text>
        ) : (
          myPosts.map((post) => (
            <Box key={post.postId} mb={4}>
              <PostCard post={post} onUnsave={handleDeletePost} />
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
}

export default MyPost;
