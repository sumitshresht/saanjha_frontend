import {
  Box,
  Text,
  VStack,
  Input,
  Button,
  HStack,
  Flex,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LuX } from "react-icons/lu";
import { UserContext } from "../utils/UserContext";

const PostDialog = ({ isOpen, onClose, post }) => {
  const { user } = useContext(UserContext);
  const userId = user?.userId;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `https://saanjhabackend-production.up.railway.app/comments/${post.postId}`
      );
      setComments(res.data);
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post("https://saanjhabackend-production.up.railway.app/comments", {
        userId,
        postId: post.postId,
        content: newComment,
      });
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  useEffect(() => {
    if (isOpen) fetchComments();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Box
      position="relative"
      top={0}
      left={0}
      w="100%"
      borderRadius="2xl"
      h="auto"
      zIndex={9999}
      bg="rgba(0,0,0,0.1)"
      display="-flex"
      justifyContent="center"
      alignItems="center"
      overflowY="auto"
      className="transparent-scrollbar"
      px={4}
    >
      <Box
        bg="gray.800"
        border="1px solid rgba(255,255,255,0.1)"
        borderRadius="2xl"
        p={{ base: 4, md: 6 }}
        w="full"
        maxW="600px"
        color="white"
        boxShadow="2xl"
        position="relative"
        display="flex"
        flexDirection="column"
        gap={4}
        maxH="calc(100vh - 40px)"
        overflowY="auto"
        className="transparent-scrollbar"
      >
        {/* Close Button */}
        <IconButton
          //icon={}
          onClick={onClose}
          position="absolute"
          top={3}
          right={3}
          size="sm"
          bg="gray.700"
          color="white"
          _hover={{ bg: "gray.600" }}
          borderRadius="full"
          aria-label="Close"
        ><LuX size={18} />
        </IconButton>

        {/* Post Header */}
        <HStack spacing={4} mb={2} mt={6}>
          <Avatar.Root boxSize="10"> 
             <Avatar.Image src={post.profilePhoto?.trim() || "https://res.cloudinary.com/dtiqzj2cx/image/upload/v1750023118/xt10jnwtnfkoiksvzu7i.jpg"} />
             </Avatar.Root>
          <Box>
            <Text fontWeight="bold" fontSize="md">
              {post.firstName} {post.lastName}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {new Date(post.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </Box>
        </HStack>

        {/* Post Content */}
        <Box mb={2}>
          <Text mb={2} fontWeight="medium" fontSize="md">
            {post.postContent}
          </Text>
          {post.imageUrl &&
            (post.imageUrl.match(/\.(mp4|webm|ogg)$/i) ? (
              <video
                src={post.imageUrl}
                controls
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <img
                src={post.imageUrl}
                alt="Post"
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            ))}
        </Box>

        <Box h="1px" bg="gray.700" mb={2} />

        {/* Comments Section */}
        <Text fontWeight="medium" color="gray.300" fontSize="sm" mb={1}>
          {comments.length > 0 ? "Comments" : "No comments yet"}
        </Text>
        <VStack
          align="stretch"
          spacing={3}
          maxH="250px"
          overflowY="auto"
          className="transparent-scrollbar"
          pr={1}
          mb={3}
        >
          {comments.map((comment) => (
            <HStack align="start" spacing={3} key={comment.commentId}>
              <Avatar.Root
            boxSize="8">
              <Avatar.Image
                src={comment.profilePhoto?.trim() || "https://res.cloudinary.com/dtiqzj2cx/image/upload/v1750023118/xt10jnwtnfkoiksvzu7i.jpg"}
              />
              </Avatar.Root>
              <Box bg="gray.700" px={3} py={2} borderRadius="lg" maxW="80%">
                <Text fontWeight="semibold" fontSize="sm">
                  {comment.firstName} {comment.lastName}
                </Text>
                <Text fontSize="sm" color="gray.300" mt={1}>
                  {comment.content}
                </Text>
              </Box>
            </HStack>
          ))}
        </VStack>

        <Box h="1px" bg="gray.700" />

        {/* Comment Input */}
        <Flex gap={3} align="center" mt={2} mb={4}>
          <Avatar.Root
            boxSize="9">
              <Avatar.Image
            src={user?.profilePhoto?.trim() || "https://res.cloudinary.com/dtiqzj2cx/image/upload/v1750023118/xt10jnwtnfkoiksvzu7i.jpg"}
          />
          </Avatar.Root>
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            bg="gray.700"
            color="white"
            _placeholder={{ color: "gray.400" }}
            size="sm"
            flex={1}
            borderRadius="lg"
          />
          <Button size="sm" px={4} colorScheme="teal" onClick={handleCommentSubmit}>
            Post
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default PostDialog;
