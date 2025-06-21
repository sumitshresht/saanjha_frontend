import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Menu,
  Portal,
  Spacer,
  Flex,
  Stack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { BsBookmark, BsBookmarkFill, BsHeart, BsHeartFill, BsFillChatFill } from "react-icons/bs";
import { FaRegComment, FaEllipsisH } from "react-icons/fa";
import { Heart, ThumbsDown, MessageCircle, Bookmark, Trash2 } from 'lucide-react';
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import PostDialog from "./PostDialog";
import { UserContext } from "../utils/UserContext";

const PostCard = ({ post, onUnsave }) => {
  const { user } = useContext(UserContext);
  const userId = user?.userId || "guest_user";
  const showMenu = post.userId === userId;

  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const [reaction, setReaction] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetchCounts();
    fetchUserReaction();
    checkIfPostSaved();
  }, [post]);

  const fetchCounts = async () => {
    try {
      const res = await axios.get(
        `https://saanjhabackend-production.up.railway.app/reaction/${post.postId}`
      );
      setLikeCount(res.data.likes || 0);
      setDislikeCount(res.data.dislikes || 0);
    } catch (err) {
      console.error("Failed to fetch counts", err);
    }
  };

  const fetchUserReaction = async () => {
    try {
      const res = await axios.get("https://saanjhabackend-production.up.railway.app/reaction", {
        params: { userId, postId: post.postId },
      });
      setReaction(res.data);
    } catch (err) {
      console.error("Failed to fetch reaction", err);
    }
  };

  const checkIfPostSaved = async () => {
    try {
      const res = await axios.get("https://saanjhabackend-production.up.railway.app/saved", {
        params: { userId },
      });
      const savedIds = res.data.map((p) => p.postId);
      setIsSaved(savedIds.includes(post.postId));
    } catch (err) {
      console.error("Failed to check saved", err);
    }
  };

  const handleReaction = async (type) => {
    const newStatus = reaction === type ? 0 : type;
    setReaction(newStatus);
    try {
      await axios.post("https://saanjhabackend-production.up.railway.app/reaction", {
        userId,
        postId: post.postId,
        status: newStatus,
      });
      fetchCounts();
    } catch (err) {
      console.error("Reaction error", err);
    }
  };

  const handleSavePost = async () => {
    try {
      if (isSaved) {
        await axios.delete("https://saanjhabackend-production.up.railway.app/saved", {
          params: { userId, postId: post.postId },
        });
        setIsSaved(false);
        //if (onUnsave) onUnsave(post);
      } else {
        await axios.post("https://saanjhabackend-production.up.railway.app/saved", {
          userId,
          postId: post.postId,
        });
        setIsSaved(true);
      }
    } catch (err) {
      console.error("Save error", err);
    }
  };

  const handleDeletePost = async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (!confirmed) return;
      await axios.delete(`https://saanjhabackend-production.up.railway.app/posts/${post.postId}`, {
        headers: { "user-id": userId },
      });
      if (onUnsave) onUnsave(post);
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box
      bg="rgba(255,255,255,0.1)"
      borderRadius="2xl"
      p={{ base: 4, md: 5 }}
      //backdropFilter="blur(14px)"
      border="1px solid rgba(255,255,255,0.3)"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      mx="auto"
      maxW={{ base: "100%", sm: "90%", md: "600px" }}
      mt={6}
    >
      <HStack alignItems="start" justifyContent="space-between">
        <HStack spacing={3}>
          <Avatar.Root boxSize={{ base: "8", md: "12" }}>
            <Avatar.Image
              src={
                post.profilePhoto?.trim() !== ""
                  ? post.profilePhoto
                  : "https://res.cloudinary.com/dtiqzj2cx/image/upload/v1750023118/xt10jnwtnfkoiksvzu7i.jpg"
              }
            />
          </Avatar.Root>
          <Box>
            <Text
              fontWeight="bold"
              color="white"
              fontSize={{ base: "sm", md: "md" }}
            >
              {post.firstName} {post.lastName}
            </Text>
            <Text fontSize={{ base: "xs", md: "sm" }} color="gray.300">
              {formatDate(post.createdAt)}
            </Text>
          </Box>
        </HStack>
      </HStack>

      <Text
        mt={4}
        color="white"
        fontWeight="semibold"
        fontSize={{ base: "sm", md: "md" }}
      >
        {post.postContent}
      </Text>

      {post.imageUrl && (
        <Box mt={3} borderRadius="lg" overflow="hidden">
          {post.imageUrl.match(/\.(mp4|webm|ogg)$/i) ? (
            <video
              src={post.imageUrl}
              controls
              style={{
                width: "100%",
                //maxHeight: "600px",
                objectFit: "cover",
              }}
            />
          ) : (
            <img
              src={post.imageUrl}
              alt="Post"
              style={{
                width: "100%",
               // maxHeight: "600px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          )}
        </Box>
      )}

      <Flex mt={4} wrap="wrap" align="center" gap={{ base: 1, md: 2 }}>
        <IconButton
          onClick={() => handleReaction(1)}
          //borderRadius="full"
          size={{base: "md", md: "2xl"}}
          bg="transparent"
          // bg={reaction === 1 ? "teal.200" : "whiteAlpha.200"}
          aria-label="Like"
        >
          <Icon
            as={reaction === 1 ? Heart : Heart}
            fill={reaction ===1 ? "#FF3040" : "none"}       // Sets the fill color
            stroke={reaction ===1 ? "#FF3040" : "#E0E0E0"}  
            color={reaction=== 1? "#FF3040" : "#E0E0E0"}
          />
        </IconButton>

        <Text marginLeft={{base: "-2", md: "-4"}} fontSize={{ base: "xs", md: "sm" }} color="gray.200">
          {likeCount}
        </Text>

        <IconButton
          onClick={() => handleReaction(-1)}
          //borderRadius="full"
          size={{base: "md", md: "2xl"}}
           bg="transparent"
          // bg={reaction === 1 ? "teal.200" : "whiteAlpha.200"}
          aria-label="Disike"
        >
          <Icon
            as={reaction === -1 ? ThumbsDown : ThumbsDown}
            fill={reaction ===-1 ? "#E0E0E0" : "none"}       // Sets the fill color
           
            
          />
        </IconButton>
        <Text marginLeft={{base: "-2", md: "-4"}} fontSize={{ base: "xs", md: "sm" }} color="gray.200">
          {dislikeCount}
        </Text>

        <IconButton
          onClick={onOpen}
          //borderRadius="full"
           size={{base: "md", md: "2xl"}}
           bg="transparent"
          
          aria-label="Comment"
        >
          <Icon
            as={MessageCircle}
            //boxSize={{ base: 4, md: 5 }}
            stroke="#E0E0E0"
            //color="blue.700"
          />
        </IconButton>

        <Spacer display={{ base: "none", md: "inline-flex" }} />

        <Box ml="auto">
           <IconButton
            display={showMenu ? "inline-block" : "none"}
            marginRight={showMenu ? "-3" : "0"}
            onClick={handleDeletePost}
            size={{base: "md", md: "2xl"}}
           bg="transparent"
          >
            <Icon
              as={Trash2}
              //boxSize={{ base: 4, md: 5 }}
              color={isSaved ? "#E0E0E0" : "#E0E0E0"}
            />
          </IconButton>
          <IconButton
            onClick={handleSavePost}
            size={{base: "md", md: "2xl"}}
           bg="transparent"
          >
            <Icon
              as={isSaved ? BsBookmarkFill : BsBookmark}
              //boxSize={{ base: 4, md: 5 }}
              color={isSaved ? "#E0E0E0" : "#E0E0E0"}
            />
          </IconButton>
         
        </Box>
      </Flex>

      <PostDialog isOpen={isOpen} onClose={onClose} post={post} />
    </Box>
  );
};

export default PostCard;
