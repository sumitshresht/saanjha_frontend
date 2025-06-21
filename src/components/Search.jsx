import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import PostCard from "./PostCard";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://saanjhabackend-production.up.railway.app/posts/search", {
        params: { q: query },
      });
      setResults(res.data);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <Container maxW="900px" py={6}>
      <Heading mb={4} textAlign="center" color="teal.300">
        Search Results for "{query}"
      </Heading>

      {loading ? (
        <Text color="gray.400" textAlign="center">Loading...</Text>
      ) : results.length === 0 ? (
        <Text color="gray.500" textAlign="center">
          No posts found.
        </Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {results.map((post) => (
            <Box key={post.postId}>
              <PostCard post={post} />
            </Box>
          ))}
        </VStack>
      )}
    </Container>
  );
};

export default Search;
