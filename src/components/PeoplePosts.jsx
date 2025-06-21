import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import { VStack, Box, Heading, Spinner, Text } from "@chakra-ui/react";

const PeoplePosts = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPeoplePosts = async () => {
      try {
        const res = await axios.get(`https://saanjhabackend-production.up.railway.app/posts/search_people?q=${userId}`);
        const filtered = res.data.filter((p) => p.userId === userId);
        const sorted = filtered.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
        setPosts(sorted);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPeoplePosts();
  }, [userId]);

  if (loading) return <Spinner color="teal.300" size="xl" />;

  return (
    <VStack spacing={6} w="full" align="center">
      <Heading fontSize="xl" color="white">
        Posts by user: {userId}
      </Heading>
      {posts.length > 0 ? (
        posts.map((post, index) => (
                        <Box key={`post-${index}`} w="full" maxW={{ base: "100%", md: "700px" }}>
            <PostCard key={post.postId} post={post} />
            </Box>
        )
        ) 
      ) : (
        <Text color="gray.300">No posts found.</Text>
      )}
    </VStack>
  );
};

export default PeoplePosts;
