import { useEffect, useState, useContext } from "react";
import {
  VStack,
  Box,
  Spinner,
  Center,
  Container,
  Flex,
} from "@chakra-ui/react";
import PostCard from "./PostCard";
import PostCreator from "./PostCreator";
import { UserContext } from "../utils/UserContext";
import axios from "axios";

const PostFeed = () => {
  const storedUser = useContext(UserContext);
  const currUser = storedUser?.user
    ? {
        name: `${storedUser.user.firstName} ${storedUser.user.lastName}`,
        avatar: storedUser.user.profileImage,
        userId: storedUser.user.userId,
      }
    : {
        name: "Guest",
        avatar: "",
      };

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRemovePost = (deletedPost) => {
    setPosts((prev) => prev.filter((p) => p.postId !== deletedPost.postId));
  };

  useEffect(() => {
    axios
      .get("https://saanjhabackend-production.up.railway.app/posts")
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sorted);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
        setLoading(false);
      });
  }, []);

  const handleNewPost = async (postContent, imageUrl) => {
    const userInfo = storedUser?.user || {
      firstName: "Guest",
      lastName: "",
    };

    const newPost = {
      postContent,
      imageUrl,
      user: userInfo,
    };

    try {
      const response = await axios.post(
        "https://saanjhabackend-production.up.railway.app/posts",
        newPost,
        {
          headers: {
            "user-id": currUser.userId || "guest_user",
          },
        }
      );
      setPosts((prev) => [
        {
          ...response.data,
          user: userInfo,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    } catch (error) {
      console.error("Post creation failed:", error);
      alert("Failed to post: " + error.message);
    }
  };

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner color="teal.300" size="xl" />
      </Center>
    );
  }

  return (
    <Container maxW="container.lg" px={{ base: "-0.5", sm: 2 }} pt={6}>
      <Flex
        direction="column"
        align="center"
        gap={6}
        style={{
          //background: "rgba(255, 255, 255, 0.06)",
         // backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderRadius: "20px",
          //border: "1px solid rgba(255, 255, 255, 0.125)",
          padding: "4px",
        }}
      >
        <Box w="full" maxW={{ base: "100%", md: "700px" }}>
          <PostCreator onPost={handleNewPost} user={currUser} />
        </Box>

        <VStack spacing={6} w="full">
          {posts.map((post, index) => (
            <Box key={`post-${index}`} w="full" maxW={{ base: "100%", md: "700px" }}>
              <PostCard post={post} onUnsave={handleRemovePost} />
            </Box>
          ))}
        </VStack>
      </Flex>
    </Container>
  );
};

export default PostFeed;
