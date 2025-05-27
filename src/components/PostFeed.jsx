import { useEffect, useState } from "react";
import { VStack, Box, Spinner } from "@chakra-ui/react";
import PostCard from "./PostCard";
import PostCreator from "./PostCreator";
import { useContext } from "react";
import { UserContext } from "../utils/UserContext";




const PostFeed = () => {
  const storedUser = useContext(UserContext);

const user = {
  name: storedUser ? `${storedUser.user.firstName} ${storedUser.user.lastName}` : "Guest",
  avatar: "https://i.pravatar.cc/150?img=12", // optional: can be personalized later
};
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("customPosts")) || [];

    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        // Merge local posts first, then API posts
        setPosts([...storedPosts, ...data.posts]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
        setPosts(storedPosts); // fallback to just local posts
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner color="teal.300" size="xl" />;
  }

  const handleNewPost = (body, title) => {
    const newPost = {
      title: title || "Untitled",
      body,
      reactions: {
        likes: 0,
        dislikes: 0,
      },
    };

    // Add to state
    setPosts((prev) => {
      const updated = [newPost, ...prev];
      // Save only custom posts (without ID) to localStorage
      const customOnly = updated.filter((p) => !p.id);
      localStorage.setItem("customPosts", JSON.stringify(customOnly));
      return updated;
    });
  };

  return (
    <VStack spacing={6} py={4}>
      {/* Shared layout wrapper */}
      <Box w="100%" maxW={{ base: "100%", md: "700px", lg: "900px" }} mb={3} mx="auto">
        <PostCreator onPost={handleNewPost} user={user} />
      </Box>

      {posts.map((post, index) => (
        <Box key={`${post.title}-${index}`} w="100%" maxW="900px" mb="3" mx="auto">
          <PostCard key={`${post.title}-${index}`} post={post} user={user} />
        </Box>
      ))}
    </VStack>
  );
};

export default PostFeed;
